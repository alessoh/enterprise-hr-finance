import type { Agent, AgentCategory, AgentCategoryInfo } from "./types";

/** Required footnote wherever an outcome figure appears (BRIEF section 2). */
export const modeledOutcomeFootnote = "Modeled outcome from design-partner deployments.";
const MODELED = modeledOutcomeFootnote;

/** Shown on every agent page. */
export const agentContract: string[] = [
  "Scoped to one workflow",
  "Reads only permitted data",
  "Every action logged",
  "Consequential actions require human approval",
  "Measurable outcome",
  "Runs on your chosen model",
];

export const agentCategories: AgentCategoryInfo[] = [
  {
    id: "hr",
    name: "HR",
    description:
      "Agents for the people side of the business: employee questions, hiring, payroll accuracy, shift coverage, reviews, and job architecture.",
    order: 1,
  },
  {
    id: "finance",
    name: "Finance",
    description:
      "Agents for the office of the CFO: audit evidence, variance commentary, transaction controls, month-end close, and revenue contracts.",
    order: 2,
  },
  {
    id: "legal",
    name: "Legal and Operations",
    description:
      "Agents for legal operations: contract review and redlining against your playbook before signature.",
    order: 3,
  },
];

export const agents: Agent[] = [
  // -------------------------------------------------------------------------
  // HR
  // -------------------------------------------------------------------------
  {
    slug: "help-desk",
    name: "Help Desk Agent",
    shortName: "Help Desk",
    category: "hr",
    status: "ga",
    tagline: "Answers employee questions from policy and the system of record.",
    description:
      "Resolves employee questions about pay, time off, benefits, and policy using your handbook and HRIS data. Opens, routes, and closes cases with a complete record.",
    longDescription: `Most HR case volume is the same 200 questions asked 10,000 different ways. How much PTO do I have. When is my next pay date. How do I add a dependent. What is the parental leave policy in Ontario. The Help Desk Agent answers these from two sources: your policy documents and the employee's own record in the HRIS. Every answer cites the document section or field it came from.

When a question needs a human, the agent does the intake. It classifies the case, gathers the employee's job, location, manager, and relevant history, and routes it to the right HR partner with that context attached. HR partners start at step three instead of step one. When a topic is sensitive, the agent recognizes the category and hands off immediately without attempting an answer.

The agent works where employees already are: Slack, Microsoft Teams, email, and your HR portal. It answers in the employee's language, respects the employee's data entitlements, and never reads a record the employee could not open themselves.`,
    jobToBeDone:
      "Resolve tier-1 HR questions without a human touching the case, and hand tier-2 cases to the right person with the context already gathered.",
    headlineMetric: {
      value: "75%",
      label: "of HR case volume deflected",
      numeric: 75,
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      {
        value: "−30%",
        label: "median resolution time",
        numeric: 30,
        prefix: "−",
        suffix: "%",
        footnote: MODELED,
      },
      { value: "< 2 min", label: "first response, any hour, any time zone" },
      {
        value: "100%",
        label: "of answers cite a source document or record",
        numeric: 100,
        suffix: "%",
      },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect policy and people data",
        description:
          "Point the agent at your handbook, policy library, and HRIS. It indexes documents by jurisdiction, entity, and effective date, and maps employee fields such as PTO balance, pay group, and benefits elections.",
      },
      {
        step: 2,
        title: "Set scope and escalation rules",
        description:
          "Choose which topics the agent may answer, which it may act on with approval, and which route straight to a human. Sensitive categories escalate by default.",
      },
      {
        step: 3,
        title: "Answer, act, or route",
        description:
          "Employees ask in Slack, Teams, email, or the portal. The agent answers with citations, submits routine changes for approval, or opens a case with context gathered and assigns it.",
      },
      {
        step: 4,
        title: "Measure and tune",
        description:
          "The Registry reports deflection rate, resolution time, and satisfaction by topic. Unanswered questions become a queue for your policy owners to fill gaps.",
      },
    ],
    dataSources: [
      "Employee handbook, policy library, and benefits plan documents",
      "HRIS employee record: job, manager, location, entity, employment status",
      "PTO, sick, and leave balances and accrual rules",
      "Benefits enrollment, dependents, and qualifying life-event windows",
      "Pay schedule, payslips, W-2 and tax-form availability",
      "Prior case history and knowledge articles",
    ],
    actions: [
      "Answer a policy question with a citation to the section and effective date",
      "Look up the employee's own PTO balance, next pay date, or benefits election",
      "Submit an address change, direct deposit update, or W-4 change for approval",
      "Open a case with category, priority, and gathered context, then assign it",
      "Route tier-2 cases to the correct HR partner by topic, entity, and location",
      "Close a resolved case and record the resolution for the knowledge base",
    ],
    guardrails: [
      "Reads only the records the asking employee is entitled to see",
      "Changes to pay, tax withholding, or bank details require employee confirmation and HR approval before they post",
      "Every answer cites a source; when confidence is low the agent escalates rather than guesses",
      "Harassment, accommodation, immigration, and medical-leave topics route to a human immediately",
      "Full transcript and action log retained under your retention policy and visible in the Registry",
    ],
    integrations: [
      "HRIS",
      "Payroll providers",
      "Benefits administration",
      "Slack",
      "Microsoft Teams",
      "Email",
      "ITSM and ticketing",
    ],
    creditCost: [
      { action: "Case resolved end to end", credits: 2 },
      { action: "Question answered, no case opened", credits: 1 },
      { action: "Case triaged and routed to a human", credits: 1 },
    ],
    faqs: [
      {
        question: "What is an AI help desk agent for HR?",
        answer:
          "An AI help desk agent is software that answers employee HR questions and completes routine HR transactions by reading your policy documents and the employee's own HRIS record. Unlike a search box, it can act: it opens cases, submits changes for approval, and routes work to the right person. Unlike a general assistant, it is scoped to HR topics and to data the employee is allowed to see.",
      },
      {
        question: "How is this different from an HR chatbot?",
        answer:
          "Three ways. It reads live system-of-record data rather than a static FAQ, so it can tell an employee their actual PTO balance instead of the accrual policy. It takes actions inside your systems with approval gates. And every answer carries a citation and a log entry, so HR can audit what was said and why.",
      },
      {
        question: "Can employees see other people's data through the agent?",
        answer:
          "No. The agent inherits the asking employee's entitlements from your HRIS security model. A manager can ask about their direct reports' PTO balances if your HRIS permits that today. An individual contributor cannot. The agent has no permissions of its own.",
      },
      {
        question: "What happens when the agent does not know the answer?",
        answer:
          "It says so and opens a case. It never composes an answer from general knowledge when your policy is silent. Unanswered questions are grouped by topic in the Registry so policy owners can see which documents need to be written or clarified.",
      },
      {
        question: "How long does it take to deploy an HR help desk agent?",
        answer:
          "Design partners went from kickoff to a live pilot in 3 to 5 weeks. Week 1 connects the HRIS and imports policies. Weeks 2 and 3 tune scope and escalation rules against your real case history. The pilot then runs for one department before rollout.",
      },
    ],
    relatedAgentSlugs: ["payroll", "scheduling", "performance"],
    icon: "LifeBuoy",
    color: "hr",
    seo: {
      title: "HR Help Desk Agent | Meridian",
      description:
        "Meridian's Help Desk Agent answers employee questions from policy and HRIS data, opens and routes cases, and deflects up to 75% of HR case volume.",
      keywords: [
        "AI HR help desk",
        "HR case deflection",
        "employee self-service agent",
        "HR service delivery automation",
        "tier-1 HR support AI",
      ],
    },
  },

  {
    slug: "recruiting",
    name: "Recruiting Agent",
    shortName: "Recruiting",
    category: "hr",
    status: "ga",
    tagline: "Screens, shortlists, and schedules against the role you defined.",
    description:
      "Scores every application against the requisition's written criteria, produces a ranked shortlist with rationale, and schedules interviews. Recruiters approve every decision.",
    longDescription: `A requisition with 400 applicants gets a recruiter about 90 seconds per résumé. The Recruiting Agent reads all 400 against the criteria the hiring manager wrote down, scores each one, and returns a shortlist with a written rationale per candidate: which must-haves are met, where the evidence is, and what is uncertain. The recruiter reviews the shortlist, not the pile.

The agent also handles the logistics that consume recruiter days. It asks knockout questions by email or text, collects work authorization and availability, and finds interview slots across hiring-panel calendars. Once a recruiter advances a candidate, the agent books the loop and keeps the ATS stage current.

Every score is reproducible. Criteria are versioned on the requisition, protected characteristics are excluded from the features the agent may consider, and each requisition ships with an adverse-impact report so talent acquisition and legal can see selection rates by group before anyone is rejected.`,
    jobToBeDone:
      "Get a defensible shortlist to the hiring manager within a day of the posting closing, with interviews already on the calendar.",
    headlineMetric: {
      value: "−46%",
      label: "screening time per requisition",
      numeric: 46,
      prefix: "−",
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      {
        value: "−70%",
        label: "manual recruiter reviews",
        numeric: 70,
        prefix: "−",
        suffix: "%",
        footnote: MODELED,
      },
      { value: "< 24 h", label: "from posting close to ranked shortlist" },
      { value: "100%", label: "of scores with a written rationale", numeric: 100, suffix: "%" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Write the criteria once",
        description:
          "The hiring manager and recruiter define must-have and nice-to-have criteria on the requisition. The agent uses only these. Criteria are versioned so any score can be traced to the rules in force.",
      },
      {
        step: 2,
        title: "Screen every applicant",
        description:
          "As applications arrive in the ATS, the agent scores each against the criteria, cites the evidence in the résumé or application, and asks knockout questions where the application is silent.",
      },
      {
        step: 3,
        title: "Recruiter reviews the shortlist",
        description:
          "The recruiter sees a ranked list with rationale and an adverse-impact summary. They advance, hold, or reject. The agent drafts the candidate communications for approval.",
      },
      {
        step: 4,
        title: "Schedule and keep the ATS current",
        description:
          "For advanced candidates, the agent finds panel availability, books interviews, sends confirmations, and moves ATS stages. Recruiters see time-to-shortlist and pass-through rates in the Registry.",
      },
    ],
    dataSources: [
      "ATS requisitions, job descriptions, and structured screening criteria",
      "Applications, résumés, and screening-question responses",
      "Interviewer and hiring-panel calendars",
      "Hiring-manager scorecards and interview feedback",
      "Approved compensation range for the requisition",
      "Work-authorization and location requirements",
    ],
    actions: [
      "Score each application against versioned must-have and nice-to-have criteria",
      "Produce a ranked shortlist with per-candidate rationale and evidence",
      "Ask knockout and availability questions by email or SMS",
      "Draft advance, hold, and rejection messages for recruiter approval",
      "Find panel availability and book interview loops",
      "Update ATS stages and generate the adverse-impact report per requisition",
    ],
    guardrails: [
      "No automated rejections: a recruiter approves every advance or reject decision",
      "Protected characteristics and their proxies are excluded from the features the agent may use",
      "Adverse-impact monitoring (four-fifths rule) reported per requisition before decisions are released",
      "Criteria are locked and versioned on the requisition; changes reset scoring",
      "Candidate data is retained and deleted per the jurisdiction's rules; every score and message is logged",
    ],
    integrations: [
      "ATS",
      "HRIS",
      "Calendar (Google Workspace, Microsoft 365)",
      "Email",
      "SMS",
      "Video interviewing",
      "Background check providers",
    ],
    creditCost: [
      { action: "Candidate screened", credits: 1 },
      { action: "Interview loop scheduled", credits: 1 },
      { action: "Shortlist package with rationale and adverse-impact report", credits: 3 },
    ],
    faqs: [
      {
        question: "What is an AI recruiting agent?",
        answer:
          "An AI recruiting agent screens applications against the criteria a hiring team defines, produces a ranked shortlist with reasons, and handles scheduling and candidate communication. It does not decide who is hired. It compresses the reading and logistics so recruiters spend their time on the candidates who meet the bar.",
      },
      {
        question: "Is AI candidate screening legal and compliant?",
        answer:
          "It depends on how it is built and where you hire. Meridian's agent uses only the written criteria on the requisition, excludes protected characteristics and known proxies, keeps a human approval on every decision, and produces an adverse-impact report per requisition. Design partners in New York City and the EU have used these artifacts to satisfy audit and notice requirements. Your counsel makes the final call for your jurisdictions.",
      },
      {
        question: "Does the agent reject candidates automatically?",
        answer:
          "No. It recommends. A recruiter approves each advance or rejection. Knockout questions such as work authorization can be configured to auto-hold, but the hold is reviewed by a person before any communication goes out.",
      },
      {
        question: "Which applicant tracking systems does it work with?",
        answer:
          "Any ATS with an API or webhook model. Requisitions, applications, and stage changes sync in both directions. The agent reads the criteria from the requisition and writes rationale back as candidate notes so recruiters keep working in the ATS.",
      },
      {
        question: "How does it handle high-volume hourly hiring?",
        answer:
          "For frontline roles the agent runs knockout questions and availability collection by SMS within minutes of application, then offers interview slots directly. Design partners used it for roles with 1,000-plus applicants per month per location.",
      },
    ],
    relatedAgentSlugs: ["job-architecture", "scheduling", "help-desk"],
    icon: "UserSearch",
    color: "hr",
    seo: {
      title: "AI Recruiting Agent for Screening | Meridian",
      description:
        "Meridian's Recruiting Agent screens candidates against your criteria, returns shortlists with rationale, and schedules interviews. Screening time down 46%.",
      keywords: [
        "AI recruiting agent",
        "candidate screening automation",
        "résumé screening AI",
        "interview scheduling automation",
        "ATS AI agent",
      ],
    },
  },

  {
    slug: "payroll",
    name: "Payroll Agent",
    shortName: "Payroll",
    category: "hr",
    status: "ga",
    tagline: "Finds the errors before the payroll run, not after.",
    description:
      "Checks the pre-run register for missing data, configuration errors, and rule changes across every jurisdiction you pay in. Proposes the fix; your payroll team approves it.",
    longDescription: `Payroll errors are cheap to fix before cutoff and expensive after it. A missing state withholding election for a relocated employee, a garnishment deducted above the federal cap, a 401(k) deferral that will breach the annual limit in November, a new hire with no I-9 on file. Each one becomes an off-cycle run, a corrected W-2, or a penalty. The Payroll Agent reads the pre-run register against the employee master, time data, and the rules for each jurisdiction, and lists what is wrong with the record to fix.

It also tracks the rules themselves. Minimum wage changes by city, overtime thresholds by state, new paid-leave mandates. The agent monitors effective dates, checks which employees are affected, and queues a configuration change with the source cited. Your payroll manager reviews and approves before anything changes.

After the run, it reconciles the register to the general ledger posting, flags variances against the prior period by pay group, and drafts the accrual entry for the accountant. The agent never edits a pay rate and never changes net pay. It proposes; a named human approves.`,
    jobToBeDone:
      "Clear every payroll exception before cutoff so the run is right the first time and off-cycle corrections disappear.",
    headlineMetric: {
      value: "4x",
      label: "faster resolution of payroll compliance issues",
      numeric: 4,
      suffix: "x",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "92%", label: "of pre-run exceptions cleared before cutoff", numeric: 92, suffix: "%", footnote: MODELED },
      { value: "−35%", label: "off-cycle payroll runs", numeric: 35, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "5 days", label: "or less from a rule's effective date to a queued update" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect payroll, HRIS, and time",
        description:
          "The agent reads the payroll register, employee master, time and attendance, and benefits deductions. It maps pay groups, jurisdictions, and GL accounts.",
      },
      {
        step: 2,
        title: "Run pre-cutoff checks",
        description:
          "Three days before cutoff it validates the register: missing elections, garnishment caps, deferral limits, FLSA status changes, retro pay, negative net, and prior-period variances above your threshold.",
      },
      {
        step: 3,
        title: "Route fixes for approval",
        description:
          "Each exception becomes a ticket with the record, the rule, and the proposed correction. Payroll specialists approve, edit, or dismiss. Dismissals are logged with a reason.",
      },
      {
        step: 4,
        title: "Reconcile and report",
        description:
          "After the run, the agent ties the register to the GL posting, drafts accruals, and reports exception counts and time-to-clear by pay group in the Registry.",
      },
    ],
    dataSources: [
      "Payroll register, pre-run and post-run, and prior-period results",
      "Employee master: pay rate, FLSA status, work location, tax jurisdiction, pay group",
      "Time and attendance, including overtime and shift differentials",
      "W-4 and state withholding elections, I-9 status",
      "Garnishment orders and 401(k) deferral elections and limits",
      "Benefits deductions and general ledger account mapping",
    ],
    actions: [
      "Reconcile the pre-run register against the prior period and flag variances above threshold",
      "Detect missing W-4 or state withholding elections for new hires and relocations",
      "Validate garnishment deductions against federal and state caps",
      "Check 401(k) deferrals against the annual IRS limit and project year-end breaches",
      "Queue minimum-wage and overtime rule updates by jurisdiction with effective dates",
      "Draft correction tickets and the post-run GL posting summary and accrual",
    ],
    guardrails: [
      "Never edits pay rates, elections, or bank details; it proposes corrections for a named approver",
      "Jurisdiction rule updates pass through a review queue with the source citation and effective date",
      "Segregation of duties preserved: the agent cannot both propose and approve",
      "Every check is logged with the record inspected, the rule applied, and the outcome",
      "Access is read-only on payroll systems and scoped to the pay groups you assign",
    ],
    integrations: [
      "Payroll providers",
      "HRIS",
      "Time and attendance",
      "ERP and general ledger",
      "Benefits administration",
      "Retirement plan recordkeepers",
    ],
    creditCost: [
      { action: "Exception detected, documented, and routed", credits: 2 },
      { action: "Jurisdiction rule update prepared for approval", credits: 5 },
      { action: "Pre-run register reconciliation, per pay group", credits: 20 },
    ],
    faqs: [
      {
        question: "What does an AI payroll agent actually do?",
        answer:
          "It audits the payroll before it runs. The agent reads the register, the employee master, and time data, applies the rules for each jurisdiction, and lists the exceptions: missing elections, capped deductions, limit breaches, unusual variances. It proposes the fix and routes it to a payroll specialist. It does not process payroll and does not change pay on its own.",
      },
      {
        question: "Does the agent replace our payroll provider?",
        answer:
          "No. It sits in front of your provider. Payroll still runs where it runs today. The agent improves the inputs and reconciles the outputs.",
      },
      {
        question: "How does it keep up with wage and hour law changes?",
        answer:
          "The agent monitors a maintained library of federal, state, and local rules with effective dates. When a change affects employees in your pay groups, it opens a queued update with the rule text cited. Your payroll manager approves the configuration change. Nothing changes without that approval.",
      },
      {
        question: "Can it handle multi-state and multi-country payroll?",
        answer:
          "Yes for the United States and Canada at general availability. UK and EU rule libraries are in early access. Multi-entity and multi-pay-group setups are supported; each pay group can have its own thresholds and approvers.",
      },
      {
        question: "What data does it need access to?",
        answer:
          "Read access to the payroll register, employee master, time data, and deduction elections. It never needs write access to the payroll system. Corrections are applied by your team through your existing process, or through an approval-gated API write if you choose to enable it.",
      },
    ],
    relatedAgentSlugs: ["help-desk", "close", "controls"],
    icon: "Wallet",
    color: "hr",
    seo: {
      title: "AI Payroll Agent for Pre-Run Checks | Meridian",
      description:
        "Meridian's Payroll Agent finds missing data, capped deductions, and rule changes before the run. Compliance issues resolved 4x faster; a human approves fixes.",
      keywords: [
        "AI payroll agent",
        "payroll compliance automation",
        "pre-payroll audit",
        "payroll error detection",
        "wage and hour compliance software",
      ],
    },
  },

  {
    slug: "scheduling",
    name: "Scheduling Agent",
    shortName: "Scheduling",
    category: "hr",
    status: "ga",
    tagline: "Fills open shifts with eligible, willing staff in minutes.",
    description:
      "Finds the right people for an open shift by rule, skill, and preference, offers it by text, and books the first acceptance. Managers stop making phone calls.",
    longDescription: `When a nurse calls in sick at 5:40 a.m., the charge nurse has 80 minutes to find a replacement who holds the right license, has not worked 16 hours in the last 24, is not on approved leave, and is willing to come in. Today that is a phone tree. The Scheduling Agent does it in one pass: it ranks eligible staff by labor rules, certifications, preferences, and overtime cost, then offers the shift by SMS or app notification in order of rank. The first acceptance is booked and the schedule updates.

Rules are hard constraints, not suggestions. Rest periods, maximum consecutive shifts, minor-labor restrictions, union seniority provisions, and certification requirements are enforced before an offer goes out. Employees opt in, set quiet hours, and can decline without penalty. Overtime fills above your threshold pause for manager approval.

If no one accepts by the deadline you set, the agent escalates to the manager with the offers made and the responses received. Every offer, acceptance, and decline is logged, which also gives HR a record for fair-workweek and predictive-scheduling compliance.`,
    jobToBeDone:
      "Cover an open shift with a qualified, willing employee before it becomes the manager's problem, and leave a compliant record behind.",
    headlineMetric: {
      value: "−90%",
      label: "time to fill an open shift",
      numeric: 90,
      prefix: "−",
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "12 min", label: "median time from open shift to confirmed fill", numeric: 12, suffix: " min", footnote: MODELED },
      { value: "0", label: "rest-period or certification violations in agent-filled shifts", numeric: 0 },
      { value: "−18%", label: "premium overtime spend on backfills", numeric: 18, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Load rules, skills, and preferences",
        description:
          "The agent reads schedules, certifications, labor rules, union provisions, and each employee's availability and contact preferences from your workforce management and HRIS systems.",
      },
      {
        step: 2,
        title: "Detect the gap",
        description:
          "A call-out, an approved leave, or a demand spike opens a shift. The agent builds the eligible list in seconds and ranks it by rule compliance, preference, seniority policy, and cost.",
      },
      {
        step: 3,
        title: "Offer and confirm",
        description:
          "Offers go out by SMS or app in rank order, in waves you configure. The first acceptance is booked, the schedule updates, and the manager is notified.",
      },
      {
        step: 4,
        title: "Escalate or report",
        description:
          "Unfilled shifts escalate to the manager at your deadline with a full offer history. The Registry reports fill rate, time to fill, and overtime avoided by location.",
      },
    ],
    dataSources: [
      "Published schedules and open shifts",
      "Employee availability, preferences, and quiet hours",
      "Skills, licenses, and certifications with expiry dates",
      "Labor rules: rest periods, maximum hours, minor-labor limits, union provisions",
      "Hours worked to date, overtime status, and approved time off",
      "Location, department, and cost center",
    ],
    actions: [
      "Build and rank the eligible list for an open shift",
      "Offer the shift by SMS, Slack, Teams, or mobile push in waves",
      "Book the first acceptance and update the schedule and time system",
      "Pause for manager approval when a fill would trigger premium overtime",
      "Escalate unfilled shifts with the complete offer history",
      "Forecast coverage gaps for the coming week by location",
    ],
    guardrails: [
      "Eligibility rules are hard constraints; the agent cannot offer a shift that violates rest, certification, minor-labor, or union rules",
      "No shift is assigned without the employee's explicit acceptance",
      "Employees opt in to be contacted and set quiet hours; declines carry no penalty and are not reported individually",
      "Overtime fills above your threshold require manager approval before the offer",
      "Every offer, acceptance, decline, and escalation is logged for scheduling-law compliance",
    ],
    integrations: [
      "Workforce management and scheduling",
      "HRIS",
      "Time and attendance",
      "SMS",
      "Slack",
      "Microsoft Teams",
      "Mobile push",
    ],
    creditCost: [
      { action: "Shift filled", credits: 1 },
      { action: "Coverage forecast, per location per week", credits: 2 },
    ],
    faqs: [
      {
        question: "What is an AI shift scheduling agent?",
        answer:
          "It is software that fills open shifts by identifying eligible employees, offering the shift to them directly, and booking the first acceptance. It replaces the phone tree a manager runs when someone calls out. It does not build the base schedule; it covers the gaps in it.",
      },
      {
        question: "How does it avoid overtime and labor law violations?",
        answer:
          "Rules are enforced before an offer is made, not checked afterward. The agent will not offer a shift that breaks a rest period, exceeds maximum hours, requires a certification the employee lacks, or violates a union provision. Fills that would trigger premium overtime pause for manager approval.",
      },
      {
        question: "Do employees have to accept shifts?",
        answer:
          "No. Employees opt in to receive offers, set quiet hours, and decline freely. The agent does not report individual declines to managers. Design partners saw acceptance rates rise because offers reached people who had said they wanted extra hours.",
      },
      {
        question: "Which industries use it?",
        answer:
          "Healthcare, logistics and warehousing, retail, food production, and manufacturing. Any operation with hourly staff, credential requirements, and same-day call-outs.",
      },
      {
        question: "Does it work with our existing scheduling system?",
        answer:
          "Yes. The agent reads schedules and writes fills back to your workforce management system through its API. Managers keep using the tool they know; the agent removes the manual work of finding coverage.",
      },
    ],
    relatedAgentSlugs: ["help-desk", "recruiting", "payroll"],
    icon: "CalendarClock",
    color: "hr",
    seo: {
      title: "AI Shift Scheduling Agent | Meridian",
      description:
        "Meridian's Scheduling Agent fills open shifts with eligible, willing frontline staff by text in minutes. Time to fill down 90%, labor rules enforced first.",
      keywords: [
        "AI shift scheduling",
        "open shift coverage automation",
        "frontline scheduling agent",
        "shift replacement software",
        "workforce management AI",
      ],
    },
  },

  {
    slug: "performance",
    name: "Performance Agent",
    shortName: "Performance",
    category: "hr",
    status: "early-access",
    tagline: "Drafts evidence-based reviews. Managers edit and own the result.",
    description:
      "Assembles each employee's goals, feedback, and delivered work into a timeline, then drafts the review against your competency framework. The manager sets the rating.",
    longDescription: `Review season asks managers to remember nine months of work in an afternoon. Recency bias and the loudest project win. The Performance Agent builds the record first: goals and their status, peer and upward feedback, shipped work from project and ticket systems, and prior review commitments. It then drafts a review in your framework's language where every claim links to a piece of evidence.

The manager reads the draft, edits it, disagrees with it, and sets the rating. The agent never assigns a rating. It flags where evidence is thin so the manager can decide whether the gap is in the work or in the record, and it runs a language check for terms that correlate with bias in reviews so the manager can rephrase before submission.

For calibration, the agent prepares a pack per team: rating distribution, the evidence behind each proposed rating, and tenure-adjusted comparisons. HR business partners run calibration from facts rather than from whoever argues best.`,
    jobToBeDone:
      "Give every manager a complete, evidence-linked draft so reviews are written from the record instead of from memory.",
    headlineMetric: {
      value: "−60%",
      label: "manager time to draft a review",
      numeric: 60,
      prefix: "−",
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "100%", label: "of draft statements linked to a goal, feedback item, or delivered work", numeric: 100, suffix: "%" },
      { value: "+22 pts", label: "reviews submitted on time", numeric: 22, prefix: "+", suffix: " pts", footnote: MODELED },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect the record",
        description:
          "The agent reads goals, feedback, and prior reviews from your performance system, and delivered work from project, ticketing, and code systems the employee's team uses.",
      },
      {
        step: 2,
        title: "Build the evidence timeline",
        description:
          "For each employee it assembles a dated timeline of goals, outcomes, and feedback, and flags periods with little evidence.",
      },
      {
        step: 3,
        title: "Draft against your framework",
        description:
          "The draft follows your competency model and rating scale. Each statement cites its evidence. A language check flags phrasing associated with bias for the manager to revise.",
      },
      {
        step: 4,
        title: "Manager edits, rates, submits",
        description:
          "The manager owns the final text and the rating. Calibration packs go to HRBPs. The Registry reports cycle completion, time spent, and evidence coverage.",
      },
    ],
    dataSources: [
      "Goals and OKRs with status history",
      "Peer, upward, and manager feedback",
      "Delivered work from project management, ticketing, and code hosting",
      "Prior reviews and development plans",
      "Competency framework and rating scale",
      "Role, level, and tenure from the HRIS",
    ],
    actions: [
      "Assemble a dated evidence timeline per employee",
      "Draft the review in your competency framework with evidence links",
      "Flag thin-evidence periods and suggest questions for the manager",
      "Run a bias-language check and propose neutral phrasing",
      "Draft development goals from gaps identified in the review",
      "Prepare calibration packs per team with rating distributions and rationale",
    ],
    guardrails: [
      "The agent never assigns or recommends a final rating; the manager sets it",
      "Drafts are private to the manager until the manager submits",
      "Protected characteristics are excluded; comparisons are tenure- and level-adjusted",
      "Employees can see which evidence the review cites once it is shared with them",
      "1:1 notes are used only if the manager explicitly shares them; all reads are logged",
    ],
    integrations: [
      "HRIS and performance management",
      "Project management and ticketing",
      "Code hosting",
      "Document collaboration",
      "Slack",
      "Microsoft Teams",
    ],
    creditCost: [
      { action: "Review draft with evidence timeline", credits: 4 },
      { action: "Feedback synthesis, per employee", credits: 2 },
      { action: "Calibration pack, per team", credits: 6 },
    ],
    faqs: [
      {
        question: "Can AI write performance reviews?",
        answer:
          "AI can draft them from evidence. It should not rate people. Meridian's Performance Agent assembles the record and writes a first draft where every sentence links to a goal, a piece of feedback, or delivered work. The manager edits the draft, decides the rating, and owns the result.",
      },
      {
        question: "How does it reduce bias in reviews?",
        answer:
          "By starting from the full record rather than recent memory, by flagging phrasing that research associates with biased reviews, and by giving HRBPs calibration packs with tenure- and level-adjusted comparisons. It does not eliminate bias. It makes the evidence visible so people can check their own judgment.",
      },
      {
        question: "Can employees see what the agent wrote about them?",
        answer:
          "Employees see the review their manager submits, which is the manager's text. They can also see which evidence items the review cites. They never see unsubmitted drafts.",
      },
      {
        question: "What systems does it pull evidence from?",
        answer:
          "Your performance and goals system, plus the systems where work is visible: project management, ticketing, code hosting, and document collaboration. You choose which sources each team connects. The agent reads only what the manager could already see.",
      },
    ],
    relatedAgentSlugs: ["job-architecture", "help-desk", "recruiting"],
    icon: "Target",
    color: "hr",
    seo: {
      title: "AI Performance Review Agent | Meridian",
      description:
        "Meridian's Performance Agent drafts evidence-based reviews from goals, feedback, and delivered work. Drafting time down 60%; managers edit and set the rating.",
      keywords: [
        "AI performance review",
        "performance review drafting",
        "evidence-based performance management",
        "calibration software",
        "performance agent",
      ],
    },
  },

  {
    slug: "job-architecture",
    name: "Job Architecture Agent",
    shortName: "Job Architecture",
    category: "hr",
    status: "early-access",
    tagline: "Benchmarks every role and pay band against the market. Flags drift.",
    description:
      "Matches your job catalog to survey benchmarks, proposes bands by level and geography, and flags employees and titles that have drifted out of range.",
    longDescription: `Most job architectures were designed once and then eroded. Titles inflate, duplicate roles appear across business units, and pay bands fall behind the market in the locations that matter. Re-benchmarking takes a compensation team 4 to 6 weeks per cycle, which is why it happens once a year at best. The Job Architecture Agent does the matching, comparison, and drafting in hours.

It reads your job catalog and leveling framework, matches each role to the survey codes you license with a confidence score, and proposes band midpoints and ranges by level and geography. It flags employees below the band minimum before merit planning, compa-ratio outliers, and clusters of near-duplicate roles that should be consolidated.

All proposals go to your compensation committee. The agent never changes a salary or a band. Individual compensation is visible only to roles your HRIS already authorizes, survey data stays within the license terms, and pay-equity cohort summaries can be produced under privilege at legal's request.`,
    jobToBeDone:
      "Keep job families, levels, and pay bands current with the market without a six-week project every time.",
    headlineMetric: {
      value: "Hours",
      label: "to re-benchmark a job family, down from 4 to 6 weeks",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "94%", label: "of roles matched to a survey benchmark automatically", numeric: 94, suffix: "%", footnote: MODELED },
      { value: "100%", label: "of below-minimum employees surfaced before the merit cycle", numeric: 100, suffix: "%" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Load the catalog and surveys",
        description:
          "The agent reads your job catalog, leveling framework, current bands, and the compensation surveys you license, respecting each survey's usage terms.",
      },
      {
        step: 2,
        title: "Match and score",
        description:
          "Each role is matched to survey codes with a confidence score and the reasoning shown. Low-confidence matches go to the comp team for a decision.",
      },
      {
        step: 3,
        title: "Propose bands and flag drift",
        description:
          "The agent proposes midpoints and ranges by level and geography, and flags out-of-band employees, compa-ratio outliers, title inflation, and duplicate roles.",
      },
      {
        step: 4,
        title: "Committee decides",
        description:
          "Proposals are packaged for the compensation committee with cost impact. Approved changes are versioned with rationale. The Registry tracks cycle time and match coverage.",
      },
    ],
    dataSources: [
      "Job catalog, job descriptions, and leveling framework",
      "Licensed compensation survey data and job-code libraries",
      "Current pay bands and ranges by geography",
      "Employee compensation: base, bonus target, equity (authorized roles only)",
      "Location differentials and cost-of-labor indices",
      "Organization hierarchy and headcount plan",
    ],
    actions: [
      "Match roles to survey benchmarks with confidence scores and reasoning",
      "Propose band midpoints and ranges per level and geography with cost impact",
      "Flag employees below band minimum and compa-ratio outliers",
      "Detect title inflation and near-duplicate roles across business units",
      "Draft leveling guides and job-description normalizations",
      "Produce pay-equity cohort summaries for legal review",
    ],
    guardrails: [
      "Never changes compensation or bands; every proposal goes to the compensation committee",
      "Survey data is used within license terms and never re-exported or blended across licenses",
      "Individual compensation is visible only to roles your HRIS authorizes for it",
      "Pay-equity analyses can be run under privilege at legal's request and are segregated",
      "Every band change is versioned with rationale, approver, and effective date",
    ],
    integrations: [
      "HRIS",
      "Compensation management",
      "Compensation survey providers",
      "Spreadsheets (Excel, Google Sheets)",
      "Snowflake",
      "Databricks",
    ],
    creditCost: [
      { action: "Role benchmarked with confidence score", credits: 3 },
      { action: "Band proposal, per job family", credits: 10 },
      { action: "Drift and outlier report, per organization unit", credits: 5 },
    ],
    faqs: [
      {
        question: "What is job architecture and why does it drift?",
        answer:
          "Job architecture is the structure of job families, levels, titles, and pay bands an organization uses to define and pay roles consistently. It drifts because hiring managers create new titles, acquisitions bring different frameworks, and market pay moves faster than annual reviews. The result is inconsistent pay for equivalent work and rising pay-equity risk.",
      },
      {
        question: "How does the agent use compensation survey data?",
        answer:
          "It matches your roles to the survey job codes you license and uses the survey percentiles to propose bands. Data stays within each provider's license terms: no re-export, no blending across licenses, no sharing with other customers.",
      },
      {
        question: "Can it help with pay equity analysis?",
        answer:
          "It produces cohort summaries showing pay distribution by level and geography with the drivers it can see. Formal pay-equity analysis is a legal exercise; the agent can run its summaries under privilege at counsel's request and keep them segregated from routine reporting.",
      },
      {
        question: "Who can see individual salaries?",
        answer:
          "Only users your HRIS already authorizes to see them. The agent inherits those permissions. A manager sees their team; a comp analyst sees their assigned population; the committee sees the aggregate proposal.",
      },
    ],
    relatedAgentSlugs: ["performance", "recruiting", "planning"],
    icon: "Layers",
    color: "hr",
    seo: {
      title: "Job Architecture and Pay Band Agent | Meridian",
      description:
        "Meridian's Job Architecture Agent benchmarks roles and pay bands against survey data, flags drift and outliers, and cuts benchmarking from weeks to hours.",
      keywords: [
        "job architecture software",
        "pay band benchmarking",
        "compensation benchmarking AI",
        "job leveling framework",
        "salary band analysis",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // FINANCE
  // -------------------------------------------------------------------------
  {
    slug: "audit",
    name: "Audit Agent",
    shortName: "Audit",
    category: "finance",
    status: "ga",
    tagline: "Collects, labels, and packages audit evidence on request.",
    description:
      "Reads the auditor's request list, pulls the samples and supporting documents from your systems, and assembles labeled evidence packages with lineage to source.",
    longDescription: `An external audit generates hundreds of evidence requests, each one a small research project for someone in accounting: find the journal entry, pull the invoice, locate the approval email, screenshot the bank statement, name the file correctly, upload it. Multiply by 400 requests and two interim visits and you have most of a full-time role. The Audit Agent does the retrieval.

It reads the prepared-by-client list, maps each item to a system and a query, pulls the sample with the selection method documented, retrieves supporting documents from the ERP, document management, and email archives, and labels every file to the request ID. Each package includes an index and a lineage record showing where every artifact came from and when. The controller reviews and releases packages to the auditor portal.

Auditor follow-ups are answered from the same sources. Because access is read-only and each artifact is hashed at collection, auditors can rely on the evidence as collected. Design partners report the largest change is not speed but calm: the audit stops being a quarter of interruptions for the accounting team.`,
    jobToBeDone:
      "Turn every PBC request into a complete, labeled, source-linked evidence package the same day, without pulling accountants off the close.",
    headlineMetric: {
      value: "~900 hours",
      label: "saved per audit year",
      numeric: 900,
      prefix: "~",
      suffix: " hours",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "Same day", label: "PBC request turnaround, down from a 6-day median", footnote: MODELED },
      { value: "−70%", label: "auditor follow-up requests", numeric: 70, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "100%", label: "of artifacts with hash and lineage to source", numeric: 100, suffix: "%" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect the systems of record",
        description:
          "Read-only connections to the ERP, subledgers, banking, document management, and email archive. The agent learns your chart of accounts, entities, and document naming.",
      },
      {
        step: 2,
        title: "Import the request list",
        description:
          "Upload the PBC list or connect the audit portal. The agent maps each request to a data source and a retrieval plan, and asks for clarification where a request is ambiguous.",
      },
      {
        step: 3,
        title: "Collect, hash, label",
        description:
          "Samples are pulled with the selection method recorded. Supporting documents are retrieved and hashed. Every file is labeled to the request ID with an index and lineage record.",
      },
      {
        step: 4,
        title: "Review and release",
        description:
          "The controller reviews each package and releases it to the auditor. Follow-ups route back to the agent. The Registry tracks open requests, turnaround, and hours saved.",
      },
    ],
    dataSources: [
      "ERP general ledger and subledgers (AP, AR, fixed assets, payroll)",
      "Journal entry detail with preparer, approver, and support",
      "Bank statements and reconciliations",
      "Invoices, purchase orders, receipts, and contracts in document management",
      "Email archive for approvals and correspondence",
      "System access logs, control matrices, and prior-year PBC lists",
    ],
    actions: [
      "Map each PBC request to a system, query, and retrieval plan",
      "Pull samples with the selection method and population documented",
      "Retrieve invoices, POs, receipts, approvals, and statements for each sample",
      "Hash and label every artifact to the request ID with an index",
      "Assemble the package with a lineage record and release it on controller approval",
      "Answer auditor follow-ups from the same sources and track request status",
    ],
    guardrails: [
      "Read-only access to all financial systems; the agent cannot post, edit, or delete",
      "Evidence is never altered; a hash is recorded at collection and verified at release",
      "Nothing reaches the auditor until the controller releases the package",
      "Access is scoped to the entities, periods, and accounts in the audit scope",
      "Every retrieval is logged with who requested it, what was read, and when",
    ],
    integrations: [
      "ERP",
      "General ledger and subledgers",
      "Banking and treasury",
      "Document management",
      "Audit management and auditor portals",
      "Email archive",
      "Snowflake",
    ],
    creditCost: [
      { action: "Evidence package assembled and indexed", credits: 5 },
      { action: "Sample pulled with documentation", credits: 1 },
      { action: "Auditor follow-up answered", credits: 1 },
    ],
    faqs: [
      {
        question: "What is audit evidence automation?",
        answer:
          "It is the use of software to retrieve, label, and package the documents and data an auditor requests, instead of accountants doing it by hand. Meridian's Audit Agent reads the request list, pulls the samples and support from your systems, and assembles packages with an index and lineage. Your controller reviews and releases them.",
      },
      {
        question: "Will our external auditors accept AI-collected evidence?",
        answer:
          "Design partners' auditors from three of the large firms accepted it, in part because the evidence is better documented than manual collection: every artifact has a hash, a timestamp, a source system, and a selection method. Auditors can request the lineage record. You should confirm with your engagement team before the first cycle.",
      },
      {
        question: "Does the agent have write access to our ERP?",
        answer:
          "No. All connections are read-only. The agent cannot post, edit, or delete anything in a financial system. It writes only to its own evidence store and, on release, to the auditor portal.",
      },
      {
        question: "Can it help with SOX 404 and internal audit too?",
        answer:
          "Yes. The same retrieval and packaging works for control testing evidence and internal audit requests. Paired with the Controls Agent, control test results and their evidence are packaged continuously rather than at quarter-end.",
      },
      {
        question: "How much time does it save?",
        answer:
          "The modeled figure is about 900 hours per audit year for a mid-sized company with one external audit and quarterly reviews. Your number depends on request volume and how scattered your evidence is. The Registry reports actual hours saved per request category once you are live.",
      },
    ],
    relatedAgentSlugs: ["controls", "close", "revenue-contracts"],
    icon: "ShieldCheck",
    color: "finance",
    seo: {
      title: "Audit Evidence Agent | Meridian",
      description:
        "Meridian's Audit Agent collects, hashes, labels, and packages audit evidence from your ERP and document systems on request. About 900 hours saved a year.",
      keywords: [
        "audit evidence automation",
        "PBC request automation",
        "AI audit agent",
        "audit preparation software",
        "SOX evidence collection",
      ],
    },
  },

  {
    slug: "planning",
    name: "Planning Agent",
    shortName: "Planning",
    category: "finance",
    status: "ga",
    tagline: "Explains every variance. Answers plan questions in plain language.",
    description:
      "Attributes budget-to-actual variances to price, volume, mix, FX, and timing, drafts the commentary in your format, and lets finance interrogate the plan conversationally.",
    longDescription: `The monthly reporting pack has two halves: the numbers, which the systems produce, and the commentary, which analysts write by hand. Why is EMEA opex 4% over. Why did gross margin slip 60 basis points. Which cost centers are driving the headcount variance. The Planning Agent computes the variances by cost center, account, and driver, attributes each one to its causes, and drafts the commentary in your house format with the supporting table attached.

FP&A can then ask follow-up questions in plain language and get an answer with the query behind it. What if we delay 12 of the 40 planned hires to Q3. Which regions are trending above forecast on travel. The agent answers from the plan and actuals it can see, respecting the row-level security your planning system already enforces.

The agent does not write to the plan of record. Scenarios are drafts until a planner promotes them. Commentary is tagged as agent-drafted until an analyst signs it, and every number can be traced to a query you can inspect.`,
    jobToBeDone:
      "Produce first-draft variance commentary with driver attribution on day one of the reporting cycle, and let finance ask the next question without filing a ticket.",
    headlineMetric: {
      value: "Minutes",
      label: "to first-draft variance commentary, down from days",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "−60%", label: "analyst hours on the monthly reporting pack", numeric: 60, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "100%", label: "of variances above threshold with driver attribution", numeric: 100, suffix: "%" },
      { value: "1 query", label: "behind every number, inspectable by the reader" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect plan and actuals",
        description:
          "The agent reads budget and forecast versions from your planning system and actuals from the GL or warehouse, along with driver data: headcount, volume, price, FX rates.",
      },
      {
        step: 2,
        title: "Compute and attribute",
        description:
          "On close, it computes variances by cost center, account, and driver, then attributes each to price, volume, mix, FX, timing, or one-time items, with the math shown.",
      },
      {
        step: 3,
        title: "Draft the commentary",
        description:
          "Commentary follows your pack's structure and thresholds. Each paragraph carries its supporting table. Analysts edit, sign, and publish.",
      },
      {
        step: 4,
        title: "Explore and scenario",
        description:
          "Finance asks follow-ups in Slack, Teams, or the workspace. Scenarios run on hiring plans, pricing, and timing. Promoting a scenario to the plan of record requires a planner's approval.",
      },
    ],
    dataSources: [
      "Budget, forecast, and plan versions from the planning system",
      "Actuals from the general ledger and data warehouse",
      "Drivers: headcount and hiring plan, volume, price, FX rates",
      "Cost center and account hierarchies",
      "Prior-period commentary and reporting-pack templates",
      "Row-level security from the planning system",
    ],
    actions: [
      "Compute variances by cost center, account, region, and driver",
      "Attribute each variance to price, volume, mix, FX, timing, or one-time items",
      "Draft commentary in your reporting-pack format with supporting tables",
      "Answer plan and actuals questions in plain language with the query shown",
      "Run what-if scenarios on headcount, pricing, and timing assumptions",
      "Flag forecast lines with trends outside their historical range",
    ],
    guardrails: [
      "Never writes to the plan of record; scenarios stay drafts until a planner promotes them",
      "Every number carries the query that produced it, inspectable by the reader",
      "Commentary is tagged as agent-drafted until an analyst signs it",
      "Inherits row-level security from the planning system; users see only their cost centers",
      "Model choice is set per workspace; sensitive plans can be pinned to a specific model or region",
    ],
    integrations: [
      "Planning and FP&A platforms",
      "ERP",
      "Snowflake",
      "Databricks",
      "BigQuery",
      "Excel",
      "Slack",
    ],
    creditCost: [
      { action: "Variance commentary, per reporting unit", credits: 3 },
      { action: "Conversational query answered", credits: 1 },
      { action: "Scenario modeled", credits: 5 },
    ],
    faqs: [
      {
        question: "What is AI variance analysis?",
        answer:
          "It is the automated computation and explanation of differences between planned and actual results. Meridian's Planning Agent computes variances at whatever grain your hierarchy supports, attributes each to its drivers, and writes the explanation in the format your reporting pack already uses. Analysts review and sign rather than compile.",
      },
      {
        question: "How does the agent explain a variance rather than just report it?",
        answer:
          "It decomposes the variance using the drivers you plan on. A revenue variance is split into price, volume, mix, and FX. An opex variance is split into headcount, rate, timing, and one-time items. The decomposition is arithmetic you can inspect, not a narrative guess.",
      },
      {
        question: "Can it change our forecast?",
        answer:
          "Not on its own. It can build scenarios and show their effect. Promoting a scenario to a forecast version requires a planner with the right permission to approve it in the planning system.",
      },
      {
        question: "What planning systems does it work with?",
        answer:
          "Any planning platform with an API or a warehouse export, and any GL or warehouse for actuals. Most design partners connected through Snowflake or Databricks so the agent reads the same governed tables as their BI tools.",
      },
      {
        question: "Is our financial data used to train models?",
        answer:
          "No. Your data is never used to train Meridian's models or any third-party model. Model choice is yours, and you can pin a workspace to a specific provider and region.",
      },
    ],
    relatedAgentSlugs: ["close", "controls", "job-architecture"],
    icon: "TrendingUp",
    color: "finance",
    seo: {
      title: "AI Planning and Variance Agent | Meridian",
      description:
        "Meridian's Planning Agent attributes variances to drivers, drafts commentary in your format in minutes, and answers plan questions in plain language.",
      keywords: [
        "AI variance analysis",
        "FP&A AI agent",
        "variance commentary automation",
        "conversational financial planning",
        "budget vs actual analysis software",
      ],
    },
  },

  {
    slug: "controls",
    name: "Controls Agent",
    shortName: "Controls",
    category: "finance",
    status: "ga",
    tagline: "Tests each transaction for duplicates, anomalies, and policy breaches.",
    description:
      "Continuously tests invoices, payments, expenses, vendor changes, and journal entries against your policies. Flags exceptions with evidence; AP and controllership decide.",
    longDescription: `Traditional controls test a sample after the fact. The Controls Agent tests the population as it posts. Every invoice is checked for duplicates using fuzzy matching on vendor, amount, date, and invoice number, so a resubmitted invoice with a suffix added does not slip through. Every payment is checked against the three-way match. Every vendor master change is checked for bank-detail edits without callback verification. Every expense report is checked against policy, and every journal entry is checked for preparer-approver conflicts and round-number patterns.

Exceptions arrive with evidence attached: the two invoices side by side, the PO and receipt that do not tie, the approval that was missing. A human dispositions each one as a true issue or a false positive, and those decisions tune the tests. One design partner in financial services identified roughly $283,000 per year in duplicate payments in the first 90 days.

Because every test run and disposition is logged, the agent also produces the evidence for SOX 404 control testing continuously. Internal audit stops requesting samples at quarter-end and starts reading the exception log.`,
    jobToBeDone:
      "Catch duplicate payments, match failures, and policy breaches before cash leaves, and produce the control evidence as a by-product.",
    headlineMetric: {
      value: "$283K",
      label: "per year in duplicate payments avoided at one design partner",
      numeric: 283,
      prefix: "$",
      suffix: "K",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "100%", label: "of transactions tested, not a sample", numeric: 100, suffix: "%" },
      { value: "−55%", label: "false positives versus rules-only tools", numeric: 55, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "< 24 h", label: "from posting to exception raised" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect AP, procurement, and the GL",
        description:
          "Read access to invoices, payments, POs, receipts, vendor master, expense reports, card feeds, and journal entries. Load your approval matrix and policy thresholds.",
      },
      {
        step: 2,
        title: "Choose and tune the tests",
        description:
          "Enable tests from the library: duplicates, three-way match, vendor bank changes, split purchases, preparer-approver conflicts, expense policy. Set thresholds per entity.",
      },
      {
        step: 3,
        title: "Test continuously, flag with evidence",
        description:
          "As transactions post, the agent tests them and raises exceptions with side-by-side evidence and a suggested owner. Nothing is blocked or reversed automatically.",
      },
      {
        step: 4,
        title: "Disposition and evidence",
        description:
          "AP and controllership mark each exception true or false positive. Dispositions tune precision. The test log becomes SOX control evidence in the Registry.",
      },
    ],
    dataSources: [
      "AP invoices, payment runs, and payment history",
      "Vendor master with change history and bank details",
      "Purchase orders, goods receipts, and contracts",
      "Expense reports and corporate card feeds",
      "Journal entries with preparer and approver",
      "Employee master (for vendor-employee matching) and the approval matrix",
    ],
    actions: [
      "Detect duplicate invoices with fuzzy matching across vendor, amount, date, and number",
      "Flag three-way match exceptions between invoice, PO, and receipt",
      "Flag vendor bank-detail changes without verification and vendor-employee address matches",
      "Detect split purchases under approval thresholds and preparer-approver conflicts",
      "Test expense reports against policy and card feeds against receipts",
      "Package each exception with evidence and log the control test for SOX",
    ],
    guardrails: [
      "Never blocks, holds, or reverses a payment on its own; it raises exceptions for AP and controllership",
      "Tests and thresholds are configurable per entity and versioned with approver",
      "Every exception requires a human disposition, which is logged and used to tune precision",
      "Segregation-of-duties tests read role assignments only; the agent holds no ERP roles",
      "Complete test log retained as SOX 404 evidence with population, tests run, and results",
    ],
    integrations: [
      "ERP",
      "AP automation",
      "Procurement",
      "Expense management",
      "Corporate card providers",
      "Banking",
      "Snowflake",
    ],
    creditCost: [
      { action: "Transactions tested, per 100", credits: 5 },
      { action: "Exception package with evidence", credits: 2 },
      { action: "Control test evidence report, per control per period", credits: 5 },
    ],
    faqs: [
      {
        question: "What is continuous controls monitoring?",
        answer:
          "It is testing 100% of transactions against control rules as they post, rather than sampling after the period closes. Meridian's Controls Agent runs the tests, raises exceptions with evidence, and logs every result so control testing evidence accumulates continuously.",
      },
      {
        question: "How does AI duplicate payment detection differ from ERP duplicate checks?",
        answer:
          "ERP checks are exact-match on invoice number and vendor. They miss an invoice resubmitted with a suffix, a different vendor record for the same supplier, or a PDF re-keyed with a transposed digit. The agent uses fuzzy matching across vendor, amount, date, and number, plus vendor master de-duplication, and explains each match so AP can decide quickly.",
      },
      {
        question: "Does it stop payments automatically?",
        answer:
          "No. It raises an exception before the payment run with the evidence attached. AP or the controller decides. Some customers add an approval step in their AP system triggered by an open exception; that step is theirs to configure.",
      },
      {
        question: "Can it produce SOX control testing evidence?",
        answer:
          "Yes. Each test run is logged with the population, the rule, the results, and the human disposition. The Controls Agent produces per-control, per-period evidence reports that internal and external auditors can read directly, and the Audit Agent can package them into PBC responses.",
      },
      {
        question: "What is the typical payback?",
        answer:
          "One design partner in financial services identified about $283,000 per year in duplicates in the first 90 days. Recovery and avoided leakage typically exceed the agent's credit cost within the first quarter for companies processing more than 3,000 invoices per month. Your figure depends on volume and current control maturity.",
      },
    ],
    relatedAgentSlugs: ["audit", "close", "payroll"],
    icon: "ScanSearch",
    color: "finance",
    seo: {
      title: "Financial Controls Agent | Meridian",
      description:
        "Meridian's Controls Agent tests every invoice, payment, vendor change, and journal entry for duplicates and policy breaches. One partner avoided $283K a year.",
      keywords: [
        "continuous controls monitoring",
        "duplicate payment detection",
        "AI financial controls",
        "three-way match automation",
        "SOX control testing software",
      ],
    },
  },

  {
    slug: "close",
    name: "Close Agent",
    shortName: "Close",
    category: "finance",
    status: "ga",
    tagline: "Runs the month-end checklist. Chases what is late. Records who signed.",
    description:
      "Sequences close tasks by dependency, prepares reconciliations and recurring accruals, nudges owners, routes sign-offs, and keeps a live status the controller can trust.",
    longDescription: `Month-end close is a dependency graph run from a spreadsheet. Subledgers must close before the GL. Bank reconciliations must tie before cash is signed. Accruals depend on open POs and prior patterns. Intercompany must agree before consolidation. When one task slips, the people downstream find out by asking. The Close Agent runs the graph.

It sequences tasks by dependency, prepares the work that is mechanical, and chases the work that is not. Bank and subledger reconciliations that tie are prepared with documentation attached. Recurring accruals are drafted from prior periods and open commitments. Late tasks get a nudge, then an escalation at the threshold you set. Sign-offs route to named reviewers and are recorded with timestamps.

The agent never posts a journal entry. It prepares; a preparer reviews and posts; a reviewer approves. Reconciliations with unexplained differences are never closed automatically. The result is a close that is shorter, and a close log that already contains the evidence auditors will ask for.`,
    jobToBeDone:
      "Take days out of the close by removing waiting and manual preparation, while keeping preparer and reviewer separation intact.",
    headlineMetric: {
      value: "3 days",
      label: "shorter month-end close",
      numeric: 3,
      suffix: " days",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "−45%", label: "manual reconciliation preparation", numeric: 45, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "100%", label: "of close tasks with owner, evidence, and timestamped sign-off", numeric: 100, suffix: "%" },
      { value: "Live", label: "close status instead of a Friday spreadsheet" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Import the close checklist",
        description:
          "Load your task list with owners, reviewers, and dependencies. The agent connects to the GL, subledgers, bank feeds, and intercompany, and learns prior-period timings.",
      },
      {
        step: 2,
        title: "Prepare the mechanical work",
        description:
          "Bank and subledger reconciliations that tie are prepared with support. Recurring accruals are drafted from prior periods and open POs. Prepaid and fixed-asset roll-forwards are staged.",
      },
      {
        step: 3,
        title: "Chase and escalate",
        description:
          "Owners get reminders before due dates and nudges after. Escalations go to the controller at the threshold you set. Blockers upstream are visible to everyone downstream.",
      },
      {
        step: 4,
        title: "Sign off and report",
        description:
          "Sign-offs route to named reviewers and are timestamped. A daily status report replaces the tracker. A post-close retrospective shows where the days went.",
      },
    ],
    dataSources: [
      "Close checklist with owners, reviewers, dependencies, and due dates",
      "General ledger and subledgers (AP, AR, fixed assets, payroll)",
      "Bank statements and intercompany balances",
      "Accrual schedules, open purchase orders, and prior-period entries",
      "Prepaid and fixed-asset registers",
      "Journal entry queue and approval workflow",
    ],
    actions: [
      "Sequence close tasks by dependency and surface the critical path",
      "Prepare bank and subledger reconciliations that tie, with documentation",
      "Draft recurring accruals from prior periods and open commitments",
      "Send reminders, nudges, and escalations on late tasks",
      "Route sign-offs to named reviewers and record them with timestamps",
      "Publish daily close status and a post-close retrospective",
    ],
    guardrails: [
      "Never posts a journal entry; drafts go to a preparer, who posts, and a reviewer, who approves",
      "Preparer and reviewer separation is enforced on every task",
      "Reconciliations with unexplained differences are never closed automatically",
      "Sign-offs are named individuals with timestamps; delegation is logged",
      "The close log is immutable and retained as audit evidence",
    ],
    integrations: [
      "ERP",
      "Close management",
      "Banking and treasury",
      "Intercompany",
      "Spreadsheets (Excel, Google Sheets)",
      "Slack",
      "Microsoft Teams",
    ],
    creditCost: [
      { action: "Close task orchestrated", credits: 1 },
      { action: "Reconciliation prepared with documentation", credits: 2 },
      { action: "Accrual drafted", credits: 2 },
      { action: "Close package with status and retrospective, per entity", credits: 10 },
    ],
    faqs: [
      {
        question: "How does AI shorten the month-end close?",
        answer:
          "Mostly by removing waiting. The Close Agent knows the dependency graph, prepares the mechanical reconciliations and accruals before anyone asks, and chases late tasks so downstream owners are not idle. Design partners took about 3 days out of a 10-day close in the first two cycles.",
      },
      {
        question: "Does the agent post journal entries?",
        answer:
          "No. It drafts entries and reconciliations. A preparer reviews and posts. A reviewer approves. The separation your auditors expect is preserved, and the agent's drafts are labeled as such in the log.",
      },
      {
        question: "Can it work with our existing close checklist tool?",
        answer:
          "Yes. It can run inside a close management platform through its API, or it can be the checklist for teams still on spreadsheets. Either way the task list, owners, and dependencies are the source of truth.",
      },
      {
        question: "What happens to reconciliations that do not tie?",
        answer:
          "They are flagged with the difference, the likely causes the agent can see, and the transactions involved. A human investigates and resolves. The agent never closes a reconciliation with an unexplained difference.",
      },
    ],
    relatedAgentSlugs: ["audit", "controls", "planning"],
    icon: "CheckSquare",
    color: "finance",
    seo: {
      title: "Month-End Close Agent | Meridian",
      description:
        "Meridian's Close Agent sequences month-end tasks, prepares reconciliations and accruals, chases late work, and records sign-offs. Close shortened by 3 days.",
      keywords: [
        "month-end close automation",
        "AI close agent",
        "financial close software",
        "reconciliation automation",
        "close management AI",
      ],
    },
  },

  {
    slug: "revenue-contracts",
    name: "Revenue Contract Agent",
    shortName: "Revenue Contracts",
    category: "finance",
    status: "early-access",
    tagline: "Reads customer contracts, flags revenue risk, drafts the accounting.",
    description:
      "Extracts terms from every customer contract, identifies performance obligations and non-standard clauses, and drafts the ASC 606 memo and revenue schedule for controller review.",
    longDescription: `Revenue accounting teams read contracts twice: once to find the terms that matter and once to document what they mean. Termination for convenience, acceptance clauses, SLA credits, most-favored-nation pricing, bundled services with undefined stand-alone selling prices. Each one can change when and how much revenue is recognized. At quarter-end the queue of unread contracts is the risk. The Revenue Contract Agent reads all of them.

It extracts the terms that affect recognition, identifies the performance obligations, and flags clauses that deviate from your standard paper with the revenue impact explained. For each contract it drafts the five-step ASC 606 or IFRS 15 analysis, proposes the stand-alone selling price allocation from your SSP library, and proposes the revenue schedule. Amendments trigger a modification assessment.

The controller or revenue accounting lead reviews every memo and schedule before anything is booked. Extraction confidence is shown per term with the source clause highlighted, so reviewers can go straight to the language that matters.`,
    jobToBeDone:
      "Read 100% of customer contracts for revenue impact and hand the controller a drafted memo and schedule, so quarter-end is review, not reading.",
    headlineMetric: {
      value: "−65%",
      label: "contract review time for revenue accounting",
      numeric: 65,
      prefix: "−",
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "100%", label: "of contracts screened for non-standard terms, not a sample", numeric: 100, suffix: "%" },
      { value: "−50%", label: "quarter-end revenue memo backlog", numeric: 50, prefix: "−", suffix: "%", footnote: MODELED },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Connect contracts and the subledger",
        description:
          "The agent reads executed contracts, order forms, and amendments from your CLM or document store, quote data from CPQ, and existing schedules from the revenue subledger.",
      },
      {
        step: 2,
        title: "Extract and flag",
        description:
          "Terms that affect recognition are extracted with a confidence score and the source clause. Deviations from your standard paper are flagged with the revenue impact explained.",
      },
      {
        step: 3,
        title: "Draft the accounting",
        description:
          "The agent drafts the five-step analysis, identifies performance obligations, proposes SSP allocation from your library, and proposes the revenue schedule.",
      },
      {
        step: 4,
        title: "Controller reviews and books",
        description:
          "Memos and schedules route to revenue accounting for review and approval. Approved schedules can be pushed to the subledger. Amendments trigger a reassessment.",
      },
    ],
    dataSources: [
      "Executed customer contracts, order forms, SOWs, and amendments",
      "Quote and configuration data from CPQ",
      "Revenue schedules and subledger balances",
      "Stand-alone selling price library and product catalog",
      "Standard contract templates and clause positions",
      "Prior technical accounting memos",
    ],
    actions: [
      "Extract recognition-relevant terms with confidence scores and source clauses",
      "Identify performance obligations and distinct goods or services",
      "Flag non-standard terms with the revenue impact explained",
      "Draft the ASC 606 or IFRS 15 five-step memo",
      "Propose SSP allocation and the revenue schedule for review",
      "Detect amendments and draft the contract modification assessment",
    ],
    guardrails: [
      "Never books revenue or posts to the subledger; every schedule and memo requires controller approval",
      "Extraction confidence is shown per term with the source clause for reviewer verification",
      "Scoped to the entities and contract repositories you authorize",
      "Memos are versioned; reviewer edits and approvals are logged",
      "Privileged or restricted documents can be excluded by folder or label",
    ],
    integrations: [
      "Contract lifecycle management",
      "CRM and CPQ",
      "ERP revenue subledger",
      "Billing",
      "Document management",
      "Snowflake",
    ],
    creditCost: [
      { action: "Contract reviewed with terms extracted and flags", credits: 8 },
      { action: "Five-step memo drafted", credits: 5 },
      { action: "Modification reassessment", credits: 4 },
    ],
    faqs: [
      {
        question: "What is AI revenue contract review?",
        answer:
          "It is software that reads customer contracts to find the terms that affect revenue recognition, identifies performance obligations, and drafts the accounting analysis. Meridian's agent covers ASC 606 and IFRS 15, produces the five-step memo and a proposed schedule, and routes both to the controller for review.",
      },
      {
        question: "Can it identify performance obligations under ASC 606?",
        answer:
          "It proposes them. The agent identifies the promised goods and services, assesses whether each is distinct using the criteria in the standard, and documents its reasoning against the contract language. Revenue accounting confirms or corrects the analysis. Judgment calls stay with your team.",
      },
      {
        question: "How does it handle contract modifications?",
        answer:
          "When an amendment or a new order form references an existing contract, the agent drafts a modification assessment: whether it is a separate contract, a termination and new contract, or a cumulative catch-up, with the reasoning. The reviewer decides.",
      },
      {
        question: "Does it replace our revenue recognition system?",
        answer:
          "No. It reads contracts and drafts the analysis that feeds your revenue subledger. Approved schedules can be pushed to the subledger you already use.",
      },
    ],
    relatedAgentSlugs: ["contract-review", "close", "audit"],
    icon: "FileSignature",
    color: "finance",
    seo: {
      title: "Revenue Contract Agent for ASC 606 | Meridian",
      description:
        "Meridian's Revenue Contract Agent reads customer contracts, flags revenue risk, and drafts the ASC 606 memo and schedule for review. Review time down 65%.",
      keywords: [
        "ASC 606 automation",
        "revenue contract review AI",
        "revenue recognition software",
        "performance obligation identification",
        "IFRS 15 contract analysis",
      ],
    },
  },

  // -------------------------------------------------------------------------
  // LEGAL / OPS
  // -------------------------------------------------------------------------
  {
    slug: "contract-review",
    name: "Contract Review Agent",
    shortName: "Contract Review",
    category: "legal",
    status: "ga",
    tagline: "Redlines third-party paper against your playbook before signature.",
    description:
      "Compares every clause of an incoming contract to your playbook positions, produces a tracked-changes redline with rationale, and escalates walk-away terms to the right approver.",
    longDescription: `Most contracts a legal team reviews are routine: NDAs, vendor agreements, order forms on the other side's paper. Each takes 45 minutes to two hours of attorney time to bring back toward your standard positions. The Contract Review Agent does the first pass. It classifies the document, compares each clause to your playbook's preferred, fallback, and walk-away positions, and produces a redline in tracked changes with a comment explaining each edit.

Walk-away terms and clauses outside the playbook are flagged, not guessed at. Escalations follow your approval matrix by clause type and deal value, so an uncapped indemnity goes to the general counsel and a payment-terms deviation goes to finance. The agent drafts the cover note for the counterparty and the issues list for the business owner.

Nothing leaves the building without a human. An attorney or authorized business owner approves the redline before it is sent. At signature the agent records the final deviations from the playbook, which gives legal operations a clean dataset on which positions hold and which routinely give way.`,
    jobToBeDone:
      "Return a playbook-compliant first redline within minutes of receiving third-party paper, so attorneys spend their time on the clauses that matter.",
    headlineMetric: {
      value: "65%",
      label: "faster pre-signature processing",
      numeric: 65,
      suffix: "%",
      footnote: MODELED,
    },
    supportingMetrics: [
      { value: "−70%", label: "clauses requiring attorney edits after the first pass", numeric: 70, prefix: "−", suffix: "%", footnote: MODELED },
      { value: "< 10 min", label: "to first redline on standard agreement types" },
      { value: "100%", label: "of deviations at signature logged against the playbook", numeric: 100, suffix: "%" },
    ],
    howItWorks: [
      {
        step: 1,
        title: "Encode the playbook",
        description:
          "Legal loads preferred, fallback, and walk-away positions by clause type and agreement type, plus the approval matrix. The playbook is versioned and owned by legal.",
      },
      {
        step: 2,
        title: "Receive and classify",
        description:
          "Counterparty paper arrives from email, the CLM, or procurement. The agent classifies the agreement type and maps each clause to the playbook.",
      },
      {
        step: 3,
        title: "Redline and explain",
        description:
          "The agent produces tracked changes with a comment per edit, flags walk-away terms, and drafts the issues list. Escalations route per the approval matrix.",
      },
      {
        step: 4,
        title: "Approve, send, record",
        description:
          "An attorney or authorized owner approves before anything is sent. At signature, final deviations are recorded. The Registry reports cycle time and which positions hold.",
      },
    ],
    dataSources: [
      "Clause playbook: preferred, fallback, and walk-away positions by agreement type",
      "Your templates and prior executed agreements",
      "Incoming counterparty paper from email, CLM, or procurement intake",
      "Approval matrix by clause type and deal value",
      "Entity, signatory, and counterparty records",
      "Deal context from CRM or procurement",
    ],
    actions: [
      "Classify the agreement type and map clauses to the playbook",
      "Produce a tracked-changes redline with a rationale comment per edit",
      "Flag walk-away terms and clauses outside the playbook",
      "Route escalations by clause type and deal value per the approval matrix",
      "Draft the counterparty cover note and the internal issues list",
      "Record final deviations at signature for playbook analytics",
    ],
    guardrails: [
      "Never sends a redline externally; an attorney or authorized business owner approves first",
      "The playbook is versioned and owned by legal; the agent cannot change positions",
      "Clauses outside the playbook are flagged, not drafted from general knowledge",
      "Full review history per contract retained; privilege and confidentiality labels are respected",
      "Your documents are never used to train Meridian's models or any third-party model",
    ],
    integrations: [
      "Contract lifecycle management",
      "Document management",
      "Microsoft Word",
      "Email",
      "E-signature",
      "Procurement",
      "CRM",
    ],
    creditCost: [
      { action: "Contract redlined against the playbook", credits: 8 },
      { action: "Issues list and cover note drafted", credits: 2 },
      { action: "Single-clause playbook check", credits: 1 },
    ],
    faqs: [
      {
        question: "What is AI contract redlining?",
        answer:
          "It is software that compares an incoming contract to your organization's standard positions and produces tracked changes that move the document toward them, with an explanation for each edit. Meridian's Contract Review Agent works from a playbook your legal team owns and returns a first redline in minutes. An attorney approves it before it goes anywhere.",
      },
      {
        question: "How does the agent know our negotiation positions?",
        answer:
          "Legal encodes them in a playbook: for each clause type and agreement type, the preferred language, acceptable fallbacks, and walk-away terms, plus who must approve deviations. The agent applies only these. Clauses the playbook does not cover are flagged for a human.",
      },
      {
        question: "Can it negotiate directly with the counterparty?",
        answer:
          "No. It drafts the redline and the cover note. A person reviews, edits, and sends. The agent can process the counterparty's response and produce the next turn, again for approval.",
      },
      {
        question: "Is this suitable for NDAs and vendor agreements?",
        answer:
          "Those are the highest-volume use. Design partners started with NDAs and standard vendor agreements, then extended to customer order forms and SaaS agreements once the playbook coverage was proven.",
      },
      {
        question: "Does it work inside Microsoft Word?",
        answer:
          "Yes. Redlines are delivered as native tracked changes with comments, so attorneys review in Word or in the CLM as they do today.",
      },
    ],
    relatedAgentSlugs: ["revenue-contracts", "controls", "audit"],
    icon: "FileDiff",
    color: "legal",
    seo: {
      title: "AI Contract Review and Redlining Agent | Meridian",
      description:
        "Meridian's Contract Review Agent redlines third-party paper against your playbook with a rationale per edit and escalates walk-away terms. 65% faster to sign.",
      keywords: [
        "AI contract review",
        "contract redlining software",
        "playbook-based contract review",
        "legal operations AI agent",
        "NDA review automation",
      ],
    },
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((agent) => agent.slug === slug);
}

export function getAgentsByCategory(category: AgentCategory): Agent[] {
  return agents.filter((agent) => agent.category === category);
}

export function getRelatedAgents(slug: string): Agent[] {
  const agent = getAgent(slug);
  if (!agent) return [];
  return agent.relatedAgentSlugs
    .map((related) => getAgent(related))
    .filter((related): related is Agent => related !== undefined);
}

export const gaAgents: Agent[] = agents.filter((agent) => agent.status === "ga");
export const earlyAccessAgents: Agent[] = agents.filter((agent) => agent.status === "early-access");
