import { Badge, StatusBadge } from "@/components/ui/badge";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * Compact product-UI mockups for the governance section. HTML, not images (DESIGN.md §6):
 * 12–13px type, tabular numerals, real-looking 2026 data, one accent per view.
 */

const frame = "overflow-hidden rounded-md bg-bg-elevated shadow-xs ring-1 ring-border";
const bar = "flex items-center justify-between gap-3 border-b border-border px-4 py-2.5";
const chip =
  "inline-flex items-center rounded-sm border border-border bg-bg-subtle px-1.5 py-0.5 font-mono text-[0.6875rem] leading-none text-fg-muted";

export function ScopeMockup() {
  return (
    <div className={frame} aria-label="Scope declaration for the Payroll Agent">
      <div className={bar}>
        <div className="flex items-center gap-2">
          <span className="text-[0.8125rem] font-medium text-fg">Payroll Agent</span>
          <StatusBadge status="ga" size="sm" />
        </div>
        <span className="tabular font-mono text-[0.6875rem] text-fg-subtle">AGT-0003 · v14</span>
      </div>
      <dl className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-2.5 px-4 py-3.5 text-xs leading-snug">
        <dt className="text-fg-subtle">Workflow</dt>
        <dd className="text-fg">Pre-run payroll validation</dd>
        <dt className="text-fg-subtle">Reads</dt>
        <dd className="text-fg">Payroll (pay runs, deductions) · HRIS (employees, contracts)</dd>
        <dt className="text-fg-subtle">Writes</dt>
        <dd className="text-fg">Payroll exceptions queue</dd>
        <dt className="text-fg-subtle">Never</dt>
        <dd className="flex flex-wrap gap-1.5">
          <span className={chip}>change pay</span>
          <span className={chip}>edit bank details</span>
          <span className={chip}>approve own exceptions</span>
        </dd>
        <dt className="text-fg-subtle">Owner</dt>
        <dd className="text-fg">M. Reyes, Payroll Manager · Halvorsen Health</dd>
        <dt className="text-fg-subtle">Reviewed</dt>
        <dd className="tabular text-fg">2026-08-14 · next 2026-11-14</dd>
      </dl>
    </div>
  );
}

const grants = [
  { source: "HRIS", scope: "employees.read", grant: "Inherited", denied: false },
  { source: "Payroll", scope: "pay_runs.read", grant: "Inherited", denied: false },
  { source: "Payroll", scope: "pay_runs.write", grant: "Denied", denied: true },
  { source: "Ledger", scope: "journals.read", grant: "Service identity", denied: false },
  { source: "Warehouse", scope: "hr_facts (zero-copy)", grant: "Read scope", denied: false },
];

export function PermissionsMockup() {
  return (
    <div className={frame} aria-label="Data Fabric grants for the Payroll Agent">
      <div className={bar}>
        <span className="text-[0.8125rem] font-medium text-fg">Grants · Payroll Agent</span>
        <span className="truncate font-mono text-[0.6875rem] text-fg-subtle">acting as m.reyes@halvorsen.example</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border text-left text-[0.6875rem] font-medium tracking-[0.06em] text-fg-subtle uppercase">
            <th scope="col" className="px-4 py-2 font-medium">
              Source
            </th>
            <th scope="col" className="px-2 py-2 font-medium">
              Scope
            </th>
            <th scope="col" className="px-4 py-2 text-right font-medium">
              Grant
            </th>
          </tr>
        </thead>
        <tbody>
          {grants.map((g) => (
            <tr key={g.scope} className="border-b border-border last:border-0">
              <td className="px-4 py-2 text-fg">{g.source}</td>
              <td className="px-2 py-2 font-mono text-[0.6875rem] text-fg-muted">{g.scope}</td>
              <td className="px-4 py-2 text-right">
                <Badge size="sm" variant={g.denied ? "danger" : "neutral"} dot={g.denied ? false : "success"}>
                  {g.grant}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApprovalMockup() {
  return (
    <div className={frame} aria-label="Approval request held at the Gateway">
      <div className={bar}>
        <div className="flex items-center gap-2">
          <Badge size="sm" variant="warning" dot>
            Approval required
          </Badge>
          <span className="font-mono text-[0.6875rem] text-fg-subtle">REQ-1187</span>
        </div>
        <span className="tabular text-[0.6875rem] text-fg-subtle">Held 17 min</span>
      </div>
      <div className="px-4 py-3.5">
        <p className="text-[0.8125rem] leading-snug font-medium text-fg">
          Post journal entry JE-4471: accrue $48,212.50 for September facilities services.
        </p>
        <dl className="mt-3 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-1.5 text-xs leading-snug">
          <dt className="text-fg-subtle">Requested by</dt>
          <dd className="tabular text-fg">Close Agent · 2026-09-11 09:14 UTC</dd>
          <dt className="text-fg-subtle">Policy</dt>
          <dd className="text-fg">Journal entries over $10,000.00 need a Controller</dd>
          <dt className="text-fg-subtle">Approver</dt>
          <dd className="text-fg">Dana Okafor, Controller</dd>
        </dl>
        <p className="mt-3.5 text-[0.6875rem] font-medium tracking-[0.06em] text-fg-subtle uppercase">
          Reason <span className="font-normal normal-case tracking-normal">(required to decline)</span>
        </p>
        <div
          aria-hidden
          className="mt-1.5 flex h-8 items-center rounded-md border border-border-strong bg-bg-elevated px-2.5 text-xs text-fg-subtle"
        >
          Add a reason
        </div>
        <div className="mt-3.5 flex items-center gap-2" aria-hidden>
          <span className={cn(buttonClassName({ size: "sm" }), "pointer-events-none")}>Approve</span>
          <span className={cn(buttonClassName({ size: "sm", variant: "secondary" }), "pointer-events-none")}>
            Decline
          </span>
          <span className="ml-auto text-[0.6875rem] text-fg-subtle">Edit amount</span>
        </div>
      </div>
    </div>
  );
}

const entries = [
  { actor: "Close Agent", action: "read ledger.journals (scope: accruals)", time: "09:14:02", hash: "a91f…3c0e" },
  { actor: "Close Agent", action: "draft JE-4471 · $48,212.50", time: "09:14:05", hash: "4d2b…91aa" },
  { actor: "Gateway", action: "hold · policy: JE over $10,000.00", time: "09:14:05", hash: "e3c8…0b17" },
  { actor: "D. Okafor", action: "approve REQ-1187", time: "09:31:44", hash: "c7e0…12f4" },
  { actor: "Gateway", action: "post JE-4471 to ledger", time: "09:31:45", hash: "0be3…77d1" },
];

export function AuditMockup() {
  return (
    <div className={frame} aria-label="Audit log for journal entry JE-4471">
      <div className={bar}>
        <span className="text-[0.8125rem] font-medium text-fg">Audit log · JE-4471</span>
        <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium text-success">
          <span aria-hidden className="size-1.5 rounded-full bg-success" />
          Chain verified · 5 entries
        </span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border text-left text-[0.6875rem] font-medium tracking-[0.06em] text-fg-subtle uppercase">
            <th scope="col" className="px-4 py-2 font-medium">
              Actor
            </th>
            <th scope="col" className="px-2 py-2 font-medium">
              Action
            </th>
            <th scope="col" className="px-2 py-2 text-right font-medium">
              UTC
            </th>
            <th scope="col" className="hidden px-4 py-2 text-right font-medium sm:table-cell">
              Hash
            </th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.hash} className="border-b border-border last:border-0">
              <td className="px-4 py-2 whitespace-nowrap text-fg">{e.actor}</td>
              <td className="px-2 py-2 text-fg-muted">{e.action}</td>
              <td className="tabular px-2 py-2 text-right whitespace-nowrap text-fg-muted">{e.time}</td>
              <td className="hidden px-4 py-2 text-right font-mono text-[0.6875rem] text-fg-subtle sm:table-cell">
                {e.hash}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
