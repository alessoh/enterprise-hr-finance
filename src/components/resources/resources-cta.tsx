import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";
import type { Cta } from "@/content/types";

export interface ResourcesCtaProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lede?: string;
  primary?: Cta;
  secondary?: Cta;
}

/** Final CTA band: centered, bg-subtle, hairline top (DESIGN.md §8). Defaults to the site-wide copy. */
export function ResourcesCta({
  id = "resources-cta",
  eyebrow = homeCopy.sections.cta.eyebrow,
  title = homeCopy.finalCta.title,
  lede = homeCopy.finalCta.lede,
  primary = homeCopy.finalCta.primary,
  secondary = homeCopy.finalCta.secondary,
}: ResourcesCtaProps) {
  return (
    <Section background="subtle" bordered="top" aria-labelledby={`${id}-title`}>
      <Container className="flex flex-col items-center text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-h2 mt-4 max-w-2xl text-balance">
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
