import * as React from "react";

import { cn } from "@/lib/utils";

export interface WindowFrameProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 12px title in the chrome bar. */
  title?: React.ReactNode;
  /** Optional URL pill, e.g. "app.meridian.example/registry". */
  url?: string;
  /** Right slot in the chrome bar, e.g. a status badge. */
  actions?: React.ReactNode;
  shadow?: "lg" | "md" | "none";
  bodyClassName?: string;
}

/**
 * Product mockup chrome: bg-elevated, ring + shadow-lg, radius xl, 40px title bar with
 * three neutral dots. Mockups inside are HTML, not images (DESIGN.md §6).
 */
export const WindowFrame = React.forwardRef<HTMLDivElement, WindowFrameProps>(function WindowFrame(
  { title, url, actions, shadow = "lg", className, bodyClassName, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border",
        shadow === "lg" && "shadow-lg",
        shadow === "md" && "shadow-md",
        className,
      )}
      {...props}
    >
      <div className="relative flex h-10 shrink-0 items-center gap-3 border-b border-border bg-bg-subtle px-4">
        <div aria-hidden className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </div>
        {url ? (
          <div className="pointer-events-none absolute inset-x-0 flex justify-center px-24">
            <span className="tabular inline-flex h-6 max-w-full items-center truncate rounded-md border border-border bg-bg-elevated px-2.5 font-mono text-[0.6875rem] text-fg-subtle">
              {url}
            </span>
          </div>
        ) : title ? (
          <div className="pointer-events-none absolute inset-x-0 flex justify-center px-24">
            <span className="truncate text-xs font-medium text-fg-muted">{title}</span>
          </div>
        ) : null}
        {actions ? <div className="ml-auto flex items-center gap-2">{actions}</div> : null}
      </div>
      <div className={cn("relative min-w-0 flex-1 text-[0.8125rem] leading-normal text-fg", bodyClassName)}>
        {children}
      </div>
    </div>
  );
});
