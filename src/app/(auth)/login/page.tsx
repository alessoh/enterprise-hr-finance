import Link from "next/link";

import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/seo/metadata";

import { LoginForm } from "../_components/login-form";

export const metadata = createMetadata({
  title: "Sign in",
  description:
    "Sign in to your Meridian workspace with your work email, or through your organization's identity provider. Single sign-on is included on Growth and Enterprise.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="w-full max-w-[26.25rem]">
      <Card padding="none" className="p-6 sm:p-8">
        <div className="mb-7 flex flex-col gap-3">
          <h1 className="font-display text-[2.5rem] leading-[1.05] font-normal tracking-[-0.015em]">
            Sign in to Meridian
          </h1>
          <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
            Use your work email, or your organization&rsquo;s identity provider.
          </p>
        </div>
        <LoginForm />
      </Card>
      <p className="mt-6 text-center text-sm text-fg-muted">
        New to Meridian?{" "}
        <Link href="/signup" className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
          Start your 14-day trial
        </Link>
      </p>
    </div>
  );
}
