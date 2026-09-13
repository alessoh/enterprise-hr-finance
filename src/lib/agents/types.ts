/**
 * Agent runtime contract.
 *
 * The six terms every Meridian agent ships under (BRIEF section 3) are enforced here as
 * types and, in runtime.ts, as control flow. The model participates in exactly one
 * stage: `reason`. It cannot scope its own data access and it cannot decide its own
 * outcome.
 */

export type AgentStage = "scope" | "retrieve" | "reason" | "decide" | "act" | "log";

/** What the policy engine decided. The model never sets this. */
export type Disposition = "auto" | "needs-approval" | "rejected" | "failed";

export type Severity = "info" | "low" | "medium" | "high";

/** A field-level read scope. The model sees nothing outside it. */
export interface Scope {
  /** Logical dataset, e.g. "ap.invoices". */
  dataset: string;
  /** Field allow-list. Anything absent is stripped before the model is called. */
  fields: string[];
  /** Optional row filter description, recorded in the audit entry. */
  filter?: string;
}

/** One thing the agent proposes. Produced by the model, validated by zod. */
export interface Finding {
  /** Stable id for the record the finding concerns, e.g. "INV-2291". */
  subject: string;
  /** Short claim, e.g. "Possible duplicate of INV-2274". */
  title: string;
  /** The agent's reasoning, in one or two sentences. */
  rationale: string;
  severity: Severity;
  /** 0..1. Used by the policy engine, not by the model, to route the finding. */
  confidence: number;
  /** Record ids the finding rests on. Must reference retrieved data. */
  evidence: string[];
  /** Money at stake, when the finding concerns a transaction. */
  amount?: number;
  /** What the agent proposes a human do. Never executed by the agent. */
  proposedAction?: string;
}

/** A finding after the deterministic policy engine has ruled on it. */
export interface DecidedFinding extends Finding {
  disposition: Disposition;
  /** Which policy rule fired, quoted in the audit entry. */
  rule: string;
  /** True when the proposal was discarded because it failed a check. */
  discarded?: boolean;
}

export interface AuditEntry {
  /** Monotonic index within the chain. */
  seq: number;
  ts: string;
  agentSlug: string;
  stage: AgentStage;
  /** Human-readable summary of what happened at this stage. */
  summary: string;
  /** sha256 of the stage payload. */
  payloadHash: string;
  /** sha256 over (previous hash + this entry). Tamper-evident. */
  hash: string;
  prevHash: string;
  /** Present on the reason stage only. */
  model?: string;
}

export interface ModelUsage {
  model: string;
  endpoint: string;
  promptTokens?: number;
  completionTokens?: number;
  latencyMs: number;
  /** How many times output failed validation and was retried. */
  repairs: number;
}

export interface AgentRun {
  runId: string;
  agentSlug: string;
  startedAt: string;
  finishedAt: string;
  /** Records considered after scoping. */
  population: number;
  /** Cases settled deterministically, without calling the model. */
  settledInCode: number;
  /** Cases handed to the model because code could not settle them. */
  referredToModel: number;
  findings: DecidedFinding[];
  audit: AuditEntry[];
  usage?: ModelUsage;
  /** Set when the run could not complete. The run fails closed, never silently. */
  error?: string;
}

export interface AgentDefinition<TInput = unknown> {
  slug: string;
  name: string;
  /** Read scopes. Enforced in scope.ts before any model call. */
  scopes: Scope[];
  /** Actions the agent may take without a human. Deliberately small. */
  autonomousActions: string[];
  /** Actions that always require a human, whatever the model proposes. */
  approvalRequired: string[];
  run(input: TInput, ctx: AgentContext): Promise<AgentRun>;
}

export interface AgentContext {
  /** Injected so runs are reproducible in tests. */
  now: () => number;
  runId: string;
}
