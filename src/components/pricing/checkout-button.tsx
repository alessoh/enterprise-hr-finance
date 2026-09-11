"use client";

import * as React from "react";
import Link from "next/link";

import { Button, type ButtonProps } from "@/components/ui/button";
import type { PlanId } from "@/content/types";
import { cn } from "@/lib/utils";

export type BillingInterval = "monthly" | "annual";

export const SALES_HREF = "/contact?intent=sales";

export interface CheckoutButtonProps extends Omit<ButtonProps, "onClick" | "loading" | "type" | "asChild"> {
  planId: Exclude<PlanId, "enterprise">;
  interval: BillingInterval;
  /** Wraps the button and its inline notice. */
  wrapperClassName?: string;
}

type Status = "idle" | "loading" | "demo" | "error";

const noticeLink = "text-accent underline underline-offset-4 hover:text-accent-hover";

/**
 * Starts Stripe Checkout through POST /api/stripe/checkout (BUILD-NOTES, Billing).
 * `{ url }` navigates; `{ demo }` shows an inline notice; anything else shows a
 * recoverable error. Nothing here throws to the console.
 */
export function CheckoutButton({
  planId,
  interval,
  wrapperClassName,
  className,
  children,
  ...props
}: CheckoutButtonProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const mounted = React.useRef(true);

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function start() {
    setStatus("loading");
    let next: Status = "error";
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ planId, interval }),
      });
      const data: unknown = await res.json().catch(() => null);
      if (res.ok && data && typeof data === "object") {
        const body = data as { url?: unknown; demo?: unknown };
        if (typeof body.url === "string" && body.url.length > 0) {
          window.location.assign(body.url);
          return; // keep the loading state while the browser navigates
        }
        if (body.demo === true) next = "demo";
      }
    } catch {
      next = "error";
    }
    if (mounted.current) setStatus(next);
  }

  return (
    <div className={cn("flex flex-col", wrapperClassName)}>
      <Button
        type="button"
        onClick={start}
        loading={status === "loading"}
        className={cn("w-full", className)}
        {...props}
      >
        {children}
      </Button>
      <div aria-live="polite">
        {status === "demo" ? (
          <p role="status" className="mt-3 text-[0.8125rem] leading-snug text-fg-muted">
            Checkout is in demo mode in this environment.{" "}
            <Link href={SALES_HREF} className={noticeLink}>
              Talk to sales
            </Link>{" "}
            to start a pilot.
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="mt-3 text-[0.8125rem] leading-snug text-danger">
            Checkout could not start. Try again or{" "}
            <Link href={SALES_HREF} className={noticeLink}>
              talk to sales
            </Link>
            .
          </p>
        ) : null}
      </div>
    </div>
  );
}
