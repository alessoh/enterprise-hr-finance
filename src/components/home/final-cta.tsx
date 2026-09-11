import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

/** Centered closing band on bg-subtle (DESIGN.md §8 Home, step 11). */
export function FinalCta() {
  const { finalCta } = homeCopy;
  const { cta } = homeCopy.sections;
  return (
    <Section background="subtle" bordered="top" aria-labelledby="cta-heading" className="text-center">
      <Container className="max-w-3xl">
        <Reveal>
          <Eyebrow className="justify-center">{cta.eyebrow}</Eyebrow>
          <h2 id="cta-heading" className="text-h2 mt-5">
            {finalCta.title}
          </h2>
          <p className="text-lede mx-auto mt-6 max-w-[52ch]">{finalCta.lede}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href={finalCta.primary.href}>{finalCta.primary.label}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" arrow>
              <Link href={finalCta.secondary.href}>{finalCta.secondary.label}</Link>
            </Button>
          </div>
          <p className="text-caption mx-auto mt-6 max-w-[60ch]">{cta.lede}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
