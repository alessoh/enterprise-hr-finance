/**
 * Canonical site URL helpers.
 *
 * NEXT_PUBLIC_SITE_URL is the production origin. When unset (local dev, preview
 * deployments) we fall back to the production domain so canonicals and
 * structured data always point at the indexable origin.
 */
const DEFAULT_SITE_URL = "https://enterprise-hr-finance.vercel.app";

export const siteName = "Meridian";

export const siteUrl: string = (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");

/** Normalizes a route path to a leading-slash, no-trailing-slash form ("/" stays "/"). */
export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : withSlash;
}

/** Builds an absolute URL for a site path. Already-absolute URLs pass through unchanged. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${normalizePath(path)}`;
}
