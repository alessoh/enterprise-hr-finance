import { JsonLd } from "@/components/seo/JsonLd";
import { AgentRail } from "@/components/live/agent-rail";
import { ApprovalsQueue } from "@/components/live/approvals-queue";
import { CreditsMeter } from "@/components/live/credits-meter";
import { LiveOperations } from "@/components/live/live-operations";
import { UtilizationBars } from "@/components/live/utilization-bars";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getDashboardDataNow } from "@/lib/live/generator";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

const TITLE = "Live agent operations";
const DESCRIPTION =
  "Watch Meridian agents work in real time: the operations feed, today's metrics, the approvals queue a human still owns, and credits consumed.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/dashboard",
});

export default function DashboardPage() {
  const { snapshot, agents, credits, approvals } = getDashboardDataNow();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/dashboard" }),
          breadcrumbJsonLd([
            { name: "Meridian", path: "/" },
            { name: "Live demo", path: "/dashboard" },
          ]),
        ]}
      />

      <div className="border-b border-border bg-bg-subtle">
        <Container size="wide">
          <div className="flex flex-col gap-3 py-8 sm:flex-row sm:items-end sm:justify-between lg:py-10">
            <div>
              <Eyebrow dot="live">Live demo</Eyebrow>
              <h1 className="text-h2 mt-3">{TITLE}</h1>
              <p className="text-body mt-3 max-w-[62ch] text-fg-muted">
                A simulated Meridian workspace, streamed over Server-Sent Events. Every row is an
                action an agent took, what it cost in credits, and whether a person still has to
                decide.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container size="wide">
        <div className="grid gap-6 py-8 lg:grid-cols-12 lg:py-10">
          <aside className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
              <div className="border-b border-border bg-bg-subtle px-4 py-2">
                <h2 className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
                  Agents · actions today
                </h2>
              </div>
              <AgentRail agents={agents} />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
              <CreditsMeter credits={credits} />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
              <UtilizationBars agents={agents} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
              <LiveOperations snapshot={snapshot} variant="full" />
            </div>
            <div className="mt-6 overflow-hidden rounded-xl bg-bg-elevated ring-1 ring-border">
              <ApprovalsQueue items={approvals} />
            </div>
            <p className="text-caption mt-6">
              This is a live simulation of a Meridian workspace. Names, amounts, and identifiers are
              fictional design-partner data. Approvals here change nothing outside your browser.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
