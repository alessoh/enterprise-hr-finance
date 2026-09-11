import { cn, formatCurrency, formatDate, formatNumber } from "@/lib/utils";
import type { CreditsUsage } from "@/lib/live/types";

export function CreditsMeter({ credits, className }: { credits: CreditsUsage; className?: string }) {
  const used = Math.min(1, credits.usedMonthToDate / credits.allowance);
  const projected = Math.min(1, credits.projectedMonthEnd / credits.allowance);
  const over = credits.projectedMonthEnd > credits.allowance;
  const overageCost = over
    ? (credits.projectedMonthEnd - credits.allowance) * credits.overagePerCredit
    : 0;

  return (
    <section className={cn("p-4", className)} aria-labelledby="credits-heading">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="credits-heading"
          className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle"
        >
          Credits · {credits.planName} plan
        </h2>
        <span className="tabular text-[11.5px] text-fg-subtle">{credits.daysLeft} days left</span>
      </div>

      <p className="tabular mt-3 text-xl font-medium tracking-[-0.02em] text-fg">
        {formatNumber(credits.usedMonthToDate)}
        <span className="text-fg-subtle"> / {formatNumber(credits.allowance)}</span>
      </p>

      <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-bg-muted">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent-soft"
          style={{ width: `${projected * 100}%` }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          style={{ width: `${used * 100}%` }}
          aria-hidden
        />
      </div>

      <dl className="mt-3 space-y-1.5 text-[12px]">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-fg-muted">Used today</dt>
          <dd className="tabular text-fg">{formatNumber(credits.usedToday)}</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-fg-muted">Projected at month end</dt>
          <dd className={cn("tabular", over ? "text-warning" : "text-fg")}>
            {formatNumber(credits.projectedMonthEnd)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="text-fg-muted">{over ? "Estimated overage" : "Resets"}</dt>
          <dd className="tabular text-fg">
            {over ? formatCurrency(overageCost) : formatDate(credits.resetsOn, "short")}
          </dd>
        </div>
      </dl>
    </section>
  );
}
