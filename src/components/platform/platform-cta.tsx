import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export interface PlatformCtaProps {
  title?: string;
  lede?: string;
}

/** Final CTA band: centered, bg-subtle, hairline top (DESIGN.md §8). */
export function PlatformCta({ title = homeCopy.finalCta.title, lede = homeCopy.finalCta.lede }: PlatformCtaProps) {
  const { primary, secondary } = homeCopy.finalCta;
  return (
    <Section background="subtle" bordered="top" aria-labelledby="platform-cta-title">
      <Container className="flex flex-col items-center text-center">
        <p className="eyebrow">{homeCopy.sections.cta.eyebrow}</p>
        <h2 id="platform-cta-title" className="text-h2 mt-4 max-w-2xl text-balance">
          {title}
        </h2>
        <p className="text-lede mt-4 max-w-[52ch] text-pretty">{lede}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" arrow>
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
