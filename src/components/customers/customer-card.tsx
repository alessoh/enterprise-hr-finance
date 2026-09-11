import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { agentsForCustomer } from "@/components/customers/lib";
import { CompactMetric } from "@/components/customers/metric-stat";
import { PartnerWordmark } from "@/components/customers/partner-wordmark";
import { Card } from "@/components/ui/card";
import type { CaseStudy, Customer } from "@/content/types";
import { agentPath, customerPath } from "@/lib/seo/routes";

export interface CustomerCardProps {
  customer: Customer;
  /** When present, the card links to the story. */
  study?: CaseStudy;
}

/**
 * Results card. Same anatomy as the story tiles above it — ruled wordmark band, then
 * the body — so the page reads as one component family: one radius, one hairline
 * weight, one "Read the story" affordance in the footer.
 */
export function CustomerCard({ customer, study }: CustomerCardProps) {
  const agents = agentsForCustomer(customer);
  return (
    <Card
      as="article"
      id={customer.slug}
      padding="none"
      interactive={Boolean(study)}
      className="group flex h-full scroll-mt-28 flex-col overflow-hidden"
      aria-labelledby={`${customer.slug}-name`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border bg-bg-subtle px-6 py-4 lg:px-7">
        <PartnerWordmark
          name={customer.name}
          fallback={customer.logoText}
          className="origin-left [zoom:1.2]"
        />
        <span className="eyebrow shrink-0 text-fg-subtle">{customer.region}</span>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6 lg:px-7">
        <p id={`${customer.slug}-name`} className="sr-only">
          {customer.name}
        </p>
        <p className="text-[0.8125rem] text-fg-muted">
          {customer.industry} · <span className="tabular">{customer.size}</span>
        </p>

        <ul className="relative z-10 mt-4 flex flex-wrap gap-2" aria-label={`Agents ${customer.name} runs`}>
          {agents.map((agent) => (
            <li key={agent.slug}>
              <Link
                href={agentPath(agent.slug)}
                className="inline-flex h-6 items-center rounded-full border border-border bg-bg-elevated px-2.5 text-xs font-medium whitespace-nowrap text-fg-muted transition-colors duration-150 ease-standard hover:border-border-strong hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
              >
                {agent.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul
          className="mt-6 grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          aria-label={`Results at ${customer.name}`}
        >
          {customer.results.map((metric) => (
            <li key={metric.label} className="py-4 sm:px-5 sm:py-0 sm:pt-5 sm:first:pl-0 sm:last:pr-0">
              <CompactMetric metric={metric} />
            </li>
          ))}
        </ul>

        {study ? (
          <div className="mt-auto flex items-center justify-end border-t border-border pt-4 text-[0.8125rem]">
            <Link
              href={customerPath(study.slug)}
              className="inline-flex items-center gap-1.5 font-medium text-fg outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ring"
            >
              Read the story
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
