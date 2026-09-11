"use client";

import Link from "next/link";

import { Callout } from "@/components/ui/callout";

/**
 * Persistent live region so the notice is announced when it appears.
 * Rendered directly above the submit button, where the action happened.
 */
export function PreviewNotice({ open }: { open: boolean }) {
  return (
    <div role="status" aria-live="polite">
      {open ? (
        <Callout variant="info">
          Accounts are provisioned by your Meridian administrator in this preview.{" "}
          <Link href="/contact?intent=demo">Book a demo</Link> to get access.
        </Callout>
      ) : null}
    </div>
  );
}
