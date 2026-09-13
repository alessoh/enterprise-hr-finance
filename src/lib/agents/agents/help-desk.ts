/**
 * Help Desk Agent — answers an employee policy question with citations.
 *
 * A different shape from the Controls Agent, which is why both are implemented: this one
 * is retrieval-grounded question answering rather than exception detection, and it shows
 * the same six-stage shell handling a second modality without changes.
 *
 * The governance point here is citation. The agent must ground its answer in retrieved
 * policy sections, and schema.ts discards any finding citing an id that was never
 * retrieved. An agent that cannot find the answer says so rather than improvising, which
 * is the behaviour that makes it deployable against an HR handbook.
 */
import { POLICIES, type PolicyDoc } from "../fixtures";
import { applyScope, describeScopes, withheldFields } from "../scope";
import { runShell, type StageWork } from "../runtime";
import type { AgentDefinition, AgentRun, Finding, Scope } from "../types";

const SCOPES: Scope[] = [
  {
    dataset: "hr.policies",
    fields: ["id", "title", "section", "text", "effective"],
    filter: "policies in force on the question date",
  },
];

/** Keyword retrieval. Deliberately simple and inspectable rather than a vector index. */
function retrieve(question: string, docs: PolicyDoc[], limit = 4): PolicyDoc[] {
  const terms = question
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 3);
  const scored = docs.map((doc) => {
    const hay = `${doc.title} ${doc.section} ${doc.text}`.toLowerCase();
    const score = terms.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
    return { doc, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}

const SYSTEM = `You are an HR help desk agent answering an employee's question from company policy.

Rules you must follow:
- Answer only from the policy sections provided. If they do not contain the answer, say so.
- Cite the policy ids you used in the evidence array. Never cite an id that is not in the input.
- Do not give legal advice and do not speculate about exceptions.
- Set confidence below 0.5 when the provided sections do not fully answer the question.

Reply with a JSON object containing one key, "findings", holding exactly one object with these fields:
  subject      the policy id your answer principally rests on, copied from the input
  title        your answer compressed to one short sentence
  rationale    the full answer, two or three sentences, quoting the relevant limits
  severity     always "info"
  confidence   a number from 0 to 1
  evidence     array of the policy ids you used

Worked example. For the question "Do I need a receipt for a $40 lunch?" given section [FIN-120-4], a correct reply is:
{"findings":[{"subject":"FIN-120-4","title":"No receipt is required below $75.","rationale":"Receipts are required only for a single expense of $75 or more, so a $40 lunch does not need one. Submit the expense within 60 days, because later claims need the controller to approve an exception.","severity":"info","confidence":0.95,"evidence":["FIN-120-4"]}]}

Write your own answer in that shape. Do not copy the example text.`;

export const helpDeskAgent: AgentDefinition<{ question: string; now?: number }> = {
  slug: "help-desk",
  name: "Help Desk Agent",
  scopes: SCOPES,
  autonomousActions: ["Answer from published policy", "Open a case", "Cite a policy section"],
  approvalRequired: ["approve", "grant", "waive", "adjust pay", "terminate"],

  async run(input, ctx): Promise<AgentRun> {
    const now = () => input.now ?? ctx.now();
    const matched = retrieve(input.question, POLICIES);
    const projected = applyScope(SCOPES, "hr.policies", matched);
    const withheld = withheldFields(SCOPES, "hr.policies", matched);
    const knownIds = new Set(matched.map((p) => p.id));

    // When retrieval finds nothing, the agent escalates instead of asking the model to
    // invent an answer from an empty context.
    const settled: Finding[] =
      matched.length === 0
        ? [
            {
              subject: "no-match",
              title: "No policy section matched the question",
              rationale:
                "Retrieval returned no policy covering this question, so the agent escalated rather than answering.",
              severity: "low",
              confidence: 1,
              evidence: [],
              proposedAction: "Route to an HR specialist",
            },
          ]
        : [];

    const work: StageWork = {
      scope: {
        records: projected,
        withheld,
        summary: `Retrieved ${projected.length} policy sections under ${describeScopes(SCOPES)}`,
      },
      retrieve: {
        settled,
        referred: matched,
        summary:
          matched.length === 0
            ? "No policy matched; escalating without a model call"
            : `${matched.length} policy sections passed to the model as grounding`,
      },
      buildRequest(docs) {
        const list = docs as PolicyDoc[];
        if (list.length === 0) return null;
        const context = list
          .map((d) => `[${d.id}] ${d.title} — ${d.section} (effective ${d.effective})\n${d.text}`)
          .join("\n\n");
        return {
          system: SYSTEM,
          user: `Employee question: "${input.question}"\n\nPolicy sections:\n\n${context}`,
          tier: "triage",
          knownIds,
          maxTokens: 700,
        };
      },
    };

    return runShell(
      {
        agentSlug: "help-desk",
        runId: ctx.runId,
        now,
        scopes: SCOPES,
        policy: {
          // An answer is not a payment, so the money rule never fires here.
          approvalThreshold: Number.POSITIVE_INFINITY,
          noiseFloor: 0.4,
          autoFileConfidence: 0.7,
          approvalRequired: ["approve", "grant", "waive", "adjust pay", "terminate"],
        },
      },
      work,
    );
  },
};
