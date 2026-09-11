import * as React from "react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import { governanceSteps } from "./data";
import { ApprovalMockup, AuditMockup, PermissionsMockup, ScopeMockup } from "./governance-mockups";
import { SectionIntro } from "./section-intro";

const mockups: Record<string, React.ReactNode> = {
  scope: <ScopeMockup />,
  permissions: <PermissionsMockup />,
  approvals: <ApprovalMockup />,
  "audit-trail": <AuditMockup />,
};

export function Governance() {
  return (
    <Section id="governance" background="subtle" bordered="both" aria-labelledby="governance-heading">
      <Container>
        <SectionIntro
          id="governance-heading"
          eyebrow="How agents are governed"
          title="Four controls, enforced below the agent."
          lede="Scope, permissions, approvals, and the audit trail are enforced at the Gateway, beneath the agent layer. They apply to agents built by Meridian, by partners, and by your team in Studio. No prompt and no builder can switch them off."
          actions={<ArrowLink href="/agents#contract">The agent contract</ArrowLink>}
        />
        <ol className="grid gap-6 lg:grid-cols-2">
          {governanceSteps.map((step, index) => (
            <li key={step.id} id={step.id} className="scroll-mt-24">
              <Reveal delay={Math.min(index, 5) * 0.06} className="h-full">
                <article className="flex h-full flex-col rounded-xl border border-border bg-bg-elevated p-6 lg:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="tabular font-mono text-xs text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
                    <p className="eyebrow">{step.title}</p>
                  </div>
                  <h3 className="text-h4 mt-4">{step.heading}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted">{step.body}</p>
                  <div className="mt-6 flex flex-1 flex-col justify-end rounded-lg border border-border bg-bg-subtle p-3 sm:p-4">
                    {mockups[step.id]}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
