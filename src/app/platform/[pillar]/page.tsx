import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { Markdown } from "@/components/content/markdown";
import { HowItFits } from "@/components/platform/how-it-fits";
import { PillarMockup } from "@/components/platform/mockups";
import { PlatformCta } from "@/components/platform/platform-cta";
import { PlatformFaq } from "@/components/platform/platform-faq";
import { SpecTable } from "@/components/platform/spec-table";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section, SectionHeader } from "@/components/ui/section";
import { getPlatformPillar, platformPillars } from "@/content/platform";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { platformPath } from "@/lib/seo/routes";

type Params = { pillar: string };

const PRODUCT_SLUGS = ["registry", "gateway", "data-fabric", "studio", "assist"] as const;

export function generateStaticParams(): Params[] {
  return PRODUCT_SLUGS.map((pillar) => ({ pillar }));
}

function getProductPillar(slug: string) {
  if (!(PRODUCT_SLUGS as readonly string[]).includes(slug)) return undefined;
  return getPlatformPillar(slug);
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getProductPillar(slug);
  if (!pillar) return {};
  return createMetadata({
    title: pillar.seo.title,
    description: pillar.seo.description,
    path: platformPath(pillar.slug),
    keywords: pillar.seo.keywords,
  });
}

/** Question heading per pillar, so heading + first paragraph extract cleanly. */
const WHAT_IS: Record<string, string> = {
  registry: "What is the Registry?",
  gateway: "What is the Gateway?",
  "data-fabric": "What is the Data Fabric?",
  studio: "What is Studio?",
  assist: "What is Assist?",
};

export default async function PlatformPillarPage({ params }: { params: Promise<Params> }) {
  const { pillar: slug } = await params;
  if (slug === "trust") redirect("/security");
  const pillar = getProductPillar(slug);
  if (!pillar) notFound();

  const path = platformPath(pillar.slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Platform", path: "/platform" },
            { name: pillar.name, path },
          ]),
          webPageJsonLd({ name: pillar.seo.title, description: pillar.seo.description, path }),
          faqJsonLd(pillar.faqs),
        ]}
      />

      {/* 1. Hero */}
      <Section spacing="none" className="pt-8 pb-16 lg:pt-10 lg:pb-20" aria-labelledby="pillar-title">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Platform", href: "/platform" }, { label: pillar.name }]}
          />
          <div className="mt-12 max-w-3xl lg:mt-16">
            <Eyebrow>Platform</Eyebrow>
            <h1 id="pillar-title" className="text-h1 mt-4 text-balance">
              {pillar.name}.{" "}
              <span className="text-fg-muted">{pillar.headline}</span>
            </h1>
            <p className="text-lede mt-6 max-w-[62ch] text-pretty">{pillar.description}</p>
          </div>
        </Container>
        <Container size="wide" className="mt-14 lg:mt-20">
          <PillarMockup slug={pillar.slug} />
        </Container>
      </Section>

      {/* 2. What it is */}
      <Section bordered="top" aria-labelledby="what-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 id="what-title" className="text-h2 text-balance lg:sticky lg:top-28">
                {WHAT_IS[pillar.slug] ?? `What is ${pillar.name}?`}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Markdown className="max-w-narrow">{pillar.longDescription}</Markdown>
              <ul className="mt-12 grid gap-x-10 border-t border-border md:grid-cols-2" aria-label="In practice">
                {pillar.proofPoints.map((point) => (
                  <li key={point} className="border-b border-border py-4 text-sm leading-relaxed text-pretty text-fg-muted">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. Capabilities */}
      <Section background="subtle" bordered="top" aria-labelledby="capabilities-title">
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            title={<span id="capabilities-title">What {pillar.name} does</span>}
            lede={`${pillar.features.length} capabilities, each enforced below the agent so they apply to Meridian, partner, and Studio-built agents alike.`}
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillar.features.map((feature) => (
              <li key={feature.title} className="min-w-0">
                <Card as="article" className="h-full">
                  <h3 className="text-h5 text-fg">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-fg-muted">{feature.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 4. Specification */}
      <Section bordered="top" aria-labelledby="spec-title">
        <Container>
          <SectionHeader
            eyebrow="Specification"
            title={<span id="spec-title">{pillar.name} specification</span>}
            lede="Standards, protocols, and limits as of September 2026. Your account team can confirm coverage for a specific stack."
          />
          <SpecTable pillar={pillar} />
        </Container>
      </Section>

      {/* 5. How it fits */}
      <Section background="subtle" bordered="top" aria-labelledby="fits-title">
        <Container>
          <SectionHeader
            eyebrow="How it fits"
            title={<span id="fits-title">How {pillar.name} fits the platform</span>}
            lede="One identity model, one policy layer, one log. The other components and the trust model that binds them."
          />
          <HowItFits current={pillar} pillars={platformPillars} />
        </Container>
      </Section>

      {/* 6. FAQ */}
      <Section bordered="top" aria-labelledby="faq-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeader
                eyebrow="Questions"
                title={<span id="faq-title">Questions about {pillar.name}</span>}
                className="mb-0"
              />
            </div>
            <div className="lg:col-span-8">
              <PlatformFaq faqs={pillar.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 7. CTA */}
      <PlatformCta />
    </>
  );
}
