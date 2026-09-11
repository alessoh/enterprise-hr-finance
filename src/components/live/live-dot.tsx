import { cn } from "@/lib/utils";
import type { LiveStatus } from "@/lib/live/types";

const LABEL: Record<LiveStatus, string> = {
  connecting: "Connecting",
  live: "Live",
  reconnecting: "Reconnecting",
  paused: "Paused",
};

const TONE: Record<LiveStatus, string> = {
  connecting: "bg-fg-faint",
  live: "bg-success",
  reconnecting: "bg-warning",
  paused: "bg-fg-faint",
};

export interface LiveDotProps {
  status?: LiveStatus;
  /** Override the text beside the dot. */
  label?: string;
  className?: string;
}

/**
 * Pulsing status dot. The pulse is a CSS animation, so `prefers-reduced-motion`
 * (handled globally in globals.css) renders it static.
 */
export function LiveDot({ status = "live", label, className }: LiveDotProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2 text-xs font-medium text-fg-muted", className)}
      aria-live="polite"
    >
      <span aria-hidden className="relative inline-flex size-2 items-center justify-center">
        <span className={cn("absolute inline-flex size-2 rounded-full", TONE[status])} />
        {status === "live" ? (
          <span className="absolute inline-flex size-2 animate-ping rounded-full bg-success/60" />
        ) : null}
      </span>
      {label ?? LABEL[status]}
    </span>
  );
}
