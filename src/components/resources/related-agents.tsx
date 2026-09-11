import { AgentCard, toAgentCardData } from "@/components/agents/agent-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Footnotes } from "@/components/ui/footnote";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { agents, getAgent } from "@/content/agents";
import type { Agent } from "@/content/types";
import { cn } from "@/lib/utils";

export interface RelatedAgentsProps {
  slugs: string[];
  id?: string;
  eyebrow?: string;
  title: string;
  lede?: string;
  /** Cards shown. 3-up on lg; never more than one row. */
  limit?: number;
}

/** Agent cards for the entities a guide or term is about, with the modeled-outcome footnote the cards require. */
export function RelatedAgents({
  slugs,
  id = "related-agents",
  eyebrow = "Related agents",
  title,
  lede,
  limit = 3,
}: RelatedAgentsProps) {
  const list = slugs.map((slug) => getAgent(slug)).filter((a): a is Agent => Boolean(a)).slice(0, limit);
  if (list.length === 0) return null;

  return (
    <Section background="subtle" bordered="top" aria-labelledby={`${id}-title`}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={<span id={`${id}-title`}>{title}</span>}
          lede={lede}
          actions={<ArrowLink href="/agents">All {agents.length} agents</ArrowLink>}
        />
        <RevealGroup
          className={cn(
            "grid gap-6",
            list.length === 1 && "md:max-w-md",
            list.length === 2 && "md:grid-cols-2",
            list.length >= 3 && "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {list.map((agent) => (
            <RevealItem key={agent.slug} className="min-w-0">
              <AgentCard agent={toAgentCardData(agent)} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Footnotes className="mt-10" />
      </Container>
    </Section>
  );
}
