import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export interface AgentsCtaProps {
  title?: string;
  lede?: string;
}

/** Final CTA band: centered, bg-subtle, hairline top (DESIGN.md §8). */
export function AgentsCta({ title = homeCopy.finalCta.title, lede = homeCopy.finalCta.lede }: AgentsCtaProps) {
  const { primary, secondary } = homeCopy.finalCta;
  return (
    <Section background="subtle" bordered="top" aria-labelledby="agents-cta-title">
      <Container className="flex flex-col items-center text-center">
        <p className="eyebrow">{homeCopy.sections.cta.eyebrow}</p>
        <h2 id="agents-cta-title" className="mt-4 max-w-2xl text-h2 text-balance">
          {title}
        </h2>
        <p className="mt-4 max-w-[52ch] text-lede text-pretty">{lede}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" arrow>
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
