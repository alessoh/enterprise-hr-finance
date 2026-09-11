import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { timelineWeeks } from "@/components/customers/lib";
import { PartnerWordmark } from "@/components/customers/partner-wordmark";
import { FootnoteRef } from "@/components/ui/footnote";
import type { CaseStudy, Customer, Metric } from "@/content/types";
import { customerPath } from "@/lib/seo/routes";
import { cn, formatNumber } from "@/lib/utils";

/**
 * Figure set from a content Metric. The unit sits tight at the numeral's own weight, so
 * the figure reads as one thing rather than a three-size cluster (DESIGN.md section 12).
 * Falls back to the preformatted string when the metric has no numeric value.
 */
function Figure({ metric, className }: { metric: Metric; className?: string }) {
  const n = metric.numeric;
  const unit = metric.suffix?.trim();
  return (
    <span className={cn("tabular inline-flex items-baseline leading-none whitespace-nowrap text-fg", className)}>
      {typeof n === "number" ? (
        <>
          {metric.prefix ? <span>{metric.prefix}</span> : null}
          <span>{formatNumber(n, { decimals: Number.isInteger(n) ? 0 : 1 })}</span>
          {unit ? <span className="ml-[0.04em] text-[0.82em] tracking-[-0.02em]">{unit}</span> : null}
        </>
      ) : (
        <span>{metric.value}</span>
      )}
    </span>
  );
}

export interface StoryTileProps {
  study: CaseStudy;
  customer: Customer;
  /** `lead` sets the headline figure larger and adds the deployment summary. */
  size?: "lead" | "compact";
  /** Heading level for the title, so the page's outline never skips a level. */
  as?: "h2" | "h3";
  className?: string;
}

/**
 * One case study, set as a tile with a fixed anatomy so three of them read as one
 * component: ruled wordmark band, headline result, result-led title, two secondary
 * results on a hairline rail, and the single "Read the story" affordance. There is no
 * partner photography or brand art, so the identity is the partner's own wordmark set
 * large in the band and the figures set in tabular numerals.
 */
export function StoryTile({
  study,
  customer,
  size = "compact",
  as: Heading = "h3",
  className,
}: StoryTileProps) {
  const lead = size === "lead";
  const [headline, ...rest] = customer.results;
  const secondary = rest.slice(0, 2);
  const weeks = timelineWeeks(study.timeline);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated transition-[border-color,box-shadow] duration-200 ease-standard hover:border-border-strong hover:shadow-sm focus-within:border-border-strong",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-border bg-bg-subtle px-6 py-4 lg:px-7">
        <PartnerWordmark
          name={customer.name}
          fallback={customer.logoText}
          size="lg"
        />
        <span className="eyebrow tabular shrink-0 text-fg-subtle">{weeks} weeks</span>
      </div>

      <div className={cn("flex flex-1 flex-col px-6 pt-7 pb-6 lg:px-7", lead && "lg:pt-8")}>
        <p>
          <Figure
            metric={headline}
            className={lead ? "text-[3.25rem] tracking-[-0.03em]" : "text-[2.5rem] tracking-[-0.03em]"}
          />
        </p>
        <p
          className={cn(
            "mt-3 max-w-[32ch] text-pretty text-fg-muted",
            lead ? "text-[0.9375rem] leading-6" : "text-[0.8125rem] leading-5",
          )}
        >
          {headline.label}
          {headline.footnote ? <FootnoteRef n={1} /> : null}
        </p>

        <Heading
          className={cn(
            "mt-7 font-medium text-balance hyphens-none text-fg",
            lead ? "text-[1.375rem] leading-[1.3] tracking-[-0.01em]" : "text-[1.0625rem] leading-[1.4]",
          )}
        >
          <Link
            href={customerPath(study.slug)}
            className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-ring"
          >
            {study.title}
          </Link>
        </Heading>

        <p
          className={cn(
            "mt-4 text-pretty text-fg-muted",
            lead ? "max-w-[48ch] text-[0.875rem] leading-6" : "max-w-[62ch] text-[0.8125rem] leading-6",
          )}
        >
          {study.subtitle}
        </p>

        <div className="mt-auto pt-8">
          <dl className="grid grid-cols-2 gap-x-6 border-t border-border pt-5">
            {secondary.map((metric, index) => (
              <div key={metric.label} className={cn("min-w-0", index > 0 && "border-l border-border pl-6")}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <Figure metric={metric} className="text-[1.5rem] tracking-[-0.02em]" />
                  <span className="mt-2 block text-[0.8125rem] leading-5 text-pretty text-fg-muted">
                    {metric.label}
                    {metric.footnote ? <FootnoteRef n={1} /> : null}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4 text-[0.8125rem] text-fg-muted">
            {/* The partner size is already in the summary above, so the footer carries
                the industry only and never truncates in the narrow column. */}
            <span className="min-w-0 truncate">{customer.industry}</span>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-medium text-fg">
              Read the story
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
