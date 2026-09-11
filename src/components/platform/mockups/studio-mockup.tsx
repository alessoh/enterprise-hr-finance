import { Check, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WindowFrame } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils";

interface Step {
  kind: string;
  title: string;
  detail: string;
  selected?: boolean;
}

const steps: Step[] = [
  { kind: "Trigger", title: "Invoice posted", detail: "ERP event · AP subledger" },
  { kind: "Read", title: "Vendor, PO, history", detail: "Data Fabric · ap:read" },
  { kind: "Reason", title: "Duplicate and policy check", detail: "Workspace model" },
  { kind: "Approve", title: "Hold if over $10,000.00", detail: "AP manager role", selected: true },
  { kind: "Act", title: "Release or flag", detail: "ERP via Gateway" },
];

const guardrails = [
  { ok: true, text: "Approval required: ap.release_payment above $10,000.00" },
  { ok: true, text: "Data scope: ap:read, vendor:read; no write outside ERP" },
  { ok: true, text: "Cost ceiling: 400 credits per day, alert at 80%" },
  { ok: false, text: "Evaluation set: 46 of 48 cases pass; 2 regressions" },
  { ok: true, text: "Registry record: owner P. Adeyemi, risk tier 2" },
];

export function StudioMockup({ className }: { className?: string }) {
  return (
    <WindowFrame
      url="app.meridian.example/studio/ap-duplicate-check"
      actions={
        <Badge variant="neutral" dot="warning">
          Draft v7
        </Badge>
      }
      className={className}
      aria-label="Studio: agent canvas with trigger, read, reason, approve, and act steps, and a guardrail panel"
    >
      <div className="@container">
        <div className="grid @3xl:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0 border-b border-border @3xl:border-r @3xl:border-b-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
              <p className="text-[0.8125rem] font-medium text-fg">AP duplicate check</p>
              <p className="tabular text-xs text-fg-subtle">5 blocks · autosaved 14:02</p>
            </div>
            <ol className="flex flex-col p-4 @2xl:flex-row @2xl:items-stretch">
              {steps.map((step, index) => (
                <li key={step.kind} className="contents">
                  <div
                    className={cn(
                      "min-w-0 flex-1 rounded-lg border bg-bg-elevated px-3 py-2.5",
                      step.selected ? "border-accent shadow-[0_0_0_1px_var(--color-accent)]" : "border-border",
                    )}
                  >
                    <p className="flex items-center justify-between text-xs">
                      <span className="font-medium tracking-[0.06em] text-fg-muted uppercase">{step.kind}</span>
                      <span className="tabular font-mono text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
                    </p>
                    <p className="mt-1 text-[0.8125rem] font-medium text-fg">{step.title}</p>
                    <p className="text-xs text-fg-subtle">{step.detail}</p>
                  </div>
                  {index < steps.length - 1 ? (
                    <span
                      aria-hidden
                      className="mx-auto h-4 w-px shrink-0 bg-border-strong @2xl:mx-0 @2xl:my-auto @2xl:h-px @2xl:w-3"
                    />
                  ) : null}
                </li>
              ))}
            </ol>
            <div className="flex items-center gap-2 border-t border-border px-4 py-2.5 text-xs">
              <span className="inline-flex h-7 items-center rounded-md border border-border-strong bg-bg-elevated px-2.5 font-medium text-fg">
                Run evaluation
              </span>
              <span className="inline-flex h-7 items-center rounded-md bg-fg/50 px-2.5 font-medium text-bg">Publish</span>
              <span className="ml-auto hidden text-fg-subtle @sm:inline">Publish blocked until evaluations pass</span>
            </div>
          </div>

          <aside className="bg-bg-subtle/60" aria-label="Guardrails enforced at the Gateway">
            <div className="border-b border-border px-4 py-2.5">
              <p className="text-[0.8125rem] font-medium text-fg">Guardrails</p>
              <p className="text-xs text-fg-subtle">Enforced below the builder</p>
            </div>
            <ul className="space-y-2.5 px-4 py-3 text-xs">
              {guardrails.map((g) => (
                <li key={g.text} className="flex gap-2">
                  {g.ok ? (
                    <Check aria-hidden className="mt-px size-3.5 shrink-0 text-success" />
                  ) : (
                    <TriangleAlert aria-hidden className="mt-px size-3.5 shrink-0 text-warning" />
                  )}
                  <span className={cn("tabular", g.ok ? "text-fg-muted" : "text-fg")}>{g.text}</span>
                </li>
              ))}
            </ul>
            <dl className="tabular grid grid-cols-3 gap-2 border-t border-border px-4 py-3 text-xs">
              <div>
                <dd className="text-sm font-medium text-fg">48</dd>
                <dt className="text-fg-subtle">cases</dt>
              </div>
              <div>
                <dd className="text-sm font-medium text-fg">95.8%</dd>
                <dt className="text-fg-subtle">pass rate</dt>
              </div>
              <div>
                <dd className="text-sm font-medium text-fg">3 cr</dd>
                <dt className="text-fg-subtle">per run</dt>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </WindowFrame>
  );
}
