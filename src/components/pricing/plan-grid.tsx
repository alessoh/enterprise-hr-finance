"use client";

import * as React from "react";

import type { Plan } from "@/content/types";

import { BillingToggle } from "./billing-toggle";
import type { BillingInterval } from "./checkout-button";
import { PlanCard } from "./plan-card";

export interface PlanGridProps {
  plans: Plan[];
}

/** Lifts the billing interval so the toggle and every plan card agree. Monthly by default. */
export function PlanGrid({ plans }: PlanGridProps) {
  const [interval, setBilling] = React.useState<BillingInterval>("monthly");
  return (
    <div>
      <div className="flex justify-center">
        <BillingToggle value={interval} onChange={setBilling} />
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {interval} prices.
      </p>
      <div className="mx-auto mt-10 grid w-full max-w-md gap-6 lg:mt-12 lg:max-w-none lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} interval={interval} />
        ))}
      </div>
    </div>
  );
}
