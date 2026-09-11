import { NextResponse } from "next/server";

import { contactSchema, fieldErrors } from "@/components/company/contact-schema";

export const runtime = "nodejs";

/** Simulated hand-off latency; there is no persistence and no outbound call. */
const SIMULATED_DELAY_MS = 300;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body must be JSON." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ ok: false, error: "Check the highlighted fields.", errors: fieldErrors(result.error) }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));
  return NextResponse.json({ ok: true });
}
