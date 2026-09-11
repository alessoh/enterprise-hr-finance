import Link from "next/link";

import { ArrowLink } from "@/components/ui/arrow-link";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { FootnoteRef, Footnotes } from "@/components/ui/footnote";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { agentCategories, agents, modeledOutcomeFootnote } from "@/content/agents";
import { homeCopy } from "@/content/home";
import type { Agent } from "@/content/types";
import { agentPath } from "@/lib/seo/routes";

const groups = [...agentCategories]
  .sort((a, b) => a.order - b.order)
  .map((category) => ({
    category,
    agents: agents.filter((agent) => agent.category === category.id),
  }));

function AgentCard({ agent }: { agent: Agent }) {
  const metric = agent.headlineMetric;
  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <h4 className="text-h5 text-fg">
          <Link
            href={agentPath(agent.slug)}
            className="rounded-sm outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ring"
          >
            {agent.name}
          </Link>
        </h4>
        <StatusBadge status={agent.status} size="sm" className="relative mt-0.5" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{agent.tagline}</p>
      <div className="mt-auto pt-6">
        <p className="border-t border-border pt-4 text-sm leading-snug">
          <span className="tabular font-medium text-fg">{metric.value}</span>
          {metric.footnote ? <FootnoteRef n={1} scope="agents" className="relative" /> : null}{" "}
          <span className="text-fg-muted">{metric.label}</span>
        </p>
      </div>
    </Card>
  );
}

export function AgentsCatalog() {
  const copy = homeCopy.sections.agents;
  return (
    <Section aria-labelledby="agents-heading" id="agents">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={<span id="agents-heading">{copy.title}</span>}
            lede={copy.lede}
          />
        </Reveal>
        <div className="space-y-16 lg:space-y-20">
          {groups.map(({ category, agents: list }) => {
            const ga = list.filter((agent) => agent.status === "ga").length;
            return (
              <div key={category.id} id={`agents-${category.id}`} className="grid gap-8 lg:grid-cols-12">
                <Reveal className="lg:col-span-3">
                  <h3 className="text-h4 text-fg">{category.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted lg:max-w-[26ch]">{category.description}</p>
                  <p className="tabular mt-4 font-mono text-xs text-fg-subtle">
                    {list.length} {list.length === 1 ? "agent" : "agents"} · {ga} GA
                  </p>
                </Reveal>
                <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                  {list.map((agent) => (
                    <RevealItem key={agent.slug} className="h-full">
                      <AgentCard agent={agent} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            );
          })}
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-baseline sm:justify-between lg:mt-16">
          <Footnotes scope="agents" items={[modeledOutcomeFootnote]} />
          <ArrowLink href="/agents" className="shrink-0">
            See all agents
          </ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
