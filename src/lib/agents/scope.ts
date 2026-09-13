/**
 * Field-level read scoping.
 *
 * The first of the six terms is "reads only permitted data". That is enforced here, in
 * code, before the model is called. A record is projected down to the agent's declared
 * field allow-list; anything else is physically absent from the context window rather
 * than merely discouraged by a prompt.
 *
 * This matters for the product argument: a prompt instruction is a suggestion, a
 * projection is a control.
 */
import type { Scope } from "./types";

export type Row = Record<string, unknown>;
/** Accepts interfaces, which do not carry an implicit index signature. */
export type Readable = object;

export class ScopeViolationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ScopeViolationError";
  }
}

/**
 * Projects rows onto the scope's allow-list.
 *
 * Unknown fields are dropped silently (that is the point). Requesting a dataset the
 * agent has not declared throws, because that is a programming error, not user input.
 */
export function applyScope<T extends Readable>(
  scopes: Scope[],
  dataset: string,
  rows: T[],
): Row[] {
  const scope = scopes.find((s) => s.dataset === dataset);
  if (!scope) {
    throw new ScopeViolationError(
      `Agent has no declared scope for dataset "${dataset}". Declare it or do not read it.`,
    );
  }
  const allowed = new Set(scope.fields);
  return rows.map((row) => {
    const projected: Row = {};
    for (const [key, value] of Object.entries(row)) {
      if (allowed.has(key)) projected[key] = value;
    }
    return projected;
  });
}

/** Fields present in the data but not permitted. Reported in the audit trail. */
export function withheldFields<T extends Readable>(scopes: Scope[], dataset: string, rows: T[]): string[] {
  const scope = scopes.find((s) => s.dataset === dataset);
  if (!scope || rows.length === 0) return [];
  const allowed = new Set(scope.fields);
  const seen = new Set<string>();
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!allowed.has(key)) seen.add(key);
    }
  }
  return [...seen].sort();
}

/** Human-readable description of what the model was allowed to see. */
export function describeScopes(scopes: Scope[]): string {
  return scopes
    .map((s) => `${s.dataset}(${s.fields.length} fields${s.filter ? `, ${s.filter}` : ""})`)
    .join("; ");
}
