/**
 * Page-local data for /security. Product facts that live in src/content
 * (securityFaqs, the Trust pillar, agentContract) are imported by the page,
 * not duplicated here. Everything below is trust-center detail only this page shows.
 */

export const SECURITY_EMAIL = "security@meridian.example";
export const SECURITY_TXT_PATH = "/.well-known/security.txt";
export const AS_OF = "September 2026";

export type CertificationStatus = "Report available under NDA" | "Certified" | "Aligned";

export interface Certification {
  name: string;
  qualifier: string;
  status: CertificationStatus;
  scope: string;
  evidence: string;
  href: string;
  hrefLabel: string;
}

export const certifications: Certification[] = [
  {
    name: "SOC 2",
    qualifier: "Type II",
    status: "Report available under NDA",
    scope: "Security, availability, and confidentiality criteria over a 12-month observation period.",
    evidence: "Annual audit by an independent CPA firm; bridge letter between reports.",
    href: "/glossary/soc-2-type-ii",
    hrefLabel: "What SOC 2 Type II covers",
  },
  {
    name: "ISO 27001",
    qualifier: "2022",
    status: "Certified",
    scope: "Information security management system covering the platform, agents, and corporate systems.",
    evidence: "Certificate and statement of applicability under NDA; annual surveillance audits.",
    href: "/glossary/iso-27001",
    hrefLabel: "What ISO 27001 covers",
  },
  {
    name: "GDPR",
    qualifier: "Processor",
    status: "Aligned",
    scope: "Meridian processes customer data as a processor under a standard DPA with EU Standard Contractual Clauses.",
    evidence: "DPA, published subprocessor list, and EU workspace residency.",
    href: "/legal/dpa",
    hrefLabel: "Read the DPA",
  },
  {
    name: "HIPAA",
    qualifier: "Ready",
    status: "Aligned",
    scope: "PHI configuration on Enterprise: BAA, model routing restricted to providers under BAA, PHI retention, added logging.",
    evidence: "Business Associate Agreement and the HIPAA-ready configuration guide.",
    href: "/pricing",
    hrefLabel: "Enterprise plan",
  },
  {
    name: "CCPA",
    qualifier: "CPRA",
    status: "Aligned",
    scope: "Service-provider terms; consumer requests routed to the customer and honored within statutory windows.",
    evidence: "Service-provider addendum in the DPA; privacy policy.",
    href: "/legal/privacy",
    hrefLabel: "Privacy policy",
  },
];

export interface GlanceRow {
  label: string;
  value: string;
}

/** The dense fact sheet beside the hero. Facts only; no outcome figures. */
export const glanceRows: GlanceRow[] = [
  { label: "SOC 2 Type II", value: "Report under NDA" },
  { label: "ISO 27001", value: "Certified" },
  { label: "Data residency", value: "EU or US, per workspace" },
  { label: "Encryption", value: "AES-256 at rest · TLS 1.2+" },
  { label: "Model training", value: "Never on customer data" },
  { label: "Approvals", value: "Held at the Gateway" },
  { label: "Uptime SLA", value: "99.95% on Enterprise" },
  { label: "Penetration test", value: "Annual, independent firm" },
];

export interface GovernanceStep {
  id: string;
  title: string;
  heading: string;
  body: string;
}

export const governanceSteps: GovernanceStep[] = [
  {
    id: "scope",
    title: "Scope",
    heading: "Every agent is scoped to one workflow.",
    body: "An agent’s scope is a declaration, registered in Registry, of the one workflow it runs, the systems it may touch, and the actions it may never take. The Payroll Agent validates the run; it cannot change pay. Scope is versioned, reviewed by the customer, and enforced at the Gateway, so a prompt cannot widen it.",
  },
  {
    id: "permissions",
    title: "Permissions",
    heading: "Agents inherit your permissions.",
    body: "Agents hold no credentials of their own. Each read passes through the Gateway as the acting user or a named service identity, and the source system’s permissions apply on every query. Data Fabric grants are read scopes by default; write scopes are named individually and default to denied.",
  },
  {
    id: "approvals",
    title: "Approvals",
    heading: "Consequential actions wait for a person.",
    body: "Each agent’s policy names which actions are consequential: moving money, changing pay, rejecting a candidate, sending a document outside the company. The Gateway holds the call and routes it to the approver you named in Slack, Teams, email, or the workspace. The agent cannot continue until someone approves, edits, or declines with a reason.",
  },
  {
    id: "audit-trail",
    title: "Audit trail",
    heading: "Every step is logged and chained.",
    body: "Every data read, reasoning step, tool call, approval decision, and outcome is written with the acting identity and a timestamp. Each entry is hashed with the previous entry’s hash, so a gap or edit is detectable. The log streams to your SIEM in real time or exports on a schedule, and is retained under the policy you set.",
  },
];

export interface ControlRow {
  control: string;
  detail: string;
  evidence: string;
  href?: string;
}

export interface ControlDomain {
  domain: string;
  rows: ControlRow[];
}

export const controlDomains: ControlDomain[] = [
  {
    domain: "Identity and access",
    rows: [
      {
        control: "Single sign-on",
        detail: "SAML 2.0 and OpenID Connect through your identity provider. Local passwords are disabled on Growth and Enterprise.",
        evidence: "SOC 2 CC6.1; IdP configuration guide",
      },
      {
        control: "SCIM provisioning",
        detail: "Users and groups provisioned and deprovisioned from your directory. Deprovisioned sessions are revoked within 15 minutes.",
        evidence: "SOC 2 CC6.2; SCIM conformance log",
      },
      {
        control: "Role-based access",
        detail: "Five roles: admin, builder, approver, auditor, viewer. Roles map from identity provider groups.",
        evidence: "Role matrix in the security packet",
      },
      {
        control: "Least privilege",
        detail: "Agents hold no standing credentials. Each read inherits the source system’s permissions for the acting identity.",
        evidence: "Gateway design document",
        href: "/platform/gateway",
      },
    ],
  },
  {
    domain: "Data",
    rows: [
      {
        control: "Encryption at rest",
        detail: "AES-256 on every store and backup. Customer-managed keys on Enterprise.",
        evidence: "SOC 2 CC6.7; key management configuration",
      },
      {
        control: "Encryption in transit",
        detail: "TLS 1.2 or higher on every connection, TLS 1.3 preferred, HSTS on all endpoints.",
        evidence: "Quarterly TLS scan results",
      },
      {
        control: "Data residency",
        detail: "Workspace region is EU or US. Storage, processing, and model inference stay in that region.",
        evidence: "Region architecture; DPA Annex II",
        href: "/glossary/data-residency",
      },
      {
        control: "Retention",
        detail: "Configurable per data class from 30 days to 7 years. Audit log retention is set separately.",
        evidence: "Retention schedule in the security packet",
      },
      {
        control: "Deletion",
        detail: "Customer data is deleted within 30 days of termination or request. A deletion certificate is issued on request.",
        evidence: "SOC 2 CC6.5; deletion certificate",
      },
    ],
  },
  {
    domain: "Model governance",
    rows: [
      {
        control: "Bring your own model",
        detail: "Supported frontier models from leading providers, pinned per workspace with a region. Meridian’s tuned models handle HR and finance domain reasoning.",
        evidence: "Model routing configuration export",
      },
      {
        control: "No training on customer data",
        detail: "Customer data never trains Meridian’s or any third party’s models. Provider agreements prohibit retention beyond the request.",
        evidence: "DPA clause 7; provider terms summary",
        href: "/legal/dpa",
      },
      {
        control: "Prompt and tool logging",
        detail: "Every prompt, tool call, and response is logged with the acting identity and redacted under your policy.",
        evidence: "Sample log export; SIEM integration guide",
      },
      {
        control: "Evaluation gates",
        detail: "Evaluation sets run before release and on every model, prompt, or policy change. A regression blocks promotion.",
        evidence: "Evaluation report per agent version",
      },
    ],
  },
  {
    domain: "Application",
    rows: [
      {
        control: "Secure development lifecycle",
        detail: "Peer review, static analysis, and signed builds on every change. Every production change traces to a ticket.",
        evidence: "SOC 2 CC8.1; change management policy",
      },
      {
        control: "Penetration testing",
        detail: "Annual test by an independent firm, plus targeted tests on major releases. Findings are tracked to closure.",
        evidence: "Latest summary letter under NDA",
      },
      {
        control: "Dependency scanning",
        detail: "Daily scans of dependencies and container images. Critical vulnerabilities are patched within 7 days.",
        evidence: "Vulnerability management policy; SBOM on request",
      },
      {
        control: "Secrets management",
        detail: "Secrets live in an HSM-backed vault and rotate at least every 90 days. No secrets in source or images.",
        evidence: "Secrets policy; repository scan results",
      },
    ],
  },
  {
    domain: "Availability",
    rows: [
      {
        control: "Service level",
        detail: "99.95% monthly uptime SLA on Enterprise with service credits. Live status is public.",
        evidence: "SLA schedule; status page",
        href: "/status",
      },
      {
        control: "Recovery objectives",
        detail: "Recovery point objective 15 minutes. Recovery time objective 4 hours. Restores are tested quarterly.",
        evidence: "Disaster recovery test report",
      },
      {
        control: "Resilience",
        detail: "Multi-zone deployment in each region with automated failover. Encrypted backups are retained 35 days.",
        evidence: "Architecture overview in the security packet",
      },
    ],
  },
  {
    domain: "Privacy",
    rows: [
      {
        control: "Data processing addendum",
        detail: "Standard DPA with EU Standard Contractual Clauses and the UK addendum, signed with every subscription.",
        evidence: "Data processing addendum",
        href: "/legal/dpa",
      },
      {
        control: "Business associate agreement",
        detail: "BAA for protected health information on Enterprise, paired with the HIPAA-ready configuration.",
        evidence: "BAA template on request",
      },
      {
        control: "Subprocessors",
        detail: "Published list with purpose, location, and date added. Customers get 30 days’ notice of changes.",
        evidence: "Subprocessor list",
        href: "/legal/subprocessors",
      },
    ],
  },
];

export interface ResponsibilityRow {
  area: string;
  meridian: string;
  customer: string;
}

export const responsibilityRows: ResponsibilityRow[] = [
  { area: "Cloud infrastructure, network, and platform patching", meridian: "Owns", customer: "—" },
  { area: "Application security and secure development", meridian: "Owns", customer: "—" },
  { area: "Encryption and key management", meridian: "Owns", customer: "Configures customer-managed keys (Enterprise)" },
  { area: "Identity provider, SSO, and user lifecycle", meridian: "Integrates over SAML, OIDC, SCIM", customer: "Owns" },
  { area: "Roles and approver assignment", meridian: "Provides the five roles", customer: "Owns" },
  { area: "Agent scope and approval policies", meridian: "Provides templates; enforces at the Gateway", customer: "Owns" },
  { area: "Source-system permissions and data classification", meridian: "Inherits on every read", customer: "Owns" },
  { area: "Model and region selection", meridian: "Provides supported options", customer: "Owns" },
  { area: "Platform monitoring and incident response", meridian: "Owns; notifies within 72 hours", customer: "Reviews" },
  { area: "Audit log retention and review", meridian: "Produces, chains, retains", customer: "Reviews and exports" },
  { area: "Compliance evidence: SOC 2, ISO 27001, penetration tests", meridian: "Provides under NDA", customer: "Reviews" },
  { area: "Vulnerability disclosure program", meridian: "Owns; acknowledges within 2 business days", customer: "Reports" },
];

export interface DisclosureCommitment {
  label: string;
  value: string;
}

export const disclosureCommitments: DisclosureCommitment[] = [
  { label: "Acknowledgment", value: "Within 2 business days" },
  { label: "Triage and severity", value: "Within 5 business days" },
  { label: "Critical fix target", value: "7 days" },
  { label: "High fix target", value: "30 days" },
];
