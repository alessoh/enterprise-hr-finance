import { cn } from "@/lib/utils";
import type { AgentActivity } from "@/lib/live/types";

/** Capacity in use per agent. Inline SVG so it stays crisp and costs no client JS. */
export function UtilizationBars({ agents, className }: { agents: AgentActivity[]; className?: string }) {
  const rows = [...agents].sort((a, b) => b.utilization - a.utilization).slice(0, 8);
  const rowHeight = 22;
  const labelWidth = 132;
  const height = rows.length * rowHeight;

  return (
    <section className={cn("p-4", className)} aria-labelledby="utilization-heading">
      <h2
        id="utilization-heading"
        className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle"
      >
        Capacity in use
      </h2>
      <svg
        className="mt-3 w-full"
        viewBox={`0 0 320 ${height}`}
        height={height}
        role="img"
        aria-label="Share of configured capacity in use, by agent"
      >
        {rows.map((agent, index) => {
          const y = index * rowHeight;
          const width = Math.round(agent.utilization * (320 - labelWidth - 34));
          return (
            <g key={agent.slug}>
              <text
                x={0}
                y={y + 13}
                className="fill-fg-muted"
                style={{ fontSize: 11.5 }}
              >
                {agent.shortName}
              </text>
              <rect
                x={labelWidth}
                y={y + 5}
                width={320 - labelWidth - 34}
                height={6}
                rx={3}
                className="fill-bg-muted"
              />
              <rect x={labelWidth} y={y + 5} width={width} height={6} rx={3} className="fill-accent" />
              <text
                x={320}
                y={y + 13}
                textAnchor="end"
                className="fill-fg-subtle tabular"
                style={{ fontSize: 11 }}
              >
                {Math.round(agent.utilization * 100)}%
              </text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
