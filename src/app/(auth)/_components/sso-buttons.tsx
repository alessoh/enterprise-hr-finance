"use client";

import * as React from "react";
import { KeyRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const providers = ["Google", "Microsoft", "Okta"] as const;

/**
 * SSO entry points, shared by /login and /signup. Disabled-looking (aria-disabled,
 * muted label, no shadow) but still focusable and operable: the helper is linked via
 * aria-describedby and activation surfaces the preview notice instead of a dead end.
 * Followed by the "or" divider so both forms share one structure.
 */
export function SsoButtons({ onSelect }: { onSelect: () => void }) {
  const helpId = React.useId();

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          {providers.map((provider) => (
            <Button
              key={provider}
              type="button"
              variant="secondary"
              aria-disabled="true"
              aria-describedby={helpId}
              onClick={onSelect}
              className="w-full justify-start text-fg-muted shadow-none hover:border-border-strong"
            >
              <KeyRound aria-hidden className="text-fg-subtle" />
              Continue with {provider}
            </Button>
          ))}
        </div>
        <p id={helpId} className="text-[0.8125rem] leading-snug text-fg-subtle">
          SSO is available on Growth and Enterprise.
        </p>
      </div>

      <div className="flex items-center gap-3" role="separator" aria-label="or">
        <Separator className="flex-1" />
        <span className="text-xs tracking-[0.08em] text-fg-subtle uppercase">or</span>
        <Separator className="flex-1" />
      </div>
    </>
  );
}
