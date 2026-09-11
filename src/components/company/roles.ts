/** Open roles. Rows link to the contact form; there is no application flow. */
export interface OpenRole {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: "Full-time" | "Contract";
}

export const openRoles: OpenRole[] = [
  {
    slug: "senior-applied-researcher",
    title: "Senior Applied Researcher, HR and Finance Models",
    team: "AI Research",
    location: "New York or remote (US)",
    type: "Full-time",
  },
  {
    slug: "staff-product-engineer-registry",
    title: "Staff Product Engineer, Registry",
    team: "Engineering",
    location: "London",
    type: "Full-time",
  },
  {
    slug: "forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    team: "Customer Engineering",
    location: "Dublin",
    type: "Full-time",
  },
  {
    slug: "security-and-compliance-lead",
    title: "Security and Compliance Lead",
    team: "Trust",
    location: "New York",
    type: "Full-time",
  },
  {
    slug: "enterprise-account-executive",
    title: "Enterprise Account Executive, Financial Services",
    team: "Sales",
    location: "London",
    type: "Full-time",
  },
  {
    slug: "technical-writer",
    title: "Technical Writer, Agent Documentation",
    team: "Product",
    location: "Remote (EU)",
    type: "Contract",
  },
];

export function getRole(slug: string | undefined): OpenRole | undefined {
  if (!slug) return undefined;
  return openRoles.find((role) => role.slug === slug);
}

export const roleContactPath = (slug: string) => `/contact?intent=support&role=${slug}`;
