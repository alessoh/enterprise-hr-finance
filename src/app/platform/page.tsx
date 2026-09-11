import type { Metadata } from "next";

import { ArchitectureDiagram } from "@/components/platform/architecture-diagram";
import { PillarSection } from "@/components/platform/pillar-section";
import { platformFaqs, platformOverview } from "@/components/platform/platform-copy";
import { PlatformCta } from "@/components/platform/platform-cta";
import { PlatformFaq } from "@/components/platform/platform-faq";
import { StandardsTable } from "@/components/platform/standards-table";
import { TrustStrip } from "@/components/platform/trust-strip";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DotGrid } from "@/components/ui/patterns";
import { Section, SectionHeader } from "@/components/ui/section";
import { getPlatformPillar, platformPillars } from "@/content/platform";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { platformPath } from "@/lib/seo/routes";

const PATH = "/platform";
const PRODUCT_SLUGS = ["registry", "gateway", "data-fabric", "studio", "assist"] as const;

export const metadata: Metadata = createMetadata({
  title: platformOverview.seo.title,
  description: platformOverview.seo.description,
  path: PATH,
  keywords: [...platformOverview.seo.keywords],
});

/** First sentence of a description, so six cells stay the same shape. */
function firstSentence(text: string): string {
  const match = text.match(/^[\s\S]*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

export default function PlatformPage() {
  const pillars = PRODUCT_SLUGS.map((slug) => getPlatformPillar(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const trust = getPlatformPillar("trust");
  const parts = platformOverview.parts
    .map((slug) => getPlatformPillar(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Platform", path: PATH },
          ]),
          webPageJsonLd({ name: platformOverview.seo.title, description: platformOverview.seo.description, path: PATH }),
          itemListJsonLd(
            platformPillars.map((p) => ({
              name: p.name,
              path: p.slug === "trust" ? "/security" : platformPath(p.slug),
              description: p.description,
            })),
            { name: "Meridian platform", description: platformOverview.lede },
          ),
          faqJsonLd(platformFaqs),
        ]}
      />

      {/* 1. Hero + architecture */}
      <Section spacing="none" className="pt-8 pb-20 lg:pt-10 lg:pb-28" aria-labelledby="platform-title">
        <Container>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Platform" }]} />
          <div className="mt-12 max-w-3xl lg:mt-16">
            <Eyebrow>Platform</Eyebrow>
            <h1 id="platform-title" className="text-h1 mt-4 text-balance">
              {platformOverview.title}
            </h1>
            <p className="text-lede mt-6 max-w-[60ch] text-pretty">{platformOverview.lede}</p>
          </div>
          {/* Outside the prose measure: the six parts span the container, in the same
              order as the diagram below. */}
          <dl className="mt-12 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {parts.map((part) => (
              <div key={part.slug} className="border-t border-border pt-4">
                <dt className="text-[0.9375rem] font-medium text-fg">{part.name}</dt>
                {/* A real sentence, not a three-word label: the eyebrow alone made six
                    terms read as a bare list. Trimmed to the first sentence so the six
                    cells stay even. */}
                <dd className="mt-1.5 text-sm leading-relaxed text-pretty text-fg-muted">
                  {firstSentence(part.description)}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
        <Container size="wide" className="mt-14 lg:mt-20">
          <div className="relative isolate">
            <DotGrid className="hidden lg:block" />
            <ArchitectureDiagram />
          </div>
        </Container>
      </Section>

      {/* 2. Five pillars */}
      {pillars.map((pillar, index) => (
        <PillarSection key={pillar.slug} pillar={pillar} index={index} />
      ))}

      {/* 3. Trust strip */}
      {trust ? <TrustStrip trust={trust} /> : null}

      {/* 4. Standards */}
      <Section aria-labelledby="standards-title">
        <Container>
          <SectionHeader
            eyebrow="Open standards"
            title={<span id="standards-title">Which open standards does the platform use?</span>}
            lede="Six. Agents connect over Model Context Protocol and agent-to-agent protocols, export traces as OpenTelemetry, take identity from OpenID Connect, SAML, and SCIM, and store connector data in Apache Iceberg. No proprietary protocol is required to join."
          />
          <StandardsTable />
        </Container>
      </Section>

      {/* 5. FAQ */}
      <Section background="subtle" bordered="top" aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Questions"
                title={<span id="faq-title">What buyers ask about the platform</span>}
                lede="Scope, plans, third-party agents, and where data lives."
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-8">
              <PlatformFaq faqs={platformFaqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. CTA */}
      <PlatformCta
        title="See the platform run on your systems."
        lede="A 45-minute working session with your warehouse and identity provider in scope. Leave with an architecture for the first agent and a credit estimate."
      />
    </>
  );
}
