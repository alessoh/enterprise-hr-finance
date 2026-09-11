import { NextResponse } from "next/server";

import { getInitialSnapshot } from "@/lib/live/generator";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Polling fallback for clients without EventSource, and the server-render source. */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(getInitialSnapshot(Date.now()), {
    headers: { "Cache-Control": "no-store" },
  });
}
