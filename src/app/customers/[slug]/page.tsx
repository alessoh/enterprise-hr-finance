import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { caseStudyJsonLd } from "@/components/customers/case-study-jsonld";
import { CtaBand } from "@/components/customers/cta-band";
import { agentsForCustomer, timelineWeeks } from "@/components/customers/lib";
import { MetricStat } from "@/components/customers/metric-stat";
import { PartnerWordmark } from "@/components/customers/partner-wordmark";
import { StoryNav } from "@/components/customers/story-nav";
import { StoryTimeline } from "@/components/customers/story-timeline";
import { Markdown } from "@/components/content/markdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Avatar } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FootnoteRef, Footnotes } from "@/components/ui/footnote";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatGrid } from "@/components/ui/stat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { caseStudies, getCaseStudy, getCustomer } from "@/content/customers";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { agentPath, customerPath } from "@/lib/seo/routes";
import { formatDate } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return createMetadata({
    title: study.seo.title,
    description: study.seo.description,
    path: customerPath(study.slug),
    type: "article",
    publishedTime: study.publishedAt,
    modifiedTime: study.publishedAt,
    keywords: study.seo.keywords,
  });
}

const NAV_ITEMS = [
  { id: "challenge", label: "Challenge" },
  { id: "approach", label: "Approach" },
  { id: "results", label: "Results" },
  { id: "timeline", label: "Timeline" },
];

function MetaRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 py-3.5">
      <dt className="text-[0.8125rem] text-fg-subtle">{term}</dt>
      <dd className="text-sm text-fg">{children}</dd>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const customer = study ? getCustomer(study.customerSlug) : undefined;
  if (!study || !customer) notFound();

  const agents = agentsForCustomer(customer);
  const weeks = timelineWeeks(study.timeline);
  const path = customerPath(study.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Customers", path: "/customers" },
            { name: customer.name, path },
          ]),
          webPageJsonLd({ name: study.title, description: study.seo.description, path, dateModified: study.publishedAt }),
          caseStudyJsonLd(study, customer, agents),
        ]}
      />

      {/* 1. Header: wordmark, H1, lede, meta table */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-20" aria-labelledby="story-title">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Customers", href: "/customers" }, { label: customer.name }]}
          />
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <PartnerWordmark name={customer.name} fallback={customer.logoText} />
                <Eyebrow>Customer story</Eyebrow>
              </div>
              <h1 id="story-title" className="text-h1 mt-8 text-balance">
                {study.title}
              </h1>
              <p className="text-lede mt-6 max-w-[62ch] text-pretty">{study.subtitle}</p>
            </div>
            <aside className="lg:col-span-4 lg:pt-14" aria-label="Deployment facts">
              <dl className="divide-y divide-border border-y border-border">
                <MetaRow term="Industry">{customer.industry}</MetaRow>
                <MetaRow term="Size">
                  <span className="tabular">{customer.size}</span>
                </MetaRow>
                <MetaRow term="Region">{customer.region}</MetaRow>
                <MetaRow term="Agents used">
                  <ul className="flex flex-col gap-1">
                    {agents.map((agent) => (
                      <li key={agent.slug}>
                        <Link
                          href={agentPath(agent.slug)}
                          className="text-accent underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent-hover hover:underline"
                        >
                          {agent.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </MetaRow>
                <MetaRow term="Timeline">
                  <span className="tabular">
                    {weeks} weeks, {study.timeline.length} phases
                  </span>
                </MetaRow>
                <MetaRow term="Published">
                  <time dateTime={study.publishedAt}>{formatDate(study.publishedAt, "long")}</time>
                </MetaRow>
              </dl>
            </aside>
          </div>
        </Container>
      </Section>

      {/* 2. Headline stats */}
      <Section spacing="compact" bordered="top" aria-label="Headline results">
        <Container>
          <StatGrid columns={3}>
            {customer.results.map((metric) => (
              <MetricStat key={metric.label} metric={metric} />
            ))}
          </StatGrid>
        </Container>
      </Section>

      {/* 3. Pull quote */}
      <Section background="subtle" bordered="both" spacing="compact" className="py-16 lg:py-24">
        <Container>
          <figure className="max-w-4xl">
            <blockquote className="font-display text-[2.5rem] leading-[1.15] tracking-[-0.01em] text-balance text-fg lg:text-[2.75rem]">
              <p>&ldquo;{study.quote.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Avatar name={study.quote.name} size="lg" tone="ink" />
              <div>
                <p className="text-base font-medium text-fg">{study.quote.name}</p>
                <p className="text-sm text-fg-muted">
                  {study.quote.role}, {study.quote.company}
                </p>
              </div>
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* 4. Body with sticky nav */}
      <Section>
        <Container>
          <div className="xl:grid xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-x-20">
            <div className="hidden xl:block">
              <StoryNav items={NAV_ITEMS} className="sticky top-32" />
            </div>
            <div className="max-w-narrow">
              <section id="challenge" className="scroll-mt-32" aria-labelledby="challenge-title">
                <h2 id="challenge-title" className="text-h2">
                  Challenge
                </h2>
                <Markdown className="mt-8">{study.challenge}</Markdown>
              </section>

              <section id="approach" className="mt-20 scroll-mt-32 border-t border-border pt-16" aria-labelledby="approach-title">
                <h2 id="approach-title" className="text-h2">
                  Approach
                </h2>
                <Markdown className="mt-8">{study.approach}</Markdown>
              </section>

              <section id="results" className="mt-20 scroll-mt-32 border-t border-border pt-16" aria-labelledby="results-title">
                <h2 id="results-title" className="text-h2">
                  Results
                </h2>
                <Markdown className="mt-8">{study.results.summary}</Markdown>
                {study.results.metrics.length > 0 ? (
                  <Table className="mt-10" aria-label={`Results ${customer.name} measured`}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Measure</TableHead>
                        <TableHead numeric>
                          Result
                          <FootnoteRef n={1} className="ml-1 normal-case" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {study.results.metrics.map((metric) => (
                        <TableRow key={metric.label}>
                          <TableCell className="text-fg-muted">{metric.label}</TableCell>
                          <TableCell numeric className="font-medium whitespace-nowrap">
                            {metric.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : null}
              </section>

              <section id="timeline" className="mt-20 scroll-mt-32 border-t border-border pt-16" aria-labelledby="timeline-title">
                <h2 id="timeline-title" className="text-h2">
                  Timeline
                </h2>
                <p className="text-lede mt-4 max-w-[60ch] text-pretty">
                  {weeks} weeks from scoping to steady state, in {study.timeline.length} phases.
                </p>
                <div className="mt-10">
                  <StoryTimeline phases={study.timeline} />
                </div>
              </section>

              <Footnotes className="mt-16 border-t border-border pt-8" />
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. Related agents */}
      <Section background="subtle" bordered="top" aria-labelledby="agents-title">
        <Container>
          <SectionHeader
            eyebrow="Agents in this story"
            title={<span id="agents-title">The agents {customer.name} runs</span>}
            lede="Each agent is scoped to one workflow, reads only permitted data, logs every action, and routes consequential actions to a named approver."
            actions={<ArrowLink href="/agents">All twelve agents</ArrowLink>}
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <li key={agent.slug} className="min-w-0">
                <Card as="article" interactive className="group flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-h5 text-fg">
                      <Link
                        href={agentPath(agent.slug)}
                        className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ring"
                      >
                        {agent.name}
                      </Link>
                    </h3>
                    <StatusBadge status={agent.status} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-fg-muted">{agent.tagline}</p>
                  <p className="mt-auto pt-6 text-[0.8125rem] font-medium text-fg">
                    <span className="inline-flex items-center gap-1.5">
                      Agent page
                      <span aria-hidden className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 6. CTA */}
      <CtaBand
        title="Start with the workflow that pays back first"
        lede="Book a demo to map agents to your HR and finance workflows, or read the buyer's guide before you talk to anyone."
        primary={{ label: "Book a demo", href: "/contact?intent=demo" }}
        secondary={{ label: "Read the buyer's guide", href: "/resources/buyers-guide-ai-agents-hr-finance-2026" }}
      />
    </>
  );
}
