/**
 * Deterministic policy engine.
 *
 * The fourth term is "consequential actions require human approval". The model proposes
 * findings; this module decides what happens to them, and the model has no input into
 * that decision. Every rule is plain code with a quotable name, so an auditor can read
 * the rule that fired rather than inspect a prompt.
 *
 * Ordering matters: the first rule that matches wins, and the money threshold is checked
 * before confidence, so a high-confidence model is never able to talk its way past it.
 */
import type { DecidedFinding, Disposition, Finding } from "./types";

export interface PolicyConfig {
  /** Findings at or above this amount always go to a human, whatever the confidence. */
  approvalThreshold: number;
  /** Below this confidence a finding is not shown as an exception at all. */
  noiseFloor: number;
  /** At or above this confidence a non-consequential finding may be filed automatically. */
  autoFileConfidence: number;
  /** Actions this agent may never take on its own. */
  approvalRequired: string[];
}

export const DEFAULT_POLICY: PolicyConfig = {
  approvalThreshold: 1_000,
  noiseFloor: 0.45,
  autoFileConfidence: 0.85,
  approvalRequired: [],
};

interface Rule {
  name: string;
  /** Returns a disposition when the rule applies, otherwise null. */
  test(finding: Finding, cfg: PolicyConfig): Disposition | null;
}

/**
 * Rules run in order. Each one is a sentence an auditor can check.
 */
const RULES: Rule[] = [
  {
    name: "evidence-required",
    test: (f) => (f.evidence.length === 0 ? "rejected" : null),
  },
  {
    name: "confidence-below-noise-floor",
    test: (f, cfg) => (f.confidence < cfg.noiseFloor ? "rejected" : null),
  },
  {
    name: "money-movement-always-needs-a-person",
    test: (f, cfg) =>
      f.amount !== undefined && f.amount >= cfg.approvalThreshold ? "needs-approval" : null,
  },
  {
    name: "action-on-the-approval-list",
    test: (f, cfg) =>
      f.proposedAction && cfg.approvalRequired.some((a) => f.proposedAction!.toLowerCase().includes(a))
        ? "needs-approval"
        : null,
  },
  {
    name: "high-severity-needs-a-person",
    test: (f) => (f.severity === "high" ? "needs-approval" : null),
  },
  {
    name: "high-confidence-informational-may-auto-file",
    test: (f, cfg) => (f.confidence >= cfg.autoFileConfidence ? "auto" : null),
  },
];

/** Fallback when no rule matched: route to a human rather than act. */
const DEFAULT_DISPOSITION: Disposition = "needs-approval";

export function decide(finding: Finding, cfg: PolicyConfig = DEFAULT_POLICY): DecidedFinding {
  for (const rule of RULES) {
    const disposition = rule.test(finding, cfg);
    if (disposition) {
      return {
        ...finding,
        disposition,
        rule: rule.name,
        ...(disposition === "rejected" ? { discarded: true } : {}),
      };
    }
  }
  return { ...finding, disposition: DEFAULT_DISPOSITION, rule: "default-route-to-human" };
}

export function decideAll(findings: Finding[], cfg: PolicyConfig = DEFAULT_POLICY): DecidedFinding[] {
  return findings.map((f) => decide(f, cfg));
}

/** The rule names, for display. Showing the policy is part of the product. */
export function ruleNames(): string[] {
  return RULES.map((r) => r.name);
}
