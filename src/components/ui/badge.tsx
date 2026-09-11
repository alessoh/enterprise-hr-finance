import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeVariant = "neutral" | "accent" | "success" | "warning" | "danger" | "ink";

const variants: Record<BadgeVariant, string> = {
  neutral: "border border-border bg-bg-elevated text-fg-muted",
  accent: "bg-accent-soft text-accent-hover",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  ink: "bg-fg text-bg",
};

const dotColors: Record<BadgeVariant, string> = {
  neutral: "bg-fg-subtle",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  ink: "bg-bg",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  /** Leading 6px dot. Pass a variant name to color the dot independently. */
  dot?: boolean | BadgeVariant;
  size?: "sm" | "md";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "neutral", dot = false, size = "md", className, children, ...props },
  ref,
) {
  const dotVariant = typeof dot === "string" ? dot : variant;
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
        size === "md" ? "h-[22px] px-2.5 text-xs" : "h-[18px] px-2 text-[0.6875rem]",
        variants[variant],
        className,
      )}
      {...props}
    >
      {dot ? (
        <span aria-hidden className={cn("size-1.5 rounded-full", dotColors[dotVariant])} />
      ) : null}
      {children}
    </span>
  );
});

/** Accepts both the display label and the content-module id. */
export type AgentStatus = "GA" | "Early access" | "ga" | "early-access";

export interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "dot" | "children"> {
  status: AgentStatus;
}

/** Presets: GA = neutral with a success dot; Early access = accent. */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(function StatusBadge(
  { status, ...props },
  ref,
) {
  const isGa = status === "GA" || status === "ga";
  return isGa ? (
    <Badge ref={ref} variant="neutral" dot="success" {...props}>
      GA
    </Badge>
  ) : (
    <Badge ref={ref} variant="accent" {...props}>
      Early access
    </Badge>
  );
});
