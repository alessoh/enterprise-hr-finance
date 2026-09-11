import Link from "next/link";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import { certifications, type CertificationStatus } from "./data";
import { SectionIntro } from "./section-intro";

const statusStyle: Record<CertificationStatus, { variant: BadgeVariant; dot: boolean | BadgeVariant }> = {
  "Report available under NDA": { variant: "neutral", dot: "success" },
  Certified: { variant: "success", dot: true },
  Aligned: { variant: "accent", dot: false },
};

/** Typographic badges only. No auditor logos; the name, the status, the scope, and where the evidence is. */
export function Certifications() {
  return (
    <Section id="certifications" spacing="compact" bordered="top" aria-labelledby="certifications-heading">
      <Container>
        <SectionIntro
          id="certifications-heading"
          eyebrow="Certifications and frameworks"
          title="What Meridian is audited against."
          lede="SOC 2 Type II and ISO 27001 are audited by independent firms. GDPR, HIPAA, and CCPA describe how Meridian is configured and contracted rather than a certificate."
          className="mb-10 lg:mb-12"
        />
        <Reveal>
          <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {certifications.map((cert) => {
              const style = statusStyle[cert.status];
              return (
                <li key={cert.name} className="flex flex-col gap-4 bg-bg-elevated p-6">
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-h4 text-fg">{cert.name}</span>
                    <span className="font-mono text-xs text-fg-subtle">{cert.qualifier}</span>
                  </p>
                  <div>
                    <Badge variant={style.variant} dot={style.dot}>
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="text-[0.8125rem] leading-relaxed text-fg-muted">{cert.scope}</p>
                  <p className="text-caption">
                    <span className="font-medium text-fg-muted">Evidence.</span> {cert.evidence}
                  </p>
                  <Link
                    href={cert.href}
                    className="mt-auto pt-1 text-[0.8125rem] font-medium text-accent underline-offset-4 transition-colors duration-150 ease-standard hover:text-accent-hover hover:underline"
                  >
                    {cert.hrefLabel}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
