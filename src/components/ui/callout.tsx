import * as React from "react";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

export type CalloutVariant = "neutral" | "info" | "success" | "warning" | "danger";

type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

const styles: Record<CalloutVariant, { box: string; icon: string; Icon: IconComponent | null }> = {
  neutral: { box: "border-border bg-bg-subtle", icon: "text-fg-muted", Icon: null },
  info: { box: "border-accent/15 bg-accent-soft", icon: "text-accent", Icon: Info },
  success: { box: "border-success/15 bg-success-soft", icon: "text-success", Icon: CircleCheck },
  warning: { box: "border-warning/20 bg-warning-soft", icon: "text-warning", Icon: TriangleAlert },
  danger: { box: "border-danger/15 bg-danger-soft", icon: "text-danger", Icon: CircleAlert },
};

export interface CalloutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: CalloutVariant;
  title?: React.ReactNode;
  /** Override the default 16px icon. Pass `null` to hide it. */
  icon?: React.ReactNode | null;
  as?: "div" | "aside" | "section";
}

/** Tinted note. Radius lg, hairline in the semantic color, 14px body. */
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(function Callout(
  { variant = "neutral", title, icon, as = "div", className, children, ...props },
  ref,
) {
  const style = styles[variant];
  const Comp = as;
  const iconNode =
    icon === null ? null : icon !== undefined ? icon : style.Icon ? <style.Icon aria-hidden className="size-4" /> : null;
  return (
    <Comp
      ref={ref}
      role={variant === "danger" || variant === "warning" ? "alert" : undefined}
      className={cn("flex gap-3 rounded-lg border p-4 text-sm leading-relaxed text-fg", style.box, className)}
      {...props}
    >
      {iconNode ? <span className={cn("mt-0.5 shrink-0", style.icon)}>{iconNode}</span> : null}
      <div className="min-w-0 flex-1">
        {title ? <p className="font-medium text-fg">{title}</p> : null}
        <div className={cn(title && "mt-1", "text-fg-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-accent-hover [&_ul]:list-disc [&_ul]:pl-5 [&_li+li]:mt-1")}>
          {children}
        </div>
      </div>
    </Comp>
  );
});
