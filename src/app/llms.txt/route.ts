import { buildLlmsTxt } from "@/lib/seo/llms";

export const revalidate = 3600;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
