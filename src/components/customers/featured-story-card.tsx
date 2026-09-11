import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CompactMetric } from "@/components/customers/metric-stat";
import { PartnerWordmark } from "@/components/customers/partner-wordmark";
import { timelineWeeks } from "@/components/customers/lib";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { CaseStudy, Customer } from "@/content/types";
import { customerPath } from "@/lib/seo/routes";

export interface FeaturedStoryCardProps {
  study: CaseStudy;
  customer: Customer;
}

/** Large case-study card: wordmark, result-led title, two results, meta, arrow. Whole card is the link. */
export function FeaturedStoryCard({ study, customer }: FeaturedStoryCardProps) {
  const weeks = timelineWeeks(study.timeline);
  return (
    <Card as="article" padding="lg" interactive className="group flex h-full flex-col">
      <div className="flex items-center justify-between gap-4">
        <PartnerWordmark name={customer.name} fallback={customer.logoText} />
        <Badge variant="neutral">{customer.industry}</Badge>
      </div>
      <h3 className="mt-8 text-[1.25rem] leading-[1.3] font-medium tracking-[-0.01em] text-balance text-fg">
        <Link
          href={customerPath(study.slug)}
          className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ring"
        >
          {study.title}
        </Link>
      </h3>
      <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 [&>*+*]:border-l [&>*+*]:border-border [&>*+*]:pl-6">
        {customer.results.slice(0, 2).map((metric) => (
          <CompactMetric key={metric.label} metric={metric} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-4 pt-8 text-[0.8125rem] text-fg-muted">
        <span className="tabular">
          {customer.size} · {weeks} weeks
        </span>
        <span className="inline-flex items-center gap-1.5 font-medium text-fg">
          Read the story
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Card>
  );
}
