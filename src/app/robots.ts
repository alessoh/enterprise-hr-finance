import type { MetadataRoute } from "next";
import { disallowPaths } from "@/lib/seo/routes";
import { siteUrl } from "@/lib/seo/url";

/**
 * Explicitly named AI crawlers. "*" already allows them; naming them records
 * intent (GEO) and keeps the policy visible if the default ever changes.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = [...disallowPaths];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: aiCrawlers, allow: "/", disallow },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
