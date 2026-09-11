import type { Metadata } from "next";
import Link from "next/link";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Avatar } from "@/components/ui/avatar";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eyebrow } from "@/components/ui/eyebrow";
import { FootnoteRef, Footnotes } from "@/components/ui/footnote";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { Field, Label } from "@/components/ui/label";
import { LogoWall } from "@/components/ui/logo-wall";
import { DotGrid, Glow, HairlineGrid } from "@/components/ui/patterns";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { NativeSelect, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetBody, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Stat, StatGrid } from "@/components/ui/stat";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { WindowFrame } from "@/components/ui/window-frame";
import { LogoMark } from "@/components/site/logo";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createMetadata({
  title: "Design system",
  description:
    "Internal reference for the Meridian website: type scale, color tokens, spacing, shadows, and every UI primitive rendered in its states. Not indexed.",
  path: "/design-system",
  noIndex: true,
});

const toc = [
  ["typography", "Typography"],
  ["color", "Color"],
  ["spacing", "Spacing, radii, shadows"],
  ["buttons", "Buttons"],
  ["badges", "Badges"],
  ["cards", "Cards"],
  ["stats", "Stats"],
  ["forms", "Forms"],
  ["disclosure", "Accordion and tabs"],
  ["overlays", "Tooltip, dialog, sheet"],
  ["tables", "Tables"],
  ["callouts", "Callouts"],
  ["navigation", "Navigation pieces"],
  ["mockup", "Window frame"],
  ["logos", "Logo wall"],
  ["patterns", "Patterns"],
  ["motion", "Motion"],
  ["prose", "Prose"],
] as const;

const neutrals = [
  ["bg", "0.995 0.002 80", "#fefdfc", "page"],
  ["bg-subtle", "0.977 0.004 80", "#f9f7f4", "alternating sections"],
  ["bg-muted", "0.955 0.006 80", "#f2f0ec", "hover fills, code"],
  ["bg-elevated", "1 0 0", "#ffffff", "cards, inputs"],
  ["border", "0.91 0.006 80", "#e3e1dd", "hairlines"],
  ["border-strong", "0.84 0.008 80", "#cdcac5", "inputs, hover borders"],
  ["fg", "0.21 0.012 70", "#1c1712", "ink"],
  ["fg-muted", "0.45 0.012 70", "#5a544e", "ledes, nav"],
  ["fg-subtle", "0.53 0.012 70", "#706b64", "captions"],
  ["fg-faint", "0.70 0.010 75", "#a29e98", "decorative only"],
] as const;

const accents = [
  ["accent", "0.44 0.115 255", "#1f5390", "links, live, chart-1"],
  ["accent-hover", "0.40 0.115 255", "#124784", "link hover"],
  ["accent-pressed", "0.36 0.11 255", "#083c75", "pressed"],
  ["accent-soft", "0.955 0.02 255", "#e7f1fe", "badge fills, selection"],
  ["accent-ring", "0.60 0.12 255", "#4c82c6", "focus ring"],
] as const;

const semantics = [
  ["success", "0.52 0.13 150", "#1d7d3e"],
  ["success-soft", "0.96 0.03 150", "#e4f8e7"],
  ["warning", "0.53 0.125 70", "#995c00"],
  ["warning-soft", "0.965 0.04 85", "#fff2d6"],
  ["danger", "0.52 0.19 27", "#be2323"],
  ["danger-soft", "0.96 0.025 25", "#ffece9"],
] as const;

const charts = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5", "chart-6"] as const;
const sequential = ["seq-1", "seq-2", "seq-3", "seq-4", "seq-5", "seq-6"] as const;

const typeScale = [
  ["display", "text-display", "Newsreader 72 / 1.0 / -0.015em / 400", "Governed agents"],
  ["h1", "text-h1", "Newsreader 56 / 1.05 / -0.015em / 400", "AI agents that run HR and finance."],
  ["h2", "text-h2", "Geist 40 / 1.1 / -0.02em / 500", "One agent per workflow. Twelve workflows."],
  ["h3", "text-h3", "Geist 28 / 1.2 / -0.015em / 500", "Every action logged, every approval named."],
  ["h4", "text-h4", "Geist 22 / 1.3 / -0.01em / 500", "Data it reads and actions it takes"],
  ["h5", "text-h5", "Geist 18 / 1.4 / -0.005em / 500", "Help Desk Agent"],
  ["h6", "text-h6", "Geist 16 / 1.5 / 0 / 600", "What needs approval"],
  ["lede", "text-lede", "Geist 20 / 1.5 / -0.005em / 400 fg-muted", "Narrow, governed agents that do the work. Humans stay accountable."],
  ["body-lg", "text-body-lg", "Geist 18 / 1.6", "The agent reads the pre-run register against the employee master and lists what is wrong."],
  ["body", "text-base", "Geist 16 / 1.6", "Consequential actions require a named approver. Dismissals are logged with a reason."],
  ["small", "text-sm", "Geist 14 / 1.5", "Modeled outcomes from design-partner deployments."],
  ["caption", "text-caption", "Geist 12 / 1.4 / 0.01em fg-subtle", "Updated 08 Sep 2026 · 6 min read"],
  ["eyebrow", "eyebrow", "Geist 12 / 1 / 0.08em uppercase 500", "Platform"],
  ["stat", "text-stat", "Geist 48–56 / 1 / -0.03em / 500 tabular", "283,400"],
  ["mono", "font-mono text-sm", "Geist Mono 14 / 1.6", "CASE-48211 · 2026-09-08T14:02:11Z"],
] as const;

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128] as const;

const registryRows = [
  ["Help Desk Agent", "Halvorsen Health", "GA", "2 min ago", "1,482", "2,964"],
  ["Controls Agent", "Castellan Financial", "GA", "9 min ago", "38,210", "7,642"],
  ["Close Agent", "Northwind Logistics", "GA", "31 min ago", "214", "1,070"],
  ["Recruiting Agent", "Orion Retail Group", "GA", "1 hr ago", "912", "912"],
  ["Revenue Contract Agent", "Summit Bank", "Early access", "3 hr ago", "26", "208"],
] as const;

function Swatch({ name, oklch, hex, use }: { name: string; oklch?: string; hex?: string; use?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-md ring-1 ring-border ring-inset"
        style={{ background: `var(--color-${name})` }}
      />
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs text-fg">{name}</span>
        {oklch ? <span className="font-mono text-[0.6875rem] text-fg-subtle">oklch({oklch})</span> : null}
        {hex ? <span className="font-mono text-[0.6875rem] text-fg-subtle">{hex}</span> : null}
        {use ? <span className="text-[0.6875rem] text-fg-subtle">{use}</span> : null}
      </div>
    </div>
  );
}

function Block({ id, title, lede, children }: { id: string; title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16 first:border-t-0 lg:py-20">
      <div className="mb-10 flex max-w-2xl flex-col gap-3">
        <h2 className="text-h3">{title}</h2>
        {lede ? <p className="text-sm leading-relaxed text-fg-muted">{lede}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Specimen({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-3 font-mono text-[0.6875rem] text-fg-subtle">{label}</p>
      {children}
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Section spacing="compact" bordered="bottom">
        <Container>
          <Breadcrumbs items={[{ label: "Meridian", href: "/" }, { label: "Design system" }]} className="mb-8" />
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>Internal · not indexed</Eyebrow>
            <h1 className="text-h1">Design system</h1>
            <p className="text-lede max-w-[60ch]">
              Every token and primitive on the site, rendered once. If a page and this document disagree, fix the page.
              Source of truth: DESIGN.md.
            </p>
          </div>
        </Container>
      </Section>

      <Container className="lg:grid lg:grid-cols-[12rem_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 pt-16">
            <p className="eyebrow mb-4">On this page</p>
            <ul className="flex flex-col gap-2 border-l border-border">
              {toc.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="-ml-px block border-l border-transparent pl-4 text-[0.8125rem] text-fg-muted transition-colors duration-150 ease-standard hover:border-fg hover:text-fg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="min-w-0">
          <Block id="typography" title="Typography" lede="Geist Sans for UI and h2–h6, Geist Mono for data, Newsreader for display and h1 only. Serif never below 40px.">
            <div className="flex flex-col divide-y divide-border">
              {typeScale.map(([role, cls, spec, sample]) => (
                <div key={role} className="grid gap-3 py-6 md:grid-cols-[10rem_1fr] md:gap-8">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-fg">{role}</span>
                    <span className="text-[0.6875rem] leading-snug text-fg-subtle">{spec}</span>
                  </div>
                  <p className={`${cls} min-w-0 text-balance`}>{sample}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block id="color" title="Color" lede="One warm neutral ramp, one instrument blue. Primary buttons are ink, not blue. Blue is for things you can click inline, things that are live, and the hero object.">
            <div className="flex flex-col gap-12">
              <Specimen label="neutral · warm stone, hue 70–80">
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                  {neutrals.map(([name, oklch, hex, use]) => (
                    <Swatch key={name} name={name} oklch={oklch} hex={hex} use={use} />
                  ))}
                </div>
              </Specimen>
              <Specimen label="accent · instrument blue, hue 255">
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                  {accents.map(([name, oklch, hex, use]) => (
                    <Swatch key={name} name={name} oklch={oklch} hex={hex} use={use} />
                  ))}
                </div>
              </Specimen>
              <Specimen label="semantic">
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
                  {semantics.map(([name, oklch, hex]) => (
                    <Swatch key={name} name={name} oklch={oklch} hex={hex} />
                  ))}
                </div>
              </Specimen>
              <div className="grid gap-12 md:grid-cols-2">
                <Specimen label="charts · categorical, in order">
                  <div className="flex overflow-hidden rounded-md ring-1 ring-border">
                    {charts.map((name) => (
                      <div key={name} className="h-12 flex-1" style={{ background: `var(--color-${name})` }} title={name} />
                    ))}
                  </div>
                </Specimen>
                <Specimen label="charts · sequential accent scale">
                  <div className="flex overflow-hidden rounded-md ring-1 ring-border">
                    {sequential.map((name) => (
                      <div key={name} className="h-12 flex-1" style={{ background: `var(--color-${name})` }} title={name} />
                    ))}
                  </div>
                </Specimen>
              </div>
            </div>
          </Block>

          <Block id="spacing" title="Spacing, radii, shadows" lede="Base unit 4px. Component internals use 4/8/12/16/24; layout uses 32/48/64/96/128. Cards use a hairline at rest, not a shadow.">
            <div className="grid gap-12 lg:grid-cols-2">
              <Specimen label="spacing">
                <div className="flex flex-col gap-2.5">
                  {spacing.map((px) => (
                    <div key={px} className="flex items-center gap-4">
                      <span className="tabular w-8 shrink-0 font-mono text-xs text-fg-subtle">{px}</span>
                      <div className="h-3 rounded-sm bg-accent-soft ring-1 ring-accent/20 ring-inset" style={{ width: px }} />
                    </div>
                  ))}
                </div>
              </Specimen>
              <div className="flex flex-col gap-12">
                <Specimen label="radii">
                  <div className="flex flex-wrap gap-4">
                    {(["sm", "md", "lg", "xl", "2xl"] as const).map((r) => (
                      <div key={r} className="flex flex-col items-center gap-2">
                        <div className="size-16 border border-border-strong bg-bg-elevated" style={{ borderRadius: `var(--radius-${r})` }} />
                        <span className="font-mono text-[0.6875rem] text-fg-subtle">{r}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-2">
                      <div className="size-16 rounded-full border border-border-strong bg-bg-elevated" />
                      <span className="font-mono text-[0.6875rem] text-fg-subtle">full</span>
                    </div>
                  </div>
                </Specimen>
                <Specimen label="shadows · warm ink tint">
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                    {(["xs", "sm", "md", "lg"] as const).map((s) => (
                      <div key={s} className="flex flex-col items-center gap-3">
                        <div className={`h-20 w-full rounded-lg bg-bg-elevated shadow-${s}`} />
                        <span className="font-mono text-[0.6875rem] text-fg-subtle">shadow-{s}</span>
                      </div>
                    ))}
                  </div>
                </Specimen>
              </div>
            </div>
          </Block>

          <Block id="buttons" title="Buttons" lede="Primary is ink. Never two primaries side by side. A trailing arrow is the only decoration and it shifts 2px on hover.">
            <div className="flex flex-col gap-10">
              <Specimen label="variants · md">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Start free</Button>
                  <Button variant="secondary">Book a demo</Button>
                  <Button variant="ghost">Sign in</Button>
                  <Button variant="link">Read the changelog</Button>
                  <Button variant="destructive">Revoke access</Button>
                </div>
              </Specimen>
              <Specimen label="sizes · sm 32 / md 40 / lg 48 / icon 40">
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Start free</Button>
                  <Button size="md">Start free</Button>
                  <Button size="lg">Start free</Button>
                  <Button size="icon" variant="secondary" aria-label="Meridian">
                    <LogoMark className="size-4" />
                  </Button>
                </div>
              </Specimen>
              <Specimen label="states · arrow, loading, disabled">
                <div className="flex flex-wrap items-center gap-3">
                  <Button arrow>See all agents</Button>
                  <Button variant="secondary" arrow>
                    See it live
                  </Button>
                  <Button loading>Saving</Button>
                  <Button variant="secondary" disabled>
                    Disabled
                  </Button>
                  <Button asChild variant="secondary">
                    <Link href="/pricing">As a link</Link>
                  </Button>
                </div>
              </Specimen>
            </div>
          </Block>

          <Block id="badges" title="Badges" lede="12px/500, pill, 22px tall. GA is neutral with a 6px success dot; Early access is accent.">
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status="GA" />
              <StatusBadge status="Early access" />
              <Badge>Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success" dot>
                Approved
              </Badge>
              <Badge variant="warning" dot>
                Needs approval
              </Badge>
              <Badge variant="danger" dot>
                Blocked
              </Badge>
              <Badge variant="ink">Recommended</Badge>
              <Badge size="sm">sm</Badge>
              <StatusBadge status="GA" size="sm" />
            </div>
          </Block>

          <Block id="cards" title="Cards" lede="bg-elevated, hairline border, radius lg, 24px padding (28 on lg). Interactive cards raise the border and gain shadow-sm; the whole card is the link.">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card interactive as="article">
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle>Help Desk Agent</CardTitle>
                    <StatusBadge status="GA" />
                  </div>
                  <CardDescription>Answers employee questions from policy and the system of record; opens and resolves cases.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrowLink href="/agents/help-desk" size="sm" className="after:absolute after:inset-0">
                    Deflects up to 75% of case volume
                  </ArrowLink>
                </CardContent>
              </Card>
              <Card variant="subtle">
                <CardHeader>
                  <CardTitle>Subtle</CardTitle>
                  <CardDescription>bg-subtle, no hairline. For inset panels and secondary groupings.</CardDescription>
                </CardHeader>
              </Card>
              <Card variant="outline" padding="lg">
                <CardHeader>
                  <CardTitle>Outline, lg padding</CardTitle>
                  <CardDescription>Transparent with a hairline. Sits on bg-subtle sections.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Block>

          <Block id="stats" title="Stats" lede="48–56px Geist 500 tabular, unit inline at 60%, footnote marker as a superscript link, label 14px below. Grid of 3 or 4 with hairline dividers, not cards.">
            <StatGrid>
              <Stat value="75" unit="%" label="of HR cases deflected" footnote={1} footnoteScope="ds" />
              <Stat prefix="~" value="900" unit="hrs" label="saved per audit year" footnote={1} footnoteScope="ds" />
              <Stat value={<AnimatedNumber value={283} />} prefix="$" unit="K" label="duplicate payments avoided per year" footnote={1} footnoteScope="ds" delta={{ value: "12%", direction: "up" }} />
              <Stat value="3" unit="days" label="shorter month-end close" footnote={1} footnoteScope="ds" delta={{ value: "1 day", direction: "down", tone: "success" }} />
            </StatGrid>
            <Footnotes scope="ds" className="mt-10" />
          </Block>

          <Block id="forms" title="Forms" lede="40px controls, bg-elevated, border-strong, radius md, 14px. Labels 14px/500 above with a 6px gap; help and error 13px below.">
            <div className="grid max-w-3xl gap-6 md:grid-cols-2">
              <Field label="Work email" htmlFor="ds-email" help="We reply within one business day.">
                <Input id="ds-email" type="email" placeholder="you@company.com" />
              </Field>
              <Field label="Company" htmlFor="ds-company" optional>
                <Input id="ds-company" placeholder="Halvorsen Health" />
              </Field>
              <Field label="Employees" htmlFor="ds-employees" error="Enter a whole number.">
                <Input id="ds-employees" inputMode="numeric" defaultValue="12,000" invalid />
              </Field>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ds-region">Data region</Label>
                <Select defaultValue="us">
                  <SelectTrigger id="ds-region">
                    <SelectValue placeholder="Choose a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="eu">European Union</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="ds-native">Native select</Label>
                <NativeSelect id="ds-native" defaultValue="growth">
                  <option value="starter">Starter</option>
                  <option value="growth">Growth</option>
                  <option value="enterprise">Enterprise</option>
                </NativeSelect>
              </div>
              <Field label="Disabled" htmlFor="ds-disabled">
                <Input id="ds-disabled" disabled defaultValue="Read only" />
              </Field>
              <Field label="What should the first agent do?" htmlFor="ds-notes" className="md:col-span-2">
                <Textarea id="ds-notes" placeholder="One workflow, one approver, one number to move." />
              </Field>
              <div className="flex flex-wrap items-center gap-3 md:col-span-2">
                <Input size="sm" placeholder="sm · 32px" className="max-w-40" />
                <Input size="md" placeholder="md · 40px" className="max-w-40" />
                <Input size="lg" placeholder="lg · 48px" className="max-w-40" />
              </div>
            </div>
          </Block>

          <Block id="disclosure" title="Accordion and tabs" lede="Both keep every panel in the DOM so search engines read the answers. Accordion content animates height; tabs are underline style.">
            <div className="grid gap-12 lg:grid-cols-2">
              <Specimen label="accordion · single, collapsible">
                <Accordion type="single" collapsible defaultValue="a1">
                  <AccordionItem value="a1">
                    <AccordionTrigger>Which models does Meridian run on?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Bring your own frontier model. Meridian supports Anthropic Claude and OpenAI models, and routes
                        HR- and finance-specific reasoning to its own tuned models. The choice is per workspace and can
                        change at any time.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="a2">
                    <AccordionTrigger>Does any agent act without a person approving?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        No consequential action does. Approval holds are enforced at the Gateway, below the agent, and
                        every allow, deny, and hold decision is written to the audit trail with the policy version.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="a3">
                    <AccordionTrigger>How long until the first agent is live?</AccordionTrigger>
                    <AccordionContent>
                      <p>Design partners connected systems in week one and ran a live pilot in weeks three to five.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Specimen>
              <Specimen label="tabs · underline">
                <Tabs defaultValue="registry">
                  <TabsList>
                    <TabsTrigger value="registry">Registry</TabsTrigger>
                    <TabsTrigger value="gateway">Gateway</TabsTrigger>
                    <TabsTrigger value="fabric">Data Fabric</TabsTrigger>
                    <TabsTrigger value="studio">Studio</TabsTrigger>
                  </TabsList>
                  <TabsContent value="registry" className="text-sm leading-relaxed text-fg-muted">
                    One record for every agent: owner, role, permissions, data touched, compliance status, and outcomes
                    next to your human team&apos;s metrics.
                  </TabsContent>
                  <TabsContent value="gateway" className="text-sm leading-relaxed text-fg-muted">
                    Connect third-party agents over MCP and agent-to-agent protocols. OpenTelemetry for traces, logs, and
                    metrics. Identity from your IdP.
                  </TabsContent>
                  <TabsContent value="fabric" className="text-sm leading-relaxed text-fg-muted">
                    Zero-copy access to Snowflake, Databricks, and BigQuery. SQL access, Apache Iceberg lakehouse, 3,000+
                    prebuilt connectors.
                  </TabsContent>
                  <TabsContent value="studio" className="text-sm leading-relaxed text-fg-muted">
                    A low-code builder on your data and Meridian&apos;s guardrails. Agents you build get the same registry
                    record and the same approval holds.
                  </TabsContent>
                </Tabs>
              </Specimen>
            </div>
          </Block>

          <Block id="overlays" title="Tooltip, dialog, sheet" lede="Tooltips are ink at 12px, 160ms. Dialogs are bg-elevated at radius xl with shadow-lg. Sheets slide in from the right in 400ms.">
            <div className="flex flex-wrap items-center gap-3">
              <SimpleTooltip content="Copies the case ID">
                <Button variant="secondary">
                  Hover me <Kbd>C</Kbd>
                </Button>
              </SimpleTooltip>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Open dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Approve payroll correction</DialogTitle>
                    <DialogDescription>
                      CASE-48211 · Garnishment for employee 10422 exceeds the state cap by $84.10. The agent proposes
                      capping the deduction this cycle.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="ghost">Dismiss with reason</Button>
                    <Button>Approve correction</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary">Open sheet</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="flex-col items-start justify-center gap-1">
                    <SheetTitle>Case detail</SheetTitle>
                    <SheetDescription>CASE-48211 · Halvorsen Health</SheetDescription>
                  </SheetHeader>
                  <SheetBody className="p-5 text-sm leading-relaxed text-fg-muted">
                    Opened 08 Sep 2026 14:02 UTC by the Help Desk Agent. Policy cited: PTO carryover, section 4.2.
                    Awaiting approval from the HR business partner.
                  </SheetBody>
                </SheetContent>
              </Sheet>
            </div>
          </Block>

          <Block id="tables" title="Tables" lede="Hairline rows only, no vertical rules, header 12px uppercase on bg-subtle, 14px cells, numeric cells right-aligned and tabular, row hover bg-subtle.">
            <Table>
              <TableCaption>Registry · agents by last run. Sample data.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last run</TableHead>
                  <TableHead numeric>Actions (30d)</TableHead>
                  <TableHead numeric>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registryRows.map(([agent, owner, status, last, actions, credits]) => (
                  <TableRow key={agent}>
                    <TableCell className="font-medium">{agent}</TableCell>
                    <TableCell className="text-fg-muted">{owner}</TableCell>
                    <TableCell>
                      <StatusBadge status={status} />
                    </TableCell>
                    <TableCell className="text-fg-muted">{last}</TableCell>
                    <TableCell numeric>{actions}</TableCell>
                    <TableCell numeric>{credits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Block>

          <Block id="callouts" title="Callouts" lede="Tinted notes with a hairline in the semantic color. Neutral is for key takeaways in articles.">
            <div className="grid gap-4 md:grid-cols-2">
              <Callout title="Key takeaways">
                <ul>
                  <li>Narrow beats general: one workflow per agent.</li>
                  <li>Approval holds live below the agent, at the Gateway.</li>
                  <li>Measure one number before adding a second agent.</li>
                </ul>
              </Callout>
              <Callout variant="info" title="Bring your own model">
                Meridian supports Anthropic Claude and OpenAI models. Choose per workspace; change at any time.
              </Callout>
              <Callout variant="success" title="Approved">
                Correction applied to the 15 Sep run. Logged as APPR-2231 by D. Okafor.
              </Callout>
              <Callout variant="warning" title="Needs approval">
                Three garnishment deductions exceed the state cap. Review before cutoff on Friday.
              </Callout>
              <Callout variant="danger" title="Blocked by policy">
                The agent attempted a write outside its data scope. The action was denied and logged.
              </Callout>
            </div>
          </Block>

          <Block id="navigation" title="Navigation pieces" lede="Breadcrumbs at 13px, arrow links that move 2px on hover, kbd, initials avatars, separators.">
            <div className="flex flex-col gap-10">
              <Specimen label="breadcrumbs">
                <Breadcrumbs items={[{ label: "Agents", href: "/agents" }, { label: "Finance", href: "/agents#finance" }, { label: "Controls Agent" }]} />
              </Specimen>
              <Specimen label="arrow links · fg / accent / muted / external">
                <div className="flex flex-wrap items-center gap-8">
                  <ArrowLink href="/agents">See all agents</ArrowLink>
                  <ArrowLink href="/dashboard" tone="accent">
                    See it live
                  </ArrowLink>
                  <ArrowLink href="/pricing" tone="muted" size="sm">
                    Compare plans
                  </ArrowLink>
                  <ArrowLink href="https://modelcontextprotocol.io" external tone="muted" size="sm">
                    MCP specification
                  </ArrowLink>
                </div>
              </Specimen>
              <Specimen label="kbd · avatar · separator">
                <div className="flex flex-wrap items-center gap-6">
                  <span className="text-sm text-fg-muted">
                    Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search
                  </span>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center gap-2">
                    <Avatar name="Dana Okafor" size="sm" />
                    <Avatar name="Priya Natarajan" />
                    <Avatar name="Tomasz Wierzbicki" size="lg" tone="ink" />
                    <Avatar name="Meridian" size="lg" tone="accent" />
                  </div>
                </div>
              </Specimen>
            </div>
          </Block>

          <Block id="mockup" title="Window frame" lede="Product mockup chrome: 40px title bar, three neutral dots, optional URL pill. Inside: 13px body, 12px labels, tabular numerals, real-looking data, one accent per view.">
            <WindowFrame url="app.meridian.example/registry" actions={<Badge variant="success" dot size="sm">Live</Badge>}>
              <div className="grid md:grid-cols-[13rem_1fr]">
                <aside className="hidden border-r border-border bg-bg-subtle/60 p-3 md:block">
                  <p className="eyebrow px-2 pt-1 pb-2">Workspace</p>
                  <ul className="flex flex-col gap-0.5 text-[0.8125rem]">
                    {["Registry", "Approvals", "Audit trail", "Credits", "Settings"].map((item, i) => (
                      <li key={item} className={`rounded-md px-2 py-1.5 ${i === 0 ? "bg-bg-elevated font-medium text-fg ring-1 ring-border" : "text-fg-muted"}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </aside>
                <div className="min-w-0">
                  <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-fg">Agents</p>
                      <p className="text-xs text-fg-subtle">12 registered · 9 GA · 3 early access</p>
                    </div>
                    <Button size="sm" variant="secondary">
                      Register agent
                    </Button>
                  </div>
                  <Table framed={false}>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Agent</TableHead>
                        <TableHead className="hidden sm:table-cell">Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead numeric>Credits</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {registryRows.map(([agent, owner, status, , , credits]) => (
                        <TableRow key={agent}>
                          <TableCell className="py-2.5 text-[0.8125rem] font-medium">{agent}</TableCell>
                          <TableCell className="hidden py-2.5 text-[0.8125rem] text-fg-muted sm:table-cell">{owner}</TableCell>
                          <TableCell className="py-2.5">
                            <StatusBadge status={status} size="sm" />
                          </TableCell>
                          <TableCell numeric className="py-2.5 text-[0.8125rem]">
                            {credits}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </WindowFrame>
          </Block>

          <Block id="logos" title="Logo wall" lede="Eight fictional design partners set in type, fg-subtle at rest and fg on hover. Marquee 48s, pauses on hover, static grid under reduced motion.">
            <div className="flex flex-col gap-12">
              <LogoWall label="Design partners in healthcare, logistics, financial services, retail, energy, and manufacturing" />
              <Specimen label='variant="grid"'>
                <LogoWall variant="grid" />
              </Specimen>
            </div>
          </Block>

          <Block id="patterns" title="Patterns" lede="DotGrid, HairlineGrid, Glow. At most one texture per section, never behind running text, never animated.">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="relative isolate h-48 overflow-hidden rounded-lg border border-border">
                <DotGrid />
                <span className="absolute bottom-3 left-3 font-mono text-[0.6875rem] text-fg-subtle">DotGrid</span>
              </div>
              <div className="relative isolate h-48 overflow-hidden rounded-lg border border-border">
                <HairlineGrid />
                <span className="absolute bottom-3 left-3 font-mono text-[0.6875rem] text-fg-subtle">HairlineGrid</span>
              </div>
              <div className="relative isolate h-48 overflow-hidden rounded-lg border border-border">
                <Glow position="center" className="h-40 w-64" />
                <span className="absolute bottom-3 left-3 font-mono text-[0.6875rem] text-fg-subtle">Glow</span>
              </div>
            </div>
          </Block>

          <Block id="motion" title="Motion" lede="Reveal: opacity and 12px rise over 400ms, once, staggered 60ms across at most six siblings. Count-ups: 1200ms ease-out-expo, tabular, SSR renders the final value.">
            <RevealGroup className="grid gap-4 sm:grid-cols-3">
              {["Scoped to one workflow", "Reads only permitted data", "Every action logged", "Approval for consequential actions", "Measurable outcome", "Runs on your chosen model"].map((tenet) => (
                <RevealItem key={tenet}>
                  <Card padding="sm" className="text-sm font-medium">
                    {tenet}
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-10">
              <StatGrid columns={3}>
                <Stat value={<AnimatedNumber value={12} />} label="agents in the registry" size="md" />
                <Stat value={<AnimatedNumber value={99.95} decimals={2} />} unit="%" label="uptime SLA, Enterprise" size="md" />
                <Stat value={<AnimatedNumber value={3000} />} unit="+" label="prebuilt connectors" size="md" />
              </StatGrid>
            </Reveal>
          </Block>

          <Block id="prose" title="Prose" lede="Article typography via .prose-meridian. 17px/1.7 body, h2 28, h3 22, hairline tables, ink code blocks.">
            <div className="prose-meridian max-w-narrow">
              <p className="lead">
                A narrow agent is scoped to one workflow, reads only the data it is permitted to, and reports one number.
              </p>
              <h2>Why narrow beats general</h2>
              <p>
                General assistants answer questions. Narrow agents finish work. The difference is a contract: the agent
                owns a workflow, a data scope, and an outcome, and a named person owns every consequential decision.
                <FootnoteRef n={1} scope="prose" />
              </p>
              <ul>
                <li>One workflow, one owner, one metric.</li>
                <li>
                  Approval holds are enforced below the agent, at the{" "}
                  <Link href="/platform/gateway">Gateway</Link>.
                </li>
                <li>
                  Every action is logged with the policy version that allowed it, e.g. <code>policy@2026.09.1</code>.
                </li>
              </ul>
              <h3>What the log records</h3>
              <pre>
                <code>{`{ "case": "CASE-48211", "action": "close", "approver": "d.okafor", "policy": "2026.09.1" }`}</code>
              </pre>
              <blockquote>
                <p>We stopped asking whether the agent was right and started asking who approved it. That is the change.</p>
                <cite>Dana Okafor, VP People Operations, Halvorsen Health</cite>
              </blockquote>
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Credits</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>HR case resolved</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Contract redline</td>
                    <td>8</td>
                  </tr>
                </tbody>
              </table>
              <Footnotes scope="prose" />
            </div>
          </Block>
        </div>
      </Container>
    </>
  );
}
