import type { Metadata } from "next";

import { CtaBand } from "@/components/customers/cta-band";
import { CustomerCard } from "@/components/customers/customer-card";
import { CustomerGrid } from "@/components/customers/customer-grid";
import { StoryTile } from "@/components/customers/story-tile";
import { partnerFunction } from "@/components/customers/lib";
import { TestimonialWall } from "@/components/customers/testimonial-wall";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { caseStudies, customers, getCaseStudy, getCustomer } from "@/content/customers";
import { testimonials } from "@/content/testimonials";
import { breadcrumbJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { customerPath } from "@/lib/seo/routes";

const TITLE = "Customer stories from design partners";
const DESCRIPTION =
  "Case studies from eight design partners in healthcare, logistics, finance, retail, energy, food, manufacturing, and banking, with the outcomes each measured.";

export const metadata: Metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/customers",
  keywords: [
    "AI agent case studies HR finance",
    "AI agents healthcare HR",
    "AI agents logistics finance",
    "AI close case study",
    "design partner results",
  ],
});

/** Six quotes for the wall, in the order the partners appear in the featured stories, then the rest. */
const QUOTE_COMPANIES = [
  "Halvorsen Health",
  "Castellan Financial",
  "Northwind Logistics",
  "Summit Bank",
  "Orion Retail Group",
  "Atlas Manufacturing",
];

/** What every published story contains, in the order the story tells it. */
const STORY_CONTENTS = [
  { term: "Challenge", description: "The starting point, with the numbers behind it." },
  { term: "Approach", description: "What was deployed, phase by phase, and who approved what." },
  { term: "Results", description: "What the partner measured, and the agents it runs today." },
] as const;

/** Counted from the content, not asserted: the scope of the programme, no outcome claims. */
const SCOPE = [
  { value: String(customers.length), label: "design partners" },
  { value: String(new Set(customers.flatMap((c) => c.agentSlugs)).size), label: "agents in production" },
  { value: String(caseStudies.length), label: "published stories" },
] as const;

export default function CustomersPage() {
  const featured = caseStudies.flatMap((study) => {
    const customer = getCustomer(study.customerSlug);
    return customer ? [{ study, customer }] : [];
  });
  const [lead, ...others] = featured;

  const gridItems = customers.map((customer) => ({
    slug: customer.slug,
    group: partnerFunction(customer),
    card: <CustomerCard customer={customer} study={getCaseStudy(customer.slug)} />,
  }));

  const quotes = QUOTE_COMPANIES.flatMap((company) => {
    const t = testimonials.find((item) => item.company === company);
    return t ? [t] : [];
  });
  const storyByCompany = Object.fromEntries(
    featured.map(({ study, customer }) => [customer.name, study.slug] as const),
  );

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Customers", path: "/customers" },
          ]),
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/customers" }),
          itemListJsonLd(
            caseStudies.map((study) => ({
              name: study.title,
              path: customerPath(study.slug),
              description: study.subtitle,
            })),
            { name: "Meridian customer stories", description: "Case studies from Meridian design partners." },
          ),
        ]}
      />

      {/* 1. Hero and the three published case studies, on one grid.
          The headline holds columns 1-7 of the first row; the story rail holds 8-12 and
          continues under the headline, so the lead story is above the fold and the eye
          runs headline -> lead story -> second row. */}
      <Section spacing="none" className="pt-8 pb-20 lg:pt-10 lg:pb-24" aria-labelledby="customers-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Customers" }]} />
          <div className="mt-10 grid gap-x-16 gap-y-10 lg:mt-14 lg:grid-cols-12 lg:gap-y-12">
            <div className="flex flex-col lg:col-span-7">
              <Eyebrow>Customers</Eyebrow>
              {/* h1, not display: at 72px this headline balances into a four-line rag
                  whose last line is the longest. 56px sets it in two even lines. */}
              <h1 id="customers-title" className="text-h1 mt-6 hyphens-none text-balance">
                Measured outcomes from eight design partners
              </h1>
              <p className="text-lede mt-7 max-w-[52ch] text-pretty">
                Eight enterprises, from a 4,200-person asset manager to a 31,000-person retailer, run governed
                agents in production HR and finance workflows. Each story reports the agents deployed, the
                timeline, and the outcomes the partner measured.
              </p>
              <ArrowLink href="#partners" className="mt-7">
                See all eight partners
              </ArrowLink>
              {/* What a story contains, so the tiles beside this column read as an index
                  rather than three loose cards. */}
              <dl className="mt-12 hidden divide-y divide-border border-t border-border lg:block">
                {STORY_CONTENTS.map((item) => (
                  <div key={item.term} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-4 py-3">
                    <dt className="text-[0.8125rem] font-medium text-fg">{item.term}</dt>
                    <dd className="text-[0.8125rem] leading-5 text-fg-muted">{item.description}</dd>
                  </div>
                ))}
              </dl>
              <dl className="mt-10 grid grid-cols-3 gap-x-6 border-t border-border pt-6 lg:mt-auto lg:pt-7">
                {SCOPE.map((item, index) => (
                  <div key={item.label} className={index > 0 ? "border-l border-border pl-6" : undefined}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd className="tabular text-[1.75rem] leading-none font-medium tracking-[-0.03em] text-fg">
                      {item.value}
                    </dd>
                    <p className="mt-2.5 max-w-[18ch] text-[0.8125rem] leading-5 text-fg-muted">{item.label}</p>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              {lead ? <StoryTile as="h2" study={lead.study} customer={lead.customer} size="lead" /> : null}
            </div>

            {others.map(({ study, customer }, index) => (
              <Reveal
                key={study.slug}
                delay={index * 0.06}
                className={index === 0 ? "min-w-0 lg:col-span-7" : "min-w-0 lg:col-span-5"}
              >
                <StoryTile as="h2" study={study} customer={customer} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 2. All partners */}
      <Section id="partners" background="subtle" bordered="both" className="scroll-mt-20" aria-labelledby="partners-title">
        <Container>
          <SectionHeader
            eyebrow="All design partners"
            title={<span id="partners-title">Results by partner</span>}
            lede="Three results per partner, the agents it runs, and where it operates, across healthcare, logistics, financial services, retail, energy, food production, manufacturing, and banking."
          />
          <CustomerGrid items={gridItems} />
          <Footnotes className="mt-12" />
        </Container>
      </Section>

      {/* 3. Testimonials */}
      <Section aria-labelledby="quotes-title">
        <Container>
          <SectionHeader
            eyebrow="In their words"
            title={<span id="quotes-title">What design partners say</span>}
            lede="From the people accountable for the outcome: controllers, people officers, talent leads, and internal audit."
          />
          <TestimonialWall testimonials={quotes} storyByCompany={storyByCompany} />
        </Container>
      </Section>

      {/* 4. CTA */}
      <CtaBand
        title="See these agents on your data"
        lede="Book a demo and we will map agents to the workflows that pay back first, or compare plans and credits on the pricing page."
        primary={{ label: "Book a demo", href: "/contact?intent=demo" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
