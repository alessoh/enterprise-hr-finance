import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { brandColors, tagline } from "./brand";
import { truncate } from "./text";
import { siteUrl } from "./url";

/**
 * Shared Open Graph template (1200x630) for every opengraph-image.tsx /
 * twitter-image.tsx. Satori rules apply: flex layouts only, inline styles,
 * no CSS classes. Keep this file free of UI or content imports.
 *
 * Visual spec (DESIGN.md): warm paper ground, hairline grid, ink type,
 * one instrument blue on the mark. Title in Newsreader when the TTF is
 * available, otherwise Geist Medium at the h2 spec.
 */

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

export interface OgTemplateProps {
  /** Small uppercase label above the title, e.g. "Agent", "Article", "Customer story". */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Bottom-left line. Defaults to the tagline. */
  footer?: string;
}

type FontWeight = 400 | 500 | 600;

interface LoadedFont {
  name: "Newsreader" | "Geist";
  data: ArrayBuffer;
  weight: FontWeight;
  style: "normal";
}

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

const optional = (read: Promise<Buffer>): Promise<Buffer | null> => read.catch(() => null);

let fontsPromise: Promise<LoadedFont[]> | undefined;

/**
 * Font resolution order, per weight:
 *   1. public/brand/fonts/<Face>-<Weight>.ttf (drop files there to override)
 *   2. the Geist TTFs shipped inside the `geist` package
 *   3. nothing: next/og falls back to its built-in sans
 * Every readFile call uses a literal path so Vercel's file tracer bundles
 * whatever exists. Any failure is swallowed; the build never depends on a font.
 */
function loadFonts(): Promise<LoadedFont[]> {
  if (!fontsPromise) {
    const cwd = process.cwd();
    fontsPromise = Promise.all([
      optional(readFile(join(cwd, "public/brand/fonts/Newsreader-Regular.ttf"))),
      optional(readFile(join(cwd, "public/brand/fonts/Geist-Regular.ttf"))),
      optional(readFile(join(cwd, "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf"))),
      optional(readFile(join(cwd, "public/brand/fonts/Geist-Medium.ttf"))),
      optional(readFile(join(cwd, "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"))),
      optional(readFile(join(cwd, "public/brand/fonts/Geist-SemiBold.ttf"))),
      optional(readFile(join(cwd, "node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf"))),
    ])
      .then(([serif400, sans400a, sans400b, sans500a, sans500b, sans600a, sans600b]) => {
        const picked: Array<[LoadedFont["name"], FontWeight, Buffer | null]> = [
          ["Newsreader", 400, serif400],
          ["Geist", 400, sans400a ?? sans400b],
          ["Geist", 500, sans500a ?? sans500b],
          ["Geist", 600, sans600a ?? sans600b],
        ];
        return picked.flatMap(([name, weight, buffer]) =>
          buffer ? [{ name, weight, data: toArrayBuffer(buffer), style: "normal" as const }] : [],
        );
      })
      .catch(() => []);
  }
  return fontsPromise;
}

const host = siteUrl.replace(/^https?:\/\//, "");
const sans = "Geist, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
const serif = "Newsreader, Georgia, Times New Roman, serif";
const gridLine = "rgba(28, 23, 18, 0.055)";

/** The Meridian mark: a circle bisected by the prime meridian, with one node on it. */
function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="17" stroke={brandColors.ink} strokeWidth="2" />
      <line x1="20" y1="3" x2="20" y2="37" stroke={brandColors.accent} strokeWidth="2" />
      <circle cx="20" cy="13" r="5" fill={brandColors.background} />
      <circle cx="20" cy="13" r="3.25" fill={brandColors.accent} />
    </svg>
  );
}

interface TemplateProps extends OgTemplateProps {
  /** True when the Newsreader TTF loaded; the title switches to the display serif. */
  useSerif?: boolean;
}

export function OgTemplate({ eyebrow, title, description, footer, useSerif = false }: TemplateProps) {
  const cleanTitle = truncate(title.trim(), 96);
  const titleSize = cleanTitle.length <= 34 ? 80 : cleanTitle.length <= 60 ? 66 : 56;
  const cleanDescription = description ? truncate(description.trim(), 150) : undefined;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 72px 48px",
        backgroundColor: brandColors.background,
        color: brandColors.ink,
        fontFamily: sans,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          backgroundImage: `linear-gradient(to right, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: ogSize.width,
          height: ogSize.height,
          backgroundImage: `linear-gradient(to bottom, ${gridLine} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Mark size={40} />
        <span style={{ fontSize: 30, fontWeight: 500, letterSpacing: -0.6 }}>Meridian</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
        {eyebrow ? (
          <div
            style={{
              display: "flex",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: 1.6,
              textTransform: "uppercase",
              color: brandColors.muted,
            }}
          >
            {truncate(eyebrow, 40)}
          </div>
        ) : null}
        <div
          style={{
            display: "block",
            fontFamily: useSerif ? serif : sans,
            fontSize: titleSize,
            fontWeight: useSerif ? 400 : 500,
            lineHeight: useSerif ? 1.05 : 1.1,
            letterSpacing: useSerif ? -(titleSize * 0.015) : -(titleSize * 0.02),
            lineClamp: 3,
          }}
        >
          {cleanTitle}
        </div>
        {cleanDescription ? (
          <div
            style={{
              display: "block",
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.4,
              color: brandColors.muted,
              lineClamp: 2,
            }}
          >
            {cleanDescription}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 22,
          borderTop: `1px solid ${brandColors.hairline}`,
          fontSize: 22,
          fontWeight: 400,
          color: brandColors.subtle,
        }}
      >
        <span>{footer ? truncate(footer, 70) : tagline}</span>
        <span>{host}</span>
      </div>
    </div>
  );
}

/** Builds the ImageResponse used by every OG route. */
export async function renderOgImage(props: OgTemplateProps): Promise<ImageResponse> {
  const fonts = await loadFonts();
  const useSerif = fonts.some((f) => f.name === "Newsreader");
  return new ImageResponse(<OgTemplate {...props} useSerif={useSerif} />, {
    width: ogSize.width,
    height: ogSize.height,
    ...(fonts.length > 0 ? { fonts } : {}),
  });
}
