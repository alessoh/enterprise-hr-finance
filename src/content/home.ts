import { modeledOutcomeFootnote as MODELED } from "./agents";
import type { HomeCopy } from "./types";

export const homeCopy: HomeCopy = {
  hero: {
    eyebrow: "Twelve governed agents for HR, finance, and legal",
    headline: "AI agents that run HR and finance.",
    subheadline:
      "Narrow, governed agents that resolve HR cases, screen candidates, close the books, and package audit evidence inside your systems of record. Every action is logged, and every consequential decision is approved by a person.",
    primaryCta: { label: "Book a demo", href: "/contact?intent=demo" },
    secondaryCta: { label: "See it live", href: "/dashboard" },
    proofLine: "Governed by design. SOC 2 Type II. Bring your own model.",
  },

  logoWallLabel: "Design partners in healthcare, logistics, financial services, retail, energy, and manufacturing",

  proofStats: [
    { value: "75%", label: "of HR cases deflected", numeric: 75, suffix: "%", footnote: MODELED },
    { value: "~900", label: "hours saved per audit year", numeric: 900, prefix: "~", footnote: MODELED },
    { value: "3 days", label: "shorter month-end close", numeric: 3, suffix: " days", footnote: MODELED },
    { value: "46%", label: "faster candidate screening", numeric: 46, suffix: "%", footnote: MODELED },
  ],

  sections: {
    agents: {
      eyebrow: "Agents",
      title: "One agent per workflow. Twelve workflows.",
      lede: "Each agent is scoped to a single job, reads only the data it is permitted to, and reports a measurable outcome. Six for HR, five for finance, one for legal. Nine are generally available today.",
      bullets: [
        "Scoped to one workflow",
        "Reads only permitted data",
        "Every action logged",
        "Consequential actions require human approval",
        "Measurable outcome",
        "Runs on your chosen model",
      ],
    },
    platform: {
      eyebrow: "Platform",
      title: "The layer under the agents.",
      lede: "A registry that is the system of record for every agent you run. A gateway that connects any agent through open standards. Zero-copy access to your data. A studio to build your own. One trust model across all of it.",
      bullets: ["Registry", "Gateway", "Data Fabric", "Studio", "Assist", "Trust"],
    },
    live: {
      eyebrow: "Live",
      title: "Watch the agents work.",
      lede: "A live feed of agent operations, approvals, and outcomes from a demonstration workspace, streamed as they happen. The same view your operations team gets in the Registry.",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Production in weeks, not quarters.",
      lede: "Design partners connected their first systems in week one and ran a live pilot in weeks three to five. The path is the same for every agent.",
      steps: [
        {
          step: 1,
          title: "Connect your data",
          description:
            "Zero-copy access to your warehouse and prebuilt connectors for your HRIS, ATS, payroll, ERP, and CLM. Security policies come with the data; nothing is copied.",
        },
        {
          step: 2,
          title: "Choose your agents",
          description:
            "Start with one workflow where the volume is high and the rules are clear: HR cases, candidate screening, duplicate payments, audit evidence.",
        },
        {
          step: 3,
          title: "Set the guardrails",
          description:
            "Name the approvers for consequential actions, the topics that escalate, and the data each agent may read. Enforced at the Gateway, below the agent.",
        },
        {
          step: 4,
          title: "Measure the outcome",
          description:
            "The Registry reports cases resolved, hours saved, exceptions caught, and credits consumed per agent, next to your human team's metrics.",
        },
      ],
    },
    trust: {
      eyebrow: "Trust",
      title: "Humans stay accountable. The log proves it.",
      lede: "Approval holds that no agent or builder can bypass. An immutable audit trail you can export. Access from your identity provider. SOC 2 Type II, ISO 27001, GDPR, HIPAA-ready, EU and US residency, and no training on your data.",
      bullets: [
        "Human-in-the-loop approvals on every consequential action",
        "Immutable, exportable audit trail",
        "SOC 2 Type II and ISO 27001",
        "EU and US data residency",
        "No training on customer data, by contract",
        "Your choice of model, changeable per workspace",
      ],
    },
    outcomes: {
      eyebrow: "Outcomes",
      title: "Numbers a controller would sign.",
      lede: "Every agent ships with the metric it is accountable for. These are modeled outcomes from design-partner deployments; the Registry reports your actuals from day one.",
    },
    pricing: {
      eyebrow: "Pricing",
      title: "Pay for work completed.",
      lede: "Plans include a monthly credit allowance. Agents consume credits when they finish an action: 2 for an HR case resolved, 1 for a candidate screened, 8 for a contract redlined. Start at $499 per month with a 14-day free trial.",
    },
    faq: {
      eyebrow: "Questions",
      title: "What buyers ask first.",
      lede: "Straight answers on models, data, approvals, deployment time, and cost.",
    },
    cta: {
      eyebrow: "Get started",
      title: "See an agent run on your data.",
      lede: "A 45-minute working session with your systems in scope. Leave with a plan for the first agent and a credit estimate.",
    },
  },

  footnoteText:
    "Outcome figures are modeled outcomes from design-partner deployments. Results depend on volume, data quality, and scope. The Registry reports your actual outcomes once agents are live.",

  finalCta: {
    title: "Put the first agent to work this quarter.",
    lede: "Start with one workflow, one approver, and one number to move. Most design partners were live in five weeks.",
    primary: { label: "Book a demo", href: "/contact?intent=demo" },
    secondary: { label: "View pricing", href: "/pricing" },
  },
};
