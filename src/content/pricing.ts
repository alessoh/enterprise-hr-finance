import type { CreditRate, Faq, Plan } from "./types";

/** USD per credit beyond the plan's monthly allowance. */
export const overagePerCredit = 0.12;

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    priceMonthly: 499,
    priceAnnualMonthly: 399,
    credits: 5000,
    description: "For one team putting its first agents to work. 14-day free trial, no card required.",
    cta: { label: "Start free trial", href: "/signup?plan=starter" },
    features: [
      "5,000 credits per month",
      "Any 3 GA agents",
      "1 workspace",
      "Assist in Slack, Microsoft Teams, and the browser",
      "Human-in-the-loop approvals and full audit log",
      "Prebuilt connectors for your HRIS, ATS, payroll, or ERP",
      "Email support, next-business-day response",
      "Overage at $0.12 per credit",
    ],
    limits: {
      agents: "3 GA agents",
      workspaces: "1 workspace",
      support: "Email support",
    },
  },
  {
    id: "growth",
    name: "Growth",
    priceMonthly: 2499,
    priceAnnualMonthly: 1999,
    credits: 30000,
    description: "For HR and finance teams running agents across several workflows.",
    cta: { label: "Start with Growth", href: "/signup?plan=growth" },
    features: [
      "30,000 credits per month",
      "All GA agents",
      "Up to 5 workspaces",
      "Registry with blended workforce analytics",
      "Gateway for partner and custom agents (MCP, OpenTelemetry)",
      "SSO with OpenID Connect or SAML, SCIM provisioning",
      "EU or US data residency",
      "Priority support, 4-hour response",
      "Overage at $0.12 per credit",
    ],
    limits: {
      agents: "All GA agents",
      workspaces: "Up to 5 workspaces",
      support: "Priority support",
    },
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: null,
    priceAnnualMonthly: null,
    credits: null,
    description: "For organizations standardizing on one governed platform for every agent.",
    cta: { label: "Talk to sales", href: "/contact?intent=enterprise" },
    features: [
      "Custom credit pools shared across workspaces",
      "Unlimited agents, including early-access agents",
      "Data Fabric with zero-copy warehouse access and Iceberg lakehouse",
      "Studio for custom agents",
      "Dedicated environment and private model routing",
      "DPA and BAA; HIPAA-ready deployment",
      "99.95% uptime SLA",
      "Named customer success manager and 24/7 support",
      "Security review support and custom retention",
    ],
    limits: {
      agents: "Unlimited",
      workspaces: "Unlimited",
      support: "Named CSM, 24/7",
      sla: "99.95% uptime",
    },
  },
];

export const creditRates: CreditRate[] = [
  { action: "HR case resolved", credits: 2, agentSlug: "help-desk", unit: "per case" },
  { action: "Candidate screened", credits: 1, agentSlug: "recruiting", unit: "per candidate" },
  { action: "Shift filled", credits: 1, agentSlug: "scheduling", unit: "per shift" },
  { action: "Payroll exception resolved", credits: 2, agentSlug: "payroll", unit: "per exception" },
  { action: "Audit evidence package", credits: 5, agentSlug: "audit", unit: "per package" },
  { action: "Variance commentary", credits: 3, agentSlug: "planning", unit: "per reporting unit" },
  { action: "Transactions tested for controls", credits: 5, agentSlug: "controls", unit: "per 100 transactions" },
  { action: "Close task orchestrated", credits: 1, agentSlug: "close", unit: "per task" },
  { action: "Revenue contract reviewed", credits: 8, agentSlug: "revenue-contracts", unit: "per contract" },
  { action: "Contract redline", credits: 8, agentSlug: "contract-review", unit: "per contract" },
];

export const pricingFaqs: Faq[] = [
  {
    question: "How do credits work?",
    answer:
      "Credits are the unit of consumption. Each plan includes a monthly allowance. Agents consume credits when they complete an action, for example 2 credits to resolve an HR case or 8 credits to redline a contract. The rate card above lists every metered action. Unused credits on monthly plans expire at month end; annual plans roll unused credits forward for up to 3 months.",
  },
  {
    question: "What counts as an action?",
    answer:
      "A completed unit of work with an outcome, not a message or a model call. A candidate screened is one action whether it took one pass or three. A question the Help Desk Agent cannot answer and escalates without opening a case is not charged. The Registry shows credits consumed per action so finance can reconcile the invoice to outcomes.",
  },
  {
    question: "What happens if we exceed our monthly credits?",
    answer:
      "Agents keep running. Additional credits are billed at $0.12 each on the next invoice. You can set a hard ceiling per workspace if you prefer agents to pause instead. Alerts fire at 80% and 100% of the allowance.",
  },
  {
    question: "How does annual billing work?",
    answer:
      "Annual plans are billed once up front at the annual rate: $399 per month for Starter and $1,999 per month for Growth, which is 20% below monthly pricing. Unused credits roll forward for up to 3 months. Enterprise agreements are annual or multi-year with custom credit pools.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes. Starter includes a 14-day free trial with 1,000 credits and no card required. You can connect one system, run up to 3 agents, and see real outcomes in the Registry before you decide. Growth trials are arranged through sales with a scoped pilot.",
  },
  {
    question: "Are there minimums or long-term commitments?",
    answer:
      "Starter and Growth are month to month with no minimum term. Annual billing is optional and discounted. Enterprise agreements have a minimum annual credit commitment sized with you during scoping.",
  },
  {
    question: "Can Enterprise customers pool credits across teams?",
    answer:
      "Yes. Enterprise credit pools are shared across all workspaces and agents. Consumption is attributed by workspace, agent, and cost center in the Registry, so HR and finance can each see their share while procurement manages one contract.",
  },
  {
    question: "Can you support our security review?",
    answer:
      "Yes. The trust center provides the SOC 2 Type II report, ISO 27001 certificate, penetration test summary, and completed standard questionnaires under NDA. Enterprise includes a named security contact for custom questionnaires and architecture reviews.",
  },
  {
    question: "Can we cancel anytime?",
    answer:
      "Monthly plans can be cancelled from the billing page and end at the close of the current period. Annual plans run to the end of the term. On cancellation you can export your audit log, Registry records, and lakehouse data; Meridian deletes remaining data within 30 days or sooner on request.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "In the region you choose for each workspace, EU or US, on Growth and Enterprise. Storage, processing, and model inference stay in that region. Zero-copy warehouse sources are never moved. Starter workspaces run in the US.",
  },
];

/** Default inputs for the pricing calculator. */
export const calculatorDefaults = {
  employees: 2500,
  hrCasesPerMonth: 1800,
  hiresPerMonth: 40,
  invoicesPerMonth: 6000,
  contractsPerMonth: 60,
} as const;

export type CalculatorInputs = { -readonly [K in keyof typeof calculatorDefaults]: number };

/**
 * Constants behind the calculator. Credits per unit match the rate card;
 * hours saved per unit are the modeled figures used in design-partner ROI models.
 */
export const calculatorModel = {
  creditsPerUnit: {
    hrCase: 2,
    candidateScreen: 1,
    invoice: 0.05,
    contract: 8,
  },
  /** Candidates screened per hire, used to convert hires/month to screens. */
  candidatesPerHire: 25,
  hoursSavedPerUnit: {
    hrCase: 0.25,
    candidateScreen: 0.2,
    invoice: 0.01,
    contract: 1.5,
  },
  /** Fully loaded USD per hour for the HR, finance, and legal staff time displaced. */
  blendedHourlyCost: 48,
  overagePerCredit,
  /** Plan recommendation thresholds on estimated monthly credits. */
  planThresholds: {
    starterMax: 5000,
    growthMax: 30000,
  },
} as const;

export interface CalculatorResult {
  credits: {
    hrCases: number;
    candidateScreens: number;
    invoices: number;
    contracts: number;
    total: number;
  };
  hoursSaved: number;
  monthlyValue: number;
  recommendedPlanId: Plan["id"];
}

/** Pure function so the pricing page can render the estimate on the server and re-run it on the client. */
export function estimateCredits(inputs: CalculatorInputs): CalculatorResult {
  const { creditsPerUnit, hoursSavedPerUnit, candidatesPerHire, blendedHourlyCost, planThresholds } =
    calculatorModel;
  const screens = inputs.hiresPerMonth * candidatesPerHire;

  const credits = {
    hrCases: inputs.hrCasesPerMonth * creditsPerUnit.hrCase,
    candidateScreens: screens * creditsPerUnit.candidateScreen,
    invoices: inputs.invoicesPerMonth * creditsPerUnit.invoice,
    contracts: inputs.contractsPerMonth * creditsPerUnit.contract,
    total: 0,
  };
  credits.total = Math.round(
    credits.hrCases + credits.candidateScreens + credits.invoices + credits.contracts,
  );

  const hoursSaved = Math.round(
    inputs.hrCasesPerMonth * hoursSavedPerUnit.hrCase +
      screens * hoursSavedPerUnit.candidateScreen +
      inputs.invoicesPerMonth * hoursSavedPerUnit.invoice +
      inputs.contractsPerMonth * hoursSavedPerUnit.contract,
  );

  const recommendedPlanId: Plan["id"] =
    credits.total <= planThresholds.starterMax
      ? "starter"
      : credits.total <= planThresholds.growthMax
        ? "growth"
        : "enterprise";

  return {
    credits,
    hoursSaved,
    monthlyValue: Math.round(hoursSaved * blendedHourlyCost),
    recommendedPlanId,
  };
}
