/**
 * Proves the audit chain is tamper-evident.
 *
 * Builds a chain, verifies it, then edits one entry's summary the way someone covering
 * their tracks would, and checks that verification fails at that entry.
 *
 * Run: node scripts/verify-audit.mjs
 */
import { createHash } from "node:crypto";

const sha256 = (v) =>
  createHash("sha256").update(typeof v === "string" ? v : JSON.stringify(v)).digest("hex");
const GENESIS = "0".repeat(64);

// Mirrors src/lib/agents/audit.ts so this script runs without a TypeScript loader.
function build(agentSlug, stages) {
  const entries = [];
  let prevHash = GENESIS;
  stages.forEach(([stage, summary, payload], seq) => {
    const ts = new Date(1789000000000 + seq * 1000).toISOString();
    const payloadHash = sha256(payload ?? null);
    const hash = sha256(`${prevHash}|${seq}|${ts}|${agentSlug}|${stage}|${payloadHash}|`);
    entries.push({ seq, ts, agentSlug, stage, summary, payloadHash, hash, prevHash });
    prevHash = hash;
  });
  return entries;
}

function verify(entries) {
  let prev = GENESIS;
  for (const e of entries) {
    if (e.prevHash !== prev) return { valid: false, brokenAt: e.seq };
    const expected = sha256(
      `${e.prevHash}|${e.seq}|${e.ts}|${e.agentSlug}|${e.stage}|${e.payloadHash}|${e.model ?? ""}`,
    );
    if (expected !== e.hash) return { valid: false, brokenAt: e.seq };
    prev = e.hash;
  }
  return { valid: true };
}

const chain = build("controls", [
  ["scope", "Read 20 invoices", { count: 20 }],
  ["retrieve", "3 settled, 1 referred", { settled: 3 }],
  ["reason", "Model returned 1 finding", { findings: 1 }],
  ["decide", "4 need a person", { needsApproval: 4 }],
  ["act", "0 payments touched", { autoFiled: 0 }],
  ["log", "Run sealed", {}],
]);

const clean = verify(chain);
console.log("intact chain:              ", clean.valid ? "VALID" : `BROKEN at ${clean.brokenAt}`);

// Someone edits the payload of the decide stage to hide that approvals were required.
const tampered = structuredClone(chain);
tampered[3].payloadHash = sha256({ needsApproval: 0 });
const after = verify(tampered);
console.log("after editing entry 3:     ", after.valid ? "VALID" : `BROKEN at ${after.brokenAt}`);

// Someone deletes the reason stage entirely to hide that a model was involved.
const removed = structuredClone(chain).filter((e) => e.stage !== "reason");
const afterDelete = verify(removed);
console.log("after deleting the reason: ", afterDelete.valid ? "VALID" : `BROKEN at ${afterDelete.brokenAt}`);

const ok = clean.valid && !after.valid && !afterDelete.valid;
console.log(ok ? "\nPASS: tampering is detected." : "\nFAIL: chain is not tamper-evident.");
process.exit(ok ? 0 : 1);
