import { ArrowUp, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { WindowFrame } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils";

const lines = [
  ["Contract labor", "620,000.00", "764,300.00", "+144,300.00", "3 unbudgeted contractors, Jul to Sep"],
  ["Overtime", "410,000.00", "476,918.20", "+66,918.20", "Peak-season shift coverage"],
  ["Fleet maintenance", "285,000.00", "318,206.35", "+33,206.35", "Q2 service deferred into Q3"],
];

const recent = ["Q3 opex variance", "Parental leave policy, Ontario", "Vendor spend 2025", "Senior accountant JD, Dublin"];

const th = "h-8 bg-bg-subtle px-3 text-xs font-medium tracking-[0.06em] text-fg-muted uppercase";

export function AssistMockup({ className }: { className?: string }) {
  return (
    <WindowFrame
      url="app.meridian.example/assist"
      actions={
        <Badge variant="neutral" dot="success">
          Planning Agent
        </Badge>
      }
      className={className}
      aria-label="Assist: a conversation where a user asks for the Q3 variance and the Planning Agent answers with a table and a draft commentary action"
    >
      <div className="@container">
        <div className="grid @4xl:grid-cols-[13rem_minmax(0,1fr)]">
          <aside className="hidden border-r border-border bg-bg-subtle/60 @4xl:block" aria-label="Recent conversations">
            <p className="px-4 pt-3 pb-2 text-xs font-medium tracking-[0.06em] text-fg-muted uppercase">Recent</p>
            <ul className="px-2 text-[0.8125rem]">
              {recent.map((item, index) => (
                <li
                  key={item}
                  className={cn(
                    "truncate rounded-md px-2 py-1.5",
                    index === 0 ? "bg-bg-elevated font-medium text-fg ring-1 ring-border" : "text-fg-muted",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="flex min-w-0 flex-col">
            <div className="flex flex-col gap-4 px-4 py-4 @lg:px-6">
              <div className="flex items-start gap-3 self-end">
                <p className="max-w-[36rem] rounded-lg rounded-tr-sm bg-bg-muted px-3.5 py-2.5 text-[0.8125rem] text-fg">
                  What drove the Q3 opex variance for Field operations, and which lines are over plan?
                </p>
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-bg-elevated text-xs font-medium text-fg ring-1 ring-border"
                >
                  DO
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-fg text-xs font-medium text-bg"
                >
                  M
                </span>
                <div className="min-w-0 flex-1">
                  <p className="tabular text-xs text-fg-subtle">
                    Planning Agent · read finance.gl_actuals and finance.plan as d.okafor · Snowflake, 4 min old · 1.8 s
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-fg">
                    Field operations is <span className="tabular font-medium">$268,412.55</span> over plan for Q3 2026 (
                    <span className="tabular">+6.5%</span>). Three lines account for 91% of the variance.
                  </p>
                  <div className="mt-3 overflow-hidden rounded-lg ring-1 ring-border">
                    <table className="w-full border-collapse text-[0.8125rem]">
                      <thead>
                        <tr>
                          <th scope="col" className={cn(th, "text-left")}>Line</th>
                          <th scope="col" className={cn(th, "hidden text-right @md:table-cell")}>Plan</th>
                          <th scope="col" className={cn(th, "hidden text-right @sm:table-cell")}>Actual</th>
                          <th scope="col" className={cn(th, "text-right")}>Variance</th>
                          <th scope="col" className={cn(th, "hidden text-left @2xl:table-cell")}>Driver</th>
                        </tr>
                      </thead>
                      <tbody className="tabular">
                        {lines.map(([line, plan, actual, variance, driver]) => (
                          <tr key={line} className="border-t border-border">
                            <td className="px-3 py-2 text-fg">{line}</td>
                            <td className="hidden px-3 py-2 text-right text-fg-muted @md:table-cell">{plan}</td>
                            <td className="hidden px-3 py-2 text-right text-fg-muted @sm:table-cell">{actual}</td>
                            <td className="px-3 py-2 text-right font-medium text-fg">{variance}</td>
                            <td className="hidden px-3 py-2 text-fg-muted @2xl:table-cell">{driver}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2.5 flex flex-wrap gap-1.5 text-xs">
                    <span className="rounded-sm border border-border px-1.5 py-px font-mono text-accent">gl_actuals · 2026-09-08</span>
                    <span className="rounded-sm border border-border px-1.5 py-px font-mono text-accent">plan_v3 · FY26</span>
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-8 items-center gap-1.5 rounded-md bg-fg px-3 text-xs font-medium text-bg">
                      <Play aria-hidden className="size-3.5" />
                      Run: draft commentary
                    </span>
                    <span className="inline-flex h-8 items-center rounded-md border border-border-strong bg-bg-elevated px-3 text-xs font-medium text-fg">
                      Open in Planning Agent
                    </span>
                    <span className="hidden text-xs text-fg-subtle @lg:inline">3 credits · approval before posting</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto border-t border-border px-4 py-3 @lg:px-6">
              <div className="flex h-10 items-center gap-3 rounded-md border border-border-strong bg-bg-elevated px-3 shadow-xs">
                <span className="flex-1 truncate text-[0.8125rem] text-fg-subtle">Ask about your HR and finance data</span>
                <span aria-hidden className="inline-flex size-6 items-center justify-center rounded-md bg-fg text-bg">
                  <ArrowUp className="size-3.5" />
                </span>
              </div>
              <p className="mt-2 text-xs text-fg-subtle">Acting as D. Okafor · Northwind Logistics · your permissions apply</p>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
