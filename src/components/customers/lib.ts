import { getAgent } from "@/content/agents";
import type { Agent, CaseStudyTimelinePhase, Customer } from "@/content/types";

/** Grouping used by the index filter. Legal agents count with finance. */
export type PartnerFunction = "hr" | "finance";

export const partnerFunctionLabel: Record<PartnerFunction, string> = {
  hr: "HR operations",
  finance: "Finance and legal",
};

/** Agents the partner runs, in content order, skipping unknown slugs. */
export function agentsForCustomer(customer: Customer): Agent[] {
  return customer.agentSlugs
    .map((slug) => getAgent(slug))
    .filter((agent): agent is Agent => agent !== undefined);
}

/** HR when more than half of the partner's agents are HR agents; finance otherwise. */
export function partnerFunction(customer: Customer): PartnerFunction {
  const agents = agentsForCustomer(customer);
  const hr = agents.filter((agent) => agent.category === "hr").length;
  return hr * 2 > agents.length ? "hr" : "finance";
}

/** Highest week number on the timeline: "Weeks 8-11" -> 11. */
export function timelineWeeks(timeline: CaseStudyTimelinePhase[]): number {
  return timeline.reduce((max, phase) => {
    const numbers = phase.weeks.match(/\d+/g)?.map(Number) ?? [];
    return Math.max(max, ...numbers);
  }, 0);
}
