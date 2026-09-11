import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";

import { AS_OF, SECURITY_TXT_PATH, glanceRows } from "./data";

export function SecurityHero() {
  return (
    <section aria-labelledby="security-heading" className="relative isolate pt-10 pb-20 lg:pt-14 lg:pb-28">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Security" }]} />
        <div className="mt-10 grid items-start gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>Security</Eyebrow>
            <h1 id="security-heading" className="text-h1 mt-6 max-w-[16ch]">
              Security and governance, by design.
            </h1>
            <Reveal delay={0.06}>
              <p className="text-lede mt-6 max-w-[58ch]">
                Meridian is a platform of governed AI agents for HR and finance. Customer data is never used to
                train models. Consequential actions wait for a named person’s approval. Every read, step, and
                decision lands in an immutable audit trail you can export.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact?intent=sales">Request the security packet</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" arrow>
                  <Link href="/agents#contract">See the agent contract</Link>
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <GlancePanel />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/** Dense fact sheet: the eight things a reviewer asks first, in one screen. */
function GlancePanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-sm">
      <div className="flex items-center justify-between gap-4 border-b border-border bg-bg-subtle px-5 py-3">
        <p className="text-sm font-medium text-fg">Security at a glance</p>
        <p className="tabular font-mono text-[0.6875rem] text-fg-subtle">As of {AS_OF}</p>
      </div>
      <dl className="divide-y divide-border">
        {glanceRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 px-5 py-2.5 text-[0.8125rem] leading-snug"
          >
            <dt className="text-fg-muted">{row.label}</dt>
            <dd className="tabular text-right font-medium text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border bg-bg-subtle px-5 py-3 text-[0.8125rem] font-medium">
        <a
          href={SECURITY_TXT_PATH}
          className="group/arrow inline-flex items-center gap-1.5 text-fg-muted transition-colors duration-150 ease-standard hover:text-fg"
        >
          <span>security.txt</span>
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/arrow:translate-x-0.5"
          />
        </a>
        <Link
          href="/legal/subprocessors"
          className="group/arrow inline-flex items-center gap-1.5 text-fg-muted transition-colors duration-150 ease-standard hover:text-fg"
        >
          <span>Subprocessors</span>
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/arrow:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
