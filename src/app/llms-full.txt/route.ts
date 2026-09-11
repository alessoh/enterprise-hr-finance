import { buildLlmsFullTxt } from "@/lib/seo/llms";

export const revalidate = 3600;

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
