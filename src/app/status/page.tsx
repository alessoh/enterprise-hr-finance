import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { LiveDot } from "@/components/live/live-dot";
import { StatusBoard } from "@/components/live/status-board";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { getStatusPayloadNow } from "@/lib/live/status";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { createMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const TITLE = "System status";
const DESCRIPTION =
  "Current availability for Meridian's Assist, agents runtime, Registry, Gateway, and Data Fabric, with 90-day uptime history and past incidents.";

export const metadata = createMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/status",
});

export default function StatusPage() {
  const payload = getStatusPayloadNow();

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({ name: TITLE, description: DESCRIPTION, path: "/status" }),
          breadcrumbJsonLd([
            { name: "Meridian", path: "/" },
            { name: "Status", path: "/status" },
          ]),
        ]}
      />

      <div className="border-b border-border bg-bg-subtle">
        <Container>
          <div className="py-12 lg:py-16">
            <Eyebrow dot="live">Status</Eyebrow>
            <h1 className="text-h1 mt-4">All systems operational</h1>
            <p className="text-lede mt-4 max-w-[60ch]">
              Availability across every Meridian component, refreshed while this page is open.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <LiveDot label={`Checked ${formatDate(payload.asOf, "short")}`} />
              <span className="text-caption">
                Enterprise plans carry a 99.95% availability commitment. See the{" "}
                <Link href="/legal/dpa" className="text-accent underline underline-offset-4">
                  service terms
                </Link>
                .
              </span>
            </div>
          </div>
        </Container>
      </div>

      <Section spacing="compact">
        <Container>
          <StatusBoard initial={payload} />
        </Container>
      </Section>

      <Section spacing="compact" background="subtle" bordered="top">
        <Container>
          <h2 className="text-h3">Incident history</h2>
          <ol className="mt-8 space-y-8">
            {payload.incidents.map((incident) => (
              <li key={incident.id} className="grid gap-3 lg:grid-cols-[10rem_1fr] lg:gap-10">
                <div className="text-[13px] text-fg-subtle">
                  <time dateTime={incident.date} className="tabular block">
                    {formatDate(incident.date, "medium")}
                  </time>
                  <span className="tabular mt-1 block">{incident.durationMinutes} min</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] font-medium text-fg">{incident.title}</h3>
                    <span className="rounded-sm bg-success-soft px-1.5 py-0.5 text-[11px] font-medium leading-4 text-success">
                      Resolved
                    </span>
                  </div>
                  <p className="mt-2 max-w-[68ch] text-[14px] leading-6 text-fg-muted">
                    {incident.summary}
                  </p>
                  <p className="text-caption mt-2">Affected: {incident.components.join(", ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section spacing="compact" bordered="top">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-h3">Get status updates</h2>
              <p className="text-body mt-3 max-w-[52ch] text-fg-muted">
                We email incident notices and post-incident reviews. No marketing.
              </p>
            </div>
            <div className="lg:pt-1">
              <NewsletterForm source="status" />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
