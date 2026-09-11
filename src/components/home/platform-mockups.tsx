import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

/*
 * Compact product-UI mockups for the home Platform tabs (DESIGN.md §6 "Product-UI
 * mockups"): HTML, not images; dense 12–13px typography; tabular numerals; tokens only;
 * fictional partners, 2026 dates, IDs like CASE-48211; one accent per view; no lorem.
 */

function Th({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <th
      scope="col"
      className={cn(
        "h-8 bg-bg-subtle px-3 text-left text-xs font-medium tracking-[0.04em] whitespace-nowrap text-fg-muted uppercase first:pl-4 last:pr-4",
        className,
      )}
    >
      {children}
    </th>
  );
}

function Td({ className, children }: { className?: string; children: React.ReactNode }) {
  return <td className={cn("px-3 py-2 align-middle first:pl-4 last:pr-4", className)}>{children}</td>;
}

function Toolbar({ title, meta, children }: { title: string; meta?: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center justify-between gap-3 border-b border-border px-4">
      <div className="flex min-w-0 items-baseline gap-2">
        <span className="truncate text-[0.8125rem] font-medium text-fg">{title}</span>
        {meta ? <span className="tabular hidden text-xs text-fg-subtle sm:inline">{meta}</span> : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-1.5">{children}</div> : null}
    </div>
  );
}

function Chip({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "tabular inline-flex h-6 items-center rounded-md border px-2 text-xs whitespace-nowrap",
        active ? "border-fg bg-fg text-bg" : "border-border bg-bg-elevated text-fg-muted",
      )}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

type RegistryStatus = "Active" | "Review due" | "Paused";

const registryStatus: Record<RegistryStatus, { variant: BadgeVariant; dot: BadgeVariant }> = {
  Active: { variant: "neutral", dot: "success" },
  "Review due": { variant: "warning", dot: "warning" },
  Paused: { variant: "neutral", dot: "neutral" },
};

const registryRows: Array<{
  agent: string;
  source: string;
  owner: string;
  scopes: string;
  status: RegistryStatus;
  reviewed: string;
  outcomes: string;
}> = [
  { agent: "Help Desk Agent", source: "Meridian", owner: "D. Okafor", scopes: "HRIS · Policy library", status: "Active", reviewed: "2026-08-14", outcomes: "2,184 cases resolved" },
  { agent: "Controls Agent", source: "Meridian", owner: "M. Lindqvist", scopes: "ERP AP · Bank feed", status: "Active", reviewed: "2026-07-30", outcomes: "41 exceptions held" },
  { agent: "Close Agent", source: "Meridian", owner: "E. Vasquez", scopes: "GL · Sub-ledgers", status: "Active", reviewed: "2026-08-02", outcomes: "96 tasks closed" },
  { agent: "Vendor Onboarding", source: "Studio", owner: "R. Chen", scopes: "Procurement · ERP vendors", status: "Review due", reviewed: "2026-05-19", outcomes: "312 vendors checked" },
  { agent: "Expense Audit", source: "Partner · Gateway", owner: "K. Mensah", scopes: "Expense · Card feed", status: "Paused", reviewed: "2026-08-21", outcomes: "Paused 3 days" },
];

export function RegistryMockup() {
  return (
    <div className="text-xs leading-5">
      <Toolbar title="Agents" meta="14 registered · 11 active">
        <Chip active>All sources</Chip>
        <span className="hidden sm:contents">
          <Chip>Meridian 9</Chip>
          <Chip>Studio 3</Chip>
          <Chip>Partner 2</Chip>
        </span>
      </Toolbar>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th>Agent</Th>
            <Th className="hidden sm:table-cell">Owner</Th>
            <Th className="hidden md:table-cell">Data scopes</Th>
            <Th>Status</Th>
            <Th className="hidden lg:table-cell">Reviewed</Th>
            <Th className="text-right">30-day outcomes</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {registryRows.map((row) => {
            const status = registryStatus[row.status];
            return (
              <tr key={row.agent}>
                <Td>
                  <span className="block font-medium text-fg">{row.agent}</span>
                  <span className="block text-fg-subtle">{row.source}</span>
                </Td>
                <Td className="hidden text-fg-muted sm:table-cell">{row.owner}</Td>
                <Td className="hidden text-fg-muted md:table-cell">{row.scopes}</Td>
                <Td>
                  <Badge variant={status.variant} dot={status.dot} size="sm">
                    {row.status}
                  </Badge>
                </Td>
                <Td className="tabular hidden text-fg-muted lg:table-cell">{row.reviewed}</Td>
                <Td className="tabular text-right whitespace-nowrap text-fg">{row.outcomes}</Td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gateway
// ---------------------------------------------------------------------------

type Decision = "Allowed" | "Held" | "Denied";

const decisionVariant: Record<Decision, BadgeVariant> = { Allowed: "success", Held: "accent", Denied: "danger" };

const gatewayRows: Array<{ ts: string; agent: string; tool: string; scope: string; decision: Decision; note: string }> = [
  { ts: "09:41:12", agent: "Payroll Agent", tool: "payroll.update_withholding", scope: "payroll:write", decision: "Held", note: "Approval → P. Nakamura" },
  { ts: "09:41:09", agent: "Controls Agent", tool: "erp.ap.list_invoices", scope: "ap:read", decision: "Allowed", note: "84 ms" },
  { ts: "09:41:06", agent: "Expense Audit (partner)", tool: "ledger.post_journal", scope: "gl:write missing", decision: "Denied", note: "Rule G-7" },
  { ts: "09:41:01", agent: "Scheduling Agent", tool: "wfm.offer_shift", scope: "wfm:write", decision: "Allowed", note: "112 ms" },
  { ts: "09:40:57", agent: "Audit Agent", tool: "docs.fetch_evidence", scope: "audit:read", decision: "Allowed", note: "61 ms" },
  { ts: "09:40:52", agent: "Recruiting Agent", tool: "ats.reject_candidate", scope: "ats:write", decision: "Held", note: "Approval → T. Herrera" },
];

export function GatewayMockup() {
  return (
    <div className="text-xs leading-5">
      <Toolbar title="Policy decisions" meta="Policy v14 · last 60 seconds">
        <Chip>MCP servers 23</Chip>
        <span className="hidden sm:contents">
          <Chip>A2A peers 4</Chip>
          <Chip>OTLP export on</Chip>
        </span>
      </Toolbar>
      <ol className="divide-y divide-border">
        {gatewayRows.map((row) => (
          <li key={row.ts} className="grid grid-cols-[3.75rem_minmax(0,1fr)_auto] items-center gap-x-3 px-4 py-2">
            <span className="tabular font-mono text-fg-subtle">{row.ts}</span>
            <div className="min-w-0">
              <p className="truncate">
                <span className="font-medium text-fg">{row.agent}</span>
                <span aria-hidden className="mx-1.5 text-fg-faint">
                  →
                </span>
                <span className="font-mono text-fg-muted">{row.tool}</span>
              </p>
              <p className="truncate text-fg-subtle">
                scope <span className="font-mono">{row.scope}</span>
                <span className="hidden sm:inline"> · {row.note}</span>
              </p>
            </div>
            <Badge variant={decisionVariant[row.decision]} size="sm">
              {row.decision}
            </Badge>
          </li>
        ))}
      </ol>
      <p className="flex items-center justify-between gap-3 border-t border-border bg-bg-subtle px-4 py-2 text-fg-subtle">
        <span>Holds are enforced here, below the agent. No prompt or builder can skip them.</span>
        <span className="tabular hidden whitespace-nowrap sm:inline">2 held · 1 denied · 3 allowed</span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Data Fabric
// ---------------------------------------------------------------------------

const sources: Array<{ name: string; detail: string; access: string; freshness: string; objects: string }> = [
  { name: "Snowflake", detail: "PROD_HR", access: "Zero-copy share", freshness: "4 min", objects: "212 tables" },
  { name: "Databricks", detail: "finance_lakehouse", access: "Apache Iceberg", freshness: "11 min", objects: "96 tables" },
  { name: "BigQuery", detail: "workforce_analytics", access: "Zero-copy share", freshness: "9 min", objects: "48 tables" },
  { name: "HRIS", detail: "Connector", access: "Read-only", freshness: "2 min", objects: "38 objects" },
  { name: "ERP (AP, GL)", detail: "Connector", access: "Read-only", freshness: "5 min", objects: "64 objects" },
  { name: "Payroll provider", detail: "Connector", access: "Read-only", freshness: "15 min", objects: "12 objects" },
];

export function DataFabricMockup() {
  return (
    <div className="text-xs leading-5">
      <Toolbar title="Sources" meta="6 connected · Region EU-West">
        <Chip active>All</Chip>
        <span className="hidden sm:contents">
          <Chip>Warehouses 3</Chip>
          <Chip>Connectors 3</Chip>
        </span>
      </Toolbar>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <Th>Source</Th>
            <Th>Access</Th>
            <Th className="hidden sm:table-cell">Policy</Th>
            <Th className="text-right">Freshness</Th>
            <Th className="hidden text-right md:table-cell">Objects</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sources.map((source) => (
            <tr key={source.name}>
              <Td>
                <span className="block font-medium text-fg">{source.name}</span>
                <span className="block font-mono text-fg-subtle">{source.detail}</span>
              </Td>
              <Td className="text-fg-muted">{source.access}</Td>
              <Td className="hidden text-fg-muted sm:table-cell">Inherited from source</Td>
              <Td className="tabular text-right whitespace-nowrap text-fg">{source.freshness}</Td>
              <Td className="tabular hidden text-right whitespace-nowrap text-fg-muted md:table-cell">{source.objects}</Td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="flex items-center justify-between gap-3 border-t border-border bg-bg-subtle px-4 py-2 text-fg-subtle">
        <span>Nothing is copied. Agents query in place under the source&apos;s row and column security.</span>
        <span className="tabular hidden whitespace-nowrap sm:inline">3,000+ connectors available</span>
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Studio
// ---------------------------------------------------------------------------

const studioBlocks: Array<{ kind: string; title: string; detail: string; approval?: boolean }> = [
  { kind: "Trigger", title: "New invoice posted in ERP", detail: "erp.ap.invoice.created" },
  { kind: "Read", title: "Match vendor, amount, and date against 90 days of AP", detail: "Data Fabric · ap.invoices" },
  { kind: "Reason", title: "Score duplicate likelihood", detail: "Model: workspace default" },
  { kind: "Approval", title: "If score ≥ 0.80, hold and route to the AP manager", detail: "Required · cannot be removed", approval: true },
  { kind: "Action", title: "Write a hold note to the invoice", detail: "Gateway · erp.ap.add_note" },
];

export function StudioMockup() {
  return (
    <div className="text-xs leading-5">
      <Toolbar title="Duplicate Invoice Check" meta="v3 · draft">
        <Chip>Test</Chip>
        <Chip active>Publish</Chip>
      </Toolbar>
      <div className="grid sm:grid-cols-[minmax(0,1fr)_12rem]">
        <div className="relative bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-[length:16px_16px] px-4 py-4">
          <ol className="relative mx-auto max-w-[22rem] space-y-0">
            {studioBlocks.map((block, index) => (
              <li key={block.kind} className="relative">
                {index > 0 ? <span aria-hidden className="mx-auto block h-3 w-px bg-border-strong" /> : null}
                <div
                  className={cn(
                    "rounded-md border bg-bg-elevated px-3 py-2 shadow-xs",
                    block.approval ? "border-accent" : "border-border",
                  )}
                >
                  <p className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "text-[0.75rem] font-medium tracking-[0.04em] uppercase",
                        block.approval ? "text-accent" : "text-fg-subtle",
                      )}
                    >
                      {block.kind}
                    </span>
                    {block.approval ? (
                      <Badge variant="accent" size="sm">
                        Human
                      </Badge>
                    ) : null}
                  </p>
                  <p className="mt-0.5 font-medium text-fg">{block.title}</p>
                  <p className="font-mono text-fg-subtle">{block.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="border-t border-border bg-bg-subtle px-4 py-4 sm:border-t-0 sm:border-l">
          <p className="text-[0.75rem] font-medium tracking-[0.04em] text-fg-subtle uppercase">Evaluation set</p>
          <dl className="tabular mt-2 space-y-1">
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">Cases</dt>
              <dd className="text-fg">240</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">Pass rate</dt>
              <dd className="font-medium text-fg">97.1%</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-fg-muted">False positives</dt>
              <dd className="text-fg">2</dd>
            </div>
          </dl>
          <p className="mt-4 text-[0.75rem] font-medium tracking-[0.04em] text-fg-subtle uppercase">On publish</p>
          <ul className="mt-2 space-y-1 text-fg-muted">
            <li>Registered in Registry</li>
            <li>Owner: R. Chen</li>
            <li>Risk tier 2 · review in 90 days</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Assist
// ---------------------------------------------------------------------------

function Citation({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-sm border border-border bg-bg-elevated px-1.5 font-mono text-[0.75rem] text-fg-muted">
      {children}
    </span>
  );
}

export function AssistMockup() {
  return (
    <div className="flex flex-col text-xs leading-5">
      <Toolbar title="Assist" meta="Halvorsen Health · HR workspace">
        <Chip>Browser</Chip>
        <span className="hidden sm:contents">
          <Chip>Slack</Chip>
          <Chip>Teams</Chip>
        </span>
      </Toolbar>
      <div className="space-y-4 px-4 py-4">
        <div className="flex justify-end">
          <p className="max-w-[85%] rounded-lg rounded-br-sm bg-bg-muted px-3 py-2 text-fg">
            How many PTO hours does a part-time nurse accrue per pay period in Ontario?
          </p>
        </div>
        <div className="max-w-[92%] space-y-2">
          <p className="text-fg">
            Part-time nurses in Ontario accrue <span className="tabular font-medium">3.08 hours</span> of PTO per{" "}
            <span className="tabular">80 hours</span> worked (<span className="tabular">0.0385</span> per hour), prorated
            to the pay period. Accrual pauses during unpaid leave.
          </p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span className="text-fg-subtle">Sources</span>
            <Citation>HR-214 §3 · Policy library</Citation>
            <Citation>Accrual plan PT-ON · HRIS</Citation>
          </p>
          <p className="text-fg">
            Your current balance is <span className="tabular font-medium">46.5 hours</span>, as of{" "}
            <time dateTime="2026-09-10">10 Sep 2026</time>.{" "}
            <span className="text-fg-subtle">Read from your own HRIS record; nobody else can see it.</span>
          </p>
          <p className="flex flex-wrap gap-1.5 pt-1">
            <Chip>Request time off</Chip>
            <Chip>Open an HR case</Chip>
          </p>
        </div>
      </div>
      <div className="mt-auto border-t border-border px-4 py-3">
        <div className="flex h-9 items-center justify-between rounded-md border border-border-strong bg-bg-elevated px-3 shadow-xs">
          <span className="text-fg-subtle">Ask Assist</span>
          <span className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      </div>
    </div>
  );
}

export const platformMockups = {
  registry: RegistryMockup,
  gateway: GatewayMockup,
  "data-fabric": DataFabricMockup,
  studio: StudioMockup,
  assist: AssistMockup,
} as const;

export const platformMockupUrls: Record<keyof typeof platformMockups, string> = {
  registry: "app.meridian.example/registry",
  gateway: "app.meridian.example/gateway/decisions",
  "data-fabric": "app.meridian.example/data/sources",
  studio: "app.meridian.example/studio/duplicate-invoice-check",
  assist: "app.meridian.example/assist",
};
