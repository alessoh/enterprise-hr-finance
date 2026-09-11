/** Deterministic status-page data. Pure in `now` so server and client agree. */
import type { LiveComponent, LiveIncident, LiveStatusPayload } from "./types";

const COMPONENTS: { name: string; uptime90d: number; p50: number; p95: number }[] = [
  { name: "Assist", uptime90d: 99.99, p50: 240, p95: 810 },
  { name: "Agents runtime", uptime90d: 99.98, p50: 310, p95: 940 },
  { name: "Registry", uptime90d: 99.995, p50: 90, p95: 260 },
  { name: "Gateway", uptime90d: 99.97, p50: 120, p95: 380 },
  { name: "Data Fabric", uptime90d: 99.98, p50: 180, p95: 620 },
  { name: "Public API", uptime90d: 99.99, p50: 70, p95: 210 },
  { name: "Dashboard", uptime90d: 99.99, p50: 110, p95: 300 },
];

/** Days with a dip, keyed by component name and day index (0 = 90 days ago). */
const DIPS: Record<string, Record<number, number>> = {
  "Agents runtime": { 41: 99.2 },
  Gateway: { 62: 98.6, 63: 99.85 },
  "Data Fabric": { 12: 99.75 },
};

function daysFor(name: string): number[] {
  const dips = DIPS[name] ?? {};
  return Array.from({ length: 90 }, (_, i) => dips[i] ?? 100);
}

export const INCIDENTS: LiveIncident[] = [
  {
    id: "inc-2026-07-11",
    date: "2026-07-11",
    title: "Elevated latency on Gateway tool calls",
    impact: "degraded",
    status: "resolved",
    components: ["Gateway"],
    durationMinutes: 74,
    summary:
      "A connection-pool change increased p95 latency for third-party tool calls routed through the Gateway. Agent runs completed but took longer to acknowledge. The change was rolled back and pool sizing is now covered by a load test in the release gate.",
  },
  {
    id: "inc-2026-06-20",
    date: "2026-06-20",
    title: "Delayed Data Fabric sync for one warehouse region",
    impact: "degraded",
    status: "resolved",
    components: ["Data Fabric"],
    durationMinutes: 38,
    summary:
      "Zero-copy reads against one warehouse region returned stale partitions for 38 minutes after an upstream maintenance window. Affected agent runs were re-queued automatically once freshness checks passed.",
  },
  {
    id: "inc-2026-05-02",
    date: "2026-05-02",
    title: "Agents runtime restarts in one availability zone",
    impact: "outage",
    status: "resolved",
    components: ["Agents runtime"],
    durationMinutes: 22,
    summary:
      "A bad node image caused repeated restarts in a single availability zone. Runs were retried in healthy zones; no work was lost and no approvals were auto-decided. Node images are now canaried before fleet rollout.",
  },
];

export function getStatusPayload(now: number): LiveStatusPayload {
  const components: LiveComponent[] = COMPONENTS.map((component) => ({
    name: component.name,
    status: "operational",
    uptime90d: component.uptime90d,
    latency: { p50: component.p50, p95: component.p95 },
    days: daysFor(component.name),
  }));

  const p50 = Math.round(components.reduce((sum, c) => sum + c.latency.p50, 0) / components.length);
  const p95 = Math.round(components.reduce((sum, c) => sum + c.latency.p95, 0) / components.length);

  return {
    overall: "operational",
    components,
    incidents: INCIDENTS,
    latency: { p50, p95 },
    asOf: new Date(now).toISOString(),
  };
}

/** Server-only: reads the clock and returns the current status payload. */
export function getStatusPayloadNow(): LiveStatusPayload {
  return getStatusPayload(Date.now());
}
