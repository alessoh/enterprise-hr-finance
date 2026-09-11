import { Search, SlidersHorizontal } from "lucide-react";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { WindowFrame } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils";

type Compliance = "compliant" | "review-due" | "paused";
type Source = "Meridian" | "Studio" | "Partner";

interface RegistryRow {
  name: string;
  source: Source;
  owner: string;
  role: string;
  scope: string;
  data: string;
  status: Compliance;
  reviewed: string;
  selected?: boolean;
}

const rows: RegistryRow[] = [
  { name: "Payroll Agent", source: "Meridian", owner: "M. Reyes", role: "Pre-run checks", scope: "payroll:read · hris:read", data: "Payroll register, HRIS", status: "compliant", reviewed: "Aug 14, 2026", selected: true },
  { name: "Help Desk Agent", source: "Meridian", owner: "D. Okafor", role: "Tier-1 cases", scope: "hris:read · policy:read", data: "HRIS, policy library", status: "compliant", reviewed: "Aug 02, 2026" },
  { name: "Audit Agent", source: "Meridian", owner: "K. Lindqvist", role: "Evidence packaging", scope: "gl:read · docs:read", data: "General ledger, documents", status: "compliant", reviewed: "Jul 28, 2026" },
  { name: "Controls Agent", source: "Meridian", owner: "S. Bhatt", role: "Transaction tests", scope: "ap:read · gl:read", data: "AP ledger, vendor master", status: "review-due", reviewed: "Jun 03, 2026" },
  { name: "Close Agent", source: "Meridian", owner: "T. Nakamura", role: "Close orchestration", scope: "gl:read · recon:write", data: "General ledger, reconciliations", status: "compliant", reviewed: "Aug 20, 2026" },
  { name: "Vendor Risk Check", source: "Studio", owner: "P. Adeyemi", role: "Vendor screening", scope: "vendor:read", data: "Vendor master", status: "paused", reviewed: "Aug 29, 2026" },
  { name: "Expense Auditor", source: "Partner", owner: "L. Marsh", role: "Expense checks", scope: "expense:read", data: "Expense reports", status: "compliant", reviewed: "Aug 11, 2026" },
  { name: "Scheduling Agent", source: "Meridian", owner: "R. Castillo", role: "Shift fill", scope: "schedule:write · hris:read", data: "Scheduling, HRIS", status: "compliant", reviewed: "Aug 25, 2026" },
];

const statusMeta: Record<Compliance, { label: string; variant: BadgeVariant }> = {
  compliant: { label: "Compliant", variant: "success" },
  "review-due": { label: "Review due", variant: "warning" },
  paused: { label: "Paused", variant: "danger" },
};

const tabs = ["Agents", "People", "Analytics", "Policies"];

const th = "h-9 whitespace-nowrap bg-bg-subtle px-4 text-left text-xs font-medium tracking-[0.06em] text-fg-muted uppercase";
const td = "px-4 py-2.5 align-middle whitespace-nowrap";

export function RegistryMockup({ className }: { className?: string }) {
  return (
    <WindowFrame
      url="app.meridian.example/registry"
      actions={
        <Badge variant="neutral" dot="success">
          24 agents
        </Badge>
      }
      className={className}
      aria-label="Registry: table of every agent with owner, permissions, data touched, and compliance status"
    >
      <div className="@container">
        <div className="flex h-11 items-center gap-1 border-b border-border px-3">
          {tabs.map((tab, index) => (
            <span
              key={tab}
              className={cn(
                "relative flex h-11 items-center px-2 text-[0.8125rem]",
                index === 0 ? "font-medium text-fg" : "text-fg-muted",
                index === 0 && "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:bg-accent",
                index > 1 && "hidden @md:flex",
              )}
            >
              {tab}
            </span>
          ))}
          <div className="ml-auto hidden h-7 items-center gap-2 rounded-md border border-border bg-bg-elevated px-2.5 text-xs text-fg-subtle @sm:flex">
            <Search aria-hidden className="size-3.5" />
            Search agents
          </div>
          <span className="ml-auto inline-flex h-7 items-center gap-1.5 rounded-md border border-border px-2 text-xs text-fg-muted @sm:ml-0">
            <SlidersHorizontal aria-hidden className="size-3.5" />
            Filter
          </span>
        </div>

        <div className="grid @4xl:grid-cols-[minmax(0,1fr)_17.5rem]">
          <div className="min-w-0 overflow-hidden">
            <table className="w-full border-collapse text-[0.8125rem]">
              <thead>
                <tr>
                  <th scope="col" className={th}>Agent</th>
                  <th scope="col" className={th}>Owner</th>
                  <th scope="col" className={cn(th, "hidden @lg:table-cell")}>Role</th>
                  <th scope="col" className={cn(th, "hidden @2xl:table-cell")}>Permissions</th>
                  <th scope="col" className={cn(th, "hidden @3xl:table-cell")}>Data touched</th>
                  <th scope="col" className={th}>Compliance</th>
                  <th scope="col" className={cn(th, "hidden text-right @lg:table-cell")}>Last review</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const status = statusMeta[row.status];
                  return (
                    <tr
                      key={row.name}
                      className={cn(
                        "border-b border-border last:border-0",
                        row.selected && "bg-accent-soft/60 shadow-[inset_2px_0_0_var(--color-accent)]",
                      )}
                    >
                      <td className={cn(td, "font-medium text-fg")}>
                        <span className="flex items-center gap-2">
                          {row.name}
                          {row.source !== "Meridian" ? (
                            <span className="hidden rounded-sm border border-border px-1.5 py-px text-xs font-normal text-fg-muted @xs:inline">
                              {row.source}
                            </span>
                          ) : null}
                        </span>
                      </td>
                      <td className={cn(td, "text-fg-muted")}>{row.owner}</td>
                      <td className={cn(td, "hidden text-fg-muted @lg:table-cell")}>{row.role}</td>
                      <td className={cn(td, "hidden font-mono text-xs text-fg-muted @2xl:table-cell")}>{row.scope}</td>
                      <td className={cn(td, "hidden text-fg-muted @3xl:table-cell")}>{row.data}</td>
                      <td className={td}>
                        <Badge variant={status.variant} dot>
                          {status.label}
                        </Badge>
                      </td>
                      <td className={cn(td, "tabular hidden text-right text-fg-muted @lg:table-cell")}>{row.reviewed}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <aside className="hidden border-l border-border bg-bg-subtle/60 @4xl:block" aria-label="Selected agent: Payroll Agent">
            <div className="border-b border-border px-4 py-3">
              <p className="text-xs text-fg-subtle">Selected agent</p>
              <p className="mt-0.5 text-sm font-medium text-fg">Payroll Agent</p>
              <p className="mt-1 text-xs text-fg-muted">Meridian · GA · pre-run checks and wage-law updates</p>
            </div>
            <dl className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 px-4 py-3 text-xs">
              <dt className="text-fg-subtle">Owner</dt>
              <dd className="text-fg">M. Reyes · Payroll operations</dd>
              <dt className="text-fg-subtle">Risk tier</dt>
              <dd className="tabular text-fg">2 of 4</dd>
              <dt className="text-fg-subtle">Model</dt>
              <dd className="text-fg">Workspace default · US region</dd>
              <dt className="text-fg-subtle">Last review</dt>
              <dd className="tabular text-fg">Aug 14, 2026 · S. Whitfield</dd>
              <dt className="text-fg-subtle">Next review</dt>
              <dd className="tabular text-fg">Nov 14, 2026</dd>
              <dt className="text-fg-subtle">Evaluation</dt>
              <dd className="tabular text-fg">62 of 62 cases pass</dd>
            </dl>
            <div className="border-t border-border px-4 py-3">
              <p className="text-xs font-medium text-fg">Permissions</p>
              <ul className="mt-2 space-y-1.5 font-mono text-xs text-fg-muted">
                <li className="flex items-center justify-between gap-2">
                  payroll:read
                  <span className="font-sans text-fg-subtle">inherited</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  hris:read
                  <span className="font-sans text-fg-subtle">inherited</span>
                </li>
                <li className="flex items-center justify-between gap-2">
                  payroll:draft_correction
                  <span className="font-sans text-warning">approval</span>
                </li>
              </ul>
            </div>
            <div className="border-t border-border px-4 py-3">
              <p className="text-xs font-medium text-fg">Last 30 days</p>
              <dl className="tabular mt-2 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <dd className="text-sm font-medium text-fg">1,284</dd>
                  <dt className="text-fg-subtle">checks</dt>
                </div>
                <div>
                  <dd className="text-sm font-medium text-fg">96</dd>
                  <dt className="text-fg-subtle">issues found</dt>
                </div>
                <div>
                  <dd className="text-sm font-medium text-fg">41.5 h</dd>
                  <dt className="text-fg-subtle">saved</dt>
                </div>
              </dl>
            </div>
            <div className="flex items-center gap-2 border-t border-border px-4 py-3">
              <span className="inline-flex h-7 items-center rounded-md border border-border-strong bg-bg-elevated px-2.5 text-xs font-medium text-fg">
                Pause
              </span>
              <span className="inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium text-fg-muted">Scope down</span>
              <span className="inline-flex h-7 items-center rounded-md px-2.5 text-xs font-medium text-fg-muted">Export log</span>
            </div>
          </aside>
        </div>
      </div>
    </WindowFrame>
  );
}
