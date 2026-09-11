import type { Metadata } from "next";
import Link from "next/link";

import { AgentCard, toAgentCardData } from "@/components/agents/agent-card";
import { ContractStrip } from "@/components/agents/agent-contract";
import { AgentFaq } from "@/components/agents/agent-faq";
import { AgentsCta } from "@/components/agents/agents-cta";
import { CatalogFilter } from "@/components/agents/catalog-filter";
import { hideForCategory, hideForStatus, hideWhenEmpty } from "@/components/agents/catalog-visibility";
import { CreditsTable } from "@/components/agents/credits-table";
import { Steps } from "@/components/agents/steps";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { Section, SectionHeader } from "@/components/ui/section";
import { agentCategories, agents, modeledOutcomeFootnote } from "@/content/agents";
import { homeFaqs } from "@/content/faqs";
import { homeCopy } from "@/content/home";
import { creditRates, overagePerCredit, plans } from "@/content/pricing";
import type { AgentCategory } from "@/content/types";
import { keyFacts } from "@/lib/seo/facts";
import { agentCatalogJsonLd, breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { agentPath } from "@/lib/seo/routes";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

const PATH = "/agents";
const TITLE = "AI agents for HR, finance, and legal";
const DESCRIPTION =
  "Twelve governed AI agents for HR, finance, and legal operations. Each is scoped to one workflow, logs every action, and reports a measurable outcome.";

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "AI agents for HR",
    "AI agents for finance",
    "HR AI agent catalog",
    "payroll AI agent",
    "audit AI agent",
    "recruiting AI agent",
  ],
});

/** Sentence-case group headings and short control labels per category. */
const categoryCopy: Record<AgentCategory, { heading: string; label: string }> = {
  hr: { heading: "HR agents", label: "HR" },
  finance: { heading: "Finance agents", label: "Finance" },
  legal: { heading: "Legal and operations agents", label: "Legal & Ops" },
};

const groups = [...agentCategories]
  .sort((a, b) => a.order - b.order)
  .map((category) => ({ category, agents: agents.filter((agent) => agent.category === category.id) }));

/** Five home FAQs that answer catalog-level questions, in buyer order. */
const FAQ_QUESTIONS = [
  "What is an AI agent for HR and finance?",
  "How is Meridian different from a chatbot or copilot?",
  "How do human approvals work?",
  "Which AI models does Meridian use?",
  "How long does deployment take?",
];
const faqs = FAQ_QUESTIONS.flatMap((q) => {
  const faq = homeFaqs.find((item) => item.question === q);
  return faq ? [faq] : [];
});

export default function AgentsPage() {
  const gaCount = agents.filter((agent) => agent.status === "ga").length;
  const earlyCount = agents.length - gaCount;
  const catalogFact = keyFacts.find((fact) => fact.path === PATH)?.fact;
  const creditValues = creditRates.map((rate) => rate.credits);
  const minCredits = Math.min(...creditValues);
  const maxCredits = Math.max(...creditValues);
  const starter = plans.find((plan) => plan.id === "starter");
  const growth = plans.find((plan) => plan.id === "growth");
  const agentBySlug = new Map(agents.map((agent) => [agent.slug, agent]));

  const glance: { term: string; detail: string }[] = [
    {
      term: "Agents",
      detail: `${agents.length}: ${groups.map((g) => `${g.agents.length} ${categoryCopy[g.category.id].label}`).join(", ")}`,
    },
    { term: "Status", detail: `${gaCount} generally available, ${earlyCount} in early access` },
    { term: "Credits", detail: `${minCredits} to ${maxCredits} per completed action` },
    { term: "Approvals", detail: "A named person, on every consequential action" },
    { term: "Models", detail: "Your choice of provider and region, per workspace" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Agents", path: PATH },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: PATH }),
          agentCatalogJsonLd(agents),
          faqJsonLd(faqs),
        ]}
      />

      {/* 1. Header */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-20" aria-labelledby="agents-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Agents" }]} />
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Eyebrow>Agents</Eyebrow>
              <h1 id="agents-title" className="text-h1 mt-5 text-balance">
                One agent per workflow. Twelve workflows.
              </h1>
              <p className="text-lede mt-6 max-w-[60ch] text-pretty">
                {catalogFact ??
                  `Meridian ships ${agents.length} governed AI agents across HR, finance, and legal operations.`}{" "}
                Each is scoped to one workflow, reads only the data it is permitted to, logs every action, and
                reports a measurable outcome.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={homeCopy.hero.primaryCta.href}>{homeCopy.hero.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" arrow>
                  <Link href={homeCopy.hero.secondaryCta.href}>{homeCopy.hero.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pt-2">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-4 border-t border-border">
                {glance.map((row) => (
                  <div
                    key={row.term}
                    className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-border py-3 text-sm"
                  >
                    <dt className="text-fg-muted">{row.term}</dt>
                    <dd className="tabular text-fg">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <ContractStrip className="mt-16 lg:mt-20" />
        </Container>
      </Section>

      {/* 2. Catalog */}
      <Section spacing="none" className="pb-24 lg:pb-32" aria-label="Agent catalog">
        <Container>
          <CatalogFilter
            items={agents.map((agent) => ({ category: agent.category, status: agent.status }))}
            categories={groups.map((g) => ({
              id: g.category.id,
              label: categoryCopy[g.category.id].label,
              name: g.category.name,
            }))}
          >
            <div className="space-y-16 pt-12 lg:space-y-20 lg:pt-14">
              {groups.map(({ category, agents: list }) => {
                const ga = list.filter((agent) => agent.status === "ga").length;
                return (
                  <section
                    key={category.id}
                    id={category.id}
                    aria-labelledby={`${category.id}-title`}
                    className={cn("scroll-mt-24", hideForCategory[category.id], hideWhenEmpty[category.id])}
                  >
                    <div className="flex flex-col gap-3 border-b border-border pb-5 md:flex-row md:items-end md:justify-between md:gap-8">
                      <div className="max-w-2xl">
                        <h2 id={`${category.id}-title`} className="text-h3 text-balance">
                          {categoryCopy[category.id].heading}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-fg-muted text-pretty">
                          {category.description}
                        </p>
                      </div>
                      <p className="tabular shrink-0 font-mono text-xs text-fg-subtle">
                        {list.length} {list.length === 1 ? "agent" : "agents"} · {ga} GA
                      </p>
                    </div>
                    <ul role="list" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {list.map((agent) => (
                        <li
                          key={agent.slug}
                          className={cn("min-w-0", hideForCategory[agent.category], hideForStatus[agent.status])}
                        >
                          <AgentCard agent={toAgentCardData(agent)} footnote={1} headingLevel="h3" />
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </CatalogFilter>
          <Footnotes className="mt-14 border-t border-border pt-6 lg:mt-16" items={[modeledOutcomeFootnote]} />
        </Container>
      </Section>

      {/* 3. How agents run */}
      <Section background="subtle" bordered="both" aria-labelledby="run-title">
        <Container>
          <SectionHeader
            eyebrow="Deployment"
            title={<span id="run-title">How agents run</span>}
            lede={homeCopy.sections.howItWorks.lede}
            actions={<ArrowLink href="/platform">The platform under the agents</ArrowLink>}
          />
          <Steps steps={homeCopy.sections.howItWorks.steps} columns={4} />
        </Container>
      </Section>

      {/* 4. Credits */}
      <Section aria-labelledby="credits-title">
        <Container>
          <SectionHeader
            eyebrow="Credits"
            title={<span id="credits-title">What each completed action costs</span>}
            lede={
              <>
                Agents consume credits only when they finish a unit of work.{" "}
                {starter && growth && starter.credits && growth.credits
                  ? `${starter.name} includes ${formatNumber(starter.credits)} credits per month and ${growth.name} includes ${formatNumber(growth.credits)}. `
                  : null}
                Usage beyond the plan is billed at {formatCurrency(overagePerCredit, { cents: true })} per credit.
              </>
            }
            actions={<ArrowLink href="/pricing">Plans and the credits calculator</ArrowLink>}
          />
          <CreditsTable
            ariaLabel="Credit rates by action"
            rows={creditRates.map((rate) => {
              const agent = agentBySlug.get(rate.agentSlug);
              return {
                action: rate.action,
                credits: rate.credits,
                unit: rate.unit,
                agent: agent ? { name: agent.name, href: agentPath(agent.slug) } : undefined,
              };
            })}
            caption="Rate card as of September 2026. Each agent page lists its full set of metered actions."
          />
        </Container>
      </Section>

      {/* 5. FAQ */}
      <Section bordered="top" aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Questions"
                title={<span id="faq-title">What buyers ask about agents</span>}
                lede="Straight answers on what an agent is, how approvals work, which models run, and how long deployment takes."
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-8">
              <AgentFaq faqs={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. CTA */}
      <AgentsCta />
    </>
  );
}
