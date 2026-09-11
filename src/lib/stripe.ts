/**
 * Stripe scaffold. Env-gated: without STRIPE_SECRET_KEY (or the matching
 * STRIPE_PRICE_* id) the checkout route answers in demo mode.
 *
 * Env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_STARTER_MONTHLY,
 * STRIPE_PRICE_STARTER_ANNUAL, STRIPE_PRICE_GROWTH_MONTHLY, STRIPE_PRICE_GROWTH_ANNUAL.
 */
import Stripe from "stripe";
import { z } from "zod";

export const checkoutPlanIds = ["starter", "growth"] as const;
export const checkoutIntervals = ["monthly", "annual"] as const;

export type CheckoutPlanId = (typeof checkoutPlanIds)[number];
export type CheckoutInterval = (typeof checkoutIntervals)[number];

/** Body of POST /api/stripe/checkout. */
export const checkoutSchema = z.object({
  planId: z.enum(checkoutPlanIds),
  interval: z.enum(checkoutIntervals),
  email: z.email().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

function readEnv(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function isStripeConfigured(): boolean {
  return Boolean(readEnv(process.env.STRIPE_SECRET_KEY));
}

let client: Stripe | null = null;

/** Lazy singleton. Throws when STRIPE_SECRET_KEY is unset; check isStripeConfigured() first. */
export function getStripe(): Stripe {
  const key = readEnv(process.env.STRIPE_SECRET_KEY);
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  client ??= new Stripe(key);
  return client;
}

/** Stripe Price id for a plan and billing interval, or undefined when the env is unset. */
export function getPriceId(planId: CheckoutPlanId, interval: CheckoutInterval): string | undefined {
  const prices: Record<CheckoutPlanId, Record<CheckoutInterval, string | undefined>> = {
    starter: {
      monthly: process.env.STRIPE_PRICE_STARTER_MONTHLY,
      annual: process.env.STRIPE_PRICE_STARTER_ANNUAL,
    },
    growth: {
      monthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY,
      annual: process.env.STRIPE_PRICE_GROWTH_ANNUAL,
    },
  };
  return readEnv(prices[planId][interval]);
}
