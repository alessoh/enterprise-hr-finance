import { NextResponse } from "next/server";

import { checkHealth, IMPLEMENTED, ruleNames, SUGGESTED_MODELS } from "@/lib/agents";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Reports whether a model endpoint is reachable, without exposing any key. */
export async function GET(): Promise<NextResponse> {
  const health = await checkHealth();
  return NextResponse.json(
    {
      health,
      implemented: IMPLEMENTED,
      policyRules: ruleNames(),
      suggestedModels: SUGGESTED_MODELS,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
