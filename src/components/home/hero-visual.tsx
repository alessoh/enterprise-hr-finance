"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { HeroMeridian } from "@/components/three/hero-meridian";
import type { AgentEvent, ApprovalDecision } from "@/lib/live/types";
import { cn, formatCurrency } from "@/lib/utils";

/** At most one card change per this many ms, however often nodes cross. */
const MIN_SWAP_MS = 2600;
/** How long the decision stays on screen before the next agent's work arrives. */
const DECISION_HOLD_MS = 1900;

export interface HeroVisualProps {
  /** Approval-worthy events, computed on the server so the first paint is stable. */
  events: AgentEvent[];
  className?: string;
}

/**
 * The hero object and the readout it drives.
 *
 * The globe is not decoration: each of the twelve agent nodes travels its own latitude,
 * and when one passes the governed meridian the card beneath shows what that agent just
 * did and what a person still has to decide. Work crosses the line and is checked.
 */
export function HeroVisual({ events, className }: HeroVisualProps) {
  const [index, setIndex] = useState(0);
  const [decision, setDecision] = useState<ApprovalDecision | null>(null);
  const lastSwap = useRef(0);
  /** While a decision is on screen the card holds, so the reader sees their own action. */
  const holdUntil = useRef(0);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCross = useCallback(() => {
    const now = performance.now();
    if (now < holdUntil.current) return;
    if (now - lastSwap.current < MIN_SWAP_MS) return;
    lastSwap.current = now;
    setIndex((i) => (i + 1) % events.length);
  }, [events.length]);

  const decide = useCallback(
    (next: ApprovalDecision) => {
      setDecision(next);
      holdUntil.current = performance.now() + DECISION_HOLD_MS;
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
      releaseTimer.current = setTimeout(() => {
        lastSwap.current = performance.now();
        setDecision(null);
        setIndex((i) => (i + 1) % events.length);
      }, DECISION_HOLD_MS);
    },
    [events.length],
  );

  useEffect(
    () => () => {
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    },
    [],
  );

  const event = events[index] ?? events[0];

  return (
    <div className={cn("mx-auto flex w-full flex-col items-center", className)}>
      <HeroMeridian className="w-full" onCross={onCross} />
      <div className="-mt-10 w-full max-w-[21rem] lg:-mt-14">
        <figure className="w-full rounded-xl bg-bg-elevated p-4 shadow-lg ring-1 ring-border">
          <figcaption className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
              At the Gateway
            </span>
            <span
              className={cn(
                "rounded-sm px-1.5 py-0.5 text-[11px] font-medium leading-4",
                decision ? "bg-bg-muted text-fg-muted" : "bg-warning-soft text-warning",
              )}
            >
              {decision ? "Resolved" : "Needs approval"}
            </span>
          </figcaption>

          {/* aria-live is deliberately off: this is illustrative, and announcing a
              rotating sample on the marketing page would be noise for a screen reader. */}
          <div className="mt-3 min-h-[3.25rem]">
            <p className="text-[13px] leading-5 font-medium text-fg">{event.title}</p>
            <p className="mt-1 text-[12px] leading-5 text-fg-muted">
              {event.detail}
              {event.amount !== undefined ? (
                <span className="tabular"> · {formatCurrency(event.amount)}</span>
              ) : null}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
            <span className="text-[11.5px] text-fg-subtle">
              {event.agentName.replace(" Agent", "")} · {event.customer}
            </span>
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
              <span className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => decide("approved")}
                  className="rounded-md bg-fg px-2 py-1 text-[11.5px] font-medium text-bg transition-colors duration-150 hover:bg-fg/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => decide("declined")}
                  className="rounded-md border border-border-strong px-2 py-1 text-[11.5px] font-medium text-fg transition-colors duration-150 hover:bg-bg-subtle focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                >
                  Decline
                </button>
              </span>
            )}
          </div>
        </figure>
      </div>
    </div>
  );
}
