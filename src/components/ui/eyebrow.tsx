import * as React from "react";

import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "div" | "h2" | "h3";
  tone?: "muted" | "accent" | "fg";
  /** Adds a status dot. `live` pulses (for real-time sections only). */
  dot?: boolean | "live";
}

const tones = {
  muted: "text-fg-muted",
  accent: "text-accent",
  fg: "text-fg",
} as const;

export const Eyebrow = React.forwardRef<HTMLElement, EyebrowProps>(function Eyebrow(
  { as = "p", tone = "muted", dot = false, className, children, ...props },
  ref,
) {
  const Comp = as as "p";
  return (
    <Comp
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cn("eyebrow inline-flex items-center gap-2", tones[tone], className)}
      {...props}
    >
      {dot ? (
        <span
          aria-hidden
          className={cn(
            "inline-block size-1.5 rounded-full bg-success",
            dot === "live" && "animate-pulse-dot",
          )}
        />
      ) : null}
      {children}
    </Comp>
  );
});
