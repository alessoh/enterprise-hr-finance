import type { Faq } from "@/content/types";

import type { ContactIntent } from "./contact-schema";

export interface IntentCopy {
  lede: string;
  /** Exactly 3. */
  expect: string[];
}

export const intentCopy: Record<ContactIntent, IntentCopy> = {
  demo: {
    lede: "A 45-minute working session with your systems in scope. Leave with a plan for the first agent and a credit estimate.",
    expect: [
      "A reply within one business day from a solutions engineer, not an automated sequence.",
      "One workflow of your choice, run end to end on sample data, including the approval step a person signs.",
      "A written plan: the agent, the data it reads, the approvers, and estimated monthly credit consumption.",
    ],
  },
  sales: {
    lede: "Plan fit, credit pools, annual prepay, procurement, and security review for teams past the Starter plan.",
    expect: [
      "A credit estimate for your volumes: HR cases, hires, invoices, and contracts per month.",
      "Commercial terms for annual prepay, custom credit pools, a DPA or BAA, and a 99.95% SLA on Enterprise.",
      "A SOC 2 Type II report and completed security questionnaire under NDA, usually within two business days.",
    ],
  },
  support: {
    lede: "For customers with a question about a workspace, candidates writing about an open role, and anyone who needs to reach a person.",
    expect: [
      "Customer requests are answered within one business day; Growth and Enterprise priority support answers within four business hours.",
      "Candidates: this form is the application. Include the role title and a link to your work or a resume.",
      "Live incident status is on the status page; you do not need to open a request to see it.",
    ],
  },
  partner: {
    lede: "Publish agents to the Registry through Gateway, deploy Meridian for your clients, or bring your data platform to Data Fabric.",
    expect: [
      "Technology partners: connect an agent over Model Context Protocol or agent-to-agent protocols and list it in the Registry.",
      "System integrators and advisory firms: a certified delivery practice with pilot playbooks and co-selling on Enterprise deals.",
      "Data platform partners: zero-copy connectors and joint reference architectures for Snowflake, Databricks, and BigQuery customers.",
    ],
  },
};

/** Short answers shown beside the form and passed to faqJsonLd. */
export const contactFaqs: Faq[] = [
  {
    question: "How long does a Meridian pilot take?",
    answer:
      "Design partners connected their first systems in week one and ran a live pilot in weeks three to five. Most were in production within five weeks.",
  },
  {
    question: "Do we need to move our data into Meridian?",
    answer:
      "No. Data Fabric reads your warehouse in place with zero-copy access to Snowflake, Databricks, and BigQuery, and your security policies travel with the data.",
  },
  {
    question: "Which AI models can Meridian agents run on?",
    answer:
      "You choose the frontier model per workspace, and Meridian routes domain-specific HR and finance reasoning to its own tuned models. Meridian does not train on customer data.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Starter includes a 14-day free trial at $499 per month with 5,000 credits. Growth and Enterprise begin with a scoped pilot on one workflow.",
  },
];
