"use client";

import { useEffect, useRef, useState } from "react";

import { cn, formatNumber } from "@/lib/utils";
import type { LiveMetrics } from "@/lib/live/types";

interface Tile {
  key: keyof LiveMetrics;
  label: string;
  format: (value: number) => string;
}

const TILES: Tile[] = [
  { key: "casesResolvedToday", label: "Cases resolved today", format: (v) => formatNumber(Math.round(v)) },
  { key: "hoursSavedToday", label: "Hours saved today", format: (v) => v.toFixed(1) },
  { key: "creditsUsedToday", label: "Credits used today", format: (v) => formatNumber(Math.round(v)) },
  { key: "approvalsPending", label: "Approvals pending", format: (v) => formatNumber(Math.round(v)) },
  { key: "activeAgents", label: "Agents running", format: (v) => formatNumber(Math.round(v)) },
  { key: "p95LatencyMs", label: "p95 latency", format: (v) => `${formatNumber(Math.round(v))} ms` },
];

/** Eases a number toward its new value so updates read as movement, not a jump. */
function useTween(target: number, duration = 700): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || fromRef.current === target) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) frameRef.current = requestAnimationFrame(step);
      else fromRef.current = target;
    };
    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      fromRef.current = target;
    };
  }, [target, duration]);

  return value;
}

function MetricTile({ tile, value }: { tile: Tile; value: number }) {
  const tweened = useTween(value);
  return (
    <div className="px-4 py-3 first:pl-0 last:pr-0">
      <div className="tabular text-xl font-medium tracking-[-0.02em] text-fg">{tile.format(tweened)}</div>
      <div className="mt-1 text-[11px] leading-tight text-fg-subtle">{tile.label}</div>
    </div>
  );
}

export interface LiveMetricsRowProps {
  metrics: LiveMetrics;
  /** How many tiles to show, from the start of the list. */
  count?: number;
  className?: string;
}

export function LiveMetricsRow({ metrics, count = 4, className }: LiveMetricsRowProps) {
  const tiles = TILES.slice(0, count);
  return (
    <div
      className={cn(
        "grid grid-cols-2 divide-x divide-y divide-border sm:divide-y-0",
        count >= 6 ? "sm:grid-cols-3 lg:grid-cols-6" : "sm:grid-cols-4",
        className,
      )}
    >
      {tiles.map((tile) => (
        <MetricTile key={tile.key} tile={tile} value={metrics[tile.key] as number} />
      ))}
    </div>
  );
}
