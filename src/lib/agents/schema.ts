/**
 * Structured output contracts.
 *
 * Free text from a model is not a result, it is a suggestion that something might be
 * true. Everything the model returns is parsed against these schemas before any other
 * code sees it, and a run that cannot produce valid output fails closed rather than
 * degrading into prose.
 */
import { z } from "zod";

import type { Finding } from "./types";

export const severitySchema = z.enum(["info", "low", "medium", "high"]);

export const findingSchema = z.object({
  subject: z.string().min(1).max(64),
  title: z.string().min(1).max(160),
  rationale: z.string().min(1).max(600),
  severity: severitySchema,
  confidence: z.number().min(0).max(1),
  evidence: z.array(z.string().min(1).max(64)).max(12),
  amount: z.number().nonnegative().optional(),
  proposedAction: z.string().max(200).optional(),
});

export const findingsEnvelopeSchema = z.object({
  findings: z.array(findingSchema).max(50),
});

export type ParsedFinding = z.infer<typeof findingSchema>;

/**
 * Extracts the first JSON object from a completion.
 *
 * Small open models sometimes wrap JSON in prose or a fenced block even when asked not
 * to. Recovering the object is legitimate; inventing one is not, so this returns null
 * rather than guessing when nothing parses.
 */
export function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidates = [fenced?.[1], trimmed].filter((c): c is string => Boolean(c));
  for (const candidate of candidates) {
    try {
      return JSON.parse(candidate);
    } catch {
      const start = candidate.indexOf("{");
      const end = candidate.lastIndexOf("}");
      if (start !== -1 && end > start) {
        try {
          return JSON.parse(candidate.slice(start, end + 1));
        } catch {
          // fall through to the next candidate
        }
      }
    }
  }
  return null;
}

export interface ValidationResult {
  ok: boolean;
  findings: Finding[];
  /** Message suitable for a repair prompt when validation failed. */
  problem?: string;
}

/**
 * Validates a completion and drops findings whose evidence does not reference records
 * the agent actually retrieved. A model citing an id it was never shown is a
 * hallucination, and the runtime treats it as one.
 */
export function validateFindings(text: string, knownIds: Set<string>): ValidationResult {
  const json = extractJson(text);
  if (json === null) {
    return { ok: false, findings: [], problem: "Output was not valid JSON." };
  }
  const parsed = findingsEnvelopeSchema.safeParse(json);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return {
      ok: false,
      findings: [],
      problem: `Output did not match the schema at ${issue?.path.join(".") || "root"}: ${issue?.message ?? "unknown"}.`,
    };
  }

  const findings: Finding[] = [];
  for (const f of parsed.data.findings) {
    const evidence = f.evidence.filter((id) => knownIds.has(id));
    // A finding whose subject was never retrieved is discarded outright.
    if (!knownIds.has(f.subject)) continue;
    findings.push({ ...f, evidence });
  }
  return { ok: true, findings };
}
