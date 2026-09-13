/**
 * The agent run loop.
 *
 * Reading this file top to bottom is reading the six terms in execution order. The model
 * is called in exactly one place, `reason()`, and everything before and after it is
 * deterministic code the model cannot influence.
 *
 * Two properties are deliberate and load-bearing:
 *
 *   Deterministic first. Exact duplicates are found by code. The model only ever sees
 *   the cases code could not settle, which is cheaper, faster, and means a model outage
 *   degrades the agent rather than disabling it.
 *
 *   Fail closed. No endpoint, or output that will not validate twice, produces an error
 *   on the run. It never falls back to the simulated feed and never invents a finding.
 */
import { AuditChain } from "./audit";
import { complete, ModelUnavailableError } from "./provider";
import { getModelConfig, modelFor, type Tier } from "./models";
import { decideAll, DEFAULT_POLICY, type PolicyConfig } from "./policy";
import { validateFindings } from "./schema";
import type { AgentRun, DecidedFinding, Finding, ModelUsage, Scope } from "./types";

export interface ReasonRequest {
  /** System prompt: the agent's job and its limits. */
  system: string;
  /** User prompt: the scoped data and the question. */
  user: string;
  tier: Tier;
  /** Ids the model is allowed to cite. Anything else is treated as hallucinated. */
  knownIds: Set<string>;
  maxTokens?: number;
}

export interface ReasonResult {
  findings: Finding[];
  usage: ModelUsage;
}

const REPAIR_LIMIT = 1;

/**
 * Calls the model and returns validated findings.
 *
 * On a schema failure it retries once with the parser's complaint appended, which is
 * what makes small local models usable for structured work. A second failure throws.
 */
export async function reason(req: ReasonRequest): Promise<ReasonResult> {
  const cfg = getModelConfig();
  if (!cfg.configured) {
    throw new ModelUnavailableError(
      "No model configured. Set MERIDIAN_MODEL_ENABLED=1 and MERIDIAN_MODEL_BASE_URL.",
    );
  }
  const model = modelFor(req.tier, cfg);

  let repairs = 0;
  let latency = 0;
  let promptTokens: number | undefined;
  let completionTokens: number | undefined;
  let problem: string | undefined;

  for (let attempt = 0; attempt <= REPAIR_LIMIT; attempt += 1) {
    const user = problem
      ? `${req.user}\n\nYour previous reply was rejected: ${problem}\nReply with valid JSON only.`
      : req.user;

    const result = await complete(
      {
        model,
        json: true,
        maxTokens: req.maxTokens ?? 1200,
        messages: [
          { role: "system", content: req.system },
          { role: "user", content: user },
        ],
      },
      cfg,
    );
    latency += result.latencyMs;
    promptTokens = (promptTokens ?? 0) + (result.promptTokens ?? 0);
    completionTokens = (completionTokens ?? 0) + (result.completionTokens ?? 0);

    const validated = validateFindings(result.text, req.knownIds);
    if (validated.ok) {
      return {
        findings: validated.findings,
        usage: {
          model,
          endpoint: cfg.baseUrl,
          promptTokens,
          completionTokens,
          latencyMs: latency,
          repairs,
        },
      };
    }
    problem = validated.problem;
    repairs += 1;
  }

  throw new ModelUnavailableError(
    `Model output failed validation after ${REPAIR_LIMIT + 1} attempts: ${problem ?? "unknown"}`,
  );
}

export interface RunShellOptions {
  agentSlug: string;
  runId: string;
  now: () => number;
  scopes: Scope[];
  policy?: PolicyConfig;
}

export interface StageWork {
  /** Rows after projection, and the fields that were withheld. */
  scope: { records: unknown[]; withheld: string[]; summary: string };
  /** Findings settled without the model, plus what is left for it. */
  retrieve: { settled: Finding[]; referred: unknown[]; summary: string };
  /** Builds the prompt for whatever retrieve could not settle. */
  buildRequest(referred: unknown[]): ReasonRequest | null;
}

/**
 * Drives the six stages and produces the audit chain.
 *
 * Agents supply the domain work through `StageWork`; the ordering, the policy call and
 * the logging are identical for every agent, which is what makes the guarantee a
 * property of the platform rather than of each agent's code.
 */
export async function runShell(opts: RunShellOptions, work: StageWork): Promise<AgentRun> {
  const startedAt = new Date(opts.now()).toISOString();
  const chain = new AuditChain(opts.agentSlug, opts.now);
  const policy = opts.policy ?? DEFAULT_POLICY;

  // 1. Scope
  chain.record("scope", work.scope.summary, {
    scopes: opts.scopes,
    withheld: work.scope.withheld,
    count: work.scope.records.length,
  });

  // 2. Retrieve
  chain.record("retrieve", work.retrieve.summary, {
    settled: work.retrieve.settled.length,
    referred: work.retrieve.referred.length,
  });

  // 3. Reason
  let modelFindings: Finding[] = [];
  let usage: ModelUsage | undefined;
  let error: string | undefined;

  const request = work.buildRequest(work.retrieve.referred);
  if (request) {
    try {
      const result = await reason(request);
      modelFindings = result.findings;
      usage = result.usage;
      chain.record(
        "reason",
        `Model reviewed ${work.retrieve.referred.length} unresolved cases and returned ${modelFindings.length} findings`,
        { findings: modelFindings },
        result.usage.model,
      );
    } catch (cause) {
      error = cause instanceof Error ? cause.message : String(cause);
      chain.record("reason", `Model stage failed: ${error}`, { error });
    }
  } else {
    chain.record("reason", "No cases required model judgment", { findings: [] });
  }

  // 4. Decide — deterministic, and the model has no vote here.
  const all = [...work.retrieve.settled, ...modelFindings];
  const decided: DecidedFinding[] = decideAll(all, policy);
  const needsApproval = decided.filter((f) => f.disposition === "needs-approval").length;
  const rejected = decided.filter((f) => f.disposition === "rejected").length;
  chain.record(
    "decide",
    `${decided.length} findings ruled: ${needsApproval} need a person, ${rejected} rejected by policy`,
    { dispositions: decided.map((f) => ({ subject: f.subject, disposition: f.disposition, rule: f.rule })) },
  );

  // 5. Act — nothing consequential executes. This is the whole product claim.
  const autoFiled = decided.filter((f) => f.disposition === "auto").length;
  chain.record(
    "act",
    `${autoFiled} findings filed automatically, ${needsApproval} queued for human approval, 0 payments touched`,
    { autoFiled, queued: needsApproval },
  );

  // 6. Log
  const finishedAt = new Date(opts.now()).toISOString();
  chain.record("log", "Run sealed", { runId: opts.runId, finishedAt });

  return {
    runId: opts.runId,
    agentSlug: opts.agentSlug,
    startedAt,
    finishedAt,
    population: work.scope.records.length,
    settledInCode: work.retrieve.settled.length,
    referredToModel: work.retrieve.referred.length,
    findings: decided.filter((f) => !f.discarded),
    audit: chain.all(),
    ...(usage ? { usage } : {}),
    ...(error ? { error } : {}),
  };
}
