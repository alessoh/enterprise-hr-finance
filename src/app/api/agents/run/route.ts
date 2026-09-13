import { NextResponse } from "next/server";
import { z } from "zod";

import { isImplemented, runAgent, verifyChain } from "@/lib/agents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  agent: z.string().min(1),
  question: z.string().min(3).max(400).optional(),
});

export async function POST(request: Request): Promise<NextResponse> {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  if (!isImplemented(parsed.data.agent)) {
    return NextResponse.json(
      { error: `Agent "${parsed.data.agent}" has no execution path yet. Implemented: controls, help-desk.` },
      { status: 404 },
    );
  }

  const run = await runAgent(parsed.data.agent, { question: parsed.data.question });
  // The audit chain is verified on the way out, so the caller never has to trust us.
  const chain = verifyChain(run.audit);

  return NextResponse.json(
    { run, chain },
    { status: run.error ? 503 : 200, headers: { "Cache-Control": "no-store" } },
  );
}
