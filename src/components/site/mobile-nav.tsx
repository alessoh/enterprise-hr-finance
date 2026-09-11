"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu } from "lucide-react";

import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import type { NavItem, NavLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  nav: NavItem[];
  ctas: { signIn: NavLink; demo: NavLink; start: NavLink };
  className?: string;
}

const rowClass =
  "flex w-full items-center justify-between py-4 text-left text-base font-medium text-fg outline-none focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring";

const subLinkClass =
  "flex items-center justify-between gap-3 rounded-md py-2 text-[0.9375rem] text-fg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring";

/**
 * Hamburger → right Sheet with accordion groups and full-width CTAs (DESIGN.md §6).
 * Every link is wrapped in SheetClose so the panel closes on navigation.
 */
export function MobileNav({ nav, ctas, className }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className={cn("-mr-2 text-fg", className)}>
          <Menu aria-hidden className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-w-[24rem]">
        <SheetHeader>
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <SheetClose asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <SheetBody className="px-5">
          <Accordion type="multiple" className="divide-y divide-border">
            {nav.map((item) =>
              item.groups ? (
                <AccordionItem key={item.title} value={item.title} className="border-b-0">
                  <AccordionTrigger className="py-4">{item.title}</AccordionTrigger>
                  <AccordionContent className="pr-0 pb-3">
                    <div className="flex flex-col gap-5">
                      {item.groups.map((group) => (
                        <div key={group.title}>
                          {item.layout === "mega" ? <p className="eyebrow mb-2">{group.title}</p> : null}
                          <ul className="flex flex-col">
                            {group.items.map((link) => (
                              <li key={link.href}>
                                <SheetClose asChild>
                                  <Link href={link.href} className={subLinkClass}>
                                    <span className="flex min-w-0 items-center gap-2">
                                      <span className="truncate">
                                        {item.layout === "mega" ? link.title.replace(/ Agent$/, "") : link.title}
                                      </span>
                                      {link.status === "Early access" ? (
                                        <StatusBadge status={link.status} size="sm" />
                                      ) : null}
                                    </span>
                                    {item.layout === "list" && link.description ? (
                                      <span className="hidden truncate text-[0.8125rem] text-fg-subtle sm:inline">
                                        {link.description}
                                      </span>
                                    ) : null}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.footerLinks?.length ? (
                        <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                          {item.footerLinks.map((link) => (
                            <SheetClose key={link.href} asChild>
                              <Link
                                href={link.href}
                                className="group/l inline-flex items-center gap-1 rounded-sm text-sm font-medium text-fg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                              >
                                {link.title}
                                <ArrowRight
                                  aria-hidden
                                  className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/l:translate-x-0.5"
                                />
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <div key={item.title}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className={rowClass}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                </div>
              ),
            )}
          </Accordion>
        </SheetBody>
        <SheetFooter className="flex flex-col gap-2.5">
          <SheetClose asChild>
            <Button asChild size="lg" className="w-full">
              <Link href={ctas.start.href}>{ctas.start.title}</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="secondary" size="lg" className="w-full">
              <Link href={ctas.demo.href}>{ctas.demo.title}</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="ghost" size="lg" className="w-full">
              <Link href={ctas.signIn.href}>{ctas.signIn.title}</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
