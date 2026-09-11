import * as React from "react";
import { Separator as SeparatorPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export type SeparatorProps = React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;

/** 1px hairline in `border`. Decorative by default. */
export const Separator = React.forwardRef<React.ComponentRef<typeof SeparatorPrimitive.Root>, SeparatorProps>(
  function Separator({ className, orientation = "horizontal", decorative = true, ...props }, ref) {
    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
          className,
        )}
        {...props}
      />
    );
  },
);
