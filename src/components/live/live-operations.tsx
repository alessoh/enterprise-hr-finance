"use client";

import { useLiveEvents } from "@/lib/live/use-live-events";
import type { LiveSnapshot } from "@/lib/live/types";
import { cn } from "@/lib/utils";

import { LiveDot } from "./live-dot";
import { LiveFeed } from "./live-feed";
import { LiveMetricsRow } from "./live-metrics";

export interface LiveOperationsProps {
  snapshot: LiveSnapshot;
  variant?: "compact" | "full";
  className?: string;
}

export function LiveOperations({ snapshot, variant = "compact", className }: LiveOperationsProps) {
  const { events, metrics, status } = useLiveEvents(snapshot);
  const compact = variant === "compact";

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="border-b border-border px-4 py-3">
        <LiveMetricsRow metrics={metrics} count={compact ? 4 : 6} />
      </div>
      <div className="flex items-center justify-between border-b border-border bg-bg-subtle px-4 py-2">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
          Operations feed <span className="normal-case tracking-normal">· times in UTC</span>
        </span>
        <LiveDot status={status} />
      </div>
      <LiveFeed events={events} limit={compact ? 8 : 20} />
    </div>
  );
}
