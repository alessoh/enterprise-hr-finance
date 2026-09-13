import { randomUUID } from "node:crypto";

import { controlsAgent } from "./agents/controls";
import { helpDeskAgent } from "./agents/help-desk";
import type { AgentRun } from "./types";

export { checkHealth } from "./provider";
export { verifyChain } from "./audit";
export { ruleNames } from "./policy";
export { SERVING_PRESETS, SUGGESTED_MODELS, getModelConfig } from "./models";
export type { AgentRun, AuditEntry, DecidedFinding } from "./types";

/** Agents with a real execution path. The other ten are specified but not yet built. */
export const IMPLEMENTED = [
  { slug: "controls", name: "Controls Agent", input: "none", description: "Tests the AP population for duplicates and match breaks." },
  { slug: "help-desk", name: "Help Desk Agent", input: "question", description: "Answers a policy question with citations." },
] as const;

export type ImplementedSlug = (typeof IMPLEMENTED)[number]["slug"];

export function isImplemented(slug: string): slug is ImplementedSlug {
  return IMPLEMENTED.some((a) => a.slug === slug);
}

export interface RunOptions {
  question?: string;
  /** Fixed clock, for reproducible runs in tests. */
  now?: number;
}

/** Runs one agent. Throws only on programming errors; model failures land on run.error. */
export async function runAgent(slug: ImplementedSlug, opts: RunOptions = {}): Promise<AgentRun> {
  const ctx = { now: () => opts.now ?? Date.now(), runId: randomUUID() };
  if (slug === "controls") return controlsAgent.run({ now: opts.now }, ctx);
  return helpDeskAgent.run(
    { question: opts.question ?? "How much PTO can I carry over?", now: opts.now },
    ctx,
  );
}
