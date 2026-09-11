import { AnimatedNumber } from "@/components/ui/animated-number";
import { FootnoteRef } from "@/components/ui/footnote";
import { Stat, type StatProps } from "@/components/ui/stat";
import type { Metric } from "@/content/types";
import { cn, formatNumber } from "@/lib/utils";

function decimalsFor(n: number): number {
  return Number.isInteger(n) ? 0 : 1;
}

export interface MetricStatProps
  extends Omit<StatProps, "value" | "label" | "footnote" | "prefix" | "unit"> {
  metric: Metric;
  /** Footnote number used when the metric carries a footnote. */
  footnote?: number;
  /** Count up from 0 when the metric has a numeric value. */
  animate?: boolean;
}

/** Full-size Stat built from a content Metric. Marker only when the metric is a modeled outcome. */
export function MetricStat({ metric, footnote = 1, animate = true, ...props }: MetricStatProps) {
  const n = metric.numeric;
  if (typeof n !== "number") {
    return <Stat value={metric.value} label={metric.label} footnote={metric.footnote ? footnote : undefined} {...props} />;
  }
  const decimals = decimalsFor(n);
  return (
    <Stat
      prefix={metric.prefix}
      value={animate ? <AnimatedNumber value={n} decimals={decimals} /> : formatNumber(n, { decimals })}
      unit={metric.suffix?.trim() || undefined}
      label={metric.label}
      footnote={metric.footnote ? footnote : undefined}
      {...props}
    />
  );
}

export interface CompactMetricProps {
  metric: Metric;
  footnote?: number;
  className?: string;
}

/** 28px figure with its label, for result grids inside cards. */
export function CompactMetric({ metric, footnote = 1, className }: CompactMetricProps) {
  const n = metric.numeric;
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="tabular flex items-baseline gap-0.5 text-[1.75rem] leading-none font-medium tracking-[-0.025em] whitespace-nowrap text-fg">
        {typeof n === "number" ? (
          <>
            {metric.prefix ? <span>{metric.prefix}</span> : null}
            <span>{formatNumber(n, { decimals: decimalsFor(n) })}</span>
            {metric.suffix?.trim() ? (
              <span className="ml-0.5 text-[0.6em] font-medium tracking-[-0.01em] text-fg-muted">{metric.suffix.trim()}</span>
            ) : null}
          </>
        ) : (
          <span>{metric.value}</span>
        )}
        {metric.footnote ? <FootnoteRef n={footnote} className="ml-1 self-start tracking-normal" /> : null}
      </div>
      <p className="text-[0.8125rem] leading-snug text-pretty text-fg-muted">{metric.label}</p>
    </div>
  );
}
