import type { Metadata } from "next";

import { CtaBand } from "@/components/customers/cta-band";
import { CustomerCard } from "@/components/customers/customer-card";
import { CustomerGrid } from "@/components/customers/customer-grid";
import { FeaturedStoryCard } from "@/components/customers/featured-story-card";
import { partnerFunction } from "@/components/customers/lib";
import { TestimonialWall } from "@/components/customers/testimonial-wall";
import { JsonLd } from "@/components/seo/JsonLd";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Footnotes } from "@/components/ui/footnote";
import { LogoWall } from "@/components/ui/logo-wall";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
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

export default function CustomersPage() {
  const featured = caseStudies.flatMap((study) => {
    const customer = getCustomer(study.customerSlug);
    return customer ? [{ study, customer }] : [];
  });

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

      {/* 1. Hero + logo wall */}
      <Section spacing="none" className="pt-8 pb-20 lg:pt-10 lg:pb-24" aria-labelledby="customers-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Customers" }]} />
          <div className="mt-12 max-w-3xl lg:mt-16">
            <Eyebrow>Customers</Eyebrow>
            <h1 id="customers-title" className="text-h1 mt-5 text-balance">
              Measured outcomes from eight design partners
            </h1>
            <p className="text-lede mt-6 max-w-[62ch] text-pretty">
              Meridian&rsquo;s design partners are eight enterprises, from a 4,200-person asset manager to a
              31,000-person retailer, that run governed agents in production HR and finance workflows. Each story
              reports the agents deployed, the timeline, and the outcomes the partner measured.
            </p>
          </div>
          <div className="mt-16 border-t border-border pt-12 lg:mt-20 lg:pt-14">
            <LogoWall
              variant="grid"
              label="Design partners in healthcare, logistics, financial services, retail, energy, food production, manufacturing, and banking"
            />
          </div>
        </Container>
      </Section>

      {/* 2. Featured case studies */}
      <Section bordered="top" aria-labelledby="featured-title">
        <Container>
          <SectionHeader
            eyebrow="Case studies"
            title={<span id="featured-title">Three deployments, week by week</span>}
            lede="Each case study covers the starting point, the approach by phase, the results the partner measured, and the agents it runs today."
            actions={<ArrowLink href="#partners">All eight partners</ArrowLink>}
          />
          <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
            {featured.map(({ study, customer }) => (
              <RevealItem key={study.slug} className="min-w-0">
                <FeaturedStoryCard study={study} customer={customer} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      {/* 3. All partners */}
      <Section id="partners" background="subtle" bordered="both" className="scroll-mt-20" aria-labelledby="partners-title">
        <Container>
          <SectionHeader
            eyebrow="All design partners"
            title={<span id="partners-title">Results by partner</span>}
            lede="Three results per partner, the agents it runs, and where it operates. Partners without a published case study are listed with their results."
          />
          <CustomerGrid items={gridItems} />
          <Footnotes className="mt-12" />
        </Container>
      </Section>

      {/* 4. Testimonials */}
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

      {/* 5. CTA */}
      <CtaBand
        title="See these agents on your data"
        lede="Book a demo and we will map agents to the workflows that pay back first, or compare plans and credits on the pricing page."
        primary={{ label: "Book a demo", href: "/contact?intent=demo" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
