import * as React from "react";

import { cn } from "@/lib/utils";

export type ContainerSize = "default" | "wide" | "narrow";

const sizes: Record<ContainerSize, string> = {
  default: "max-w-content",
  wide: "max-w-wide",
  narrow: "max-w-narrow",
};

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "header" | "footer" | "nav" | "aside";
  size?: ContainerSize;
}

/** Centered content column with responsive horizontal padding (20 / 32 / 40px). */
export const Container = React.forwardRef<HTMLElement, ContainerProps>(function Container(
  { as = "div", size = "default", className, ...props },
  ref,
) {
  const Comp = as as "div";
  return (
    <Comp
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("container-x", sizes[size], className)}
      {...props}
    />
  );
});
