import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getSiteUrl } from "@/lib/utils";

import { AS_OF, SECURITY_EMAIL, SECURITY_TXT_PATH, disclosureCommitments } from "./data";

export function Disclosure() {
  const site = getSiteUrl();
  const securityTxt = [
    "# Meridian security contact (RFC 9116)",
    `Contact: mailto:${SECURITY_EMAIL}`,
    `Contact: ${site}/contact`,
    "Expires: 2027-09-01T00:00:00.000Z",
    "Preferred-Languages: en",
    `Canonical: ${site}${SECURITY_TXT_PATH}`,
    `Policy: ${site}/security`,
  ].join("\n");

  return (
    <Section id="disclosure" background="subtle" bordered="both" aria-labelledby="disclosure-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Eyebrow>Vulnerability disclosure</Eyebrow>
            <h2 id="disclosure-heading" className="text-h2 mt-5">
              Report a vulnerability.
            </h2>
            <p className="text-lede mt-6">
              Meridian runs a coordinated vulnerability disclosure program for its products and infrastructure.
              Report suspected vulnerabilities to {SECURITY_EMAIL}; the machine-readable policy is published at{" "}
              <a href={SECURITY_TXT_PATH} className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                {SECURITY_TXT_PATH}
              </a>{" "}
              under RFC 9116.
            </p>
            <p className="mt-5 text-base leading-relaxed text-fg-muted">
              Good-faith research that follows this policy, avoids customer data, and gives Meridian time to fix the
              issue will not be met with legal action. As of {AS_OF}, Meridian does not run a paid bounty program;
              researchers are credited on request once a fix ships.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
              {disclosureCommitments.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <dt className="text-caption">{item.label}</dt>
                  <dd className="tabular text-sm font-medium text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="secondary" arrow>
                <a href={`mailto:${SECURITY_EMAIL}`}>Email {SECURITY_EMAIL}</a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/contact?intent=support">Contact form</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-lg bg-fg text-bg/90 shadow-lg">
              <div className="flex items-center justify-between gap-4 border-b border-bg/10 px-5 py-2.5 font-mono text-xs text-bg/60">
                <span>{SECURITY_TXT_PATH}</span>
                <span>RFC 9116</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-[1.6]">
                <code>{securityTxt}</code>
              </pre>
            </div>
            <p className="mt-4 text-[0.8125rem] leading-relaxed text-fg-subtle">
              Include the affected URL or component, steps to reproduce, and the impact you observed. Encrypt
              sensitive reports with the PGP key in the security packet.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
