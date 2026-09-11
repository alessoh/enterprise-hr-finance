import Link from "next/link";

import { cn, formatNumber } from "@/lib/utils";
import type { AgentActivity } from "@/lib/live/types";

const STATE_TONE: Record<AgentActivity["state"], string> = {
  running: "bg-success",
  idle: "bg-fg-faint",
  attention: "bg-warning",
};

const STATE_LABEL: Record<AgentActivity["state"], string> = {
  running: "Running",
  idle: "Idle",
  attention: "Needs attention",
};

const GROUPS: { key: AgentActivity["category"]; label: string }[] = [
  { key: "hr", label: "HR" },
  { key: "finance", label: "Finance" },
  { key: "legal", label: "Legal & ops" },
];

export function AgentRail({ agents, className }: { agents: AgentActivity[]; className?: string }) {
  return (
    <nav className={cn("text-[12.5px]", className)} aria-label="Agents in this workspace">
      {GROUPS.map((group) => {
        const rows = agents.filter((agent) => agent.category === group.key);
        if (rows.length === 0) return null;
        return (
          <div key={group.key} className="border-b border-border last:border-b-0">
            <h2 className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
              {group.label}
            </h2>
            <ul className="pb-2">
              {rows.map((agent) => (
                <li key={agent.slug}>
                  <Link
                    href={`/agents/${agent.slug}`}
                    className="flex items-center gap-2.5 px-4 py-1.5 transition-colors duration-150 hover:bg-bg-subtle focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-accent-ring"
                  >
                    <span
                      aria-hidden
                      className={cn("size-1.5 shrink-0 rounded-full", STATE_TONE[agent.state])}
                    />
                    <span className="min-w-0 flex-1 truncate text-fg">{agent.shortName}</span>
                    <span className="tabular shrink-0 text-[11.5px] text-fg-subtle">
                      {formatNumber(agent.today)}
                    </span>
                    <span className="sr-only">{STATE_LABEL[agent.state]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
