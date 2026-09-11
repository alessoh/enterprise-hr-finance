import * as React from "react";
import { Label as LabelPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** Appends a quiet "Optional" hint. Required fields carry no asterisk. */
  optional?: boolean;
}

export const Label = React.forwardRef<React.ComponentRef<typeof LabelPrimitive.Root>, LabelProps>(
  function Label({ className, optional, children, ...props }, ref) {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-baseline gap-1.5 text-sm leading-none font-medium text-fg peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
          className,
        )}
        {...props}
      >
        {children}
        {optional ? <span className="text-xs font-normal text-fg-subtle">Optional</span> : null}
      </LabelPrimitive.Root>
    );
  },
);

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  htmlFor: string;
  optional?: boolean;
  /** 13px help text below the control. */
  help?: React.ReactNode;
  /** 13px danger text below the control. Replaces help when present. */
  error?: React.ReactNode;
}

/** Label (14px/500) → 6px gap → control → 6px gap → help or error (13px). */
export function Field({ label, htmlFor, optional, help, error, className, children, ...props }: FieldProps) {
  const describedBy = error ? `${htmlFor}-error` : help ? `${htmlFor}-help` : undefined;
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Label htmlFor={htmlFor} optional={optional}>
        {label}
      </Label>
      {React.isValidElement<{ "aria-describedby"?: string; "aria-invalid"?: boolean }>(children)
        ? React.cloneElement(children, {
            "aria-describedby": describedBy ?? children.props["aria-describedby"],
            "aria-invalid": error ? true : children.props["aria-invalid"],
          })
        : children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-[0.8125rem] leading-snug text-danger">
          {error}
        </p>
      ) : help ? (
        <p id={`${htmlFor}-help`} className="text-[0.8125rem] leading-snug text-fg-subtle">
          {help}
        </p>
      ) : null}
    </div>
  );
}
