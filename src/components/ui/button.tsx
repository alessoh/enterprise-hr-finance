import * as React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export const buttonBase =
  "group/button relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium outline-none transition-colors duration-150 ease-standard select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring disabled:pointer-events-none disabled:opacity-50 aria-busy:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/88 active:bg-fg/80",
  secondary:
    "border border-border-strong bg-bg-elevated text-fg shadow-xs hover:border-fg/30 hover:bg-bg-subtle active:bg-bg-muted",
  ghost: "text-fg-muted hover:bg-bg-muted hover:text-fg active:bg-border/60",
  link: "h-auto rounded-none p-0 text-accent underline-offset-4 hover:text-accent-hover hover:underline",
  destructive: "bg-danger text-white hover:bg-danger/90 active:bg-danger/85",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[0.8125rem]",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "size-10",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render the child element instead of a <button> (e.g. next/link). */
  asChild?: boolean;
  /** Shows a spinner, sets aria-busy, and disables the button. */
  loading?: boolean;
  /** Trailing arrow that shifts 2px on hover. The only decoration a button may carry. */
  arrow?: boolean;
}

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: Pick<ButtonProps, "variant" | "size" | "className"> = {}): string {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    asChild = false,
    loading = false,
    arrow = false,
    disabled,
    children,
    type,
    ...props
  },
  ref,
) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      ref={ref}
      className={buttonClassName({ variant, size, className })}
      aria-busy={loading || undefined}
      disabled={asChild ? undefined : disabled || loading}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
      <Slot.Slottable>{children}</Slot.Slottable>
      {arrow && !loading ? (
        <ArrowRight
          aria-hidden
          className="transition-transform duration-200 ease-out-quart group-hover/button:translate-x-0.5"
        />
      ) : null}
    </Comp>
  );
});
