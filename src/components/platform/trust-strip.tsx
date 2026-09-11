import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Section, SectionHeader } from "@/components/ui/section";
import type { PlatformPillar } from "@/content/types";

/** Six trust items as a hairline grid (no cards, no icons-in-squares), linking to /security. */
export function TrustStrip({ trust }: { trust: PlatformPillar }) {
  return (
    <Section background="subtle" bordered="both" aria-labelledby="trust-title">
      <Container>
        <SectionHeader
          eyebrow={trust.name}
          title={<span id="trust-title">{trust.headline}</span>}
          lede="The same constraints apply to every agent on the platform, whether Meridian built it, a partner did, or you did in Studio."
          actions={<ArrowLink href="/security">Security and trust</ArrowLink>}
        />
        <ul className="grid gap-x-10 gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {trust.features.map((feature) => (
            <li key={feature.title} className="border-t border-border py-6">
              <h3 className="text-base font-medium text-fg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-pretty text-fg-muted">{feature.description}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-fg-subtle" aria-label="Standards and certifications">
          {(trust.standards ?? []).map((standard) => (
            <li key={standard}>{standard}</li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
