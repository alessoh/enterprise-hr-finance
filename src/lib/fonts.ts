import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Newsreader } from "next/font/google";

/** UI, headings h2–h6, body. Exposes `--font-geist-sans`. */
export const fontSans = GeistSans;

/** Code, identifiers, metric labels. Exposes `--font-geist-mono`. */
export const fontMono = GeistMono;

/**
 * The single display face: Newsreader (variable, optical sizing).
 * Used for display and h1 only, plus pull quotes. Never below 40px.
 */
export const fontDisplay = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

/** Put on `<html>` so `@theme` font tokens can resolve the variables. */
export const fontVariables = [fontSans.variable, fontMono.variable, fontDisplay.variable].join(" ");
