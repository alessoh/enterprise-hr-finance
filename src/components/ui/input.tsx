import * as React from "react";

import { cn } from "@/lib/utils";

export type FieldSize = "sm" | "md" | "lg";

export const fieldBase =
  "flex w-full min-w-0 rounded-md border border-border-strong bg-bg-elevated text-fg shadow-xs outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-standard placeholder:text-fg-subtle focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring disabled:cursor-not-allowed disabled:bg-bg-subtle disabled:text-fg-subtle disabled:shadow-none aria-invalid:border-danger aria-invalid:focus-visible:outline-danger/60";

export const fieldSizes: Record<FieldSize, string> = {
  sm: "h-8 px-2.5 text-[0.8125rem]",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: FieldSize;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = "md", invalid, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        fieldBase,
        fieldSizes[size],
        "file:mr-3 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-fg",
        className,
      )}
      {...props}
    />
  );
});
