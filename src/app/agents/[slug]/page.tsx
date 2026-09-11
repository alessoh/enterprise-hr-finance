import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AgentCard, toAgentCardData } from "@/components/agents/agent-card";
import { ContractChecklist } from "@/components/agents/agent-contract";
import { AgentFaq } from "@/components/agents/agent-faq";
import { AgentMockup } from "@/components/agents/agent-mockup";
import { AgentsCta } from "@/components/agents/agents-cta";
import { CreditsTable } from "@/components/agents/credits-table";
import { Steps } from "@/components/agents/steps";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ArrowLink } from "@/components/ui/arrow-link";
import { StatusBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { Section, SectionHeader } from "@/components/ui/section";
import { Stat, StatGrid } from "@/components/ui/stat";
import { agents, getAgent, getRelatedAgents, modeledOutcomeFootnote } from "@/content/agents";
import { getCustomersForAgent } from "@/content/customers";
import { getGlossaryTermsForAgent } from "@/content/glossary";
import { homeCopy } from "@/content/home";
import { overagePerCredit, plans } from "@/content/pricing";
import { getTestimonialsForAgent } from "@/content/testimonials";
import type { Agent, AgentCategory, Metric } from "@/content/types";
import { breadcrumbJsonLd, faqJsonLd, howToJsonLd, productJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { agentPath, customerPath, glossaryPath } from "@/lib/seo/routes";
import { formatCurrency, formatNumber, initials } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) return {};
  return createMetadata({
    title: agent.seo.title,
    description: agent.seo.description,
    path: agentPath(agent.slug),
    keywords: agent.seo.keywords,
  });
}

const categoryEyebrow: Record<AgentCategory, string> = {
  hr: "HR agent",
  finance: "Finance agent",
  legal: "Legal and operations agent",
};

/** "{Entity} is {category} that {does what}." (research/geo-writing-guide.md rule 1). */
function definitionalLede(agent: Agent): string {
  const tagline = agent.tagline.trim().replace(/\.$/, "");
  return `The ${agent.name} is a governed AI agent that ${tagline.charAt(0).toLowerCase()}${tagline.slice(1)}.`;
}

/** Stat value: a count-up when the metric is numeric, the preformatted string otherwise. */
function statValue(metric: Metric): { value: React.ReactNode; unit?: string } {
  if (metric.numeric === undefined) return { value: metric.value };
  const suffix = metric.suffix ?? "";
  const unit = suffix.startsWith(" ") ? suffix.trim() : undefined;
  return {
    value: <AnimatedNumber value={metric.numeric} prefix={metric.prefix} suffix={unit ? "" : suffix} />,
    unit,
  };
}

function ScopeColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-h5 border-t border-fg pt-4 text-fg">{title}</h3>
      <ul role="list" className="mt-2">
        {items.map((item) => (
          <li key={item} className="border-b border-border py-3 text-sm leading-relaxed text-fg">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AgentPage({ params }: { params: Params }) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();

  const path = agentPath(agent.slug);
  const related = getRelatedAgents(agent.slug);
  const testimonial = getTestimonialsForAgent(agent.slug)[0];
  const customers = getCustomersForAgent(agent.slug);
  const terms = getGlossaryTermsForAgent(agent.slug).slice(0, 6);

  const headline = statValue(agent.headlineMetric);
  const outcomes = [agent.headlineMetric, ...agent.supportingMetrics];
  const columns = (outcomes.length >= 4 ? 4 : outcomes.length === 3 ? 3 : 2) as 2 | 3 | 4;

  const starter = plans.find((plan) => plan.id === "starter");
  const growth = plans.find((plan) => plan.id === "growth");
  const enterprise = plans.find((plan) => plan.id === "enterprise");
  const planSentence =
    agent.status === "ga"
      ? `Included on every plan${
          starter?.credits && growth?.credits
            ? `: ${starter.name} with ${formatNumber(starter.credits)} credits per month, ${growth.name} with ${formatNumber(growth.credits)}, and ${enterprise?.name ?? "Enterprise"} with custom pools`
            : ""
        }.`
      : `In early access, available on ${enterprise?.name ?? "Enterprise"} plans with custom credit pools.`;

  const quoteCustomer = testimonial ? customers.find((c) => c.name === testimonial.company) : undefined;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Agents", path: "/agents" },
            { name: agent.name, path },
          ]),
          webPageJsonLd({ name: agent.name, description: agent.seo.description, path }),
          productJsonLd(agent, plans),
          howToJsonLd({ name: `How the ${agent.name} works`, steps: agent.howItWorks, path }),
          faqJsonLd(agent.faqs),
        ]}
      />

      {/* 1. Header */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-20" aria-labelledby="agent-title">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Agents", href: "/agents" }, { label: agent.name }]}
          />
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow>{categoryEyebrow[agent.category]}</Eyebrow>
                <StatusBadge status={agent.status} />
              </div>
              <h1 id="agent-title" className="text-h1 mt-5 text-balance">
                {agent.name}
              </h1>
              <p className="text-lede mt-6 max-w-[60ch] text-pretty">{definitionalLede(agent)}</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href={homeCopy.hero.primaryCta.href}>{homeCopy.hero.primaryCta.label}</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" arrow>
                  <Link href={homeCopy.hero.secondaryCta.href}>{homeCopy.hero.secondaryCta.label}</Link>
                </Button>
              </div>
            </div>
            <aside className="lg:col-span-5" aria-label="Headline outcome">
              <div className="rounded-xl border border-border bg-bg-elevated p-7 lg:p-8">
                <p className="eyebrow">Headline outcome</p>
                <Stat
                  className="mt-6"
                  value={headline.value}
                  unit={headline.unit}
                  label={agent.headlineMetric.label}
                  footnote={agent.headlineMetric.footnote ? 1 : undefined}
                />
                <div className="mt-7 border-t border-border pt-6">
                  <p className="eyebrow">The job</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg text-pretty">{agent.jobToBeDone}</p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* 2. What it does + mockup */}
      <Section bordered="top" aria-labelledby="how-title">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="How it works"
                title={<span id="how-title">What the {agent.name} does</span>}
                lede={agent.description}
                className="mb-10 lg:mb-12"
              />
              <Steps steps={agent.howItWorks} columns={1} anchor />
            </div>
            <figure className="min-w-0 lg:col-span-8">
              <AgentMockup agent={agent} />
              <figcaption className="mt-4 text-[0.8125rem] text-fg-subtle">
                Illustrative product view. Sample data from a fictional design-partner workspace.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* 3. The agent contract */}
      <Section background="subtle" bordered="both" aria-labelledby="contract-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="The agent contract"
                title={<span id="contract-title">Six terms, applied to this agent</span>}
                lede={`Every Meridian agent runs under the same six terms, enforced at the Gateway below the agent. Here is what each one means for the ${agent.name}.`}
                className="mb-6"
              />
              <ArrowLink href="/security">How the terms are enforced</ArrowLink>
            </div>
            <div className="lg:col-span-8">
              <ContractChecklist slug={agent.slug} className="border-b border-border" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. Data / actions / approvals */}
      <Section aria-labelledby="scope-title">
        <Container>
          <SectionHeader
            eyebrow="Scope"
            title={<span id="scope-title">Data, actions, and approvals</span>}
            lede={`What the ${agent.name} reads, what it does on its own, and where a person signs.`}
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <ScopeColumn title="Data it reads" items={agent.dataSources} />
            <ScopeColumn title="Actions it takes" items={agent.actions} />
            <ScopeColumn title="What needs approval" items={agent.guardrails} />
          </div>
        </Container>
      </Section>

      {/* 5. Outcomes */}
      <Section bordered="top" aria-labelledby="outcomes-title">
        <Container>
          <SectionHeader
            eyebrow="Outcomes"
            title={<span id="outcomes-title">Numbers the {agent.name} is accountable for</span>}
            lede="Modeled outcomes from design-partner deployments. The Registry reports your actuals from the first week an agent is live."
          />
          <StatGrid columns={columns}>
            {outcomes.map((metric) => {
              const stat = statValue(metric);
              return (
                <Stat
                  key={`${metric.value}-${metric.label}`}
                  value={stat.value}
                  unit={stat.unit}
                  label={metric.label}
                  footnote={metric.footnote ? 1 : undefined}
                />
              );
            })}
          </StatGrid>
          <Footnotes className="mt-12 border-t border-border pt-6" items={[modeledOutcomeFootnote]} />

          {testimonial || customers.length > 0 ? (
            <div className="mt-16 grid gap-10 border-t border-border pt-12 lg:mt-20 lg:grid-cols-12 lg:gap-16 lg:pt-14">
              {testimonial ? (
                <figure className="lg:col-span-8">
                  <blockquote>
                    <p className="text-[1.375rem] leading-snug tracking-[-0.01em] text-fg text-pretty lg:text-[1.625rem]">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-muted text-xs font-medium text-fg-muted"
                    >
                      {initials(testimonial.name)}
                    </span>
                    <span className="text-sm">
                      <span className="font-medium text-fg">{testimonial.name}</span>
                      <span className="text-fg-muted">
                        , {testimonial.role},{" "}
                        {quoteCustomer ? (
                          <Link
                            href={customerPath(quoteCustomer.slug)}
                            className="rounded-sm text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                          >
                            {testimonial.company}
                          </Link>
                        ) : (
                          testimonial.company
                        )}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              ) : null}
              <div className={testimonial ? "lg:col-span-4" : "lg:col-span-12"}>
                {testimonial?.metric ? (
                  <Stat
                    size="md"
                    value={statValue(testimonial.metric).value}
                    unit={statValue(testimonial.metric).unit}
                    label={`${testimonial.metric.label} at ${testimonial.company}`}
                    footnote={testimonial.metric.footnote ? 1 : undefined}
                  />
                ) : null}
                {customers.length > 0 ? (
                  <div className={testimonial?.metric ? "mt-8" : undefined}>
                    <p className="eyebrow">In production at</p>
                    <ul role="list" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      {customers.map((customer) => (
                        <li key={customer.slug}>
                          <ArrowLink href={customerPath(customer.slug)} size="sm" tone="fg">
                            {customer.name}
                          </ArrowLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* 6. Integrations + credits */}
      <Section background="subtle" bordered="both" aria-labelledby="integrations-title">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Integrations</Eyebrow>
              <h2 id="integrations-title" className="text-h3 mt-4 text-balance">
                Systems it works with
              </h2>
              <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-fg-muted text-pretty">
                Connected through prebuilt connectors and zero-copy warehouse access in Data Fabric. The agent acts
                as the user and inherits each system&rsquo;s permissions on every read.
              </p>
              <ul role="list" className="mt-6 flex flex-wrap gap-2">
                {agent.integrations.map((integration) => (
                  <li
                    key={integration}
                    className="inline-flex h-8 items-center rounded-full border border-border bg-bg-elevated px-3 text-[0.8125rem] text-fg"
                  >
                    {integration}
                  </li>
                ))}
              </ul>
              <ArrowLink href="/platform/data-fabric" className="mt-7">
                3,000+ connectors in Data Fabric
              </ArrowLink>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>Credits</Eyebrow>
              <h2 id="credits-title" className="text-h3 mt-4 text-balance">
                What the {agent.name} costs
              </h2>
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-fg-muted text-pretty">
                {planSentence} Credits are consumed per completed action, never per message. Usage beyond the
                plan is billed at {formatCurrency(overagePerCredit, { cents: true })} per credit.
              </p>
              <CreditsTable
                className="mt-6"
                ariaLabel={`${agent.name} credit rates`}
                rows={agent.creditCost.map((row) => ({ action: row.action, credits: row.credits }))}
              />
              <ArrowLink href="/pricing" className="mt-6">
                Plans and the credits calculator
              </ArrowLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. FAQ */}
      <Section aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Questions"
                title={<span id="faq-title">Questions about the {agent.name}</span>}
                lede="Answered the way buyers ask them. Each answer is also published as structured data."
                className="mb-8"
              />
              {terms.length > 0 ? (
                <div>
                  <p className="eyebrow">Related terms</p>
                  <ul role="list" className="mt-3 flex flex-wrap gap-2">
                    {terms.map((term) => (
                      <li key={term.slug}>
                        <Link
                          href={glossaryPath(term.slug)}
                          className="inline-flex h-8 items-center rounded-full border border-border bg-bg-elevated px-3 text-[0.8125rem] text-fg-muted transition-colors duration-150 ease-standard outline-none hover:border-border-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                        >
                          {term.term}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="lg:col-span-8">
              <AgentFaq faqs={agent.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 8. Related agents */}
      <Section bordered="top" aria-labelledby="related-title">
        <Container>
          <SectionHeader
            eyebrow="Related agents"
            title={<span id="related-title">Agents that share this workflow</span>}
            lede={`Agents most often deployed alongside the ${agent.name}, on the same data and the same approval policy.`}
            actions={<ArrowLink href="/agents">All {agents.length} agents</ArrowLink>}
          />
          <ul role="list" className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug} className="min-w-0">
                <AgentCard agent={toAgentCardData(item)} footnote={1} headingLevel="h3" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 9. CTA */}
      <AgentsCta title={`Put the ${agent.name} to work.`} />
    </>
  );
}
