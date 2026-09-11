import type { Faq } from "./types";

export const homeFaqs: Faq[] = [
  {
    question: "What is an AI agent for HR and finance?",
    answer:
      "An AI agent is software that completes a defined piece of work by reading data, reasoning about it, and taking actions in your systems. Meridian's agents are each scoped to one workflow: resolving an HR case, screening a candidate, packaging audit evidence, testing a payment for duplicates. Each reads only the data it is permitted to, logs every step, and hands consequential decisions to a named person.",
  },
  {
    question: "How is Meridian different from a chatbot or copilot?",
    answer:
      "A chatbot answers. An agent finishes the work. Meridian's agents open and close cases, book interviews, prepare reconciliations, and produce evidence packages inside your systems of record. They are also narrower by design: each does one job, against defined data, under an approval policy, with a measurable outcome the Registry reports.",
  },
  {
    question: "Is our data used to train AI models?",
    answer:
      "No. Customer data is never used to train Meridian's models or any third-party model. This is a contractual commitment in the DPA. Data stays in the region you select, and zero-copy warehouse sources are never moved.",
  },
  {
    question: "Which AI models does Meridian use?",
    answer:
      "The ones you choose. Meridian is model-agnostic and supports frontier models from leading providers, including Anthropic and OpenAI models. HR and finance domain reasoning is routed to Meridian's own tuned models. You can pin a provider and region per workspace and change it later; evaluation sets re-run so you see any behavior change first.",
  },
  {
    question: "How do human approvals work?",
    answer:
      "Each agent has a policy naming which actions are consequential: moving money, changing pay, rejecting a candidate, sending a document externally. When the agent reaches one, the action is held at the Gateway and routed to the approver you named, in Slack, Teams, email, or the workspace. The agent cannot proceed until a person approves, edits, or rejects. Every decision is logged.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "Weeks, not quarters. Design partners connected their first systems in week one and ran a live pilot of the first agent in weeks 3 to 5. Most were in production on two or three agents within a quarter. Connectors, approval templates, and evaluation sets are prebuilt; the time goes to tuning scope against your real data.",
  },
  {
    question: "What systems does Meridian connect to?",
    answer:
      "Your HRIS, ATS, payroll provider, ERP and general ledger, planning platform, CLM, banking, expense, and ticketing systems through more than 3,000 prebuilt connectors, and your warehouse (Snowflake, Databricks, BigQuery) through zero-copy sharing. Agents work inside Slack, Microsoft Teams, email, and the browser.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Plans include a monthly credit allowance, and agents consume credits when they complete actions: 2 for an HR case resolved, 1 for a candidate screened, 8 for a contract redlined. Starter is $499 per month with 5,000 credits and a 14-day free trial. Growth is $2,499 per month with 30,000 credits. Enterprise has custom pools. Overage is $0.12 per credit.",
  },
];

export const securityFaqs: Faq[] = [
  {
    question: "What certifications and attestations does Meridian hold?",
    answer:
      "Meridian holds a SOC 2 Type II report covering security, availability, and confidentiality, and ISO 27001 certification. Both are available under NDA from the trust center, along with the most recent penetration test summary and completed standard security questionnaires.",
  },
  {
    question: "Is Meridian GDPR compliant, and do you sign a DPA?",
    answer:
      "Yes. Meridian acts as a processor for customer data under a standard Data Processing Agreement with the EU Standard Contractual Clauses where required. EU workspaces keep storage, processing, and model inference within the EU. Subprocessors are listed in the trust center and customers are notified of changes 30 days in advance.",
  },
  {
    question: "Can Meridian handle protected health information?",
    answer:
      "Enterprise customers can deploy in a HIPAA-ready configuration with a Business Associate Agreement. That configuration restricts model routing to providers under BAA, enforces PHI-specific retention, and applies additional logging. Healthcare design partners run the Help Desk and Scheduling Agents this way.",
  },
  {
    question: "How is access controlled?",
    answer:
      "Users authenticate through your identity provider over OpenID Connect or SAML. Provisioning and deprovisioning use SCIM. Agents hold no credentials of their own; they act as the user through the Gateway and inherit the source system's permissions on every read. Roles inside Meridian control who can configure agents, approve actions, and view logs.",
  },
  {
    question: "What is in the audit trail and can we export it?",
    answer:
      "Every data read, reasoning step, tool call, approval decision, and outcome, with the acting identity and timestamp. Entries are hashed and chained so integrity can be verified. The log streams to your SIEM in real time or exports on a schedule, and it is retained under the policy you set.",
  },
  {
    question: "Is customer data used to train models?",
    answer:
      "No. Customer data is never used to train Meridian's models or any third-party model. Meridian's agreements with model providers prohibit training and retention beyond the request. This commitment is in the DPA.",
  },
  {
    question: "How is data encrypted and where is it stored?",
    answer:
      "Data is encrypted in transit with TLS 1.2 or higher and at rest with AES-256. Customer-managed keys are available on Enterprise. Storage and processing are in the workspace region you select, EU or US. Zero-copy warehouse sources stay in your warehouse and are never copied.",
  },
  {
    question: "How does Meridian test and monitor agent behavior?",
    answer:
      "Every agent ships with evaluation sets that run before release and again whenever the model, prompt, or policy changes. In production, the Gateway enforces approval holds and cost ceilings, and the Registry tracks exception rates and human override rates per agent. Agents that regress can be paused from the Registry. Independent penetration tests run annually, and a vulnerability disclosure program is published in the trust center.",
  },
];
