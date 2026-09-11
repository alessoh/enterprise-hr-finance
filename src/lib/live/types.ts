/**
 * Live / real-time contract (BUILD-NOTES.md "Live / real-time").
 * Shared by the SSE route, the JSON endpoints, the client hook and the live components.
 */
import type { AgentCategory, AgentStatus } from "@/content/types";

export type AgentEventKind =
  | "resolved"
  | "flagged"
  | "drafted"
  | "approved"
  | "scheduled"
  | "collected"
  | "reconciled"
  | "screened";

export interface AgentEvent {
  id: string;
  /** ISO 8601 with milliseconds. */
  ts: string;
  agentSlug: string;
  agentName: string;
  category: AgentCategory;
  kind: AgentEventKind;
  title: string;
  detail: string;
  /** USD, with cents, when the event concerns money. */
  amount?: number;
  credits: number;
  customer: string;
  needsApproval?: boolean;
}

export interface LiveMetrics {
  casesResolvedToday: number;
  hoursSavedToday: number;
  creditsUsedToday: number;
  activeAgents: number;
  approvalsPending: number;
  uptime30d: number;
  p95LatencyMs: number;
  /** ISO 8601. */
  asOf: string;
}

export interface LiveSnapshot {
  /** Newest first. */
  events: AgentEvent[];
  metrics: LiveMetrics;
}

export type LiveStatus = "connecting" | "live" | "reconnecting" | "paused";

// ---------------------------------------------------------------------------
// Dashboard extras (server-computed, passed as props)
// ---------------------------------------------------------------------------

export type AgentRunState = "running" | "idle" | "attention";

export interface AgentActivity {
  slug: string;
  name: string;
  shortName: string;
  category: AgentCategory;
  status: AgentStatus;
  state: AgentRunState;
  /** Actions completed today. */
  today: number;
  /** 0..1 share of configured capacity in use. */
  utilization: number;
}

export interface CreditsUsage {
  planName: string;
  allowance: number;
  usedMonthToDate: number;
  usedToday: number;
  projectedMonthEnd: number;
  daysLeft: number;
  /** ISO date of the next reset. */
  resetsOn: string;
  overagePerCredit: number;
}

/** Everything the /dashboard page needs on first paint. */
export interface DashboardData {
  snapshot: LiveSnapshot;
  agents: AgentActivity[];
  credits: CreditsUsage;
  /** Items awaiting a human decision; all carry needsApproval. */
  approvals: AgentEvent[];
}

export type ApprovalDecision = "approved" | "declined";

// ---------------------------------------------------------------------------
// /api/live/status
// ---------------------------------------------------------------------------

export type ComponentStatus = "operational" | "degraded" | "outage";

export interface LiveComponent {
  name: string;
  status: ComponentStatus;
  /** Percentage, e.g. 99.98. */
  uptime90d: number;
  /** Milliseconds. */
  latency: { p50: number; p95: number };
  /** 90 daily uptime percentages, oldest first. */
  days: number[];
}

export interface LiveIncident {
  id: string;
  /** ISO date. */
  date: string;
  title: string;
  impact: "degraded" | "outage";
  status: "resolved";
  components: string[];
  durationMinutes: number;
  summary: string;
}

export interface LiveStatusPayload {
  overall: ComponentStatus;
  components: LiveComponent[];
  incidents: LiveIncident[];
  latency: { p50: number; p95: number };
  /** ISO 8601. */
  asOf: string;
}
