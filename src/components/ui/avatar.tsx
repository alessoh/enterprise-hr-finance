import * as React from "react";

import { cn, initials } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<AvatarSize, string> = {
  xs: "size-6 text-[0.625rem]",
  sm: "size-8 text-xs",
  md: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-xl",
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name; initials are derived. */
  name: string;
  size?: AvatarSize;
  /** Ink fill for the author of a quote; muted stone by default. */
  tone?: "muted" | "ink" | "accent";
}

/** Initials avatar. No photos anywhere on the site (BRIEF §4). */
export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { name, size = "md", tone = "muted", className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={name}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-[0.02em] select-none",
        tone === "muted" && "border border-border bg-bg-muted text-fg-muted",
        tone === "ink" && "bg-fg text-bg",
        tone === "accent" && "bg-accent-soft text-accent-hover",
        sizes[size],
        className,
      )}
      {...props}
    >
      {initials(name)}
    </span>
  );
});
