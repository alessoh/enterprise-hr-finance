import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Glow } from "@/components/ui/patterns";
import { Section } from "@/components/ui/section";

export function SecurityCta() {
  return (
    <Section background="subtle" bordered="top" aria-labelledby="cta-heading" className="overflow-hidden">
      <Glow position="top" opacity={0.5} />
      <Container className="flex flex-col items-center text-center">
        <Eyebrow>Security packet</Eyebrow>
        <h2 id="cta-heading" className="text-h2 mt-5 max-w-[20ch]">
          Get the security packet.
        </h2>
        <p className="text-lede mt-5 max-w-[56ch]">
          SOC 2 Type II report, ISO 27001 certificate, penetration test summary, completed standard questionnaires,
          and the DPA, shared under NDA, usually within two business days.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/contact?intent=sales">Request the security packet</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" arrow>
            <Link href="/legal/dpa">Read the DPA</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
