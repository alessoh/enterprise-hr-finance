"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { NavigationMenu } from "radix-ui";

import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import { MobileNav } from "@/components/site/mobile-nav";
import type { NavGroup, NavItem, NavLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export interface SiteHeaderProps {
  nav: NavItem[];
  ctas: { signIn: NavLink; demo: NavLink; start: NavLink };
}

const triggerClass =
  "group/nav inline-flex h-9 cursor-pointer items-center gap-1 rounded-md px-3 text-sm font-medium text-fg-muted outline-none transition-colors duration-150 ease-standard select-none hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring data-[state=open]:text-fg data-[active]:text-fg";

const menuItemClass =
  "group/item flex flex-col gap-0.5 rounded-md px-2.5 py-2 outline-none transition-colors duration-150 ease-standard hover:bg-bg-muted focus-visible:bg-bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-ring";

function isActive(pathname: string, href: string): boolean {
  const base = href.split(/[?#]/)[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(`${base}/`);
}

function MenuLink({ link, compact = false }: { link: NavLink; compact?: boolean }) {
  return (
    <NavigationMenu.Link asChild>
      <Link href={link.href} className={menuItemClass}>
        <span className="flex items-center gap-2 text-sm font-medium text-fg">
          <span className="whitespace-nowrap">{compact ? link.title.replace(/ Agent$/, "") : link.title}</span>
          {link.status ? <StatusBadge status={link.status} size="sm" /> : null}
        </span>
        {link.description ? (
          <span className="text-[0.8125rem] leading-snug text-fg-muted">{link.description}</span>
        ) : null}
      </Link>
    </NavigationMenu.Link>
  );
}

function MenuGroup({ group, compact, className }: { group: NavGroup; compact?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow px-2.5 pt-2 pb-3">{group.title}</p>
      <ul className="flex flex-col">
        {group.items.map((link) => (
          <li key={link.href}>
            <MenuLink link={link} compact={compact} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Three columns: HR · Finance + Legal & Ops (stacked, six items each side) · Platform.
 * Stacking the single legal agent under finance keeps the panel balanced.
 */
function MegaPanel({ item }: { item: NavItem }) {
  const groups = item.groups ?? [];
  const [hr, finance, legal, platform] = groups;
  return (
    <div className="w-[min(54rem,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-border bg-bg-elevated shadow-md">
      <div className="grid grid-cols-3">
        {hr ? <MenuGroup group={hr} compact className="border-r border-border p-3" /> : null}
        <div className="flex flex-col gap-3 border-r border-border p-3">
          {finance ? <MenuGroup group={finance} compact /> : null}
          {legal ? <MenuGroup group={legal} compact /> : null}
        </div>
        {platform ? <MenuGroup group={platform} className="bg-bg-subtle/60 p-3" /> : null}
      </div>
      {item.footerLinks?.length ? (
        <div className="flex items-center gap-6 border-t border-border bg-bg-subtle px-5 py-3">
          {item.footerLinks.map((link) => (
            <NavigationMenu.Link key={link.href} asChild>
              <Link
                href={link.href}
                className="group/f inline-flex items-center gap-1.5 rounded-sm text-[0.8125rem] font-medium text-fg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
              >
                {link.title}
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-200 ease-out-quart group-hover/f:translate-x-0.5" />
              </Link>
            </NavigationMenu.Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ListPanel({ item }: { item: NavItem }) {
  const links = item.groups?.flatMap((g) => g.items) ?? [];
  return (
    <div className="w-80 rounded-lg border border-border bg-bg-elevated p-2 shadow-md">
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <MenuLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DesktopNav({ nav, className }: { nav: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <NavigationMenu.Root delayDuration={80} skipDelayDuration={300} className={cn("relative", className)}>
      <NavigationMenu.List className="flex items-center gap-0.5">
        {nav.map((item) =>
          item.groups ? (
            <NavigationMenu.Item key={item.title} value={item.title} className={item.layout === "list" ? "relative" : undefined}>
              <NavigationMenu.Trigger
                className={triggerClass}
                data-active={isActive(pathname, item.href) || item.groups.some((g) => g.items.some((l) => isActive(pathname, l.href))) ? "" : undefined}
              >
                {item.title}
                <ChevronDown
                  aria-hidden
                  className="size-3.5 text-fg-subtle transition-transform duration-200 ease-out-quart group-data-[state=open]/nav:rotate-180 group-data-[state=open]/nav:text-fg"
                />
              </NavigationMenu.Trigger>
              {/* Radix positions content against the list wrapper (36px tall, centered in the
                  72px header). pt-6 lands the panel 6px under the header edge with no hover gap. */}
              <NavigationMenu.Content className="absolute top-full left-0 pt-6 data-[state=open]:animate-menu-in data-[state=closed]:animate-menu-out">
                {item.layout === "mega" ? <MegaPanel item={item} /> : <ListPanel item={item} />}
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={item.title}>
              <NavigationMenu.Link asChild active={isActive(pathname, item.href)}>
                <Link href={item.href} className={triggerClass}>
                  {item.title}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ),
        )}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

/** 72px sticky header. Transparent at rest; bg/85 + 16px blur and a hairline after 8px of scroll. */
export function SiteHeader({ nav, ctas }: SiteHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled ? "" : undefined}
      className={cn(
        "sticky top-0 z-40 h-[4.5rem] border-b transition-[background-color,border-color,backdrop-filter] duration-200 ease-standard",
        scrolled ? "border-border bg-bg/85 backdrop-blur-[16px]" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-8">
          <Logo />
          <DesktopNav nav={nav} className="hidden lg:block" />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href={ctas.signIn.href}>{ctas.signIn.title}</Link>
          </Button>
          <Button asChild variant="secondary" size="sm">
            <Link href={ctas.demo.href}>{ctas.demo.title}</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={ctas.start.href}>{ctas.start.title}</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href={ctas.start.href}>{ctas.start.title}</Link>
          </Button>
          <MobileNav nav={nav} ctas={ctas} />
        </div>
      </Container>
    </header>
  );
}
