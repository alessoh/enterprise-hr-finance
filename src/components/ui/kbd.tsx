import * as React from "react";

import { cn } from "@/lib/utils";

export type KbdProps = React.HTMLAttributes<HTMLElement>;

/** Keyboard key: 20px tall, mono 11px, hairline with a 2px bottom edge. */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(function Kbd({ className, ...props }, ref) {
  return (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center rounded-sm border border-border-strong border-b-2 bg-bg-elevated px-1.5 font-mono text-[0.6875rem] leading-none font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
});
