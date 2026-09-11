"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog as SheetPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

export const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(function SheetOverlay({ className, ...props }, ref) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-fg/30 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out",
        className,
      )}
      {...props}
    />
  );
});

export type SheetSide = "right" | "left" | "bottom";

const sides: Record<SheetSide, string> = {
  right:
    "inset-y-0 right-0 h-dvh w-full max-w-sm border-l border-border data-[state=open]:animate-slide-in-right data-[state=closed]:animate-slide-out-right",
  left: "inset-y-0 left-0 h-dvh w-full max-w-sm border-r border-border data-[state=open]:animate-slide-in-left data-[state=closed]:animate-slide-out-left",
  bottom:
    "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-2xl border-t border-border data-[state=open]:animate-slide-in-bottom data-[state=closed]:animate-slide-out-bottom",
};

export interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: SheetSide;
  hideClose?: boolean;
}

/** Side panel built on Dialog. 480ms slide per DESIGN.md §5 (400ms in, 250ms out). */
export const SheetContent = React.forwardRef<React.ComponentRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  function SheetContent({ side = "right", className, children, hideClose = false, ...props }, ref) {
    return (
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={ref}
          className={cn("fixed z-50 flex flex-col bg-bg-elevated text-fg shadow-lg outline-none", sides[side], className)}
          {...props}
        >
          {children}
          {hideClose ? null : (
            <SheetPrimitive.Close className="absolute top-5 right-4 inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-fg-muted transition-colors duration-150 ease-standard hover:bg-bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring">
              <X aria-hidden className="size-5" />
              <span className="sr-only">Close</span>
            </SheetPrimitive.Close>
          )}
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  },
);

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-[4.5rem] shrink-0 items-center border-b border-border px-5 pr-16", className)} {...props} />;
}

export function SheetBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain", className)} {...props} />;
}

export function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("shrink-0 border-t border-border p-5", className)} {...props} />;
}

export const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(function SheetTitle({ className, ...props }, ref) {
  return <SheetPrimitive.Title ref={ref} className={cn("text-h5 text-fg", className)} {...props} />;
});

export const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(function SheetDescription({ className, ...props }, ref) {
  return <SheetPrimitive.Description ref={ref} className={cn("text-sm text-fg-muted", className)} {...props} />;
});
