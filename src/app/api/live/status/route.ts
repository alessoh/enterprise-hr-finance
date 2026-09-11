import { NextResponse } from "next/server";

import { getStatusPayload } from "@/lib/live/status";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(getStatusPayload(Date.now()), {
    headers: { "Cache-Control": "no-store" },
  });
}
