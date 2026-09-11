import * as React from "react";

import { cn } from "@/lib/utils";

/*
 * Decorative textures (DESIGN.md §4). All are aria-hidden, pointer-events-none and
 * sit at z -10, so the parent must create a stacking context (`Section` sets
 * `isolate`). Restraint: one texture per section, never behind running text.
 */

export type PatternProps = React.HTMLAttributes<HTMLDivElement>;

/** 1px dots on a 24px pitch in border-strong, fading radially to 0 at 70%. */
export function DotGrid({ className, ...props }: PatternProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 mask-radial-fade bg-[radial-gradient(var(--color-border-strong)_1px,transparent_1px)] bg-[length:24px_24px] bg-center",
        className,
      )}
      {...props}
    />
  );
}

/** Vertical rails at the container edges and center, `border` at 60%. */
export function HairlineGrid({ className, ...props }: PatternProps) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10", className)} {...props}>
      <div className="container-x h-full">
        <div className="relative h-full border-x border-border/60">
          <span className="absolute inset-y-0 left-1/2 hidden w-px bg-border/60 md:block" />
        </div>
      </div>
    </div>
  );
}

export interface GlowProps extends PatternProps {
  /** Where the single accent-soft blob sits. */
  position?: "top" | "center" | "top-right" | "bottom";
  /** Opacity 0–0.6. */
  opacity?: number;
}

const glowPositions: Record<NonNullable<GlowProps["position"]>, string> = {
  top: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-right": "right-0 top-0 translate-x-1/4 -translate-y-1/3",
  bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2",
};

/** One radial accent-soft blob, blur 120px. Never animated, at most one per section. */
export function Glow({ className, position = "top", opacity = 0.6, style, ...props }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 h-[28rem] w-[44rem] max-w-[140vw] rounded-full bg-accent-soft blur-[120px]",
        glowPositions[position],
        className,
      )}
      style={{ opacity: Math.min(0.6, Math.max(0, opacity)), ...style }}
      {...props}
    />
  );
}
