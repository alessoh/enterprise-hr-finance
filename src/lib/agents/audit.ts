/**
 * Hash-chained audit log.
 *
 * "Every action logged" is the third term. A plain log is not evidence: anyone with
 * write access can edit a row. Chaining each entry to the hash of the one before makes
 * tampering detectable, because altering an early entry invalidates every hash after it.
 *
 * This is the artefact the Audit Agent is meant to hand an auditor, so it is built the
 * way an auditor would want: append-only, verifiable, and recording the model and prompt
 * behind any machine judgment.
 */
import { createHash } from "node:crypto";

import type { AgentStage, AuditEntry } from "./types";

const GENESIS = "0".repeat(64);

export function sha256(value: unknown): string {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  return createHash("sha256").update(text).digest("hex");
}

export class AuditChain {
  private entries: AuditEntry[] = [];
  private prevHash = GENESIS;

  constructor(
    private readonly agentSlug: string,
    private readonly now: () => number,
  ) {}

  /** Appends a stage entry and links it to the previous hash. */
  record(stage: AgentStage, summary: string, payload: unknown, model?: string): AuditEntry {
    const seq = this.entries.length;
    const ts = new Date(this.now()).toISOString();
    const payloadHash = sha256(payload ?? null);
    const hash = sha256(
      `${this.prevHash}|${seq}|${ts}|${this.agentSlug}|${stage}|${payloadHash}|${model ?? ""}`,
    );
    const entry: AuditEntry = {
      seq,
      ts,
      agentSlug: this.agentSlug,
      stage,
      summary,
      payloadHash,
      hash,
      prevHash: this.prevHash,
      ...(model ? { model } : {}),
    };
    this.entries.push(entry);
    this.prevHash = hash;
    return entry;
  }

  all(): AuditEntry[] {
    return [...this.entries];
  }
}

/**
 * Recomputes the chain and reports the first entry that does not verify.
 * Exposed so the claim can be demonstrated rather than asserted.
 */
export function verifyChain(entries: AuditEntry[]): { valid: boolean; brokenAt?: number } {
  let prev = GENESIS;
  for (const entry of entries) {
    if (entry.prevHash !== prev) return { valid: false, brokenAt: entry.seq };
    const expected = sha256(
      `${entry.prevHash}|${entry.seq}|${entry.ts}|${entry.agentSlug}|${entry.stage}|${entry.payloadHash}|${entry.model ?? ""}`,
    );
    if (expected !== entry.hash) return { valid: false, brokenAt: entry.seq };
    prev = entry.hash;
  }
  return { valid: true };
}
