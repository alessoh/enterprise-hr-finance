import Link from "next/link";

import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";

/**
 * Calm auth shell. The root layout still renders the site header and footer;
 * this only provides the subtle full-height ground, the mark, and a legal note.
 */
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-bg-subtle">
      <Container className="flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center py-12 lg:py-16">
        <Logo markOnly className="mb-8" />
        {children}
        <p className="mt-10 max-w-sm text-center text-[0.8125rem] leading-snug text-fg-subtle">
          By continuing you agree to the{" "}
          <Link href="/legal/terms" className="text-fg-muted underline underline-offset-4 hover:text-fg">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-fg-muted underline underline-offset-4 hover:text-fg">
            Privacy Policy
          </Link>
          .
        </p>
      </Container>
    </div>
  );
}
