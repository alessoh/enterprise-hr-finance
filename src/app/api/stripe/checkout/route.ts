import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { checkoutSchema, getPriceId, getStripe, isStripeConfigured } from "@/lib/stripe";
import { getSiteUrl } from "@/lib/utils";

export const runtime = "nodejs";

const demoResponse = { demo: true, message: "Stripe is not configured in this environment." } as const;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be JSON." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request.", issues: parsed.error.issues }, { status: 400 });
  }

  const { planId, interval, email } = parsed.data;
  const price = getPriceId(planId, interval);
  if (!isStripeConfigured() || !price) {
    return NextResponse.json(demoResponse);
  }

  const siteUrl = getSiteUrl();
  const params: Stripe.Checkout.SessionCreateParams = {
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    allow_promotion_codes: true,
    automatic_tax: { enabled: false },
    success_url: `${siteUrl}/signup?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing`,
    ...(email ? { customer_email: email } : {}),
    ...(planId === "starter" ? { subscription_data: { trial_period_days: 14 } } : {}),
  };

  try {
    const session = await getStripe().checkout.sessions.create(params);
    if (!session.url) throw new Error("Checkout session returned no URL");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[stripe/checkout]", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Could not start checkout." }, { status: 500 });
  }
}
