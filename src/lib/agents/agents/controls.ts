/**
 * Controls Agent — duplicate and anomaly detection over accounts payable.
 *
 * Mirrors the guardrails published on /agents/controls, which are not marketing copy
 * here but the actual control flow:
 *
 *   "Never blocks, holds, or reverses a payment on its own" — this agent returns
 *   findings. There is no code path from a finding to a payment system.
 *   "Every exception requires a human disposition" — enforced by policy.ts, not here.
 *
 * The division of labour is the interesting part. Exact duplicates are a deterministic
 * key match, so code finds them and the model never sees them. What code cannot settle
 * are the near-misses: a vendor name spelled two ways, an invoice number with the
 * punctuation dropped, a legitimate phased billing that looks like a split purchase.
 * That judgment is what the model is for.
 */
import { INVOICES, type InvoiceRow } from "../fixtures";
import { applyScope, describeScopes, withheldFields } from "../scope";
import { runShell, type StageWork } from "../runtime";
import type { AgentDefinition, AgentRun, Finding, Scope } from "../types";

const SCOPES: Scope[] = [
  {
    dataset: "ap.invoices",
    // Note what is absent: approverEmail, bankAccountLast4, preparerNationalId.
    fields: [
      "id", "vendor", "vendorId", "amount", "currency", "invoiceNumber",
      "invoiceDate", "postedDate", "poNumber", "receiptNumber", "receiptQty",
      "poQty", "description",
    ],
    filter: "posted in the last 60 days",
  },
];

/** Normalises an invoice number so "HF-30291" and "HF30291" collide. */
const normaliseNumber = (n: string) => n.toUpperCase().replace(/[^A-Z0-9]/g, "");
/** Normalises a vendor name so "Halden Freight" and "Halden Freight Ltd" collide. */
const normaliseVendor = (v: string) =>
  v.toLowerCase().replace(/\b(ltd|limited|inc|llc|co|corp|company)\b/g, "").replace(/[^a-z0-9]/g, "");

interface Pair {
  a: InvoiceRow;
  b: InvoiceRow;
  reason: string;
}

/**
 * Deterministic pass. Returns exact duplicates as settled findings and near-misses as
 * candidates for the model.
 */
function partition(rows: InvoiceRow[]): { settled: Finding[]; referred: Pair[] } {
  const settled: Finding[] = [];
  const referred: Pair[] = [];
  const seenExact = new Map<string, InvoiceRow>();

  for (const row of rows) {
    // Exact: same vendor id, same amount, same normalised invoice number.
    const exactKey = `${row.vendorId}|${row.amount.toFixed(2)}|${normaliseNumber(row.invoiceNumber)}`;
    const prior = seenExact.get(exactKey);
    if (prior) {
      // Distinguish a byte-identical match from one that only collides after
      // normalisation, because a controller will treat the two differently.
      const literal = prior.invoiceNumber === row.invoiceNumber && prior.vendor === row.vendor;
      settled.push({
        subject: row.id,
        title: literal
          ? `Duplicate of ${prior.id}`
          : `Duplicate of ${prior.id} after normalising vendor and number`,
        rationale: literal
          ? `Same vendor, same amount, and the same invoice number ${row.invoiceNumber}. Matched on an exact key, not by judgment.`
          : `Same vendor id and amount. "${prior.vendor}" / "${prior.invoiceNumber}" and "${row.vendor}" / "${row.invoiceNumber}" collide once punctuation and suffixes are removed.`,
        severity: "high",
        confidence: 1,
        evidence: [prior.id, row.id],
        amount: row.amount,
        proposedAction: "Hold the later invoice for AP review before the payment run",
      });
      continue;
    }
    seenExact.set(exactKey, row);
  }

  // Near-misses: same normalised vendor and identical amount, but not an exact match.
  const byFuzzy = new Map<string, InvoiceRow[]>();
  for (const row of rows) {
    const key = `${normaliseVendor(row.vendor)}|${row.amount.toFixed(2)}`;
    byFuzzy.set(key, [...(byFuzzy.get(key) ?? []), row]);
  }
  const alreadySettled = new Set(settled.map((f) => f.subject));
  for (const group of byFuzzy.values()) {
    if (group.length < 2) continue;
    for (let i = 1; i < group.length; i += 1) {
      const a = group[i - 1];
      const b = group[i];
      if (alreadySettled.has(b.id)) continue;
      const exactKey = (r: InvoiceRow) =>
        `${r.vendorId}|${r.amount.toFixed(2)}|${normaliseNumber(r.invoiceNumber)}`;
      if (exactKey(a) === exactKey(b)) continue; // already handled above
      referred.push({
        a, b,
        reason: "Same normalised vendor and identical amount, but the invoice numbers or documents differ",
      });
    }
  }

  // Three-way match breaks are arithmetic, so code settles them too.
  for (const row of rows) {
    if (row.poQty !== null && row.receiptQty !== null && row.poQty !== row.receiptQty) {
      settled.push({
        subject: row.id,
        title: `Three-way match break on ${row.poNumber}`,
        rationale: `Ordered ${row.poQty}, received ${row.receiptQty}. Quantity variance of ${row.poQty - row.receiptQty}.`,
        severity: "medium",
        confidence: 1,
        evidence: [row.id],
        amount: row.amount,
        proposedAction: "Confirm short delivery before paying in full",
      });
    }
  }

  return { settled, referred };
}

const SYSTEM = `You are a controls analyst reviewing accounts payable exceptions.

You are given pairs of invoices that a deterministic check could not settle. For each pair, decide whether it is a genuine duplicate payment risk or a legitimate separate charge.

Rules you must follow:
- Only report a pair as a duplicate when the evidence supports it. Phased billing, recurring monthly charges, and separate purchase orders for sequential work are NOT duplicates.
- You may only cite invoice ids that appear in the input.
- You do not decide what happens next. You report findings; a person dispositions them.
- Set confidence honestly. Use a value below 0.5 when the pair is probably legitimate.

Reply with a JSON object containing one key, "findings", holding one object per genuine risk, with these fields:
  subject         the invoice id at risk, copied from the input
  title           the claim in one short sentence
  rationale       why, in one or two sentences, naming the fields that matched
  severity        "info", "low", "medium" or "high"
  confidence      a number from 0 to 1
  evidence        array of the invoice ids you compared
  amount          the invoice amount as a number
  proposedAction  what a person should do

Worked example. For a pair where ACME billed the same amount twice with invoice numbers "AC-99" and "AC99" two weeks apart, a correct reply is:
{"findings":[{"subject":"INV-9999","title":"Likely duplicate of INV-9990 with punctuation dropped.","rationale":"Same vendor and identical amount, and the invoice numbers match once punctuation is removed. The second was posted 14 days later with no purchase order.","severity":"high","confidence":0.88,"evidence":["INV-9990","INV-9999"],"amount":1234.56,"proposedAction":"Hold the later invoice for AP review"}]}

Return {"findings":[]} if no pair is a genuine risk. Write your own findings. Do not copy the example.`;

function buildUser(pairs: Pair[]): string {
  const cases = pairs.map((p, i) => {
    const fmt = (r: InvoiceRow) =>
      `    ${r.id}: vendor="${r.vendor}" number="${r.invoiceNumber}" amount=${r.amount.toFixed(2)} ${r.currency} invoiceDate=${r.invoiceDate} posted=${r.postedDate} po=${r.poNumber ?? "none"} receipt=${r.receiptNumber ?? "none"} description="${r.description}"`;
    return `Case ${i + 1} (${p.reason}):\n${fmt(p.a)}\n${fmt(p.b)}`;
  });
  return `Review these ${pairs.length} unresolved cases.\n\n${cases.join("\n\n")}`;
}

export const controlsAgent: AgentDefinition<{ now?: number }> = {
  slug: "controls",
  name: "Controls Agent",
  scopes: SCOPES,
  autonomousActions: ["Raise an exception", "Log a control test result"],
  approvalRequired: ["hold", "block", "reverse", "pay", "release"],

  async run(input, ctx): Promise<AgentRun> {
    const now = () => input.now ?? ctx.now();
    const rows = INVOICES;
    const projected = applyScope(SCOPES, "ap.invoices", rows);
    const withheld = withheldFields(SCOPES, "ap.invoices", rows);
    const { settled, referred } = partition(rows);
    const knownIds = new Set(rows.map((r) => r.id));

    const work: StageWork = {
      scope: {
        records: projected,
        withheld,
        summary: `Read ${projected.length} invoices under ${describeScopes(SCOPES)}. Withheld ${withheld.length} fields: ${withheld.join(", ")}`,
      },
      retrieve: {
        settled,
        referred,
        summary: `${settled.length} exceptions settled deterministically; ${referred.length} ambiguous pairs referred to the model`,
      },
      buildRequest(pairs) {
        const list = pairs as Pair[];
        if (list.length === 0) return null;
        return { system: SYSTEM, user: buildUser(list), tier: "judgment", knownIds };
      },
    };

    return runShell(
      {
        agentSlug: "controls",
        runId: ctx.runId,
        now,
        scopes: SCOPES,
        policy: {
          approvalThreshold: 1_000,
          noiseFloor: 0.45,
          autoFileConfidence: 0.85,
          approvalRequired: ["hold", "block", "reverse", "pay", "release"],
        },
      },
      work,
    );
  },
};
