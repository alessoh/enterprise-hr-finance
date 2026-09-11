import * as React from "react";

import { cn } from "@/lib/utils";

export type CardPadding = "none" | "sm" | "md" | "lg";

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6 lg:p-7",
  lg: "p-8 lg:p-10",
};

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "article" | "li" | "section" | "a";
  padding?: CardPadding;
  /** Hover raises the border to border-strong and adds shadow-sm. Use when the whole card is a link. */
  interactive?: boolean;
  /** Subtle: bg-subtle without a hairline. Default: elevated with hairline. */
  variant?: "default" | "subtle" | "outline";
  href?: string;
}

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { as = "div", padding = "md", interactive = false, variant = "default", className, ...props },
  ref,
) {
  const Comp = as as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn(
        "relative rounded-lg",
        variant === "default" && "border border-border bg-bg-elevated",
        variant === "subtle" && "bg-bg-subtle",
        variant === "outline" && "border border-border bg-transparent",
        interactive &&
          "transition-[border-color,box-shadow] duration-200 ease-standard hover:border-border-strong hover:shadow-sm focus-within:border-border-strong",
        paddings[padding],
        className,
      )}
      {...props}
    />
  );
});

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("flex flex-col gap-1.5", className)} {...props} />;
  },
);

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4" | "h5" | "p";
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { as = "h3", className, ...props },
  ref,
) {
  const Comp = as;
  return <Comp ref={ref} className={cn("text-h5 text-fg", className)} {...props} />;
});

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, ...props }, ref) {
  return <p ref={ref} className={cn("text-sm leading-relaxed text-fg-muted", className)} {...props} />;
});

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mt-4", className)} {...props} />;
  },
);

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn("mt-6 flex items-center gap-3", className)} {...props} />;
  },
);
