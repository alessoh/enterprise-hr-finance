/**
 * One specific line per contract tenet per agent, drawn from each agent's guardrails,
 * actions, and metrics in src/content/agents.ts. Order matches `agentContract`:
 * scope · data · logging · approval · outcome · model.
 */
export type ContractLines = [string, string, string, string, string, string];

export const agentContractLines: Record<string, ContractLines> = {
  "help-desk": [
    "Answers HR questions and runs case intake. Nothing outside HR topics.",
    "Inherits the asking employee's HRIS entitlements. It has no permissions of its own.",
    "Full transcript and action log retained under your retention policy, visible in the Registry.",
    "Pay, tax withholding, and bank-detail changes wait for employee confirmation and HR approval.",
    "Deflection rate, resolution time, and satisfaction reported by topic in the Registry.",
    "Pin a model provider and region per workspace. Sensitive topics escalate regardless of model.",
  ],
  recruiting: [
    "Screens, shortlists, and schedules against one requisition's written criteria.",
    "Reads applications, résumés, and panel calendars. Protected characteristics are excluded.",
    "Every score, rationale, message, and stage change is logged to the requisition.",
    "No automated rejections. A recruiter approves every advance, hold, or reject.",
    "Time to shortlist and pass-through rates reported per requisition, with the adverse-impact report.",
    "Choose the model per workspace. Versioned criteria, not the model, decide the score.",
  ],
  payroll: [
    "Audits the register before cutoff and queues rule updates. It never processes payroll.",
    "Read-only on payroll systems, scoped to the pay groups you assign.",
    "Each check logged with the record inspected, the rule applied, and the outcome.",
    "Never edits pay rates, elections, or bank details. A named approver posts every fix.",
    "Exceptions cleared before cutoff and time to clear reported per pay group.",
    "Model choice per workspace. Jurisdiction rules come from a maintained library, not the model.",
  ],
  scheduling: [
    "Covers open shifts in the published schedule. It does not build the base schedule.",
    "Reads schedules, certifications, labor rules, and the preferences employees opted in to share.",
    "Every offer, acceptance, decline, and escalation logged for scheduling-law compliance.",
    "Overtime fills above your threshold pause for manager approval. No shift books without the employee's yes.",
    "Fill rate, time to fill, and overtime avoided reported by location.",
    "Eligibility rules are hard constraints enforced in code, whichever model you choose.",
  ],
  performance: [
    "Drafts one review from the record. The manager edits, rates, and submits.",
    "Reads only the goals, feedback, and delivered work the manager could already see.",
    "All reads logged. Employees can see which evidence a shared review cites.",
    "Never assigns or recommends a rating. Drafts stay private until the manager submits.",
    "Drafting time, on-time submission, and evidence coverage reported per cycle.",
    "Run on your chosen model. The bias-language check runs the same way on every model.",
  ],
  "job-architecture": [
    "Benchmarks roles and bands against the surveys you license. Nothing else.",
    "Individual compensation visible only to roles your HRIS authorizes. Survey data stays within license.",
    "Every band change versioned with rationale, approver, and effective date.",
    "Never changes a salary or a band. Every proposal goes to the compensation committee.",
    "Cycle time and benchmark match coverage reported per job family.",
    "Model choice per workspace. Pay-equity summaries can be pinned to a region under privilege.",
  ],
  audit: [
    "Retrieves and packages evidence for the PBC list. It does not interpret the accounting.",
    "Read-only on financial systems, scoped to the entities, periods, and accounts in audit scope.",
    "Every retrieval logged with who requested it, what was read, and when. Artifacts hashed at collection.",
    "Nothing reaches the auditor until the controller releases the package.",
    "Open requests, turnaround, and hours saved reported per request category.",
    "Model choice per workspace. Hashes and lineage do not depend on the model.",
  ],
  planning: [
    "Explains variances and answers plan questions. It never writes to the plan of record.",
    "Inherits row-level security from the planning system. Users see only their cost centers.",
    "Every number carries the query that produced it. Commentary is tagged agent-drafted until signed.",
    "Scenarios stay drafts until a planner promotes them. Analysts sign commentary before it publishes.",
    "Analyst hours on the pack and variances explained above threshold reported monthly.",
    "Pin sensitive plans to a specific model provider or region per workspace.",
  ],
  controls: [
    "Tests transactions against your control rules. It never blocks or reverses a payment.",
    "Reads AP, procurement, vendor master, expenses, and journals. It holds no ERP roles.",
    "Complete test log retained as SOX 404 evidence: population, tests run, results, dispositions.",
    "Every exception requires a human disposition before anything changes.",
    "Exceptions raised, precision, and duplicate value caught reported per entity.",
    "Fuzzy-match tests are versioned rules. The model explains matches; it does not decide them.",
  ],
  close: [
    "Runs the close checklist and prepares mechanical work. It never posts a journal entry.",
    "Reads the GL, subledgers, bank feeds, and intercompany balances in the entities you assign.",
    "The close log is immutable, timestamped, and retained as audit evidence.",
    "A preparer posts and a reviewer approves. Unexplained reconciliation differences never auto-close.",
    "Days to close, late tasks, and reconciliation prep hours reported per entity.",
    "Model choice per workspace. Preparer and reviewer separation is enforced below the agent.",
  ],
  "revenue-contracts": [
    "Reads customer contracts for revenue impact and drafts the memo. It never books revenue.",
    "Scoped to the entities and contract repositories you authorize. Privileged folders can be excluded.",
    "Memos are versioned. Reviewer edits and approvals are logged per contract.",
    "Every schedule and memo requires controller approval before anything posts to the subledger.",
    "Review time and memo backlog reported per quarter. Every contract screened, not a sample.",
    "Model choice per workspace. Extraction confidence and source clause shown for every term.",
  ],
  "contract-review": [
    "Redlines third-party paper against your playbook. It does not negotiate.",
    "Reads the playbook, your templates, and incoming paper. Privilege labels are respected.",
    "Full review history retained per contract. Final deviations recorded at signature.",
    "Never sends a redline externally. An attorney or authorized owner approves first.",
    "Cycle time and which positions hold reported to legal operations.",
    "Choose the model per workspace. Your documents never train Meridian's models or any third party's.",
  ],
};

export function getContractLines(slug: string): ContractLines | undefined {
  return agentContractLines[slug];
}
