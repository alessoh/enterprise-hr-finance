import Link from "next/link";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { homeCopy } from "@/content/home";
import { creditRates, overagePerCredit, plans } from "@/content/pricing";
import type { Plan } from "@/content/types";
import { siteConfig } from "@/lib/site";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

function PlanCard({ plan }: { plan: Plan }) {
  const custom = plan.priceMonthly == null;
  const rows: Array<[string, string]> = [
    ["Credits", plan.credits == null ? "Custom pools" : `${formatNumber(plan.credits)} per month`],
    ["Agents", plan.limits.agents],
    ["Workspaces", plan.limits.workspaces],
    ["Support", plan.limits.support],
  ];
  return (
    <Card
      as="article"
      aria-labelledby={`plan-${plan.id}`}
      className={cn("flex h-full flex-col", plan.highlighted && "border-border-strong")}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 id={`plan-${plan.id}`} className="text-h5 text-fg">
          {plan.name}
        </h3>
        {plan.highlighted ? <Badge variant="accent">Recommended</Badge> : null}
      </div>
      <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-fg-muted">{plan.description}</p>
      <p className="mt-6 flex items-baseline gap-1.5 text-fg">
        <span className="tabular text-[2.25rem] leading-none font-medium tracking-[-0.025em]">
          {custom ? "Custom" : formatCurrency(plan.priceMonthly ?? 0, { cents: false })}
        </span>
        {custom ? null : <span className="text-sm text-fg-muted">per month</span>}
      </p>
      <p className="text-caption mt-2">
        {custom
          ? "Annual agreement sized to your credit commitment"
          : `${formatCurrency(plan.priceAnnualMonthly ?? 0, { cents: false })} per month billed annually`}
      </p>
      <dl className="mt-6 border-t border-border text-sm">
        {rows.map(([term, detail]) => (
          <div key={term} className="flex items-baseline justify-between gap-4 border-b border-border py-2.5">
            <dt className="text-fg-muted">{term}</dt>
            <dd className="tabular text-right font-medium text-fg">{detail}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto pt-6">
        <Button asChild variant={plan.highlighted ? "primary" : "secondary"} className="w-full">
          <Link href={plan.cta.href}>{plan.cta.label}</Link>
        </Button>
      </div>
    </Card>
  );
}

const sampleRates = creditRates.filter((rate) =>
  ["help-desk", "recruiting", "audit", "contract-review"].includes(rate.agentSlug),
);

export function PricingTeaser() {
  const copy = homeCopy.sections.pricing;
  return (
    <Section aria-labelledby="pricing-heading" id="pricing">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={copy.eyebrow}
            title={<span id="pricing-heading">{copy.title}</span>}
            lede={copy.lede}
            actions={<ArrowLink href={siteConfig.links.pricing}>Compare plans and estimate credits</ArrowLink>}
          />
        </Reveal>
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <RevealItem key={plan.id} className="h-full">
              <PlanCard plan={plan} />
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal>
          <p className="mt-8 max-w-[80ch] text-sm leading-relaxed text-fg-muted">
            One credit rate card for every plan.{" "}
            {sampleRates.map((rate, index) => (
              <span key={rate.agentSlug}>
                {rate.action} is <span className="tabular font-medium text-fg">{rate.credits}</span>{" "}
                {rate.credits === 1 ? "credit" : "credits"}
                {index < sampleRates.length - 1 ? ", " : ". "}
              </span>
            ))}
            Usage beyond the plan is billed at{" "}
            <span className="tabular font-medium text-fg">{formatCurrency(overagePerCredit, { cents: true })}</span> per
            credit. Annual billing is 20% below monthly.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
