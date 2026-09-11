import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { Cta } from "@/content/types";

export interface CtaBandProps {
  title: string;
  lede: string;
  primary: Cta;
  secondary: Cta;
}

/** Final CTA band: centered on bg-subtle with a hairline top (DESIGN.md §6). */
export function CtaBand({ title, lede, primary, secondary }: CtaBandProps) {
  return (
    <Section background="subtle" bordered="top" aria-labelledby="customers-cta-title">
      <Container className="flex flex-col items-center text-center">
        <h2 id="customers-cta-title" className="text-h2 max-w-2xl text-balance">
          {title}
        </h2>
        <p className="text-lede mt-5 max-w-[52ch] text-pretty">{lede}</p>
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
