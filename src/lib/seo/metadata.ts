import type { Metadata } from "next";
import { tagline } from "./brand";
import { meridianShortDescription } from "./facts";
import { absoluteUrl, siteName, siteUrl } from "./url";

export type MetadataType = "website" | "article";

export const titleTemplate = `%s · ${siteName}`;

/** RSS autodiscovery. Repeated per page because `alternates` does not deep-merge with the layout. */
const feedAlternates: NonNullable<Metadata["alternates"]>["types"] = {
  "application/rss+xml": [{ url: absoluteUrl("/feed.xml"), title: `${siteName} articles and changelog` }],
};

const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

/**
 * Site-wide defaults for src/app/layout.tsx: `export const metadata = rootMetadata`
 * (or spread it and add to it). Sets metadataBase and the title template that
 * createMetadata relies on. manifest.ts and icon files are picked up by Next
 * automatically and are intentionally not repeated here.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteName} · ${tagline.replace(/\.$/, "")}`, template: titleTemplate },
  description: meridianShortDescription,
  applicationName: siteName,
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: { canonical: absoluteUrl("/"), types: feedAlternates },
  openGraph: { type: "website", siteName, locale: "en_US", url: absoluteUrl("/") },
  twitter: { card: "summary_large_image" },
  robots: indexRobots,
  formatDetection: { telephone: false, email: false, address: false },
};

export interface CreateMetadataInput {
  /** Plain page title. The root layout applies the "%s · Meridian" template. */
  title: string;
  /** 140-160 characters. */
  description: string;
  /** Route path, e.g. "/agents/payroll". Used for the canonical and og:url. */
  path: string;
  /**
   * Optional social image (absolute URL or site path). Omit it so the
   * file-based opengraph-image.tsx for the route cascades automatically.
   */
  image?: string;
  type?: MetadataType;
  noIndex?: boolean;
  /** ISO 8601. Article pages only. */
  publishedTime?: string;
  /** ISO 8601. Article pages only. */
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  /** Use the title verbatim, bypassing the layout template (home page). */
  titleAbsolute?: boolean;
}

const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

const brandSuffix = new RegExp(`\\s*[|\\u00b7\\-\\u2013\\u2014]\\s*${siteName}\\s*$`, "i");

/**
 * Removes a trailing "| Meridian", "· Meridian", "- Meridian" from a title.
 * Content `seo.title` fields carry the suffix; the layout template adds it
 * back, so passing them through createMetadata would otherwise double it.
 */
export function stripBrandSuffix(title: string): string {
  return title.replace(brandSuffix, "").trim();
}

/**
 * Builds the per-page Metadata object every route exports.
 *
 * - alternates.canonical is always absolute.
 * - openGraph/twitter titles are set explicitly (absolute) so the result is the
 *   same whether or not a parent segment defines a template.
 * - images are only set when `image` is passed; otherwise Next.js resolves the
 *   nearest opengraph-image.tsx / twitter-image.tsx for the route.
 */
export function createMetadata(input: CreateMetadataInput): Metadata {
  const {
    title,
    description,
    path,
    image,
    type = "website",
    noIndex = false,
    publishedTime,
    modifiedTime,
    authors,
    keywords,
    titleAbsolute = false,
  } = input;

  const url = absoluteUrl(path);
  const plainTitle = titleAbsolute ? title.trim() : stripBrandSuffix(title);
  const socialTitle = titleAbsolute ? plainTitle : `${plainTitle} · ${siteName}`;
  const images = image
    ? [{ url: absoluteUrl(image), width: OG_IMAGE_SIZE.width, height: OG_IMAGE_SIZE.height, alt: socialTitle }]
    : undefined;

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          title: { absolute: socialTitle },
          description,
          url,
          siteName,
          locale: "en_US",
          publishedTime,
          modifiedTime,
          authors,
          ...(images ? { images } : {}),
        }
      : {
          type: "website",
          title: { absolute: socialTitle },
          description,
          url,
          siteName,
          locale: "en_US",
          ...(images ? { images } : {}),
        };

  return {
    title: titleAbsolute ? { absolute: plainTitle } : plainTitle,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : undefined,
    authors: authors && authors.length > 0 ? authors.map((name) => ({ name })) : undefined,
    category: "technology",
    alternates: { canonical: url, types: feedAlternates },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: { absolute: socialTitle },
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    robots: noIndex ? noIndexRobots : indexRobots,
  };
}
