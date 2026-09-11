import { cn } from "@/lib/utils";

/*
 * Platform architecture as inline SVG (server-rendered, real text nodes).
 * Two variants: a landscape diagram from lg up and a stacked variant below lg
 * so labels stay >= 12px at 390px. Hairline boxes and connectors in tokens.
 *
 * Geometry rules, so the diagram stays a system rather than a drawing:
 * - Every node is one of exactly two widths per variant (WIDE / NARROW below).
 * - Every node carries a 2px cap rule on its top edge; the rule is ink on the
 *   one node the diagram is about and `border-strong` on the rest.
 * - Both groups (inside the boundary, outside it) are drawn as a rounded
 *   hairline container with its name seated into the top rule.
 */

const TITLE = "fill-fg text-[15px] font-medium";
const SUB = "fill-fg-muted text-[12px]";
const ROW = "fill-fg text-[12px]";
const LABEL = "fill-fg-subtle text-[12px]";
const BOX = "fill-bg-elevated stroke-border";
const HAIR = "fill-none stroke-border-strong";

/** Landscape node widths. */
const LG_WIDE = 300;
const LG_NARROW = 180;
/** Stacked node widths. */
const SM_WIDE = 300;
const SM_NARROW = 144;

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  rows?: string[];
  /**
   * Marks the one node the diagram is about. Every node carries the same cap
   * rule on its top edge; emphasis only changes that rule from `border-strong`
   * to ink, the same device as the site's `border-t border-fg` column headers.
   * Exactly one node per diagram may carry it.
   */
  emphasis?: boolean;
}

function Node({ x, y, w, h, title, sub, rows, emphasis }: NodeProps) {
  const px = 18;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} vectorEffect="non-scaling-stroke" className={BOX} />
      <line
        x1={x + 10}
        x2={x + w - 10}
        y1={y}
        y2={y}
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className={emphasis ? "stroke-fg" : "stroke-border-strong"}
      />
      <text x={x + px} y={y + 28} className={TITLE}>
        {title}
      </text>
      {sub ? (
        <text x={x + px} y={y + 48} className={SUB}>
          {sub}
        </text>
      ) : null}
      {rows && rows.length > 0 ? (
        <>
          <line
            x1={x + px}
            x2={x + w - px}
            y1={y + 60}
            y2={y + 60}
            vectorEffect="non-scaling-stroke"
            className="stroke-border"
          />
          {rows.map((row, index) => (
            <text key={row} x={x + px} y={y + 80 + index * 18} className={ROW}>
              {row}
            </text>
          ))}
        </>
      ) : null}
    </g>
  );
}

function Chip({ x, y, w, label }: { x: number; y: number; w: number; label: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={24} rx={6} vectorEffect="non-scaling-stroke" className="fill-bg-subtle stroke-border" />
      <text x={x + w / 2} y={y + 16} textAnchor="middle" className="fill-fg-muted text-[12px]">
        {label}
      </text>
    </g>
  );
}

/** A system outside the trust boundary. Tinted rather than elevated, so the two populations read apart. */
function Ext({ x, y, w, title, sub }: { x: number; y: number; w: number; title: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={56} rx={8} vectorEffect="non-scaling-stroke" className="fill-bg-subtle stroke-border" />
      <text x={x + 14} y={y + 23} className="fill-fg text-[13px] font-medium">
        {title}
      </text>
      <text x={x + 14} y={y + 42} className={SUB}>
        {sub}
      </text>
    </g>
  );
}

/**
 * A group name seated into the top rule of the container it names rather than
 * floated beside it: an unbordered `bg` gap breaks the rule and the centred
 * label keeps equal padding on both sides. `cy` is the y of that rule.
 */
function Legend({ x, cy, w, id, label }: { x: number; cy: number; w: number; id: string; label: string }) {
  return (
    <g>
      <rect x={x} y={cy - 10} width={w} height={20} className="fill-bg" />
      <text id={id} x={x + w / 2} y={cy + 4} textAnchor="middle" className="fill-fg text-[12px] font-medium tracking-[0.04em]">
        {label}
      </text>
    </g>
  );
}

function ArrowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M1 0.75 L7 4 L1 7.25" className="fill-none stroke-fg-subtle" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
  );
}

const DESCRIPTION =
  "Assist is the front door for employees, managers, and finance teams. It runs agents that are recorded in the Registry, the system of record. The Gateway sits at the edge of the trust boundary and connects third-party agents over Model Context Protocol and agent-to-agent protocols, identity providers over OpenID Connect, SAML, and SCIM, and observability tools over OpenTelemetry. Studio publishes custom agents into the Registry. The Data Fabric at the base reads Snowflake, Databricks, BigQuery, an Apache Iceberg lakehouse, and 3,000+ connectors in place. Trust bounds all of it with approval holds, an immutable audit trail, role-based access, and data residency.";

function LandscapeDiagram({ className }: { className?: string }) {
  const m = "url(#arch-arrow-lg)";
  return (
    <svg
      viewBox="0 0 1024 568"
      role="img"
      aria-labelledby="arch-lg-title"
      aria-describedby="arch-lg-desc"
      className={cn("font-sans h-auto w-full", className)}
    >
      <title id="arch-lg-title">Meridian platform architecture</title>
      <desc id="arch-lg-desc">{DESCRIPTION}</desc>
      <ArrowDefs id="arch-arrow-lg" />

      {/* Trust boundary */}
      <rect x={16} y={24} width={756} height={528} rx={16} vectorEffect="non-scaling-stroke" className={HAIR} />
      <Legend x={44} cy={24} w={112} id="arch-lg-legend" label="Trust boundary" />
      <text x={44} y={532} className={LABEL}>
        Approval holds · immutable audit trail · role-based access · SOC 2 Type II · ISO 27001 · EU/US residency
      </text>

      {/* People -> Assist */}
      <text x={394} y={58} textAnchor="middle" className={LABEL}>
        Employees · managers · finance teams
      </text>
      <line x1={394} y1={66} x2={394} y2={86} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={244} y={88} w={LG_WIDE} h={68} title="Assist" sub="Front door · browser, Slack, Microsoft Teams" />

      {/* Assist -> Registry */}
      <line x1={394} y1={156} x2={394} y2={206} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={404} y={186} className={LABEL}>
        runs agents as the user
      </text>

      <Node
        x={244}
        y={208}
        w={LG_WIDE}
        h={112}
        title="Registry"
        sub="System of record for every agent"
        rows={["Owner · role · permissions · data · status", "Meridian, partner, and Studio-built agents"]}
        emphasis
      />

      {/* Studio -> Registry */}
      <Node x={40} y={232} w={LG_NARROW} h={64} title="Studio" sub="Low-code builder" />
      <line x1={222} y1={264} x2={242} y2={264} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      {/* Registry <-> Gateway */}
      <line x1={546} y1={264} x2={566} y2={264} vectorEffect="non-scaling-stroke" className={HAIR} markerStart={m} markerEnd={m} />
      <Node
        x={568}
        y={208}
        w={LG_NARROW}
        h={112}
        title="Gateway"
        sub="Policy enforcement point"
        rows={["Approval holds · scopes", "Cost ceilings · identity"]}
      />

      {/* Outside the boundary */}
      <rect x={796} y={140} width={212} height={248} rx={16} vectorEffect="non-scaling-stroke" className="fill-none stroke-border" />
      <Legend x={831} cy={140} w={142} id="arch-lg-outside" label="Outside the boundary" />
      <path d="M812 192 H780 V264 H752" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <path d="M748 264 H812" vectorEffect="non-scaling-stroke" className={HAIR} />
      <path d="M748 264 H780 V336 H808" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <Ext x={812} y={164} w={LG_NARROW} title="Third-party agents" sub="MCP · A2A protocols" />
      <Ext x={812} y={236} w={LG_NARROW} title="Identity provider" sub="OIDC · SAML · SCIM" />
      <Ext x={812} y={308} w={LG_NARROW} title="Observability" sub="OpenTelemetry (OTLP)" />

      {/* Down to Data Fabric */}
      <path d="M130 296 V332 H314 V368" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <line x1={394} y1={320} x2={394} y2={368} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={404} y={358} className={LABEL}>
        every read logged
      </text>
      <path d="M658 320 V332 H514 V368" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={668} y={350} className={LABEL}>
        scoped reads
      </text>

      <Node x={244} y={372} w={LG_WIDE} h={128} title="Data Fabric" sub="Zero-copy access · security inherited" />
      <Chip x={262} y={434} w={78} label="Snowflake" />
      <Chip x={348} y={434} w={84} label="Databricks" />
      <Chip x={440} y={434} w={72} label="BigQuery" />
      <Chip x={262} y={466} w={106} label="Apache Iceberg" />
      <Chip x={376} y={466} w={124} label="3,000+ connectors" />
    </svg>
  );
}

function StackedDiagram({ className }: { className?: string }) {
  const m = "url(#arch-arrow-sm)";
  return (
    <svg
      viewBox="0 0 344 580"
      role="img"
      aria-labelledby="arch-sm-title"
      aria-describedby="arch-sm-desc"
      className={cn("font-sans h-auto w-full", className)}
    >
      <title id="arch-sm-title">Meridian platform architecture</title>
      <desc id="arch-sm-desc">{DESCRIPTION}</desc>
      <ArrowDefs id="arch-arrow-sm" />

      <rect x={6} y={12} width={332} height={556} rx={14} vectorEffect="non-scaling-stroke" className={HAIR} />
      <Legend x={20} cy={12} w={112} id="arch-sm-legend" label="Trust boundary" />

      <text x={172} y={44} textAnchor="middle" className={LABEL}>
        Employees · managers · finance teams
      </text>
      <line x1={172} y1={50} x2={172} y2={66} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={22} y={68} w={SM_WIDE} h={60} title="Assist" sub="Front door · browser, Slack, Teams" />
      <line x1={172} y1={128} x2={172} y2={150} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node
        x={22}
        y={152}
        w={SM_WIDE}
        h={92}
        title="Registry"
        sub="System of record for every agent"
        rows={["Owner · role · permissions · data · status"]}
        emphasis
      />

      <path d="M172 244 V256 H94 V266" vectorEffect="non-scaling-stroke" className={HAIR} />
      <path d="M172 244 V256 H250 V266" vectorEffect="non-scaling-stroke" className={HAIR} />

      <Node x={22} y={268} w={SM_NARROW} h={100} title="Studio" sub="Low-code builder" rows={["Approvals built in", "Evaluation sets"]} />
      <Node x={178} y={268} w={SM_NARROW} h={100} title="Gateway" sub="Policy on every call" rows={["MCP · A2A · OTLP", "OIDC · SAML · SCIM"]} />

      <line x1={94} y1={368} x2={94} y2={390} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <line x1={250} y1={368} x2={250} y2={390} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={22} y={392} w={SM_WIDE} h={124} title="Data Fabric" sub="Zero-copy · security inherited" />
      <Chip x={40} y={448} w={78} label="Snowflake" />
      <Chip x={126} y={448} w={84} label="Databricks" />
      <Chip x={218} y={448} w={72} label="BigQuery" />
      <Chip x={40} y={480} w={106} label="Apache Iceberg" />
      <Chip x={154} y={480} w={124} label="3,000+ connectors" />

      <text x={22} y={540} className={LABEL}>
        Approval holds · audit trail · RBAC
      </text>
      <text x={22} y={557} className={LABEL}>
        SOC 2 Type II · ISO 27001 · EU/US residency
      </text>
    </svg>
  );
}

export function ArchitectureDiagram({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <LandscapeDiagram className="hidden lg:block" />
      <StackedDiagram className="mx-auto max-w-[24rem] lg:hidden" />
      <figcaption className="mx-auto mt-6 max-w-[62ch] text-center text-[0.8125rem] leading-relaxed text-fg-subtle">
        Six parts, one boundary. Assist is the front door, Registry the system of record, Studio the builder, Gateway the
        policy point at the edge, Data Fabric the base, and Trust the constraints every agent runs inside.
      </figcaption>
    </figure>
  );
}
