/**
 * Brand constants used by non-UI surfaces (OG images, manifest, JSON-LD).
 * Values are the sRGB renders of the OKLCH tokens in DESIGN.md section 3.
 * UI components read the CSS tokens in globals.css; keep these in sync.
 */
export const brandColors = {
  /** bg: page ground. */
  background: "#fefdfc",
  /** bg-subtle: alternating sections. */
  backgroundSubtle: "#f9f7f4",
  /** bg-elevated: cards. */
  surface: "#ffffff",
  /** fg: headings and body. */
  ink: "#1c1712",
  /** fg-muted: ledes, secondary text. */
  muted: "#5a544e",
  /** fg-subtle: captions, footers. */
  subtle: "#706b64",
  /** border: the default hairline. */
  hairline: "#e3e1dd",
  /** border-strong: hover borders, secondary buttons. */
  hairlineStrong: "#cdcac5",
  /** accent: links, live indicators, the prime meridian. */
  accent: "#1f5390",
  /** accent-soft: tinted fills. */
  accentSoft: "#e7f1fe",
} as const;

export const organizationLegalName = "Meridian Systems, Inc.";
export const tagline = "AI agents that run HR and finance.";
