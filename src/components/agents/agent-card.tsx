import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AgentIcon } from "@/components/agents/agent-icon";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Agent, AgentCategory, AgentStatus } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * The subset of an Agent a card needs. Serializable, so the client-side catalog
 * filter can receive it as a prop without shipping long descriptions and FAQs.
 */
export interface AgentCardData {
  slug: string;
  name: string;
  tagline: string;
  category: AgentCategory;
  status: AgentStatus;
  icon: string;
  metricValue: string;
  metricLabel: string;
  /** True when the headline metric is a modeled outcome and needs the footnote marker. */
  metricFootnoted: boolean;
}

export function toAgentCardData(agent: Agent): AgentCardData {
  return {
    slug: agent.slug,
    name: agent.name,
    tagline: agent.tagline,
    category: agent.category,
    status: agent.status,
    icon: agent.icon,
    metricValue: agent.headlineMetric.value,
    metricLabel: agent.headlineMetric.label,
    metricFootnoted: Boolean(agent.headlineMetric.footnote),
  };
}

export interface AgentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  agent: AgentCardData;
  /** Footnote number the metric marker points at. Rendered as a non-link superscript (the card is already a link). */
  footnote?: number;
  headingLevel?: "h3" | "h4";
}

/**
 * Catalog card: icon, name, tagline, headline metric, status badge, arrow.
 * The whole card is the link (DESIGN.md §6). Hover raises the border and shifts the arrow 2px.
 */
export function AgentCard({ agent, footnote = 1, headingLevel = "h3", className, ...props }: AgentCardProps) {
  const Heading = headingLevel;
  return (
    <div
      data-agent={agent.slug}
      data-category={agent.category}
      data-status={agent.status}
      className={cn("group/card h-full", className)}
      {...props}
    >
      <Link
        href={`/agents/${agent.slug}`}
        aria-label={`${agent.name}: ${agent.tagline}`}
        className="block h-full rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
      >
        <Card as="article" interactive padding="md" className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3">
            <AgentIcon name={agent.icon} className="size-5 text-fg-muted transition-colors duration-150 ease-standard group-hover/card:text-fg" />
            <StatusBadge status={agent.status} />
          </div>
          <Heading className="mt-5 text-h5 text-fg">{agent.name}</Heading>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{agent.tagline}</p>
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <p className="min-w-0 text-[0.8125rem] leading-snug">
              <span className="tabular font-medium text-fg">{agent.metricValue}</span>
              {agent.metricFootnoted ? (
                <sup className="ml-0.5 align-super text-[0.6875rem] leading-none font-medium text-accent">
                  {footnote}
                  <span className="sr-only"> (modeled outcome)</span>
                </sup>
              ) : null}{" "}
              <span className="text-fg-muted">{agent.metricLabel}</span>
            </p>
            <ArrowRight
              aria-hidden
              className="mb-0.5 size-4 shrink-0 text-fg-subtle transition-[transform,color] duration-200 ease-out-quart group-hover/card:translate-x-0.5 group-hover/card:text-fg"
            />
          </div>
        </Card>
      </Link>
    </div>
  );
}
