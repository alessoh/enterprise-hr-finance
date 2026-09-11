"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(function AccordionItem({ className, ...props }, ref) {
  return <AccordionPrimitive.Item ref={ref} className={cn("border-b border-border", className)} {...props} />;
});

export const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(function AccordionTrigger({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-sm py-5 text-left text-base font-medium text-fg outline-none transition-colors duration-150 ease-standard hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          aria-hidden
          className="mt-1 size-4 shrink-0 text-fg-subtle transition-transform duration-200 ease-out-quart"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

/**
 * Content stays in the DOM when closed (forceMount) so crawlers read every answer.
 * Height animates via grid rows; visibility flips at the end of the transition so
 * closed content is neither focusable nor announced.
 */
export const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(function AccordionContent({ className, children, ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      forceMount
      className="grid text-[0.9375rem] leading-relaxed text-fg-muted transition-[grid-template-rows,visibility] duration-200 ease-out-quart data-[state=closed]:invisible data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
      {...props}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn("pr-8 pb-5 [&_p_a]:text-accent [&_p_a]:underline [&_p_a]:underline-offset-4 [&_p+p]:mt-3", className)}>
          {children}
        </div>
      </div>
    </AccordionPrimitive.Content>
  );
});
