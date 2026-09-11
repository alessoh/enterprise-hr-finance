import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/content/types";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";

import { CheckoutButton, SALES_HREF, type BillingInterval } from "./checkout-button";

export interface PlanCardProps {
  plan: Plan;
  interval: BillingInterval;
}

const ctaCaption: Record<Plan["id"], string> = {
  starter: "14 days free, no card required.",
  growth: "Month to month, cancel anytime.",
  enterprise: "Annual or multi-year agreements.",
};

/**
 * Features that merely restate the credits line or a limits cell are dropped so
 * the card never says the same thing twice. A feature survives when it adds
 * detail beyond the limit (e.g. "Email support, next-business-day response").
 */
function distinctFeatures(plan: Plan): string[] {
  const creditsPrefix = plan.credits != null ? `${formatNumber(plan.credits)} credits` : null;
  const limitValues = Object.values(plan.limits)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.toLowerCase());
  return plan.features.filter((feature) => {
    if (creditsPrefix && feature.startsWith(creditsPrefix)) return false;
    const lower = feature.toLowerCase();
    return !limitValues.some((limit) => lower.includes(limit) && feature.length < limit.length + 12);
  });
}

export function PlanCard({ plan, interval }: PlanCardProps) {
  const highlighted = Boolean(plan.highlighted);
  const price = interval === "annual" ? plan.priceAnnualMonthly : plan.priceMonthly;
  const custom = price == null;
  const headingId = `plan-${plan.id}-name`;

  const caption = custom
    ? "Custom credit pools and terms"
    : interval === "annual"
      ? `per month, billed annually at ${formatCurrency(price * 12)} a year`
      // Monthly needs no caption: "/mo" beside the figure already says it, and
      // "per month, billed monthly" says the same thing a second time.
      : null;

  const limits: { label: string; value: string }[] = [
    { label: "Agents", value: plan.limits.agents },
    { label: "Workspaces", value: plan.limits.workspaces },
    { label: "Support", value: plan.limits.support },
    ...(plan.limits.sla ? [{ label: "SLA", value: plan.limits.sla }] : []),
  ];
  const features = distinctFeatures(plan);

  return (
    <article
      id={`plan-${plan.id}`}
      aria-labelledby={headingId}
      className={cn(
        "relative flex h-full scroll-mt-28 flex-col rounded-lg border bg-bg-elevated p-6 lg:p-7",
        highlighted
          ? "border-fg/15 bg-bg-subtle shadow-md max-lg:order-first"
          : "border-border",
      )}
    >
      <header>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 id={headingId} className="text-h4">
            {plan.name}
          </h2>
          {highlighted ? <Badge variant="accent">Recommended for most teams</Badge> : null}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{plan.description}</p>
      </header>

      <div className="mt-7">
        {custom ? (
          // Same face, size and baseline as the numerals so the three price rows and the
          // dividers below them line up; only the tracking is eased, because a word of
          // letters reads wider than "$2,499" at the same setting.
          <p className="flex items-baseline text-fg">
            <span className="text-[2.75rem] leading-none font-medium tracking-[-0.035em]">Custom</span>
          </p>
        ) : (
          <p className="flex items-baseline gap-1 text-fg">
            <span className="tabular text-[2.75rem] leading-none font-medium tracking-[-0.03em]">
              {formatCurrency(price)}
            </span>
            <span className="text-base font-medium text-fg-muted">/mo</span>
          </p>
        )}
        {/* The row is always present, even when empty, so the divider below sits on the
            same baseline in all three cards whichever billing interval is selected. */}
        <p className="tabular mt-2.5 min-h-[2.5rem] text-[0.8125rem] leading-snug text-fg-subtle">
          {caption}
        </p>
      </div>

      <div className="mt-6 border-t border-border pt-5">
        <p className="tabular text-sm font-medium text-fg">
          {plan.credits != null ? `${formatNumber(plan.credits)} credits per month` : "Custom credit pool"}
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-[0.8125rem] leading-snug">
          {limits.map((limit) => (
            <div key={limit.label}>
              <dt className="text-fg-subtle">{limit.label}</dt>
              <dd className="tabular mt-0.5 text-fg">{limit.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm leading-snug text-fg-muted">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2.5">
            <Check aria-hidden className="mt-px size-4 shrink-0 text-fg" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        {plan.id === "enterprise" ? (
          <Button asChild variant="secondary" className="w-full">
            <Link href={SALES_HREF}>Talk to sales</Link>
          </Button>
        ) : (
          <CheckoutButton planId={plan.id} interval={interval} variant={highlighted ? "primary" : "secondary"}>
            {plan.cta.label}
          </CheckoutButton>
        )}
        <p className="mt-3 text-center text-xs leading-snug text-fg-subtle">{ctaCaption[plan.id]}</p>
      </div>
    </article>
  );
}
