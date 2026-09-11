import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { footerLegalLinks, footerNav, siteConfig } from "@/lib/site";

const linkClass =
  "inline-block rounded-sm text-sm text-fg-muted transition-colors duration-150 ease-standard hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring";

/** bg-subtle, hairline top. Brand + status + newsletter → six link columns → legal row. */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container>
        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="flex flex-col items-start lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">{siteConfig.description}</p>
            <Link
              href={siteConfig.links.status}
              className="mt-6 inline-flex items-center gap-2 rounded-sm text-sm text-fg-muted transition-colors duration-150 ease-standard hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
            >
              <span aria-hidden className="inline-block size-1.5 rounded-full bg-success animate-pulse-dot" />
              All systems operational
            </Link>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-sm font-medium text-fg">Product updates</p>
            <p className="mt-1 mb-4 text-sm text-fg-muted">What shipped, what changed in the agent contract, and new benchmarks.</p>
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Footer" className="border-t border-border py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
            {footerNav.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-medium text-fg">{column.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.items.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      <Link href={link.href} className={linkClass}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-[0.8125rem] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.legalName}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm transition-colors duration-150 ease-standard hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                >
                  {link.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={siteConfig.links.status}
                className="rounded-sm transition-colors duration-150 ease-standard hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
              >
                Status
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
