import { Badge } from "@/components/ui/badge";
import { WindowFrame } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils";

interface Source {
  name: string;
  kind: "Zero-copy" | "Connector";
  fresh: string;
  rows: string;
}

const sources: Source[] = [
  { name: "Snowflake", kind: "Zero-copy", fresh: "4 min", rows: "live" },
  { name: "Databricks", kind: "Zero-copy", fresh: "9 min", rows: "live" },
  { name: "BigQuery", kind: "Zero-copy", fresh: "2 min", rows: "live" },
  { name: "HRIS", kind: "Connector", fresh: "12 min", rows: "48,212" },
  { name: "ERP · GL", kind: "Connector", fresh: "6 min", rows: "1.2M" },
  { name: "ATS", kind: "Connector", fresh: "31 min", rows: "9,804" },
  { name: "Payroll", kind: "Connector", fresh: "1 h", rows: "26,110" },
  { name: "CLM", kind: "Connector", fresh: "2 h", rows: "3,421" },
];

const result = [
  ["Field operations", "4,120,000.00", "4,388,412.55", "+268,412.55"],
  ["Cloud infrastructure", "1,860,000.00", "2,004,910.12", "+144,910.12"],
  ["Contract labor", "940,000.00", "1,038,220.00", "+98,220.00"],
  ["Travel", "310,000.00", "356,114.40", "+46,114.40"],
  ["Marketing programs", "1,250,000.00", "1,231,880.75", "−18,119.25"],
];

const sql: Array<[string, string]> = [
  ["select", " cost_center,"],
  ["", "       sum(actual) - sum(plan) as variance"],
  ["from", " finance.gl_actuals a"],
  ["join", " finance.plan p using (cost_center, period)"],
  ["where", " period = '2026-Q3'"],
  ["group by", " 1"],
  ["order by", " 2 desc"],
  ["limit", " 5;"],
];

const th = "h-9 bg-bg-subtle px-4 text-xs font-medium tracking-[0.06em] text-fg-muted uppercase";

export function DataFabricMockup({ className }: { className?: string }) {
  return (
    <WindowFrame
      url="app.meridian.example/data"
      actions={
        <Badge variant="neutral" dot="success">
          3,012 connectors
        </Badge>
      }
      className={className}
      aria-label="Data Fabric: connected sources with freshness, and a governed SQL query with its result"
    >
      <div className="@container">
        <div className="grid @3xl:grid-cols-[15rem_minmax(0,1fr)] @5xl:grid-cols-[17rem_minmax(0,1fr)]">
          <div className="border-b border-border @3xl:border-r @3xl:border-b-0">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <p className="text-xs font-medium tracking-[0.06em] text-fg-muted uppercase">Sources</p>
              <p className="text-xs text-fg-subtle">8 connected</p>
            </div>
            <ul className="grid grid-cols-2 gap-px border-t border-border bg-border @sm:grid-cols-4 @3xl:grid-cols-1">
              {sources.map((s, index) => (
                <li
                  key={s.name}
                  className={cn(
                    "bg-bg-elevated px-4 py-2.5 @3xl:flex @3xl:items-center @3xl:justify-between",
                    index > 3 && "hidden @sm:block @3xl:flex",
                    index === 0 && "shadow-[inset_2px_0_0_var(--color-accent)]",
                  )}
                >
                  <div>
                    <p className="text-[0.8125rem] font-medium text-fg">{s.name}</p>
                    <p className="text-xs text-fg-subtle">{s.kind}</p>
                  </div>
                  <p className="tabular mt-1 text-xs text-fg-muted @3xl:mt-0 @3xl:text-right">
                    <span className="block">{s.fresh} ago</span>
                    <span className="hidden text-fg-subtle @3xl:block">
                      {s.rows === "live" ? "read in place" : `${s.rows} rows`}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <p className="text-xs font-medium tracking-[0.06em] text-fg-muted uppercase">Governed SQL</p>
              <p className="text-xs text-fg-subtle">as d.okafor · Snowflake</p>
            </div>
            <pre className="mx-4 overflow-x-auto rounded-lg bg-fg px-4 py-3.5 font-mono text-xs leading-[1.65] text-bg/90">
              <code>
                {sql.map(([kw, rest], i) => (
                  <span key={i} className="block">
                    {kw ? <span className="text-accent-soft">{kw}</span> : null}
                    {rest}
                  </span>
                ))}
              </code>
            </pre>
            <div className="mt-3 overflow-hidden border-t border-border">
              <table className="w-full border-collapse text-[0.8125rem]">
                <thead>
                  <tr>
                    <th scope="col" className={cn(th, "text-left")}>Cost center</th>
                    <th scope="col" className={cn(th, "hidden text-right @lg:table-cell")}>Plan</th>
                    <th scope="col" className={cn(th, "hidden text-right @sm:table-cell")}>Actual</th>
                    <th scope="col" className={cn(th, "text-right")}>Variance</th>
                  </tr>
                </thead>
                <tbody className="tabular">
                  {result.map(([cc, plan, actual, variance]) => (
                    <tr key={cc} className="border-b border-border last:border-0">
                      <td className="px-4 py-2 text-fg">{cc}</td>
                      <td className="hidden px-4 py-2 text-right text-fg-muted @lg:table-cell">{plan}</td>
                      <td className="hidden px-4 py-2 text-right text-fg-muted @sm:table-cell">{actual}</td>
                      <td className={cn("px-4 py-2 text-right font-medium", variance.startsWith("−") ? "text-success" : "text-fg")}>
                        {variance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="tabular flex flex-wrap gap-x-3 gap-y-1 border-t border-border bg-bg-subtle px-4 py-2 text-xs text-fg-subtle">
              <span>5 rows · 412 ms</span>
              <span className="hidden @sm:inline">row policy: cost_center in user.cost_centers</span>
              <span>freshness: 4 min</span>
              <span className="hidden @md:inline">logged: READ-88213</span>
            </p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
