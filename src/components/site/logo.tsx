import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface LogoMarkProps extends React.SVGAttributes<SVGSVGElement> {
  /** Ink follows currentColor; the prime meridian is always accent. */
  accentClassName?: string;
}

/**
 * The mark: a globe drawn only in meridians. Two side meridians in ink, the prime
 * meridian in instrument blue, one node crossing it. Same object as the hero (DESIGN.md §7).
 */
export const LogoMark = React.forwardRef<SVGSVGElement, LogoMarkProps>(function LogoMark(
  { className, accentClassName, ...props },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={cn("size-6 shrink-0 text-fg", className)}
      {...props}
    >
      <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2.75A6.55 9.25 0 0 1 12 21.25M12 2.75A6.55 9.25 0 0 0 12 21.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        opacity="0.42"
      />
      <path
        d="M12 2.75v18.5"
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeLinecap="round"
        className={accentClassName}
      />
      <circle cx="12" cy="8.1" r="1.9" fill="var(--color-bg)" />
      <circle cx="12" cy="8.1" r="1.35" fill="var(--color-accent)" />
    </svg>
  );
});

export interface LogoProps extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "href"> {
  href?: string;
  /** Hide the wordmark (mark only). */
  markOnly?: boolean;
  size?: "sm" | "md";
}

/** Mark + wordmark, 20px Geist 500. Links home. */
export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(function Logo(
  { href = "/", markOnly = false, size = "md", className, ...props },
  ref,
) {
  return (
    <Link
      ref={ref}
      href={href}
      aria-label="Meridian home"
      className={cn(
        "inline-flex shrink-0 items-center gap-2.5 rounded-md text-fg outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-ring",
        className,
      )}
      {...props}
    >
      <LogoMark className={size === "sm" ? "size-5" : "size-6"} />
      {markOnly ? null : (
        <span
          className={cn(
            "font-medium tracking-[-0.02em] text-fg",
            size === "sm" ? "text-[1.0625rem]" : "text-[1.25rem]",
          )}
        >
          Meridian
        </span>
      )}
    </Link>
  );
});
