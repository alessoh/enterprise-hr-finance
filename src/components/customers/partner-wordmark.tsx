import { partnerWordmarks } from "@/components/ui/logo-wall";
import { cn } from "@/lib/utils";

export interface PartnerWordmarkProps {
  /** Customer name; matched against the logo-wall wordmarks. */
  name: string;
  /** Plain-text fallback (customer.logoText) when no wordmark exists. */
  fallback?: string;
  className?: string;
}

/** One design-partner wordmark at its logo-wall size (32px row), in ink. */
export function PartnerWordmark({ name, fallback, className }: PartnerWordmarkProps) {
  const wordmark = partnerWordmarks.find((w) => w.name === name);
  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={cn("inline-flex h-8 shrink-0 items-center text-fg", className)}
    >
      {wordmark ? (
        wordmark.mark
      ) : (
        <span className="text-sm font-semibold tracking-[0.2em]">{fallback ?? name.toUpperCase()}</span>
      )}
    </span>
  );
}
