"use client";

import { useState } from "react";

import { cn, formatCurrency } from "@/lib/utils";
import type { AgentEvent, ApprovalDecision } from "@/lib/live/types";

export interface ApprovalsQueueProps {
  items: AgentEvent[];
  className?: string;
}

/**
 * The human-in-the-loop surface. Decisions are local to this demo: nothing is sent
 * anywhere, and the row records who decided what, which is the point being demonstrated.
 */
export function ApprovalsQueue({ items, className }: ApprovalsQueueProps) {
  const [decisions, setDecisions] = useState<Record<string, ApprovalDecision>>({});

  const decide = (id: string, decision: ApprovalDecision) =>
    setDecisions((previous) => ({ ...previous, [id]: decision }));

  const pending = items.filter((item) => !decisions[item.id]).length;

  return (
    <section className={cn("flex flex-col", className)} aria-labelledby="approvals-heading">
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2">
        <h2
          id="approvals-heading"
          className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle"
        >
          Awaiting your approval
        </h2>
        <span className="tabular text-[11px] text-fg-subtle">{pending} pending</span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item) => {
          const decision = decisions[item.id];
          return (
            <li key={item.id} className="px-4 py-3">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[13px] font-medium text-fg">{item.title}</span>
                <span className="text-[11.5px] text-fg-subtle">
                  {item.agentName} · {item.customer}
                </span>
              </div>
              <p className="mt-1 text-[12px] leading-5 text-fg-muted">
                {item.detail}
                {item.amount !== undefined ? (
                  <span className="tabular"> · {formatCurrency(item.amount)}</span>
                ) : null}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                {decision ? (
                  <span
                    className={cn(
                      "rounded-sm px-1.5 py-0.5 text-[11px] font-medium leading-4",
                      decision === "approved"
                        ? "bg-success-soft text-success"
                        : "bg-bg-muted text-fg-muted",
                    )}
                  >
                    {decision === "approved" ? "Approved by you" : "Declined by you"}
                  </span>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => decide(item.id, "approved")}
                      className="rounded-md bg-fg px-2.5 py-1 text-[11.5px] font-medium text-bg transition-colors duration-150 hover:bg-fg/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => decide(item.id, "declined")}
                      className="rounded-md border border-border-strong px-2.5 py-1 text-[11.5px] font-medium text-fg transition-colors duration-150 hover:bg-bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                    >
                      Decline
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
