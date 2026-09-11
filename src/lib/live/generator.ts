/**
 * Deterministic generator for the live agent operations feed.
 *
 * Everything here is a pure function of a timestamp, so the server render and the
 * first client render agree, and so a reconnecting client sees a coherent history.
 * No Math.random, no Date.now inside the helpers.
 */
import { agents } from "@/content/agents";
import type { AgentCategory } from "@/content/types";

import type {
  AgentActivity,
  AgentEvent,
  AgentEventKind,
  CreditsUsage,
  DashboardData,
  LiveMetrics,
  LiveSnapshot,
} from "./types";

/** mulberry32: small, fast, deterministic PRNG. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = <T,>(rng: () => number, items: readonly T[]): T =>
  items[Math.floor(rng() * items.length) % items.length];

const CUSTOMERS = [
  "Halvorsen Health",
  "Castellan Financial",
  "Northwind Logistics",
  "Bluepeak Energy",
  "Orion Retail Group",
  "Verdant Foods",
  "Atlas Manufacturing",
  "Summit Bank",
] as const;

const money = (rng: () => number, min: number, max: number) =>
  Math.round((min + rng() * (max - min)) * 100) / 100;

const pad = (n: number, width = 4) => String(n).padStart(width, "0");

type Template = {
  kind: AgentEventKind;
  credits: number;
  /** Relative frequency. Higher means the agent fires more often. */
  weight: number;
  build: (rng: () => number) => { title: string; detail: string; amount?: number; needsApproval?: boolean };
};

const TEMPLATES: Record<string, Template[]> = {
  "help-desk": [
    {
      kind: "resolved",
      credits: 2,
      weight: 10,
      build: (r) => ({
        title: `Resolved CASE-${pad(48000 + Math.floor(r() * 900), 5)}`,
        detail: pick(r, [
          "PTO carryover policy · answered from the 2026 handbook",
          "401(k) contribution change · routed to payroll",
          "Parental leave eligibility · 14 weeks confirmed",
          "W-2 reissue request · document delivered",
          "Bereavement policy · answered with regional variance",
          "Tuition reimbursement cap · answered from policy v4.2",
        ]),
      }),
    },
    {
      kind: "drafted",
      credits: 2,
      weight: 3,
      build: (r) => ({
        title: `Escalated CASE-${pad(48000 + Math.floor(r() * 900), 5)}`,
        detail: "Garnishment question · routed to a payroll specialist with context attached",
      }),
    },
  ],
  recruiting: [
    {
      kind: "screened",
      credits: 25,
      weight: 6,
      build: (r) => ({
        title: `Screened ${18 + Math.floor(r() * 22)} candidates`,
        detail: `${pick(r, [
          "Senior Payroll Analyst",
          "Warehouse Supervisor",
          "Revenue Accountant",
          "Clinical Scheduler",
          "Treasury Analyst",
        ])} · ${3 + Math.floor(r() * 6)} shortlisted`,
      }),
    },
    {
      kind: "scheduled",
      credits: 1,
      weight: 3,
      build: (r) => ({
        title: "Scheduled 4 interviews",
        detail: `Panel confirmed for ${pick(r, ["Tue 09:00", "Wed 13:30", "Thu 10:15", "Fri 08:45"])} · calendars held`,
      }),
    },
  ],
  payroll: [
    {
      kind: "flagged",
      credits: 3,
      weight: 5,
      needsApprovalBias: true,
      build: (r) => ({
        title: "Blocked run · pre-flight check failed",
        detail: `${2 + Math.floor(r() * 5)} missing ${pick(r, ["W-4 elections", "I-9 verifications", "direct deposit records", "state tax registrations"])}`,
        needsApproval: true,
      }),
    } as Template,
    {
      kind: "approved",
      credits: 3,
      weight: 4,
      build: (r) => ({
        title: "Applied wage-law update",
        detail: `${pick(r, ["Colorado", "Washington", "Illinois", "New York", "Oregon"])} minimum wage · ${12 + Math.floor(r() * 180)} employees repriced`,
      }),
    },
  ],
  scheduling: [
    {
      kind: "scheduled",
      credits: 1,
      weight: 8,
      build: (r) => ({
        title: `Filled ${pick(r, ["Sat 06:00", "Sun 14:00", "Mon 22:00", "Wed 06:00", "Fri 18:00"])} shift`,
        detail: `${pick(r, ["Store #114", "Ward 4 West", "Distribution centre 7", "Production line 3", "Night dock"])} · accepted in ${2 + Math.floor(r() * 11)} min`,
      }),
    },
  ],
  performance: [
    {
      kind: "drafted",
      credits: 4,
      weight: 2,
      build: (r) => ({
        title: "Drafted review packet",
        detail: `${4 + Math.floor(r() * 9)} goals and ${6 + Math.floor(r() * 14)} feedback items cited · awaiting manager edit`,
      }),
    },
  ],
  "job-architecture": [
    {
      kind: "flagged",
      credits: 4,
      weight: 2,
      build: (r) => ({
        title: "Pay-band drift detected",
        detail: `${pick(r, ["Revenue Accountant", "Shift Supervisor", "Data Engineer", "Nurse Practitioner"])} · ${4 + Math.floor(r() * 8)}% below market P50`,
      }),
    },
  ],
  audit: [
    {
      kind: "collected",
      credits: 5,
      weight: 6,
      build: (r) => ({
        title: `Collected ${8 + Math.floor(r() * 20)} evidence items`,
        detail: `${pick(r, ["Q3 revenue sample", "Access review Q3", "Fixed asset additions", "Payroll register tie-out"])} · REQ-${pad(1100 + Math.floor(r() * 180))}`,
      }),
    },
  ],
  planning: [
    {
      kind: "drafted",
      credits: 3,
      weight: 5,
      build: (r) => ({
        title: "Drafted variance commentary",
        detail: `${pick(r, ["Opex", "Revenue", "Headcount", "COGS", "Marketing"])} ${r() > 0.5 ? "−" : "+"}${(1 + r() * 8).toFixed(1)}% vs plan · ${2 + Math.floor(r() * 4)} drivers identified`,
      }),
    },
  ],
  controls: [
    {
      kind: "flagged",
      credits: 2,
      weight: 8,
      build: (r) => ({
        title: `Flagged INV-${pad(2200 + Math.floor(r() * 300))}`,
        detail: `Possible duplicate of INV-${pad(2100 + Math.floor(r() * 200))} · same vendor, same amount`,
        amount: money(r, 840, 48000),
        needsApproval: true,
      }),
    },
    {
      kind: "resolved",
      credits: 2,
      weight: 5,
      build: (r) => ({
        title: "Cleared three-way match exception",
        detail: `PO-${pad(7300 + Math.floor(r() * 400))} · receipt quantity corrected`,
        amount: money(r, 300, 12000),
      }),
    },
  ],
  close: [
    {
      kind: "reconciled",
      credits: 3,
      weight: 6,
      build: (r) => ({
        title: `Reconciled ${pick(r, ["1120-Cash", "2100-AP accrual", "1300-Prepaid", "4000-Revenue", "2300-Payroll liability"])}`,
        detail: r() > 0.7 ? `Variance ${money(r, 1, 400).toFixed(2)} · routed to owner` : "Variance $0.00 · signed off",
      }),
    },
  ],
  "revenue-contracts": [
    {
      kind: "flagged",
      credits: 8,
      weight: 2,
      build: (r) => ({
        title: "Flagged revenue risk",
        detail: `Termination-for-convenience clause · ASC 606 timing impact on ${money(r, 40000, 900000).toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
        needsApproval: true,
      }),
    },
  ],
  "contract-review": [
    {
      kind: "drafted",
      credits: 8,
      weight: 4,
      build: (r) => ({
        title: `Redlined ${pick(r, ["MSA", "DPA", "NDA", "SOW", "Order form"])}`,
        detail: `${3 + Math.floor(r() * 9)} clauses off playbook · ${1 + Math.floor(r() * 3)} need counsel`,
        needsApproval: r() > 0.6,
      }),
    },
  ],
};

type WeightedEntry = { slug: string; name: string; category: AgentCategory; template: Template };

const WEIGHTED: WeightedEntry[] = agents.flatMap((agent) => {
  const templates = TEMPLATES[agent.slug] ?? [];
  return templates.flatMap((template) =>
    Array.from({ length: template.weight }, () => ({
      slug: agent.slug,
      name: agent.name,
      category: agent.category,
      template,
    })),
  );
});

/** Builds the event that belongs to a given sequence tick. Pure. */
export function eventAtTick(tick: number): AgentEvent {
  const rng = mulberry32(tick * 2654435761);
  const entry = WEIGHTED[Math.floor(rng() * WEIGHTED.length) % WEIGHTED.length];
  const body = entry.template.build(rng);
  return {
    id: `evt-${tick}`,
    ts: new Date(tickToTime(tick)).toISOString(),
    agentSlug: entry.slug,
    agentName: entry.name,
    category: entry.category,
    kind: entry.template.kind,
    title: body.title,
    detail: body.detail,
    amount: body.amount,
    credits: entry.template.credits,
    customer: pick(rng, CUSTOMERS),
    needsApproval: body.needsApproval,
  };
}

/** Ticks advance every ~2.6s, so a feed of 12 covers about half a minute. */
const TICK_MS = 2600;
const tickToTime = (tick: number) => tick * TICK_MS;
const timeToTick = (now: number) => Math.floor(now / TICK_MS);

/** Minutes elapsed in the US Eastern business day (UTC-5), clamped to 0..600. */
function businessMinutes(now: number): number {
  const utc = new Date(now);
  const eastern = utc.getTime() - 5 * 60 * 60 * 1000;
  const d = new Date(eastern);
  const minutes = d.getUTCHours() * 60 + d.getUTCMinutes();
  const sinceOpen = minutes - 7 * 60; // 07:00 local start
  return Math.max(0, Math.min(600, sinceOpen));
}

export function metricsAt(now: number): LiveMetrics {
  const elapsed = businessMinutes(now);
  const progress = elapsed / 600;
  // Work accumulates fastest mid-morning and mid-afternoon.
  const curve = progress + 0.18 * Math.sin(progress * Math.PI * 2);
  const shaped = Math.max(0, Math.min(1, curve));
  const rng = mulberry32(Math.floor(now / 60000));

  const casesResolvedToday = Math.round(1420 * shaped + rng() * 12);
  const creditsUsedToday = Math.round(9800 * shaped + rng() * 40);
  return {
    casesResolvedToday,
    hoursSavedToday: Math.round((casesResolvedToday * 0.25 + 180 * shaped) * 10) / 10,
    creditsUsedToday,
    activeAgents: 12,
    approvalsPending: 3 + Math.floor(rng() * 5),
    uptime30d: 99.98,
    p95LatencyMs: 780 + Math.floor(rng() * 120),
    asOf: new Date(now).toISOString(),
  };
}

export const FEED_LENGTH = 12;

/** Newest-first slice of the feed plus metrics. Pure in `now`. */
export function getInitialSnapshot(now: number): LiveSnapshot {
  const tick = timeToTick(now);
  const events = Array.from({ length: FEED_LENGTH }, (_, i) => eventAtTick(tick - i));
  return { events, metrics: metricsAt(now) };
}

/** The tick a client should ask for next, given the last one it saw. */
export function nextTick(now: number, lastTick: number): number | null {
  const current = timeToTick(now);
  return current > lastTick ? lastTick + 1 : null;
}

export const currentTick = timeToTick;

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

export function getDashboardData(now: number): DashboardData {
  const snapshot = getInitialSnapshot(now);
  const rng = mulberry32(Math.floor(now / 300000));
  const elapsed = businessMinutes(now) / 600;

  const activity: AgentActivity[] = agents.map((agent, index) => {
    const seed = mulberry32(index * 7919 + Math.floor(now / 300000));
    const base = [220, 90, 64, 310, 28, 12, 140, 76, 260, 88, 18, 54][index] ?? 60;
    const today = Math.round(base * Math.max(0.08, elapsed) + seed() * 6);
    const utilization = Math.min(0.97, 0.28 + seed() * 0.6);
    const state: AgentActivity["state"] =
      agent.slug === "payroll" && seed() > 0.55 ? "attention" : seed() > 0.22 ? "running" : "idle";
    return {
      slug: agent.slug,
      name: agent.name,
      shortName: agent.shortName,
      category: agent.category,
      status: agent.status,
      state,
      today,
      utilization,
    };
  });

  // Walk backwards through the feed collecting the events that need a decision. Each tick
  // is consumed at most once, so ids stay unique even when matches cluster.
  const approvals: AgentEvent[] = [];
  let scan = currentTick(now);
  for (let guard = 0; guard < 200 && approvals.length < 5; guard += 1, scan -= 1) {
    const candidate = eventAtTick(scan);
    if (!candidate.needsApproval) continue;
    approvals.push({ ...candidate, needsApproval: true, id: `approval-${scan}` });
  }

  const usedMonthToDate = 18420 + Math.round(snapshot.metrics.creditsUsedToday);
  const credits: CreditsUsage = {
    planName: "Growth",
    allowance: 30000,
    usedMonthToDate,
    usedToday: snapshot.metrics.creditsUsedToday,
    projectedMonthEnd: Math.round(usedMonthToDate * 1.42),
    daysLeft: 11,
    resetsOn: "2026-10-01",
    overagePerCredit: 0.12,
  };

  void rng;
  return { snapshot, agents: activity, credits, approvals };
}

/**
 * Reads the clock and returns the current snapshot. Server-only: it is called from
 * server components, where reading the wall clock at render time is the point.
 */
export function getLiveSnapshotNow(): LiveSnapshot {
  return getInitialSnapshot(Date.now());
}

/** Server-only: the current dashboard payload. */
export function getDashboardDataNow(): DashboardData {
  return getDashboardData(Date.now());
}
