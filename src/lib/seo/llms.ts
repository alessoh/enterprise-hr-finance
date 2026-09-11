import { agents } from "@/content/agents";
import { articles } from "@/content/articles";
import { changelog } from "@/content/changelog";
import { caseStudies, customers } from "@/content/customers";
import { homeFaqs, securityFaqs } from "@/content/faqs";
import { glossaryTerms } from "@/content/glossary";
import { platformPillars } from "@/content/platform";
import { creditRates, plans, pricingFaqs } from "@/content/pricing";
import type { Agent, Faq, Plan, PlatformPillar } from "@/content/types";
import { keyFacts, meridianDefinition, modeledOutcomeCaveat, overagePerCreditUsd, whatMeridianIs } from "./facts";
import {
  agentPath,
  articlePath,
  customerPath,
  getStaticRoute,
  glossaryPath,
  platformPath,
  staticRoutes,
} from "./routes";
import { absoluteUrl, siteUrl } from "./url";

/**
 * Builders for /llms.txt (index) and /llms-full.txt (full corpus).
 * Output is markdown. Every line that states a fact should be quotable on
 * its own: entity name, number, and URL in one line.
 */

const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const isoDay = (iso: string) => (iso && iso.length >= 10 ? iso.slice(0, 10) : iso);
const statusLabel = (agent: Agent) => (agent.status === "ga" ? "GA" : "early access");

function pillarPath(pillar: PlatformPillar): string {
  return pillar.slug === "trust" ? "/security" : platformPath(pillar.slug);
}

function latestIsoDay(): string {
  const dates = [
    ...articles.map((a) => a.updatedAt || a.publishedAt),
    ...changelog.map((e) => e.date),
    ...caseStudies.map((cs) => cs.publishedAt),
  ]
    .map((d) => new Date(d))
    .filter((d) => !Number.isNaN(d.getTime()));
  if (dates.length === 0) return new Date().toISOString().slice(0, 10);
  return new Date(Math.max(...dates.map((d) => d.getTime()))).toISOString().slice(0, 10);
}

function planLine(plan: Plan): string {
  if (plan.priceMonthly == null) {
    return `- ${plan.name} — custom pricing — ${plan.description} ${plan.limits.agents}, ${plan.limits.workspaces}, ${plan.limits.support}${plan.limits.sla ? `, ${plan.limits.sla}` : ""}.`;
  }
  const annual = plan.priceAnnualMonthly != null ? ` (${money(plan.priceAnnualMonthly)}/mo billed annually)` : "";
  const credits = plan.credits != null ? `${plan.credits.toLocaleString("en-US")} credits/mo` : "custom credit pool";
  return `- ${plan.name} — ${money(plan.priceMonthly)}/mo${annual} — ${credits}, ${plan.limits.agents}, ${plan.limits.workspaces}, ${plan.limits.support}.`;
}

function faqBlock(faqs: Faq[]): string[] {
  return faqs.flatMap((faq) => [`**Q: ${faq.question}**`, "", faq.answer.trim(), ""]);
}

function header(): string[] {
  return [
    "# Meridian",
    "",
    `> ${meridianDefinition}`,
    "",
    `Meridian ships ${agents.length} governed agents for HR, finance, and legal operations, a platform layer that acts as the system of record for every agent in the enterprise, and consumption-based pricing in credits. It supports customer-chosen frontier models and routes domain-specific HR and finance reasoning to its own tuned models. Legal entity: Meridian Systems, Inc. Site: ${siteUrl}/. Last updated: ${latestIsoDay()}.`,
    "",
    "## What Meridian is",
    "",
    ...whatMeridianIs.map((line) => `- ${line}`),
    "",
  ];
}

function agentsSection(): string[] {
  return [
    "## Agents",
    "",
    ...agents.map(
      (agent) => `- ${agent.name} (${statusLabel(agent)}) — ${agent.tagline} — ${absoluteUrl(agentPath(agent.slug))}`,
    ),
    "",
  ];
}

function platformSection(): string[] {
  const lines = platformPillars.map(
    (pillar) => `- ${pillar.name} — ${pillar.description} — ${absoluteUrl(pillarPath(pillar))}`,
  );
  if (!platformPillars.some((p) => p.slug === "trust")) {
    const security = getStaticRoute("/security");
    if (security) lines.push(`- Trust — ${security.description} — ${absoluteUrl("/security")}`);
  }
  return ["## Platform", "", ...lines, ""];
}

function pricingSection(): string[] {
  const rates = creditRates.map((r) => `${r.action} ${r.credits} ${r.credits === 1 ? "credit" : "credits"}`).join("; ");
  return [
    "## Pricing",
    "",
    ...plans.map(planLine),
    `- Credit rates: ${rates}. Overage ${money(overagePerCreditUsd)} per credit. Pricing page: ${absoluteUrl("/pricing")}`,
    "",
  ];
}

function keyFactsSection(): string[] {
  return [
    "## Key facts",
    "",
    ...keyFacts.map((f, i) => `${i + 1}. ${f.fact}${f.modeled ? " (modeled outcome)" : ""} Source: ${absoluteUrl(f.path)}`),
    "",
    `Note: ${modeledOutcomeCaveat}`,
    "",
  ];
}

function pagesSection(): string[] {
  return ["## Pages", "", ...staticRoutes.map((r) => `- ${absoluteUrl(r.path)} — ${r.description}`), ""];
}

function resourcesSection(): string[] {
  return [
    "## Resources",
    "",
    ...articles.map(
      (a) =>
        `- ${a.title} — ${a.description} — ${absoluteUrl(articlePath(a.slug))} (published ${isoDay(a.publishedAt)}, updated ${isoDay(a.updatedAt || a.publishedAt)})`,
    ),
    "",
  ];
}

function customersSection(): string[] {
  return [
    "## Customers",
    "",
    ...customers.map(
      (c) => `- ${c.name} — ${c.industry}, ${c.size}, ${c.region} — ${absoluteUrl(customerPath(c.slug))}`,
    ),
    "",
  ];
}

function glossarySection(): string[] {
  return [
    "## Glossary",
    "",
    ...glossaryTerms.map((t) => `- ${t.term} — ${t.shortDefinition} — ${absoluteUrl(glossaryPath(t.slug))}`),
    "",
  ];
}

function machineReadableSection(): string[] {
  return [
    "## Machine-readable",
    "",
    `- Full corpus: ${absoluteUrl("/llms-full.txt")}`,
    `- Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    `- RSS (articles and changelog): ${absoluteUrl("/feed.xml")}`,
    `- Security contact: ${absoluteUrl("/.well-known/security.txt")}`,
    "",
  ];
}

export function buildLlmsTxt(): string {
  return [
    ...header(),
    ...agentsSection(),
    ...platformSection(),
    ...pricingSection(),
    ...keyFactsSection(),
    ...pagesSection(),
    ...resourcesSection(),
    ...customersSection(),
    ...glossarySection(),
    ...machineReadableSection(),
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Full corpus
// ---------------------------------------------------------------------------

function agentFull(agent: Agent): string[] {
  const url = absoluteUrl(agentPath(agent.slug));
  return [
    `### ${agent.name}`,
    "",
    `URL: ${url}`,
    `Status: ${statusLabel(agent)}. Category: ${agent.category}.`,
    "",
    agent.description,
    "",
    `Headline outcome: ${agent.headlineMetric.value} ${agent.headlineMetric.label} (modeled outcome).`,
    ...agent.supportingMetrics.map((m) => `- ${m.value} ${m.label}`),
    "",
    agent.longDescription.trim(),
    "",
    "How it works:",
    ...agent.howItWorks.map((s) => `${s.step}. ${s.title}: ${s.description}`),
    "",
    "Guardrails:",
    ...agent.guardrails.map((g) => `- ${g}`),
    "",
    "Data sources: " + agent.dataSources.join(", ") + ".",
    "Credit cost: " + agent.creditCost.map((c) => `${c.action} ${c.credits} ${c.credits === 1 ? "credit" : "credits"}`).join("; ") + ".",
    "",
    ...faqBlock(agent.faqs),
  ];
}

function pillarFull(pillar: PlatformPillar): string[] {
  return [
    `### ${pillar.name}`,
    "",
    `URL: ${absoluteUrl(pillarPath(pillar))}`,
    "",
    `${pillar.headline}. ${pillar.description}`,
    "",
    pillar.longDescription.trim(),
    "",
    ...pillar.features.map((f) => `- ${f.title}: ${f.description}`),
    "",
    ...(pillar.proofPoints.length ? ["Proof points:", ...pillar.proofPoints.map((p) => `- ${p}`), ""] : []),
    ...(pillar.standards?.length ? [`Standards: ${pillar.standards.join(", ")}.`, ""] : []),
    ...faqBlock(pillar.faqs),
  ];
}

export function buildLlmsFullTxt(): string {
  const lines: string[] = [
    ...header(),
    ...keyFactsSection(),
    "## Agents",
    "",
    ...agents.flatMap(agentFull),
    "## Platform",
    "",
    ...platformPillars.flatMap(pillarFull),
    "## Pricing",
    "",
    ...plans.map(planLine),
    "",
    "Credit rates:",
    ...creditRates.map((r) => `- ${r.action}: ${r.credits} ${r.credits === 1 ? "credit" : "credits"} per ${r.unit}`),
    `- Overage: ${money(overagePerCreditUsd)} per credit`,
    "",
    ...faqBlock(pricingFaqs),
    "## Security and trust",
    "",
    `URL: ${absoluteUrl("/security")}`,
    "",
    ...faqBlock(securityFaqs),
    "## Frequently asked questions",
    "",
    ...faqBlock(homeFaqs),
    "## Customers",
    "",
    ...customers.flatMap((c) => {
      const study = caseStudies.find((cs) => cs.slug === c.slug || cs.customerSlug === c.slug);
      return [
        `### ${c.name}`,
        "",
        `URL: ${absoluteUrl(customerPath(c.slug))}`,
        `${c.industry}, ${c.size}, ${c.region}. Agents: ${c.agentSlugs.join(", ")}.`,
        "",
        c.summary,
        "",
        ...c.results.map((r) => `- ${r.value} ${r.label} (modeled outcome)`),
        "",
        ...(study
          ? [
              `${study.title}. ${study.subtitle}`,
              "",
              "Challenge:",
              study.challenge.trim(),
              "",
              "Approach:",
              study.approach.trim(),
              "",
              "Results:",
              study.results.summary.trim(),
              "",
              `"${study.quote.quote}" — ${study.quote.name}, ${study.quote.role}, ${study.quote.company}`,
              "",
            ]
          : []),
      ];
    }),
    "## Resources",
    "",
    ...articles.flatMap((a) => [
      `### ${a.title}`,
      "",
      `URL: ${absoluteUrl(articlePath(a.slug))}`,
      `By ${a.author.name}, ${a.author.role}. Published ${isoDay(a.publishedAt)}, updated ${isoDay(a.updatedAt || a.publishedAt)}. ${a.readingMinutes} minute read. Category: ${a.category}.`,
      "",
      a.description,
      "",
      "Key takeaways:",
      ...a.keyTakeaways.map((t) => `- ${t}`),
      "",
      a.body.trim(),
      "",
      ...faqBlock(a.faqs),
    ]),
    "## Glossary",
    "",
    ...glossaryTerms.flatMap((t) => [
      `### ${t.term}`,
      "",
      `URL: ${absoluteUrl(glossaryPath(t.slug))}`,
      "",
      t.shortDefinition,
      "",
      t.definition.trim(),
      "",
      ...(t.relatedTerms.length ? [`Related terms: ${t.relatedTerms.join(", ")}.`, ""] : []),
    ]),
    "## Changelog",
    "",
    ...[...changelog]
      .sort((a, b) => b.date.localeCompare(a.date))
      .flatMap((e) => [`### ${isoDay(e.date)} — ${e.title} (${e.category})`, "", e.summary, "", e.body.trim(), ""]),
    `Note: ${modeledOutcomeCaveat}`,
    "",
  ];
  return lines.join("\n");
}
