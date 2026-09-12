import { WindowFrame } from "@/components/ui/window-frame";
import type { Agent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * Dense, realistic product views (DESIGN.md §6 "Product-UI mockups"). HTML, not images,
 * so they stay crisp and reflow. Data is fictional design-partner data: 2026 dates,
 * amounts with cents, IDs like CASE-48211, one accent per view, tabular numerals.
 */

// --- shared atoms -----------------------------------------------------------

const Cell = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <td className={cn("border-t border-border px-3 py-2 align-middle", className)}>{children}</td>
);

const Head = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <th
    scope="col"
    className={cn(
      "bg-bg-subtle px-3 py-2 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-fg-subtle",
      className,
    )}
  >
    {children}
  </th>
);

type Tone = "neutral" | "accent" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "bg-bg-muted text-fg-muted",
  accent: "bg-accent-soft text-accent-hover",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

const Pill = ({ tone = "neutral", children }: { tone?: Tone; children: React.ReactNode }) => (
  <span
    className={cn(
      "inline-block whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[11px] font-medium leading-4",
      TONES[tone],
    )}
  >
    {children}
  </span>
);

const Toolbar = ({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
    <div className="flex items-center gap-2 text-[12px] font-medium text-fg">{left}</div>
    {right ? <div className="flex items-center gap-2 text-[11px] text-fg-subtle">{right}</div> : null}
  </div>
);

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[560px] border-collapse text-[12.5px] leading-5">{children}</table>
  </div>
);

const Meter = ({ value, tone = "accent" }: { value: number; tone?: "accent" | "success" | "warning" }) => (
  <span className="inline-flex h-1.5 w-16 overflow-hidden rounded-full bg-bg-muted align-middle">
    <span
      className={cn(
        "h-full rounded-full",
        tone === "accent" && "bg-accent",
        tone === "success" && "bg-success",
        tone === "warning" && "bg-warning",
      )}
      style={{ width: `${Math.round(value * 100)}%` }}
    />
  </span>
);

// --- per-agent views --------------------------------------------------------

function CaseQueue() {
  const rows = [
    ["CASE-48211", "PTO carryover for part-time nurses", "Halvorsen Health", "Resolved", "success", "1m 40s"],
    ["CASE-48209", "401(k) contribution change", "Bluepeak Energy", "Resolved", "success", "2m 12s"],
    ["CASE-48208", "Garnishment order question", "Atlas Manufacturing", "Escalated", "warning", "4m 03s"],
    ["CASE-48205", "Parental leave eligibility", "Verdant Foods", "Resolved", "success", "0m 58s"],
    ["CASE-48203", "Tuition reimbursement cap", "Orion Retail Group", "Resolved", "success", "1m 21s"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Case queue · today</>}
        right={
          <>
            <span className="tabular">1,284 resolved</span>
            <span aria-hidden>·</span>
            <span className="tabular">7 escalated</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Case</Head>
            <Head>Question</Head>
            <Head>Workspace</Head>
            <Head>Status</Head>
            <Head className="text-right">Time to resolve</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, question, workspace, status, tone, time]) => (
            <tr key={id}>
              <Cell className="font-mono text-[11.5px] text-fg-muted">{id}</Cell>
              <Cell className="text-fg">{question}</Cell>
              <Cell className="text-fg-muted">{workspace}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{status}</Pill>
              </Cell>
              <Cell className="tabular text-right text-fg-muted">{time}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function CandidatePipeline() {
  const rows = [
    ["A. Okonkwo", 92, "Shortlisted", "success", "8 yrs · multi-state payroll"],
    ["R. Villanueva", 88, "Shortlisted", "success", "6 yrs · ADP + Workday migrations"],
    ["T. Brennan", 81, "Shortlisted", "success", "5 yrs · garnishment specialist"],
    ["M. Aliyev", 64, "Review", "neutral", "4 yrs · single-state only"],
    ["J. Santos", 41, "Not advanced", "neutral", "No payroll systems experience"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Senior Payroll Analyst · REQ-2291</>}
        right={
          <>
            <span className="tabular">25 screened</span>
            <span aria-hidden>·</span>
            <span className="tabular">6 shortlisted</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Candidate</Head>
            <Head className="text-right">Match</Head>
            <Head>Evidence</Head>
            <Head>Decision</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, score, decision, tone, evidence]) => (
            <tr key={name}>
              <Cell className="text-fg">{name}</Cell>
              <Cell className="text-right">
                <span className="tabular mr-2 text-fg-muted">{score}</span>
                <Meter value={score / 100} tone={score >= 80 ? "success" : "accent"} />
              </Cell>
              <Cell className="text-fg-muted">{evidence}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{decision}</Pill>
              </Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function PayrollChecks() {
  const rows = [
    ["Missing W-4 elections", 3, "Blocking", "danger", "Cycle 2026-09-15 · Bluepeak Energy"],
    ["Unverified I-9 records", 2, "Blocking", "danger", "New hires starting 09-08"],
    ["Colorado minimum wage update", 118, "Applied", "success", "Effective 2026-09-01"],
    ["Direct deposit pre-note failures", 1, "Warning", "warning", "Routing number rejected"],
    ["Duplicate earning code", 0, "Clear", "neutral", "Checked 41,208 lines"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Pre-run checks · cycle 2026-09-15</>}
        right={
          <>
            <Pill tone="warning">Run held</Pill>
            <span className="tabular">5 checks</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Check</Head>
            <Head className="text-right">Records</Head>
            <Head>Severity</Head>
            <Head>Detail</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([check, count, severity, tone, detail]) => (
            <tr key={check}>
              <Cell className="text-fg">{check}</Cell>
              <Cell className="tabular text-right text-fg-muted">{count}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{severity}</Pill>
              </Cell>
              <Cell className="text-fg-muted">{detail}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-between gap-4 border-t border-border bg-bg-subtle px-4 py-2.5">
        <span className="text-[11.5px] text-fg-muted">
          Payroll manager approval required before the run resumes.
        </span>
        <span className="rounded-md bg-fg px-2.5 py-1 text-[11.5px] font-medium text-bg">Review 5 items</span>
      </div>
    </>
  );
}

function ShiftBoard() {
  const rows = [
    ["Sat 06:00–14:00", "Dock 4 · Northwind DC-7", "Filled", "success", "K. Mbeki · accepted in 6 min"],
    ["Sat 14:00–22:00", "Dock 4 · Northwind DC-7", "Filled", "success", "L. Duarte · accepted in 11 min"],
    ["Sun 22:00–06:00", "Cold storage · DC-7", "Offered", "accent", "3 eligible · 2 offers out"],
    ["Mon 06:00–14:00", "Returns · DC-3", "Filled", "success", "P. Ivanov · accepted in 4 min"],
    ["Mon 14:00–22:00", "Dock 1 · DC-3", "Open", "warning", "Overtime threshold reached for 4"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Coverage · week of 2026-09-14</>}
        right={
          <>
            <span className="tabular">18 gaps</span>
            <span aria-hidden>·</span>
            <span className="tabular">16 filled</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Shift</Head>
            <Head>Location</Head>
            <Head>State</Head>
            <Head>Detail</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([shift, location, state, tone, detail]) => (
            <tr key={shift}>
              <Cell className="tabular text-fg">{shift}</Cell>
              <Cell className="text-fg-muted">{location}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{state}</Pill>
              </Cell>
              <Cell className="text-fg-muted">{detail}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function ReviewDraft() {
  return (
    <>
      <Toolbar left={<>Review draft · D. Okafor · H2 2026</>} right={<Pill tone="accent">Draft</Pill>} />
      <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-3 p-4 text-[12.5px] leading-6 text-fg">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">Summary</p>
          <p>
            Delivered the multi-state payroll consolidation two weeks ahead of plan and reduced
            off-cycle payments by 38% across three quarters.
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
            Strengths, with evidence
          </p>
          <ul className="space-y-1.5 text-fg-muted">
            <li>
              Led the Colorado and Washington rate migrations{" "}
              <span className="font-mono text-[11px] text-accent">[goal 3]</span>
            </li>
            <li>
              Cut month-end payroll reconciliation from 6 days to 2{" "}
              <span className="font-mono text-[11px] text-accent">[metric]</span>
            </li>
            <li>
              Mentored two analysts through certification{" "}
              <span className="font-mono text-[11px] text-accent">[peer feedback ×3]</span>
            </li>
          </ul>
        </div>
        <div className="border-t border-border p-4 md:border-l md:border-t-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
            Evidence used
          </p>
          <ul className="mt-2 space-y-2 text-[12px] text-fg-muted">
            <li className="flex items-baseline justify-between gap-3">
              <span>Goals</span> <span className="tabular">7</span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>Peer feedback</span> <span className="tabular">14</span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>Delivered work items</span> <span className="tabular">62</span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>Compensation data used</span> <span>None</span>
            </li>
          </ul>
          <p className="mt-4 rounded-md bg-bg-subtle p-2.5 text-[11.5px] leading-5 text-fg-muted">
            The manager edits and submits. Meridian never files a review.
          </p>
        </div>
      </div>
    </>
  );
}

function PayBands() {
  const bands = [
    { role: "Revenue Accountant", min: 0.32, p50: 0.54, max: 0.78, actual: 0.44, drift: "−9% vs P50" },
    { role: "Shift Supervisor", min: 0.18, p50: 0.38, max: 0.6, actual: 0.4, drift: "In band" },
    { role: "Data Engineer", min: 0.48, p50: 0.7, max: 0.94, actual: 0.58, drift: "−12% vs P50" },
    { role: "Nurse Practitioner", min: 0.4, p50: 0.62, max: 0.86, actual: 0.64, drift: "In band" },
  ];
  return (
    <>
      <Toolbar
        left={<>Pay bands · benchmarked 2026-09-02</>}
        right={<span className="tabular">4 of 212 roles drifting</span>}
      />
      <div className="space-y-4 p-4">
        {bands.map((band) => (
          <div key={band.role}>
            <div className="flex items-baseline justify-between gap-4 text-[12.5px]">
              <span className="text-fg">{band.role}</span>
              <span className={cn("tabular text-[11.5px]", band.drift === "In band" ? "text-fg-subtle" : "text-warning")}>
                {band.drift}
              </span>
            </div>
            <div className="relative mt-2 h-5">
              <div className="absolute inset-x-0 top-2 h-1 rounded-full bg-bg-muted" />
              <div
                className="absolute top-2 h-1 rounded-full bg-accent-soft"
                style={{ left: `${band.min * 100}%`, width: `${(band.max - band.min) * 100}%` }}
              />
              <div
                className="absolute top-0.5 h-4 w-px bg-fg-faint"
                style={{ left: `${band.p50 * 100}%` }}
                aria-hidden
              />
              <div
                className="absolute top-1 size-3 rounded-full border-2 border-bg bg-accent"
                style={{ left: `calc(${band.actual * 100}% - 6px)` }}
                aria-hidden
              />
            </div>
          </div>
        ))}
        <p className="text-[11px] text-fg-subtle">
          Band floor to ceiling in soft blue, market P50 as the hairline, current median as the dot.
        </p>
      </div>
    </>
  );
}

function EvidenceTracker() {
  const rows = [
    ["REQ-1187", "Q3 revenue sample · 40 invoices", "Delivered", "success", "40 / 40"],
    ["REQ-1186", "User access review · finance systems", "Delivered", "success", "18 / 18"],
    ["REQ-1184", "Fixed asset additions > $25,000", "In progress", "accent", "11 / 14"],
    ["REQ-1181", "Payroll register tie-out · August", "Delivered", "success", "6 / 6"],
    ["REQ-1179", "Bank confirmations", "Waiting on third party", "warning", "2 / 5"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Auditor requests · FY2026 interim</>}
        right={
          <>
            <span className="tabular">77 items delivered</span>
            <span aria-hidden>·</span>
            <span className="tabular">avg 3.2 h</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Request</Head>
            <Head>Scope</Head>
            <Head>Status</Head>
            <Head className="text-right">Items</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, scope, status, tone, items]) => (
            <tr key={id}>
              <Cell className="font-mono text-[11.5px] text-fg-muted">{id}</Cell>
              <Cell className="text-fg">{scope}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{status}</Pill>
              </Cell>
              <Cell className="tabular text-right text-fg-muted">{items}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function VariancePanel() {
  const rows = [
    ["Revenue", "12,481,220.00", "12,940,000.00", "−3.5%", "warning"],
    ["Cost of revenue", "4,102,880.00", "4,268,000.00", "−3.9%", "success"],
    ["Sales & marketing", "2,884,140.00", "2,640,000.00", "+9.2%", "danger"],
    ["R&D", "3,190,500.00", "3,220,000.00", "−0.9%", "neutral"],
    ["G&A", "1,208,760.00", "1,260,000.00", "−4.1%", "success"],
  ] as const;
  return (
    <>
      <Toolbar left={<>Q3 2026 · actual vs plan</>} right={<Pill tone="accent">Commentary drafted</Pill>} />
      <Table>
        <thead>
          <tr>
            <Head>Line</Head>
            <Head className="text-right">Actual</Head>
            <Head className="text-right">Plan</Head>
            <Head className="text-right">Variance</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([line, actual, plan, variance, tone]) => (
            <tr key={line}>
              <Cell className="text-fg">{line}</Cell>
              <Cell className="tabular text-right text-fg-muted">{actual}</Cell>
              <Cell className="tabular text-right text-fg-muted">{plan}</Cell>
              <Cell className="text-right">
                <Pill tone={tone as Tone}>{variance}</Pill>
              </Cell>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="border-t border-border p-4 text-[12.5px] leading-6 text-fg-muted">
        <span className="font-medium text-fg">Draft commentary. </span>
        Sales and marketing ran 9.2% over plan, driven by the pulled-forward Q4 conference spend
        ($184,400.00) and two contractor extensions. Revenue landed 3.5% under plan on slower
        enterprise close rates; pipeline coverage for Q4 is 3.1×.
      </div>
    </>
  );
}

function ControlsExceptions() {
  const rows = [
    ["INV-2291", "Possible duplicate of INV-2274", "$12,480.00", "Held", "danger", true],
    ["INV-2288", "Vendor bank detail changed 6 days ago", "$4,812.40", "Held", "danger", true],
    ["INV-2284", "Three-way match · quantity variance", "$1,208.65", "Cleared", "success", false],
    ["INV-2279", "Split invoice below approval threshold", "$9,950.00", "Review", "warning", true],
    ["INV-2271", "Duplicate confirmed · payment stopped", "$28,410.00", "Stopped", "success", false],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Exceptions · payment run 2026-09-14</>}
        right={
          <>
            <span className="tabular">6,412 invoices tested</span>
            <span aria-hidden>·</span>
            <span className="tabular">5 exceptions</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Invoice</Head>
            <Head>Finding</Head>
            <Head className="text-right">Amount</Head>
            <Head>State</Head>
            <Head className="text-right">Action</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([id, finding, amount, state, tone, approval]) => (
            <tr key={id}>
              <Cell className="font-mono text-[11.5px] text-fg-muted">{id}</Cell>
              <Cell className="text-fg">{finding}</Cell>
              <Cell className="tabular text-right text-fg">{amount}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{state}</Pill>
              </Cell>
              <Cell className="text-right">
                {approval ? (
                  // Illustrative only, like the rest of this mockup: inert so it never
                  // invites a click that cannot do anything.
                  <span className="pointer-events-none rounded-md border border-border-strong px-2 py-0.5 text-[11px] font-medium text-fg">
                    Approve
                  </span>
                ) : (
                  <span className="text-[11px] text-fg-subtle">—</span>
                )}
              </Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function CloseChecklist() {
  const rows = [
    ["Day 1", "Sub-ledger cutoff · AP, AR, payroll", "M. Reyes", "Complete", "success"],
    ["Day 1", "Bank reconciliations · 14 accounts", "Agent", "Complete", "success"],
    ["Day 2", "Accrual review · 22 recurring", "Agent", "Complete", "success"],
    ["Day 2", "Intercompany elimination", "S. Adeyemi", "In progress", "accent"],
    ["Day 3", "Flux analysis + commentary", "Agent", "Awaiting sign-off", "warning"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Close calendar · September 2026</>}
        right={
          <>
            <span className="tabular">Day 2 of 5</span>
            <span aria-hidden>·</span>
            <span className="tabular">38 of 51 tasks</span>
          </>
        }
      />
      <Table>
        <thead>
          <tr>
            <Head>Day</Head>
            <Head>Task</Head>
            <Head>Owner</Head>
            <Head>Status</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([day, task, owner, status, tone]) => (
            <tr key={task}>
              <Cell className="tabular text-fg-subtle">{day}</Cell>
              <Cell className="text-fg">{task}</Cell>
              <Cell className="text-fg-muted">{owner}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{status}</Pill>
              </Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function ClauseRisk() {
  const rows = [
    ["Termination for convenience", "30 days, any reason", "High", "danger", "Constrains ASC 606 term"],
    ["Acceptance criteria", "Customer sign-off required", "High", "danger", "Delays revenue start"],
    ["Auto-renewal", "12 months, 60-day notice", "Medium", "warning", "Extends contract term"],
    ["Service credits", "Capped at 10% monthly", "Low", "neutral", "Variable consideration"],
    ["Payment terms", "Net 60", "Low", "neutral", "No financing component"],
  ] as const;
  return (
    <>
      <Toolbar
        left={<>Order form · Summit Bank · ARR $412,000.00</>}
        right={<Pill tone="warning">2 high-risk clauses</Pill>}
      />
      <Table>
        <thead>
          <tr>
            <Head>Clause</Head>
            <Head>Terms</Head>
            <Head>Risk</Head>
            <Head>Accounting impact</Head>
          </tr>
        </thead>
        <tbody>
          {rows.map(([clause, terms, risk, tone, impact]) => (
            <tr key={clause}>
              <Cell className="text-fg">{clause}</Cell>
              <Cell className="text-fg-muted">{terms}</Cell>
              <Cell>
                <Pill tone={tone as Tone}>{risk}</Pill>
              </Cell>
              <Cell className="text-fg-muted">{impact}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function RedlineDiff() {
  return (
    <>
      <Toolbar
        left={<>MSA · Atlas Manufacturing · redline v3</>}
        right={
          <>
            <span className="tabular">6 of 41 clauses off playbook</span>
            <span aria-hidden>·</span>
            <Pill tone="accent">Counsel review</Pill>
          </>
        }
      />
      <div className="space-y-3 p-4 font-mono text-[11.5px] leading-5">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
          9.2 Limitation of liability
        </p>
        <p className="rounded-sm bg-danger-soft px-2 py-1 text-danger">
          − ...shall not exceed the fees paid in the twelve (12) months preceding the claim.
        </p>
        <p className="rounded-sm bg-success-soft px-2 py-1 text-success">
          + ...shall not exceed two times (2×) the fees paid in the twelve (12) months preceding the
          claim, excluding breaches of confidentiality and indemnity obligations.
        </p>
        <p className="font-sans text-[11.5px] leading-5 text-fg-muted">
          Playbook §4.1 requires a 2× cap with carve-outs for confidentiality and indemnity. Counter
          drafted; counsel approves before it leaves.
        </p>
      </div>
    </>
  );
}

const VIEWS: Record<string, () => React.JSX.Element> = {
  "help-desk": CaseQueue,
  recruiting: CandidatePipeline,
  payroll: PayrollChecks,
  scheduling: ShiftBoard,
  performance: ReviewDraft,
  "job-architecture": PayBands,
  audit: EvidenceTracker,
  planning: VariancePanel,
  controls: ControlsExceptions,
  close: CloseChecklist,
  "revenue-contracts": ClauseRisk,
  "contract-review": RedlineDiff,
};

const URLS: Record<string, string> = {
  "help-desk": "app.meridian.example/agents/help-desk/queue",
  recruiting: "app.meridian.example/agents/recruiting/req-2291",
  payroll: "app.meridian.example/agents/payroll/cycle-2026-09-15",
  scheduling: "app.meridian.example/agents/scheduling/coverage",
  performance: "app.meridian.example/agents/performance/draft",
  "job-architecture": "app.meridian.example/agents/job-architecture/bands",
  audit: "app.meridian.example/agents/audit/requests",
  planning: "app.meridian.example/agents/planning/q3-variance",
  controls: "app.meridian.example/agents/controls/exceptions",
  close: "app.meridian.example/agents/close/september-2026",
  "revenue-contracts": "app.meridian.example/agents/revenue-contracts/summit-bank",
  "contract-review": "app.meridian.example/agents/contract-review/atlas-msa",
};

export interface AgentMockupProps {
  agent: Agent;
  className?: string;
}

export function AgentMockup({ agent, className }: AgentMockupProps) {
  const View = VIEWS[agent.slug] ?? CaseQueue;
  return (
    <WindowFrame url={URLS[agent.slug]} className={className} bodyClassName="p-0">
      <View />
    </WindowFrame>
  );
}
