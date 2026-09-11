import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

import { SectionIntro } from "./section-intro";

interface Stage {
  title: string;
  lines: [string, string];
  legend: string;
}

const stages: Stage[] = [
  {
    title: "Customer systems",
    lines: ["HRIS, payroll, ledger,", "warehouse. Data stays put."],
    legend: "HRIS, ATS, payroll, ERP, CLM, and the warehouse. Records are read in place; zero-copy sources are never moved.",
  },
  {
    title: "Data Fabric",
    lines: ["Read scopes, zero-copy.", "Source permissions apply."],
    legend: "Data Fabric issues read scopes per agent. Every query carries the acting identity, and the source system’s permissions apply.",
  },
  {
    title: "Agents",
    lines: ["One workflow each.", "Scope from Registry."],
    legend: "Each agent reasons over the scoped context for its one workflow, on the model you chose, inside the region you selected.",
  },
  {
    title: "Approvals",
    lines: ["Held at the Gateway", "for a named person."],
    legend: "Consequential actions stop at the Gateway until the approver you named approves, edits, or declines with a reason.",
  },
  {
    title: "Actions",
    lines: ["Written back under the", "approver’s identity."],
    legend: "Approved actions are written to the system of record under the approver’s identity, then confirmed back to the log.",
  },
];

const AUDIT_TITLE = "Audit trail";
const AUDIT_LINE = "Every read, reasoning step, tool call, approval, and action. Hashed, chained, streamed to your SIEM.";

const box = "fill-bg-elevated stroke-border-strong";
const boxAccent = "fill-accent-soft stroke-accent";
const title = "fill-fg text-[14px] font-medium";
const sub = "fill-fg-muted text-[12px]";
const label = "fill-fg-subtle text-[12px] font-medium tracking-[0.06em] uppercase";

/** Horizontal layout, lg and up. Five stages across, the audit rail beneath. */
function HorizontalDiagram() {
  const w = 184;
  const h = 96;
  const gap = 36;
  const y = 64;
  const xs = stages.map((_, i) => 28 + i * (w + gap));
  const railY = 240;
  return (
    <svg
      viewBox="0 0 1120 330"
      role="img"
      aria-labelledby="data-flow-title-h"
      aria-describedby="data-flow-legend"
      className="hidden h-auto w-full lg:block"
    >
      <title id="data-flow-title-h">Data flow from customer systems through Data Fabric, agents, approvals, and actions, with the audit trail beside every stage</title>
      <defs>
        <marker id="arrow-h" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0.5 L7.5,4 L0,7.5 z" className="fill-fg-subtle" />
        </marker>
      </defs>

      {/* Gateway enforcement boundary around agents, approvals, actions */}
      <rect x={xs[2] - 14} y={y - 24} width={xs[4] + w + 14 - (xs[2] - 14)} height={h + 48} rx="14" className="fill-none stroke-border-strong" strokeDasharray="4 4" />
      <text x={xs[2]} y={y - 8} className={label}>
        Gateway enforcement boundary
      </text>

      {stages.map((stage, i) => {
        const x = xs[i];
        const accent = i === 3;
        return (
          <g key={stage.title}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={accent ? boxAccent : box} />
            <text x={x + 16} y={y + 32} className={title}>
              {stage.title}
            </text>
            <text x={x + 16} y={y + 55} className={sub}>
              {stage.lines[0]}
            </text>
            <text x={x + 16} y={y + 72} className={sub}>
              {stage.lines[1]}
            </text>
            {i < stages.length - 1 ? (
              <line
                x1={x + w + 2}
                y1={y + h / 2}
                x2={x + w + gap - 2}
                y2={y + h / 2}
                className="stroke-fg-subtle"
                strokeWidth="1.25"
                markerEnd="url(#arrow-h)"
              />
            ) : null}
            <line
              x1={x + w / 2}
              y1={y + h + 2}
              x2={x + w / 2}
              y2={railY - 2}
              className="stroke-border-strong"
              strokeWidth="1.25"
              strokeDasharray="3 4"
              markerEnd="url(#arrow-h)"
            />
          </g>
        );
      })}

      {/* Audit rail */}
      <rect x="28" y={railY} width="1064" height="64" rx="10" className="fill-bg-subtle stroke-border" />
      <text x="48" y={railY + 28} className={title}>
        {AUDIT_TITLE}
      </text>
      <text x="48" y={railY + 48} className={sub}>
        {AUDIT_LINE}
      </text>
      <text x="1072" y={railY + 38} textAnchor="end" className="fill-fg-subtle font-mono text-[11.5px]">
        OTLP · syslog · scheduled export
      </text>
    </svg>
  );
}

/** Vertical layout below lg. Stages stacked, the audit rail as a column on the right. */
function VerticalDiagram() {
  const w = 208;
  const h = 84;
  const gap = 40;
  const x = 20;
  const ys = stages.map((_, i) => 40 + i * (h + gap));
  const railX = 268;
  const last = ys[ys.length - 1] + h;
  return (
    <svg
      viewBox="0 0 360 668"
      role="img"
      aria-labelledby="data-flow-title-v"
      aria-describedby="data-flow-legend"
      className="mx-auto h-auto w-full max-w-[24rem] lg:hidden"
    >
      <title id="data-flow-title-v">Data flow from customer systems through Data Fabric, agents, approvals, and actions, with the audit trail beside every stage</title>
      <defs>
        <marker id="arrow-v" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0.5 L7.5,4 L0,7.5 z" className="fill-fg-subtle" />
        </marker>
      </defs>

      <rect x={x - 12} y={ys[2] - 12} width={w + 24} height={last - ys[2] + 40} rx="14" className="fill-none stroke-border-strong" strokeDasharray="4 4" />
      <text x={x} y={last + 20} className={label}>
        Gateway boundary
      </text>

      {stages.map((stage, i) => {
        const y = ys[i];
        const accent = i === 3;
        return (
          <g key={stage.title}>
            <rect x={x} y={y} width={w} height={h} rx="10" className={accent ? boxAccent : box} />
            <text x={x + 16} y={y + 30} className={title}>
              {stage.title}
            </text>
            <text x={x + 16} y={y + 51} className={sub}>
              {stage.lines[0]}
            </text>
            <text x={x + 16} y={y + 67} className={sub}>
              {stage.lines[1]}
            </text>
            {i < stages.length - 1 ? (
              <line
                x1={x + w / 2}
                y1={y + h + 2}
                x2={x + w / 2}
                y2={y + h + gap - 2}
                className="stroke-fg-subtle"
                strokeWidth="1.25"
                markerEnd="url(#arrow-v)"
              />
            ) : null}
            <line
              x1={x + w + 2}
              y1={y + h / 2}
              x2={railX - 2}
              y2={y + h / 2}
              className="stroke-border-strong"
              strokeWidth="1.25"
              strokeDasharray="3 4"
              markerEnd="url(#arrow-v)"
            />
          </g>
        );
      })}

      <rect x={railX} y={ys[0]} width="72" height={last - ys[0]} rx="10" className="fill-bg-subtle stroke-border" />
      <text
        x={railX + 36}
        y={(ys[0] + last) / 2}
        textAnchor="middle"
        transform={`rotate(-90 ${railX + 36} ${(ys[0] + last) / 2})`}
        className={title}
      >
        {AUDIT_TITLE} · hashed and chained
      </text>
    </svg>
  );
}

export function DataFlowDiagram() {
  return (
    <Section id="data-flow" background="subtle" bordered="both" aria-labelledby="data-flow-heading">
      <Container>
        <SectionIntro
          id="data-flow-heading"
          eyebrow="Data flow"
          title="Where data goes, and where it does not."
          lede="Agents read in place through Data Fabric, reason inside the region you chose, and stop at the Gateway before any consequential action. The audit trail records every stage."
        />
        <Reveal>
          <figure className="rounded-xl border border-border bg-bg-elevated p-4 sm:p-6 lg:p-8">
            <HorizontalDiagram />
            <VerticalDiagram />
            <figcaption className="sr-only">
              Five stages left to right: customer systems, Data Fabric, agents, approvals, actions. The audit trail
              receives an entry from every stage.
            </figcaption>
          </figure>
        </Reveal>
        <ol
          id="data-flow-legend"
          className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-5"
        >
          {stages.map((stage, index) => (
            <li key={stage.title} className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="tabular font-mono text-xs text-fg-subtle">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="text-base font-medium text-fg">{stage.title}</h3>
              </div>
              <p className="text-[0.8125rem] leading-relaxed text-fg-muted">{stage.legend}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 max-w-[80ch] text-[0.8125rem] leading-relaxed text-fg-muted">
          <span className="font-medium text-fg">{AUDIT_TITLE}.</span> {AUDIT_LINE} Entries carry the acting identity
          and a timestamp; each hash includes the previous entry’s hash, so a gap or edit is detectable.
        </p>
      </Container>
    </Section>
  );
}
