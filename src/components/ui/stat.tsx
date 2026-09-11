import * as React from "react";

import { FootnoteRef } from "@/components/ui/footnote";
import { cn } from "@/lib/utils";

export interface StatDelta {
  /** Preformatted, e.g. "12%" or "3 days". */
  value: string;
  direction: "up" | "down";
  /** Whether the direction is good news. Defaults to up = success, down = danger. */
  tone?: "success" | "danger" | "neutral";
}

export interface StatProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  /** The figure. Pass an <AnimatedNumber/> for count-ups. */
  value: React.ReactNode;
  /** Leading glyph rendered at full size, e.g. "~" or "$". */
  prefix?: React.ReactNode;
  /** Unit rendered inline at 60% size, e.g. "%", "hrs", "days". */
  unit?: React.ReactNode;
  label: React.ReactNode;
  /** 1-based footnote number. Renders a superscript marker linking to #fn-n. */
  footnote?: number;
  footnoteScope?: string;
  delta?: StatDelta;
  size?: "md" | "lg";
  align?: "left" | "center";
}

const deltaTone: Record<NonNullable<StatDelta["tone"]>, string> = {
  success: "text-success",
  danger: "text-danger",
  neutral: "text-fg-muted",
};

/** Stat block: 48–56px tabular figure, unit inline, label below, optional delta. */
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(function Stat(
  {
    value,
    prefix,
    unit,
    label,
    footnote,
    footnoteScope,
    delta,
    size = "lg",
    align = "left",
    className,
    ...props
  },
  ref,
) {
  const tone = delta?.tone ?? (delta?.direction === "up" ? "success" : "danger");
  return (
    <div
      ref={ref}
      className={cn("flex flex-col", align === "center" && "items-center text-center", className)}
      {...props}
    >
      {/* The figure reads as one thing: the unit sits tight at the numeral's own weight
          rather than shrinking to 60% and changing colour. The footnote marker rides
          the label, so the number is never a three-size cluster. */}
      <div
        className={cn(
          "flex items-baseline whitespace-nowrap text-fg",
          size === "lg" ? "text-stat" : "text-[2rem] leading-none font-medium tracking-[-0.025em] tabular",
        )}
      >
        {prefix ? <span>{prefix}</span> : null}
        <span>{value}</span>
        {unit ? <span className="ml-[0.04em] text-[0.82em] tracking-[-0.02em]">{unit}</span> : null}
      </div>
      <div className={cn("mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1", align === "center" && "justify-center")}>
        <p className="text-sm text-fg-muted">
          {label}
          {footnote ? <FootnoteRef n={footnote} scope={footnoteScope} /> : null}
        </p>
        {delta ? (
          <span className={cn("tabular text-[0.8125rem] font-medium", deltaTone[tone])}>
            <span aria-hidden>{delta.direction === "up" ? "▲" : "▼"}</span>
            <span className="sr-only">{delta.direction === "up" ? "Up" : "Down"}</span> {delta.value}
          </span>
        ) : null}
      </div>
    </div>
  );
});

export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 3 or 4 columns on lg. Hairline dividers between cells, no cards. */
  columns?: 2 | 3 | 4;
}

export const StatGrid = React.forwardRef<HTMLDivElement, StatGridProps>(function StatGrid(
  { columns = 4, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-10",
        columns === 2 && "lg:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        columns === 4 && "lg:grid-cols-4",
        "lg:gap-x-0 lg:[&>*]:px-8 lg:[&>*+*]:border-l lg:[&>*+*]:border-border lg:[&>*:first-child]:pl-0 lg:[&>*:last-child]:pr-0",
        className,
      )}
      {...props}
    />
  );
});
