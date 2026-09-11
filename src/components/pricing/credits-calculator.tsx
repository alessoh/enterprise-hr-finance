"use client";

import * as React from "react";

import { FootnoteRef } from "@/components/ui/footnote";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculatorDefaults,
  calculatorModel,
  estimateCredits,
  overagePerCredit,
  plans,
  type CalculatorInputs,
} from "@/content/pricing";
import type { Plan } from "@/content/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface FieldSpec {
  key: keyof CalculatorInputs;
  label: string;
  max: number;
  step: number;
  /** What the number drives, in one clause. */
  note: string;
}

const fields: FieldSpec[] = [
  { key: "employees", label: "Employees", max: 50_000, step: 100, note: "Sets the per-employee view" },
  { key: "hrCasesPerMonth", label: "HR cases per month", max: 20_000, step: 50, note: "2 credits each" },
  { key: "hiresPerMonth", label: "Hires per month", max: 500, step: 1, note: "25 candidates screened per hire, 1 credit each" },
  { key: "invoicesPerMonth", label: "Invoices per month", max: 100_000, step: 100, note: "5 credits per 100 transactions tested" },
  { key: "contractsPerMonth", label: "Contracts per month", max: 1_000, step: 5, note: "8 credits each" },
];

const growthCredits = plans.find((plan) => plan.id === "growth")?.credits ?? 30_000;
const starterCredits = plans.find((plan) => plan.id === "starter")?.credits ?? 5_000;

function clamp(value: number, max: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(max, Math.max(0, Math.round(value)));
}

function reasonFor(planId: Plan["id"], credits: number): string {
  const total = formatNumber(credits);
  switch (planId) {
    case "starter":
      return `${total} credits a month sits inside the Starter allowance of ${formatNumber(starterCredits)}.`;
    case "growth":
      return `${total} credits a month is past Starter's ${formatNumber(starterCredits)} and inside Growth's ${formatNumber(growthCredits)}.`;
    default:
      return `${total} credits a month is past Growth's ${formatNumber(growthCredits)}, so a custom pool costs less than overage.`;
  }
}

/**
 * Interactive estimate. State starts at `calculatorDefaults`, so the server
 * renders a complete, meaningful estimate before hydration; the inputs simply
 * re-run the same pure `estimateCredits` on the client.
 */
export function CreditsCalculator() {
  const [inputs, setInputs] = React.useState<CalculatorInputs>({ ...calculatorDefaults });

  function setField(key: keyof CalculatorInputs, value: number, max: number) {
    setInputs((prev) => ({ ...prev, [key]: clamp(value, max) }));
  }

  const result = estimateCredits(inputs);
  const recommended = plans.find((plan) => plan.id === result.recommendedPlanId) ?? plans[1];
  const allowance = recommended.credits;
  const barAllowance = allowance ?? growthCredits;
  const barLabel = allowance == null ? `Growth allowance` : `${recommended.name} allowance`;

  const overageCredits = allowance == null ? 0 : Math.max(0, result.credits.total - allowance);
  const overageCost = overageCredits * overagePerCredit;
  const monthlyCost = recommended.priceMonthly == null ? null : recommended.priceMonthly + overageCost;

  const scale = Math.max(result.credits.total, barAllowance, 1);
  const estimatePct = (result.credits.total / scale) * 100;
  const allowancePct = (barAllowance / scale) * 100;

  const perEmployee = inputs.employees > 0 ? result.credits.total / inputs.employees : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
      {/* Inputs */}
      <div>
        <h3 className="text-h5">Your volumes</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
          Monthly throughput for the workflows agents take over. Type a number or drag the slider.
        </p>
        <div className="mt-6">
          {fields.map((field) => {
            const id = `calc-${field.key}`;
            const value = inputs[field.key];
            return (
              <div key={field.key} className="border-t border-border py-5 first:border-t-0 first:pt-0">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor={id}>{field.label}</Label>
                  <Input
                    id={id}
                    type="number"
                    inputMode="numeric"
                    size="sm"
                    min={0}
                    max={field.max}
                    step={field.step}
                    value={value}
                    onChange={(event) => setField(field.key, event.target.valueAsNumber, field.max)}
                    className="tabular w-28 text-right"
                  />
                </div>
                <input
                  type="range"
                  aria-label={`${field.label}, slider`}
                  min={0}
                  max={field.max}
                  step={field.step}
                  value={value}
                  onChange={(event) => setField(field.key, event.target.valueAsNumber, field.max)}
                  className="mt-3.5 w-full cursor-pointer accent-accent"
                />
                <p className="mt-2 text-[0.8125rem] leading-snug text-fg-subtle">{field.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outputs */}
      <div className="rounded-lg border border-border bg-bg-elevated p-6 lg:sticky lg:top-24 lg:self-start lg:p-7">
        <p className="eyebrow">Estimate</p>
        <p aria-live="polite" className="mt-4">
          <output
            htmlFor="calc-hrCasesPerMonth calc-hiresPerMonth calc-invoicesPerMonth calc-contractsPerMonth"
            className="text-stat text-fg"
          >
            {formatNumber(result.credits.total)}
          </output>
          <span className="mt-1 block text-sm text-fg-muted">
            credits per month
            <FootnoteRef n={1} />
          </span>
        </p>

        <svg className="mt-6 block w-full" height="68" role="img" aria-label={`Estimated ${formatNumber(result.credits.total)} credits a month against the ${barLabel} of ${formatNumber(barAllowance)} credits.`}>
          <text x="0" y="11" className="fill-fg-muted text-[0.8125rem]">
            Your estimate
          </text>
          <text x="100%" y="11" textAnchor="end" className="tabular fill-fg text-[0.8125rem] font-medium">
            {formatNumber(result.credits.total)}
          </text>
          <rect x="0" y="18" width="100%" height="8" rx="4" className="fill-bg-muted" />
          <rect x="0" y="18" width={`${estimatePct}%`} height="8" rx="4" className="fill-accent" />
          <text x="0" y="51" className="fill-fg-muted text-[0.8125rem]">
            {barLabel}
          </text>
          <text x="100%" y="51" textAnchor="end" className="tabular fill-fg text-[0.8125rem] font-medium">
            {formatNumber(barAllowance)}
          </text>
          <rect x="0" y="58" width="100%" height="8" rx="4" className="fill-bg-muted" />
          <rect x="0" y="58" width={`${allowancePct}%`} height="8" rx="4" className="fill-border-strong" />
        </svg>

        <div className="mt-6 border-t border-border pt-5">
          <p className="text-[0.8125rem] text-fg-subtle">Recommended plan</p>
          <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <a
              href={`#plan-${recommended.id}`}
              className="text-h5 rounded-sm text-fg underline-offset-4 hover:underline"
            >
              {recommended.name}
            </a>
            <span className="text-[0.8125rem] text-fg-subtle">
              {recommended.priceMonthly == null
                ? "custom pricing"
                : `${formatCurrency(recommended.priceMonthly)} per month`}
            </span>
          </p>
          <p className="tabular mt-2 text-sm leading-relaxed text-fg-muted">
            {reasonFor(recommended.id, result.credits.total)}
          </p>
        </div>

        <dl className="mt-5 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
          <div>
            <dt className="text-[0.8125rem] text-fg-subtle">
              Hours saved per month
              <FootnoteRef n={1} />
            </dt>
            <dd className="tabular mt-1 text-h4 text-fg">{formatNumber(result.hoursSaved)}</dd>
            <dd className="tabular mt-1 text-[0.8125rem] leading-snug text-fg-muted">
              {formatCurrency(result.monthlyValue)} of staff time at{" "}
              {formatCurrency(calculatorModel.blendedHourlyCost)} an hour
            </dd>
          </div>
          <div>
            <dt className="text-[0.8125rem] text-fg-subtle">Estimated monthly cost</dt>
            <dd className="tabular mt-1 text-h4 text-fg">
              {monthlyCost == null ? "Custom" : formatCurrency(monthlyCost)}
            </dd>
            <dd className="tabular mt-1 text-[0.8125rem] leading-snug text-fg-muted">
              {monthlyCost == null
                ? "Credit pool and term sized with you"
                : overageCredits > 0
                  ? `Includes ${formatNumber(overageCredits)} credits of overage at ${formatCurrency(overagePerCredit, { cents: true })}`
                  : "No overage at this volume"}
            </dd>
          </div>
        </dl>

        {perEmployee != null ? (
          <p className="tabular mt-5 border-t border-border pt-4 text-[0.8125rem] leading-snug text-fg-subtle">
            {formatNumber(perEmployee, { decimals: 1 })} credits per employee per month across{" "}
            {formatNumber(inputs.employees)} employees.
          </p>
        ) : null}
      </div>
    </div>
  );
}
