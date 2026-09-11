import { modeledOutcomeFootnote as MODELED } from "./agents";
import { testimonials } from "./testimonials";
import type { CaseStudy, Customer, Testimonial } from "./types";

function quoteFrom(company: string): Testimonial | undefined {
  return testimonials.find((t) => t.company === company);
}

/**
 * Fictional design partners (BRIEF section 3). Sizes, regions, and results are invented
 * for the site and labeled as modeled outcomes wherever a figure appears.
 */
export const customers: Customer[] = [
  {
    slug: "halvorsen-health",
    name: "Halvorsen Health",
    industry: "Healthcare",
    size: "12,000 employees",
    region: "US Midwest",
    logoText: "HALVORSEN",
    summary:
      "A regional health system with 14 hospitals and 60 clinics deployed the Help Desk and Payroll Agents across HR shared services in 11 weeks, in a HIPAA-ready configuration.",
    agentSlugs: ["help-desk", "payroll", "scheduling"],
    results: [
      { value: "71%", label: "of HR cases resolved without a human", numeric: 71, suffix: "%", footnote: MODELED },
      { value: "−31%", label: "median case resolution time", numeric: 31, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "−36%", label: "off-cycle payroll runs", numeric: 36, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    quote: quoteFrom("Halvorsen Health"),
    seo: {
      title: "Halvorsen Health Case Study | Meridian",
      description:
        "How a 12,000-employee health system resolved 71% of HR cases without a human and cut off-cycle payroll runs by a third with Meridian's HR agents.",
      keywords: ["healthcare HR automation", "HR help desk case study", "payroll agent healthcare", "HIPAA AI agents"],
    },
  },
  {
    slug: "castellan-financial",
    name: "Castellan Financial",
    industry: "Financial services",
    size: "4,200 employees",
    region: "US and UK",
    logoText: "CASTELLAN",
    summary:
      "An asset manager with 9 legal entities deployed the Audit, Controls, and Close Agents ahead of its year-end audit and took 3 days out of the close in two cycles.",
    agentSlugs: ["audit", "controls", "close"],
    results: [
      { value: "3 days", label: "shorter month-end close", numeric: 3, suffix: " days", footnote: MODELED },
      { value: "$283K", label: "per year in duplicate payments avoided", numeric: 283, prefix: "$", suffix: "K", footnote: MODELED },
      { value: "~900 hrs", label: "saved in the first audit year", numeric: 900, prefix: "~", suffix: " hrs", footnote: MODELED },
    ],
    quote: quoteFrom("Castellan Financial"),
    seo: {
      title: "Castellan Financial Case Study | Meridian",
      description:
        "How an asset manager took 3 days out of the close, saved about 900 audit hours, and avoided $283K a year in duplicate payments with Meridian's finance agents.",
      keywords: ["financial close case study", "audit evidence automation", "duplicate payment detection", "asset management finance AI"],
    },
  },
  {
    slug: "northwind-logistics",
    name: "Northwind Logistics",
    industry: "Logistics and warehousing",
    size: "18,000 employees",
    region: "North America",
    logoText: "NORTHWIND",
    summary:
      "A 41-site distribution network deployed the Scheduling and Recruiting Agents during peak season to cover call-outs and hire hourly staff at volume.",
    agentSlugs: ["scheduling", "recruiting", "help-desk"],
    results: [
      { value: "11 min", label: "median time to fill an open shift", numeric: 11, suffix: " min", footnote: MODELED },
      { value: "−44%", label: "screening time per requisition", numeric: 44, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "−18%", label: "premium overtime on backfills", numeric: 18, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    quote: quoteFrom("Northwind Logistics"),
    seo: {
      title: "Northwind Logistics Case Study | Meridian",
      description:
        "How an 18,000-employee logistics network fills open shifts in 11 minutes and cut hourly screening time 44% with Meridian's Scheduling and Recruiting Agents.",
      keywords: ["shift scheduling case study", "logistics workforce AI", "high-volume hiring automation", "frontline scheduling agent"],
    },
  },
  {
    slug: "bluepeak-energy",
    name: "Bluepeak Energy",
    industry: "Energy and utilities",
    size: "6,500 employees",
    region: "US and Canada",
    logoText: "BLUEPEAK",
    summary:
      "A regulated utility uses the Planning and Close Agents to produce variance commentary the morning after close and to run a 9-entity consolidation checklist.",
    agentSlugs: ["planning", "close", "audit"],
    results: [
      { value: "< 10 min", label: "to first-draft variance commentary", footnote: MODELED },
      { value: "−58%", label: "analyst hours on the monthly pack", numeric: 58, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "2 days", label: "shorter consolidated close", numeric: 2, suffix: " days", footnote: MODELED },
    ],
    quote: quoteFrom("Bluepeak Energy"),
    seo: {
      title: "Bluepeak Energy Case Study | Meridian",
      description:
        "How a regulated utility with 6,500 employees produces variance commentary in minutes and closes two days faster with Meridian's Planning and Close Agents.",
      keywords: ["FP&A automation utility", "variance commentary AI", "energy sector finance agents", "close automation"],
    },
  },
  {
    slug: "orion-retail-group",
    name: "Orion Retail Group",
    industry: "Retail",
    size: "31,000 employees",
    region: "North America",
    logoText: "ORION",
    summary:
      "A 640-store retailer uses the Recruiting Agent for seasonal hourly hiring and the Scheduling Agent to cover call-outs, with adverse-impact reporting on every requisition.",
    agentSlugs: ["recruiting", "scheduling", "help-desk"],
    results: [
      { value: "−44%", label: "screening time per requisition", numeric: 44, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "−70%", label: "manual recruiter reviews", numeric: 70, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "2 days", label: "from application to interview, down from 9", numeric: 2, suffix: " days", footnote: MODELED },
    ],
    quote: quoteFrom("Orion Retail Group"),
    seo: {
      title: "Orion Retail Group Case Study | Meridian",
      description:
        "How a 640-store retailer cut hourly screening time 44% and moved applicants to interview in 2 days with Meridian's Recruiting Agent and recruiter approval.",
      keywords: ["retail hiring automation", "seasonal hiring AI", "candidate screening retail", "adverse impact reporting"],
    },
  },
  {
    slug: "verdant-foods",
    name: "Verdant Foods",
    industry: "Food production",
    size: "9,800 employees",
    region: "US and Canada",
    logoText: "VERDANT",
    summary:
      "A food producer paying employees in 11 states and 2 provinces uses the Payroll Agent to clear exceptions before cutoff and the Help Desk Agent for plant-floor HR questions.",
    agentSlugs: ["payroll", "help-desk", "scheduling"],
    results: [
      { value: "4x", label: "faster payroll compliance resolution", numeric: 4, suffix: "x", footnote: MODELED },
      { value: "92%", label: "of pre-run exceptions cleared before cutoff", numeric: 92, suffix: "%", footnote: MODELED },
      { value: "−35%", label: "off-cycle payroll runs", numeric: 35, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    quote: quoteFrom("Verdant Foods"),
    seo: {
      title: "Verdant Foods Case Study | Meridian",
      description:
        "How a multi-jurisdiction food producer resolves payroll compliance issues 4x faster and clears 92% of exceptions before cutoff with Meridian's Payroll Agent.",
      keywords: ["multi-state payroll compliance", "payroll agent case study", "food manufacturing HR AI", "pre-payroll audit"],
    },
  },
  {
    slug: "atlas-manufacturing",
    name: "Atlas Manufacturing",
    industry: "Industrial manufacturing",
    size: "14,500 employees",
    region: "US, Mexico, Germany",
    logoText: "ATLAS",
    summary:
      "An industrial manufacturer standardized on Meridian for the close, transaction controls, and supplier contract review across three countries under one approval policy.",
    agentSlugs: ["close", "controls", "contract-review"],
    results: [
      { value: "3 days", label: "shorter month-end close", numeric: 3, suffix: " days", footnote: MODELED },
      { value: "65%", label: "faster supplier contract processing", numeric: 65, suffix: "%", footnote: MODELED },
      { value: "100%", label: "of consequential actions with a named approver", numeric: 100, suffix: "%" },
    ],
    quote: quoteFrom("Atlas Manufacturing"),
    seo: {
      title: "Atlas Manufacturing Case Study | Meridian",
      description:
        "How an industrial manufacturer closed 3 days faster and processed supplier contracts 65% faster across three countries with Meridian's governed agents.",
      keywords: ["manufacturing finance automation", "supplier contract review AI", "multi-country close", "governed AI agents manufacturing"],
    },
  },
  {
    slug: "summit-bank",
    name: "Summit Bank",
    industry: "Banking",
    size: "7,300 employees",
    region: "United States",
    logoText: "SUMMIT",
    summary:
      "A regional bank runs the Controls Agent on 100% of AP and expense transactions and uses the Audit Agent for regulatory examination requests as well as the external audit.",
    agentSlugs: ["controls", "audit", "contract-review"],
    results: [
      { value: "$190K", label: "in duplicate payments caught in the first quarter", numeric: 190, prefix: "$", suffix: "K", footnote: MODELED },
      { value: "100%", label: "of AP and expense transactions tested", numeric: 100, suffix: "%" },
      { value: "−70%", label: "auditor and examiner follow-up requests", numeric: 70, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    quote: quoteFrom("Summit Bank"),
    seo: {
      title: "Summit Bank Case Study | Meridian",
      description:
        "How a regional bank tests 100% of AP transactions, caught $190K in duplicates in one quarter, and cut examiner follow-ups 70% with Meridian's finance agents.",
      keywords: ["bank controls automation", "continuous controls monitoring banking", "regulatory exam evidence", "duplicate payment detection bank"],
    },
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "halvorsen-health",
    customerSlug: "halvorsen-health",
    title: "Halvorsen Health resolves 71% of HR cases without a human and cuts off-cycle payroll by a third",
    subtitle:
      "A 12,000-employee health system deployed the Help Desk and Payroll Agents across 14 hospitals and 60 clinics in 11 weeks, in a HIPAA-ready configuration with a BAA.",
    challenge: `Halvorsen Health runs HR shared services for 12,000 employees from one center with 38 staff. In 2025 the center handled about 3,100 cases a month with a median resolution time of 5.2 days. Two-thirds of cases were questions with a definite answer somewhere: shift differential rules, PTO accrual for part-time nurses, tuition reimbursement eligibility, how to add a newborn to benefits. Each still required an HR generalist to read the policy, check the record, and write a reply.

Payroll was biweekly across three states and four collective bargaining agreements, each with its own differential and overtime rules. The payroll team of nine averaged 22 off-cycle runs a month, most of them corrections for errors that were visible in the pre-run register: a nurse who transferred to a new state without a new withholding election, a garnishment deducted above the federal cap, a retro differential missed after a schedule change.

The health system needed both problems solved under HIPAA, with employee data never leaving its security model, and with a payroll manager approving every change. It had evaluated two general-purpose assistants and rejected both because neither could show which record an answer came from.`,
    approach: `**Weeks 1 to 3: connect and scope.** Halvorsen connected its HRIS, policy library (412 documents across entities and states), benefits administration, and payroll provider through read-only connectors in a HIPAA-ready workspace under a BAA. HR shared services chose 14 topics for the Help Desk Agent to answer, 6 it could act on with approval (address, direct deposit, W-4, dependent add, PTO request, name change), and a list that routes straight to a human: FMLA, accommodation, workplace concerns, and immigration.

**Weeks 4 to 7: pilot at one hospital.** The Help Desk Agent went live in Microsoft Teams for 1,900 employees at the flagship hospital. HR generalists reviewed every escalated case in the first two weeks and rated 400 agent answers for accuracy against the source document. The policy team used the unanswered-question queue to rewrite 31 documents that were ambiguous or out of date.

**Weeks 6 to 11: Payroll Agent and rollout.** The Payroll Agent ran in shadow mode for two pay cycles, producing exceptions the team compared to the corrections they made anyway. It then went live with tickets routed to specialists by pay group and a rule library for the three states. The Help Desk Agent rolled out to the remaining 13 hospitals and 60 clinics in three waves.`,
    results: {
      summary: `By the third month after full rollout, 71% of HR cases were resolved by the agent without a human touching them, against a design target of 65%. Median resolution time for cases that did reach a person fell from 5.2 to 3.6 days, because cases arrived classified with the employee's record and history attached. Employee satisfaction on resolved cases measured 4.6 out of 5.

Off-cycle payroll runs fell from 22 to 14 a month, and 92% of pre-run exceptions were cleared before cutoff. The payroll manager approved every correction; the agent changed nothing on its own. Two state minimum-wage changes and one paid-leave rule change were queued with citations and applied on their effective dates.

HR shared services did not reduce headcount. It reassigned six generalists to leave administration and manager coaching, work that had a waiting list.`,
      metrics: [
        { value: "71%", label: "of HR cases resolved without a human", numeric: 71, suffix: "%", footnote: MODELED },
        { value: "3.6 days", label: "median resolution for escalated cases, down from 5.2", numeric: 3.6, suffix: " days", footnote: MODELED },
        { value: "14", label: "off-cycle payroll runs per month, down from 22", numeric: 14, footnote: MODELED },
        { value: "92%", label: "of pre-run exceptions cleared before cutoff", numeric: 92, suffix: "%", footnote: MODELED },
      ],
    },
    quote: quoteFrom("Halvorsen Health") ?? testimonials[0],
    timeline: [
      { phase: "Discovery and scope", weeks: "Weeks 1-2", description: "Case history analysis, topic selection, escalation rules, HIPAA configuration and BAA." },
      { phase: "Connect", weeks: "Weeks 2-3", description: "HRIS, policy library, benefits, and payroll connected read-only. Evaluation set built from 400 historical cases." },
      { phase: "Help Desk pilot", weeks: "Weeks 4-7", description: "Live for 1,900 employees at one hospital in Microsoft Teams. Daily accuracy review, 31 policy documents rewritten." },
      { phase: "Payroll shadow and go-live", weeks: "Weeks 6-9", description: "Two shadow cycles, then live pre-cutoff checks with tickets routed by pay group." },
      { phase: "Rollout", weeks: "Weeks 8-11", description: "Three waves across 13 hospitals and 60 clinics. Registry dashboards handed to HR leadership." },
    ],
    publishedAt: "2026-06-18",
    seo: {
      title: "Halvorsen Health: 71% HR Case Deflection | Meridian",
      description:
        "Case study: Halvorsen Health deployed Meridian's HR agents across 74 sites in 11 weeks, resolved 71% of HR cases without a human, and cut off-cycle payroll 36%.",
      keywords: ["HR shared services automation", "healthcare payroll compliance", "HR case deflection case study", "HIPAA-ready AI agents"],
    },
  },

  {
    slug: "castellan-financial",
    customerSlug: "castellan-financial",
    title: "Castellan Financial takes 3 days out of the close and finds $283K a year in duplicate payments",
    subtitle:
      "An asset manager with 4,200 employees and 9 legal entities deployed the Audit, Controls, and Close Agents ahead of its year-end audit.",
    challenge: `Castellan Financial closes 9 legal entities in 3 currencies. In 2025 the consolidated close took 10 business days, and the controller's team tracked 214 tasks in a shared spreadsheet that was accurate only on the afternoon someone updated it. Intercompany differences surfaced late because the entities closed on different days, and the people downstream found out by asking.

The external audit generated 460 prepared-by-client requests plus SOX 404 control testing samples. Three senior accountants spent most of the first quarter locating journal entries, invoices, approvals, and bank statements, naming files, and uploading them, while also trying to close January and February. Auditor follow-ups averaged 1.4 per request because evidence arrived without context.

Accounts payable processed about 7,000 invoices a month across the entities. The ERP's duplicate check matched on exact vendor and invoice number. Internal audit suspected leakage but had only sampled 60 invoices a quarter and found nothing conclusive.`,
    approach: `**Read-only first.** Castellan connected the ERP general ledger and subledgers, document management, banking, and the email archive through read-only connections. No agent received write access to a financial system at any point in the deployment.

**Audit Agent, dry run on last year.** Before the current audit began, the team loaded the prior year's PBC list and had the agent assemble packages for 80 requests. The controller and the engagement senior compared them to what had been submitted manually. The agent's packages had complete lineage records and consistent naming; two manual packages from the prior year had been missing an approval that the agent found in the email archive.

**Controls Agent, six tests.** Internal audit enabled duplicate invoice detection with fuzzy matching, three-way match exceptions, vendor bank-detail changes without callback, split purchases under approval thresholds, preparer-approver conflicts on journal entries, and expense policy checks. Thresholds were set per entity. Every exception required disposition by AP or controllership.

**Close Agent, the real checklist.** The 214-task spreadsheet became the agent's dependency graph. Bank and subledger reconciliations that tied were prepared with support attached. Recurring accruals were drafted from prior periods and open purchase orders. Late tasks were nudged, then escalated to the controller after 4 hours. Preparer and reviewer separation was enforced on every task.`,
    results: {
      summary: `The close went from 10 business days to 7 by the second cycle. Most of the gain came from removing waiting: downstream owners saw upstream blockers in real time, and 61 of the 214 tasks were prepared before their owners arrived in the morning. Reconciliations with unexplained differences were never closed automatically; there were 14 of them in the first cycle and 6 in the third.

The Controls Agent identified duplicate payments annualizing to about $283,000 in its first 90 days, most of them invoices resubmitted under a second vendor record or with a suffix appended to the invoice number. AP recovered the majority from vendors. False positives fell by half after the first month of dispositions.

Across the audit year, the finance team recorded about 900 hours saved on evidence collection. Auditor follow-ups fell roughly 70% because packages carried an index, lineage, and the selection method. The three senior accountants worked on the close during fieldwork for the first time.`,
      metrics: [
        { value: "7 days", label: "consolidated close, down from 10", numeric: 7, suffix: " days", footnote: MODELED },
        { value: "$283K", label: "annualized duplicate payments identified in 90 days", numeric: 283, prefix: "$", suffix: "K", footnote: MODELED },
        { value: "~900 hrs", label: "saved on audit evidence in the first year", numeric: 900, prefix: "~", suffix: " hrs", footnote: MODELED },
        { value: "−70%", label: "auditor follow-up requests", numeric: 70, prefix: "−", suffix: "%", footnote: MODELED },
      ],
    },
    quote: quoteFrom("Castellan Financial") ?? testimonials[1],
    timeline: [
      { phase: "Connect and scope", weeks: "Weeks 1-2", description: "Read-only connections to ERP, document management, banking, and email archive. Audit scope, entities, and periods defined." },
      { phase: "Audit Agent dry run", weeks: "Weeks 3-4", description: "80 prior-year PBC requests assembled and compared with the engagement team." },
      { phase: "Controls Agent live", weeks: "Weeks 4-6", description: "Six tests enabled per entity. AP and controllership disposition workflow in place." },
      { phase: "Close Agent, first cycle", weeks: "Weeks 6-9", description: "214-task checklist imported with dependencies. Shadow prep for one cycle, live the next." },
      { phase: "Year-end audit", weeks: "Weeks 10-22", description: "460 PBC requests handled through the Audit Agent with controller release on every package." },
    ],
    publishedAt: "2026-04-29",
    seo: {
      title: "Castellan Financial: 3 Days Off the Close | Meridian",
      description:
        "Case study: Castellan Financial used Meridian's finance agents to shorten the close by 3 days, save about 900 audit hours, and find $283K a year in duplicates.",
      keywords: ["month-end close case study", "audit evidence automation asset management", "duplicate payment recovery", "continuous controls monitoring"],
    },
  },

  {
    slug: "northwind-logistics",
    customerSlug: "northwind-logistics",
    title: "Northwind Logistics fills open shifts in 11 minutes and cuts hourly screening time 44%",
    subtitle:
      "An 18,000-employee distribution network deployed the Scheduling and Recruiting Agents across 41 sites during peak season.",
    challenge: `Northwind Logistics runs 41 distribution centers with about 14,000 hourly employees. In peak season, daily call-outs ran between 6% and 9%. Each open shift cost a dispatcher or shift lead 2 to 3 hours of calls and texts, and the people who answered first were often the ones already near overtime. Certification rules for forklift and hazmat, hours-of-service limits for drivers, minor-labor restrictions in three states, and seniority provisions in collective agreements at 12 sites all had to be checked by hand.

Hourly recruiting ran at about 1,200 applicants per site per month in peak. Recruiters could not read them all. Time from application to interview averaged 9 days, by which point a third of applicants had taken another job. Site managers were interviewing candidates who lacked basic eligibility because knockout questions were not asked until the interview.

Northwind's legal team had specific requirements: no automated rejections, adverse-impact reporting per requisition, and a full offer history for every shift fill to satisfy predictive-scheduling ordinances in four cities.`,
    approach: `**Scheduling Agent, rules first.** The team encoded rest periods, maximum consecutive shifts, certification requirements with expiry dates, hours-of-service limits, minor-labor rules by state, and the seniority provisions from 12 collective agreements as hard constraints. The agent connected to the workforce management system, time and attendance, and the HRIS. Employees opted in by text; 78% had opted in by week 4, most citing the chance to pick up hours.

Offers went out in ranked waves of 5 by SMS, 4 minutes apart. Fills that would trigger premium overtime paused for shift-lead approval. Unfilled shifts escalated to the shift lead at 45 minutes with the full offer history.

**Recruiting Agent, knockouts by text.** For hourly requisitions, the agent sent knockout and availability questions by SMS within 10 minutes of application, scored applications against the site's criteria, and offered interview slots from the hiring manager's calendar. Recruiters reviewed ranked shortlists with rationale and approved every advance and rejection. An adverse-impact report was generated per requisition before any decision was released.

**Rollout by region.** Six sites went live in week 3, the Southwest region in week 6, and all 41 sites by week 10, before the peak-season hiring surge.`,
    results: {
      summary: `Median time to fill an open shift fell from about 2 hours of dispatcher effort to 11 minutes, with no rest-period, certification, or seniority violations in agent-filled shifts across the season. Premium overtime on backfills fell 18% because offers reached rested, willing employees before they reached the near-overtime regulars. Dispatchers reported spending the recovered time on dock planning.

In recruiting, screening time per requisition fell 44% and manual recruiter reviews by 70%. Time from application to interview dropped from 9 days to 2. Interview no-show rates fell because candidates chose their own slots. Legal received an adverse-impact report on every requisition and the offer log satisfied the four predictive-scheduling ordinances without additional work.

Northwind added the Help Desk Agent for hourly employees in the following quarter, starting with pay and schedule questions.`,
      metrics: [
        { value: "11 min", label: "median time to fill an open shift", numeric: 11, suffix: " min", footnote: MODELED },
        { value: "−18%", label: "premium overtime on backfills", numeric: 18, prefix: "−", suffix: "%", footnote: MODELED },
        { value: "−44%", label: "screening time per requisition", numeric: 44, prefix: "−", suffix: "%", footnote: MODELED },
        { value: "2 days", label: "application to interview, down from 9", numeric: 2, suffix: " days", footnote: MODELED },
      ],
    },
    quote: quoteFrom("Northwind Logistics") ?? testimonials[2],
    timeline: [
      { phase: "Rules and connections", weeks: "Weeks 1-2", description: "Labor rules, certifications, and 12 collective agreements encoded as constraints. WFM, time, HRIS, and ATS connected." },
      { phase: "Six-site pilot", weeks: "Weeks 3-5", description: "Scheduling Agent live at six sites with SMS opt-in. Recruiting Agent live on hourly requisitions at the same sites." },
      { phase: "Regional rollout", weeks: "Weeks 6-8", description: "Southwest region live. Escalation thresholds and wave sizes tuned from pilot data." },
      { phase: "Network-wide", weeks: "Weeks 9-10", description: "All 41 sites live ahead of peak. Adverse-impact reports routed to legal per requisition." },
      { phase: "Peak season", weeks: "Weeks 11-24", description: "Steady state through peak. Help Desk Agent scoped for the following quarter." },
    ],
    publishedAt: "2026-08-12",
    seo: {
      title: "Northwind Logistics: Shifts Filled in 11 Min | Meridian",
      description:
        "Case study: Northwind Logistics used Meridian's Scheduling and Recruiting Agents across 41 sites to fill shifts in 11 minutes and cut screening time 44%.",
      keywords: ["logistics shift coverage case study", "warehouse hiring automation", "predictive scheduling compliance", "frontline workforce AI"],
    },
  },
];

export function getCustomer(slug: string): Customer | undefined {
  return customers.find((customer) => customer.slug === slug);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCustomersForAgent(agentSlug: string): Customer[] {
  return customers.filter((customer) => customer.agentSlugs.includes(agentSlug));
}
