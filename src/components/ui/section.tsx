import * as React from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export type SectionSpacing = "default" | "compact" | "none";
export type SectionBackground = "default" | "subtle" | "muted" | "elevated";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "aside" | "header" | "footer";
  spacing?: SectionSpacing;
  background?: SectionBackground;
  /** Structural hairlines. Use when the background changes from the neighbor. */
  bordered?: "top" | "bottom" | "both" | "none";
}

const backgrounds: Record<SectionBackground, string> = {
  default: "bg-bg",
  subtle: "bg-bg-subtle",
  muted: "bg-bg-muted",
  elevated: "bg-bg-elevated",
};

const spacings: Record<SectionSpacing, string> = {
  default: "section",
  compact: "section-compact",
  none: "",
};

export const Section = React.forwardRef<HTMLElement, SectionProps>(function Section(
  { as = "section", spacing = "default", background = "default", bordered = "none", className, ...props },
  ref,
) {
  const Comp = as as "section";
  return (
    <Comp
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "relative isolate",
        spacings[spacing],
        backgrounds[background],
        (bordered === "top" || bordered === "both") && "border-t border-border",
        (bordered === "bottom" || bordered === "both") && "border-b border-border",
        className,
      )}
      {...props}
    />
  );
});

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: React.ReactNode;
  /** Live dot next to the eyebrow. Only for real-time sections. */
  live?: boolean;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level. Visual size follows `size`, not the level. */
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2" | "h3";
  /** Right-aligned actions on desktop (e.g. an ArrowLink). Left-aligned headers only. */
  actions?: React.ReactNode;
  titleClassName?: string;
  ledeClassName?: string;
}

/** Eyebrow -> heading (<= 8 words) -> 1-2 sentence lede. The standard section opener. */
export function SectionHeader({
  eyebrow,
  live = false,
  title,
  lede,
  align = "left",
  as = "h2",
  size,
  actions,
  className,
  titleClassName,
  ledeClassName,
  ...props
}: SectionHeaderProps) {
  const Heading = as;
  const visual = size ?? as;
  const centered = align === "center";
  return (
    <div
      className={cn(
        "mb-12 flex flex-col gap-6 lg:mb-16",
        centered && "mx-auto items-center text-center",
        !centered && actions && "md:flex-row md:items-end md:justify-between",
        className,
      )}
      {...props}
    >
      <div className={cn("flex max-w-2xl flex-col gap-4", centered && "items-center")}>
        {eyebrow ? <Eyebrow dot={live ? "live" : false}>{eyebrow}</Eyebrow> : null}
        <Heading
          className={cn(
            visual === "h1" && "text-h1",
            visual === "h2" && "text-h2",
            visual === "h3" && "text-h3",
            titleClassName,
          )}
        >
          {title}
        </Heading>
        {lede ? <p className={cn("text-lede max-w-[60ch]", ledeClassName)}>{lede}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </div>
  );
}
