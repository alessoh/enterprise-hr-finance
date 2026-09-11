import { Check } from "lucide-react";

import { plans } from "@/content/pricing";
import type { PlanId } from "@/content/types";
import { cn } from "@/lib/utils";

type Cell = boolean | string;

interface Feature {
  label: string;
  values: Record<PlanId, Cell>;
}

interface FeatureGroup {
  name: string;
  features: Feature[];
}

/** Every row restates a line already published in `plans`; nothing new is promised here. */
const groups: FeatureGroup[] = [
  {
    name: "Agents",
    features: [
      {
        label: "Credits included per month",
        values: { starter: "5,000", growth: "30,000", enterprise: "Custom pool" },
      },
      {
        label: "Generally available agents",
        values: { starter: "Any 3", growth: "All GA agents", enterprise: "All GA agents" },
      },
      { label: "Early-access agents", values: { starter: false, growth: false, enterprise: true } },
      { label: "Custom agents built in Studio", values: { starter: false, growth: false, enterprise: true } },
      {
        label: "Overage beyond the allowance",
        values: { starter: "$0.12 / credit", growth: "$0.12 / credit", enterprise: "Custom terms" },
      },
    ],
  },
  {
    name: "Platform",
    features: [
      { label: "Workspaces", values: { starter: "1", growth: "Up to 5", enterprise: "Unlimited" } },
      { label: "Assist in Slack, Teams, and the browser", values: { starter: true, growth: true, enterprise: true } },
      { label: "Human approvals and full audit log", values: { starter: true, growth: true, enterprise: true } },
      {
        label: "Prebuilt HRIS, ATS, payroll, and ERP connectors",
        values: { starter: true, growth: true, enterprise: true },
      },
      {
        label: "Registry with blended workforce analytics",
        values: { starter: false, growth: true, enterprise: true },
      },
      {
        label: "Gateway for partner agents (MCP, OpenTelemetry)",
        values: { starter: false, growth: true, enterprise: true },
      },
      {
        label: "Data Fabric: zero-copy warehouse and Iceberg lakehouse",
        values: { starter: false, growth: false, enterprise: true },
      },
      {
        label: "Dedicated environment and private model routing",
        values: { starter: false, growth: false, enterprise: true },
      },
    ],
  },
  {
    name: "Security and compliance",
    features: [
      { label: "SOC 2 Type II and ISO 27001", values: { starter: true, growth: true, enterprise: true } },
      { label: "SSO with OpenID Connect or SAML, SCIM", values: { starter: false, growth: true, enterprise: true } },
      { label: "Data residency", values: { starter: "US", growth: "EU or US", enterprise: "EU or US" } },
      { label: "DPA and BAA, HIPAA-ready deployment", values: { starter: false, growth: false, enterprise: true } },
      {
        label: "Custom retention and security review support",
        values: { starter: false, growth: false, enterprise: true },
      },
    ],
  },
  {
    name: "Support",
    features: [
      { label: "Support channel", values: { starter: "Email", growth: "Priority", enterprise: "Named CSM, 24/7" } },
      {
        label: "Response target",
        values: { starter: "Next business day", growth: "4 hours", enterprise: "Contracted" },
      },
      { label: "Uptime SLA", values: { starter: false, growth: false, enterprise: "99.95%" } },
    ],
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden className="mx-auto size-4 text-fg" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <span aria-hidden className="text-fg-faint">
          &ndash;
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="tabular">{value}</span>;
}

export interface ComparisonTableProps {
  className?: string;
}

/**
 * Features down, plans across. Markup follows the Table primitive's tokens but is
 * written out here because the whole matrix stays in page flow: the wrapper only
 * scrolls horizontally below lg, which leaves the header free to stick under the
 * 72px site header on desktop instead of inside a clipped scroll box.
 */
export function ComparisonTable({ className }: ComparisonTableProps) {
  const headCell =
    "sticky top-0 z-10 h-11 bg-bg-subtle px-4 align-middle text-xs font-medium tracking-[0.06em] whitespace-nowrap text-fg-muted uppercase lg:top-18";
  return (
    <>
      <div className={cn("w-full overflow-x-auto rounded-lg ring-1 ring-border lg:overflow-x-visible", className)}>
        <table className="w-full min-w-[46rem] border-collapse text-sm">
          <caption className="sr-only">Meridian plan comparison by feature</caption>
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className={cn(headCell, "rounded-tl-lg text-left")}>
                Feature
              </th>
              {plans.map((plan) => (
                <th key={plan.id} scope="col" className={cn(headCell, "w-[21%] text-center last:rounded-tr-lg")}>
                  <a
                    href={`#plan-${plan.id}`}
                    className="rounded-sm underline-offset-4 transition-colors duration-150 ease-standard hover:text-fg hover:underline"
                  >
                    {plan.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          {groups.map((group, index) => (
            <tbody key={group.name} className={cn(index === groups.length - 1 && "[&>tr:last-child]:border-b-0")}>
              <tr className="border-b border-border">
                <th
                  scope="colgroup"
                  colSpan={plans.length + 1}
                  className="eyebrow bg-bg-muted px-4 py-2.5 text-left"
                >
                  {group.name}
                </th>
              </tr>
              {group.features.map((feature) => (
                <tr
                  key={feature.label}
                  className="border-b border-border transition-colors duration-120 ease-standard hover:bg-bg-subtle"
                >
                  <th scope="row" className="px-4 py-3 text-left align-middle font-medium text-fg">
                    {feature.label}
                  </th>
                  {plans.map((plan) => (
                    <td key={plan.id} className="px-4 py-3 text-center align-middle text-fg-muted">
                      <CellValue value={feature.values[plan.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="mt-3 text-[0.8125rem] text-fg-subtle lg:hidden">
        Scroll the table sideways to compare all three plans.
      </p>
    </>
  );
}
