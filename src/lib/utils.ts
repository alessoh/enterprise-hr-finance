/**
 * Shared helpers. `cn` is clsx + tailwind-merge, extended so the custom type
 * scale (text-h1, text-lede ...) and shadow tokens resolve conflicts correctly.
 */
import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

export type { ClassValue };

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display",
        "text-h1",
        "text-h2",
        "text-h3",
        "text-h4",
        "text-h5",
        "text-h6",
        "text-lede",
        "text-body-lg",
        "text-caption",
        "text-stat",
      ],
      shadow: ["shadow-ring", "shadow-ring-strong"],
      "max-w": ["max-w-content", "max-w-wide", "max-w-narrow"],
    },
  },
});

/** Merge class names with clsx semantics and last-wins Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

const DEFAULT_SITE_URL = "https://enterprise-hr-finance.vercel.app";

/** Canonical site origin without a trailing slash. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

/** Absolute URL for a path, e.g. absoluteUrl("/pricing"). Absolute inputs pass through. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export interface FormatNumberOptions {
  /** Compact notation: 12.4K, 1.2M. */
  compact?: boolean;
  /** Maximum fraction digits. Defaults to 0 (1 when compact). */
  decimals?: number;
  /** Always show the sign, e.g. +12%. */
  signed?: boolean;
}

export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const { compact = false, decimals, signed = false } = options;
  return new Intl.NumberFormat("en-US", {
    notation: compact ? "compact" : "standard",
    maximumFractionDigits: decimals ?? (compact ? 1 : 0),
    signDisplay: signed ? "exceptZero" : "auto",
  }).format(value);
}

export interface FormatCurrencyOptions {
  currency?: string;
  /** Show cents. Defaults to true only when the value has a fractional part. */
  cents?: boolean;
  compact?: boolean;
}

export function formatCurrency(value: number, options: FormatCurrencyOptions = {}): string {
  const { currency = "USD", compact = false } = options;
  const cents = options.cents ?? !Number.isInteger(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : compact ? 1 : 0,
  }).format(value);
}

export type DateStyle = "short" | "medium" | "long" | "month";

/** Formats in UTC so server and client render identical strings. */
export function formatDate(input: string | number | Date, style: DateStyle = "medium"): string {
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "";
  const options: Intl.DateTimeFormatOptions =
    style === "short"
      ? { month: "short", day: "numeric", timeZone: "UTC" }
      : style === "long"
        ? { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }
        : style === "month"
          ? { month: "long", year: "numeric", timeZone: "UTC" }
          : { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Initials for avatars: "Dana Okafor" -> "DO". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
