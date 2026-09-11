"use client";

import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { BillingInterval } from "./checkout-button";

const options: { value: BillingInterval; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

export interface BillingToggleProps {
  value: BillingInterval;
  onChange: (value: BillingInterval) => void;
  className?: string;
}

/** Segmented radio group. Arrow keys move between options; the checked option is the tab stop. */
export function BillingToggle({ value, onChange, className }: BillingToggleProps) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        next = (index - 1 + options.length) % options.length;
        break;
      case "ArrowRight":
      case "ArrowDown":
        next = (index + 1) % options.length;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = options.length - 1;
        break;
    }
    if (next === null) return;
    event.preventDefault();
    onChange(options[next].value);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label="Billing interval"
      className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-bg-subtle p-1", className)}
    >
      {options.map((option, index) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-colors duration-150 ease-standard select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring",
              checked ? "bg-bg-elevated text-fg shadow-xs ring-1 ring-border" : "text-fg-muted hover:text-fg",
            )}
          >
            {option.label}
            {option.value === "annual" ? (
              <Badge variant="accent" size="sm">
                Save 20%
              </Badge>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
