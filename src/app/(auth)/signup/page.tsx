import Link from "next/link";

import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { plans } from "@/content/pricing";
import { createMetadata } from "@/lib/seo/metadata";

import { SignupForm } from "../_components/signup-form";

export const metadata = createMetadata({
  title: "Start your 14-day trial",
  description:
    "Start a 14-day Meridian trial with no card required. Connect one system, run up to 3 governed HR or finance agents, and review every outcome in the Registry.",
  path: "/signup",
  noIndex: true,
});

const nextSteps = [
  {
    title: "Connect one system",
    body: "Link your HRIS, ATS, payroll, or ERP through a prebuilt connector. Access stays read-only until you approve writes.",
  },
  {
    title: "Choose up to 3 agents",
    body: "Pick from the GA catalog. Each agent is scoped to one workflow and logs every action it takes.",
  },
  {
    title: "Review outcomes in the Registry",
    body: "Your trial includes 1,000 credits for 14 days. Every action, approval, and credit is visible before you decide.",
  },
];

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SignupPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const checkoutSuccess = first(params.checkout) === "success";
  const planId = first(params.plan);
  const plan = plans.find((p) => p.id === planId && p.priceMonthly !== null);

  return (
    <div className="w-full max-w-[26.25rem] lg:grid lg:max-w-4xl lg:grid-cols-[26.25rem_minmax(0,1fr)] lg:items-start lg:gap-16">
      <div>
        <Card padding="none" className="p-6 sm:p-8">
          <div className="mb-7 flex flex-col gap-3">
            <h1 className="font-display text-[2.5rem] leading-[1.05] font-normal tracking-[-0.015em]">
              {checkoutSuccess ? "Create your workspace" : "Start your 14-day trial"}
            </h1>
            {checkoutSuccess ? (
              <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                One last step before we provision your agents.
              </p>
            ) : plan ? (
              <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                {plan.name} plan.{" "}
                <Link href="/pricing" className="text-accent underline-offset-4 hover:text-accent-hover hover:underline">
                  Change plan
                </Link>
              </p>
            ) : (
              <p className="text-[0.9375rem] leading-relaxed text-fg-muted">
                Connect one system, run up to 3 agents, and see real outcomes before you decide.
              </p>
            )}
          </div>

          {checkoutSuccess ? (
            <Callout variant="success" title="Checkout complete." className="mb-6">
              Your subscription is set up. Finish creating your workspace below and we will send sign-in details
              to your work email.
            </Callout>
          ) : null}

          <SignupForm />

          <p className="mt-5 text-center text-[0.8125rem] leading-snug text-fg-subtle">
            {checkoutSuccess ? "SOC 2 Type II · ISO 27001" : "No card required for Starter · SOC 2 Type II · ISO 27001"}
          </p>
        </Card>
        <p className="mt-6 text-center text-sm text-fg-muted">
          Already have a workspace?{" "}
          <Link href="/login" className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <aside aria-labelledby="next-steps-heading" className="hidden lg:block lg:pt-8">
        <Eyebrow as="h2" id="next-steps-heading">
          What happens next
        </Eyebrow>
        <ol className="mt-6 flex flex-col">
          {nextSteps.map((step, index) => (
            <li key={step.title} className="flex gap-5 border-t border-border py-5 first:border-t-0 first:pt-0">
              <span className="font-mono text-xs leading-6 text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base leading-6 font-medium tracking-normal text-fg">{step.title}</h3>
                <p className="text-sm leading-relaxed text-fg-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
