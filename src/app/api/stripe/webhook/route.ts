import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { getStripe, isStripeConfigured } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const payload = await req.text();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();

  // Demo mode: no secret to verify against (or no client to verify with). Acknowledge and move on.
  if (!secret || !isStripeConfigured()) {
    return NextResponse.json({ received: true, unverified: true });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe-Signature header." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.info("[stripe/webhook] checkout.session.completed", session.id, session.mode);
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.info(`[stripe/webhook] ${event.type}`, subscription.id, subscription.status);
      break;
    }
    default:
      console.info("[stripe/webhook] unhandled", event.type);
  }

  return NextResponse.json({ received: true });
}
