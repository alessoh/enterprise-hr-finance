import type { Testimonial } from "./types";

const MODELED = "Modeled outcome from design-partner deployments.";

/**
 * Fictional design-partner testimonials. Names and titles are invented;
 * companies are the fictional design partners listed in BRIEF section 3.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Our HR partners used to start every case by asking the employee the same four questions. Now the case arrives with the answers attached. The deflection number is real, but the bigger change is what the team spends its day on.",
    name: "Dana Okafor",
    role: "VP People Operations",
    company: "Halvorsen Health",
    agentSlugs: ["help-desk", "payroll"],
    metric: { value: "71%", label: "of HR cases resolved without a human", numeric: 71, suffix: "%", footnote: MODELED },
  },
  {
    quote:
      "The auditors asked for the lineage record on the first package and never asked again. We went through interim fieldwork without pulling anyone off the close.",
    name: "Marcus Lindqvist",
    role: "Corporate Controller",
    company: "Castellan Financial",
    agentSlugs: ["audit", "controls", "close"],
    metric: { value: "3 days", label: "shorter close by the second cycle", numeric: 3, suffix: " days", footnote: MODELED },
  },
  {
    quote:
      "A dispatcher at 4 a.m. should not be working a phone tree. The agent knows who is certified, who is rested, and who said they want hours. It asks them in that order and books the first yes.",
    name: "Priya Raman",
    role: "Director of Workforce Operations",
    company: "Northwind Logistics",
    agentSlugs: ["scheduling", "recruiting"],
    metric: { value: "11 min", label: "median time to fill an open shift", numeric: 11, suffix: " min", footnote: MODELED },
  },
  {
    quote:
      "We were skeptical of AI screening for legal reasons. The adverse-impact report per requisition and the recruiter approval on every decision are what got it through our counsel.",
    name: "Tomás Herrera",
    role: "Head of Talent Acquisition",
    company: "Orion Retail Group",
    agentSlugs: ["recruiting"],
    metric: { value: "−44%", label: "screening time per requisition", numeric: 44, prefix: "−", suffix: "%", footnote: MODELED },
  },
  {
    quote:
      "The commentary draft lands the morning after close with the driver table under each paragraph. My analysts edit and sign. They stopped compiling.",
    name: "Elena Vasquez",
    role: "Chief Financial Officer",
    company: "Bluepeak Energy",
    agentSlugs: ["planning", "close"],
  },
  {
    quote:
      "Duplicate detection in the ERP is exact match. The agent found the same invoice submitted under two vendor records with a transposed digit. That one exception paid for the year.",
    name: "Kwame Mensah",
    role: "Director of Internal Audit",
    company: "Summit Bank",
    agentSlugs: ["controls", "audit"],
    metric: { value: "$190K", label: "in duplicate payments caught in the first quarter", numeric: 190, prefix: "$", suffix: "K", footnote: MODELED },
  },
  {
    quote:
      "Payroll runs in eleven states and two provinces. The agent tells us on Tuesday what would have been an off-cycle run on Friday. Our payroll manager approves every fix; nothing changes without her.",
    name: "Ingrid Solberg",
    role: "Chief People Officer",
    company: "Verdant Foods",
    agentSlugs: ["payroll", "help-desk"],
  },
  {
    quote:
      "We evaluated three platforms. Meridian was the only one where the approval step could not be turned off by the person building the agent. That is the property our audit committee cared about.",
    name: "Robert Chen",
    role: "VP Finance Transformation",
    company: "Atlas Manufacturing",
    agentSlugs: ["close", "controls", "contract-review"],
    metric: { value: "100%", label: "of consequential actions with a named approver", numeric: 100, suffix: "%" },
  },
];

export function getTestimonialsForAgent(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.agentSlugs?.includes(slug));
}
