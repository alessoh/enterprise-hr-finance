"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { AgentEvent } from "@/lib/live/types";

const CATEGORY_TONE: Record<AgentEvent["category"], string> = {
  hr: "bg-accent-soft text-accent-hover",
  finance: "bg-bg-muted text-fg-muted",
  legal: "bg-warning-soft text-warning",
};

/** Screen-reader only: the titles already lead with the verb visually. */
const KIND_LABEL: Record<AgentEvent["kind"], string> = {
  resolved: "Resolved",
  flagged: "Flagged",
  drafted: "Drafted",
  approved: "Applied",
  scheduled: "Scheduled",
  collected: "Collected",
  reconciled: "Reconciled",
  screened: "Screened",
};

/** HH:MM:SS in the viewer's locale, fixed width so rows never shift. */
function clock(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleTimeString("en-GB", { hour12: false });
}

export interface LiveFeedProps {
  events: AgentEvent[];
  limit?: number;
  /** Render the "needs approval" affordance. */
  showApprovals?: boolean;
  className?: string;
}

export function LiveFeed({ events, limit = 8, showApprovals = true, className }: LiveFeedProps) {
  const rows = events.slice(0, limit);
  return (
    <ol
      className={cn("divide-y divide-border", className)}
      aria-live="polite"
      aria-label="Live agent operations"
    >
      {rows.map((event) => (
        <li
          key={event.id}
          className="animate-row-in grid grid-cols-[auto_1fr] items-start gap-x-3 px-4 py-2.5 sm:grid-cols-[auto_auto_1fr_auto] sm:gap-x-4"
        >
          <time
            dateTime={event.ts}
            className="tabular font-mono text-[11px] leading-5 text-fg-subtle"
          >
            {clock(event.ts)}
          </time>
          <span
            className={cn(
              "hidden shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-medium leading-4 sm:inline-block",
              CATEGORY_TONE[event.category],
            )}
          >
            {event.agentName.replace(" Agent", "")}
          </span>
          <div className="min-w-0">
            <span className="sr-only">{KIND_LABEL[event.kind]}. </span>
            <p className="truncate text-[13px] leading-5 text-fg">{event.title}</p>
            <p className="truncate text-[12px] leading-5 text-fg-muted">
              {event.detail}
              {event.amount !== undefined ? (
                <span className="tabular"> · {formatCurrency(event.amount)}</span>
              ) : null}
              <span className="text-fg-subtle"> · {event.customer}</span>
            </p>
          </div>
          <div className="col-start-2 mt-1 flex items-center gap-2 sm:col-start-4 sm:mt-0 sm:justify-end">
            {showApprovals && event.needsApproval ? (
              <span className="rounded-sm bg-warning-soft px-1.5 py-0.5 text-[11px] font-medium leading-4 text-warning">
                Needs approval
              </span>
            ) : null}
            <span className="tabular font-mono text-[11px] leading-5 text-fg-subtle">
              {event.credits} cr
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
