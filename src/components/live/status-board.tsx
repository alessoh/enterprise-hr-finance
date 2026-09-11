"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import type { ComponentStatus, LiveStatusPayload } from "@/lib/live/types";

import { LiveDot } from "./live-dot";
import { UptimeBars } from "./uptime-bars";

const TONE: Record<ComponentStatus, string> = {
  operational: "bg-success-soft text-success",
  degraded: "bg-warning-soft text-warning",
  outage: "bg-danger-soft text-danger",
};

const LABEL: Record<ComponentStatus, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
};

const REFRESH_MS = 30_000;

export function StatusBoard({ initial }: { initial: LiveStatusPayload }) {
  const [payload, setPayload] = useState(initial);

  useEffect(() => {
    let disposed = false;
    const load = async () => {
      try {
        const response = await fetch("/api/live/status", { cache: "no-store" });
        if (!response.ok || disposed) return;
        const next = (await response.json()) as LiveStatusPayload;
        if (!disposed) setPayload(next);
      } catch {
        // Keep the last good payload; the next tick retries.
      }
    };
    const timer = setInterval(() => void load(), REFRESH_MS);
    return () => {
      disposed = true;
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-subtle px-4 py-2.5">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
          Components
        </h2>
        <div className="flex items-center gap-4 text-[11.5px] text-fg-subtle">
          <span className="tabular">p50 {payload.latency.p50} ms</span>
          <span className="tabular">p95 {payload.latency.p95} ms</span>
          <LiveDot label="Refreshed every 30s" />
        </div>
      </div>
      <ul className="divide-y divide-border">
        {payload.components.map((component) => (
          <li key={component.name} className="grid gap-2 px-4 py-3 sm:grid-cols-[1fr_2fr_auto] sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-fg">{component.name}</span>
              <span
                className={cn(
                  "rounded-sm px-1.5 py-0.5 text-[11px] font-medium leading-4",
                  TONE[component.status],
                )}
              >
                {LABEL[component.status]}
              </span>
            </div>
            <UptimeBars days={component.days} label={component.name} />
            <span className="tabular text-right text-[12px] text-fg-muted">
              {/* Floor, never round: 99.995% must not read as a perfect 100.00%. */}
              {(Math.floor(component.uptime90d * 100) / 100).toFixed(2)}%
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-border px-4 py-2 text-[11px] text-fg-subtle">
        Each bar is one day, oldest on the left. Uptime is measured over the trailing 90 days.
      </p>
    </div>
  );
}
