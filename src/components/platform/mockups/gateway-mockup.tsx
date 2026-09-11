import { Check, Clock, Pause } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WindowFrame } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils";

type Protocol = "MCP" | "A2A";

interface Connection {
  name: string;
  source: string;
  protocol: Protocol;
  verified: boolean;
  policy: string;
  trace: number[];
  p95: string;
  calls: string;
}

const connections: Connection[] = [
  { name: "Planning Agent", source: "Meridian", protocol: "MCP", verified: true, policy: "v41", trace: [6, 8, 7, 9, 12, 10, 9, 11, 14, 12, 13, 12], p95: "212 ms", calls: "6,418" },
  { name: "Contract Review Agent", source: "Meridian", protocol: "MCP", verified: true, policy: "v41", trace: [4, 5, 5, 6, 5, 7, 8, 7, 6, 8, 9, 8], p95: "388 ms", calls: "1,204" },
  { name: "Expense Auditor", source: "Partner", protocol: "A2A", verified: true, policy: "v40", trace: [9, 10, 8, 11, 12, 11, 13, 12, 14, 13, 15, 14], p95: "298 ms", calls: "3,377" },
  { name: "Vendor Risk Check", source: "Studio", protocol: "MCP", verified: true, policy: "v41", trace: [3, 4, 6, 5, 7, 6, 5, 6, 7, 6, 8, 7], p95: "154 ms", calls: "902" },
  { name: "Treasury Forecast", source: "Custom · Python", protocol: "A2A", verified: true, policy: "v41", trace: [2, 3, 2, 4, 3, 5, 4, 6, 5, 6, 7, 6], p95: "431 ms", calls: "245" },
  { name: "Ticket Triage", source: "Partner", protocol: "MCP", verified: false, policy: "—", trace: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], p95: "—", calls: "0" },
];

function Sparkline({ points, muted }: { points: number[]; muted?: boolean }) {
  const w = 72;
  const h = 20;
  const max = Math.max(...points, 1);
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => `${(i * step).toFixed(1)},${(h - 2 - (p / max) * (h - 4)).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden className="block overflow-visible">
      <polyline
        points={d}
        fill="none"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={muted ? "stroke-border-strong" : "stroke-accent"}
      />
    </svg>
  );
}

const th = "h-9 whitespace-nowrap bg-bg-subtle px-4 text-left text-xs font-medium tracking-[0.06em] text-fg-muted uppercase";
const td = "px-4 py-2.5 align-middle whitespace-nowrap";

const summary = [
  ["Connected agents", "17"],
  ["Calls today", "48,211"],
  ["Holds pending", "3"],
  ["Denied by policy", "12"],
];

export function GatewayMockup({ className }: { className?: string }) {
  return (
    <WindowFrame
      url="app.meridian.example/gateway"
      actions={
        <Badge variant="neutral" dot="success">
          Policy v41
        </Badge>
      }
      className={className}
      aria-label="Gateway: connected agents with protocol, identity verification, and OpenTelemetry traces"
    >
      <div className="@container">
        <dl className="tabular grid grid-cols-2 divide-x divide-border border-b border-border @lg:grid-cols-4">
          {summary.map(([label, value], index) => (
            <div key={label} className={cn("px-4 py-3", index > 1 && "hidden @lg:block")}>
              <dt className="text-xs text-fg-subtle">{label}</dt>
              <dd className="mt-0.5 text-lg leading-none font-medium text-fg">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="overflow-hidden">
          <table className="w-full border-collapse text-[0.8125rem]">
            <thead>
              <tr>
                <th scope="col" className={th}>Agent</th>
                <th scope="col" className={th}>Protocol</th>
                <th scope="col" className={cn(th, "hidden @sm:table-cell")}>Identity</th>
                <th scope="col" className={cn(th, "hidden @2xl:table-cell")}>Policy</th>
                <th scope="col" className={cn(th, "hidden @md:table-cell")}>Trace · 12 h</th>
                <th scope="col" className={cn(th, "hidden text-right @xl:table-cell")}>p95</th>
                <th scope="col" className={cn(th, "hidden text-right @lg:table-cell")}>Calls</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((c) => (
                <tr key={c.name} className="border-b border-border last:border-0">
                  <td className={cn(td, "text-fg")}>
                    <span className="block font-medium">{c.name}</span>
                    <span className="block text-xs text-fg-subtle">{c.source}</span>
                  </td>
                  <td className={td}>
                    <span className="inline-flex h-[22px] items-center rounded-full border border-border px-2 font-mono text-xs text-fg-muted">
                      {c.protocol}
                    </span>
                  </td>
                  <td className={cn(td, "hidden @sm:table-cell")}>
                    {c.verified ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                        <Check aria-hidden className="size-3.5 text-success" />
                        Verified · OIDC
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-warning">
                        <Clock aria-hidden className="size-3.5" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className={cn(td, "hidden font-mono text-xs text-fg-muted @2xl:table-cell")}>{c.policy}</td>
                  <td className={cn(td, "hidden @md:table-cell")}>
                    <Sparkline points={c.trace} muted={!c.verified} />
                  </td>
                  <td className={cn(td, "tabular hidden text-right text-fg-muted @xl:table-cell")}>{c.p95}</td>
                  <td className={cn(td, "tabular hidden text-right text-fg @lg:table-cell")}>{c.calls}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-border bg-bg-subtle px-4 py-2.5 text-xs">
          <span className="inline-flex items-center gap-1.5 font-medium text-fg">
            <Pause aria-hidden className="size-3.5 text-warning" />
            Held for approval
          </span>
          <span className="text-fg-muted">
            Controls Agent → <code className="font-mono text-fg">ap.release_payment</code>
          </span>
          <span className="tabular text-fg">$48,211.90 · INV-2291</span>
          <span className="text-fg-subtle">awaiting S. Bhatt · rule AP-14 · policy v41</span>
        </div>
      </div>
    </WindowFrame>
  );
}
