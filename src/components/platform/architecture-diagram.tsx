import { cn } from "@/lib/utils";

/*
 * Platform architecture as inline SVG (server-rendered, real text nodes).
 * Two variants: a landscape diagram from lg up and a stacked variant below lg
 * so labels stay >= 12px at 390px. Hairline boxes and connectors in tokens.
 */

const TITLE = "fill-fg text-[15px] font-medium";
const SUB = "fill-fg-muted text-[12px]";
const ROW = "fill-fg text-[12px]";
const LABEL = "fill-fg-subtle text-[12px]";
const BOX = "fill-bg-elevated stroke-border";
const HAIR = "fill-none stroke-border-strong";

interface NodeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  rows?: string[];
  /**
   * Marks the one node the diagram is about. Every node keeps the same hairline
   * border; emphasis is a 3px ink rule on the leading edge, the same device the
   * site uses elsewhere (`border-t border-fg` headers, the active ink chip).
   * Exactly one node per diagram may carry it.
   */
  emphasis?: boolean;
}

function Node({ x, y, w, h, title, sub, rows, emphasis }: NodeProps) {
  const px = 18;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} vectorEffect="non-scaling-stroke" className={BOX} />
      {emphasis ? <rect x={x} y={y + 10} width={3} height={h - 20} rx={1.5} className="fill-fg" /> : null}
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

function Ext({ x, y, w, title, sub }: { x: number; y: number; w: number; title: string; sub: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={56} rx={8} vectorEffect="non-scaling-stroke" className="fill-bg stroke-border-strong" strokeDasharray="4 4" />
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
 * The boundary label is seated into the dashed rule rather than floated on it:
 * an unbordered `bg` gap breaks the dash, and the centred label keeps equal
 * padding on both sides. `cy` is the y of the boundary line it sits in.
 */
function Legend({ x, cy, w, id }: { x: number; cy: number; w: number; id: string }) {
  return (
    <g>
      <rect x={x} y={cy - 10} width={w} height={20} className="fill-bg" />
      <text id={id} x={x + w / 2} y={cy + 4} textAnchor="middle" className="fill-fg text-[12px] font-medium tracking-[0.04em]">
        Trust boundary
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
      viewBox="0 0 960 540"
      role="img"
      aria-labelledby="arch-lg-title"
      aria-describedby="arch-lg-desc"
      className={cn("font-sans h-auto w-full", className)}
    >
      <title id="arch-lg-title">Meridian platform architecture</title>
      <desc id="arch-lg-desc">{DESCRIPTION}</desc>
      <ArrowDefs id="arch-arrow-lg" />

      {/* Trust boundary */}
      <rect x={24} y={24} width={636} height={492} rx={16} strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className={HAIR} />
      <Legend x={40} cy={24} w={112} id="arch-lg-legend" />
      <text x={44} y={500} className={LABEL}>
        Approval holds · immutable audit trail · role-based access · SOC 2 Type II · ISO 27001 · EU/US residency
      </text>

      {/* People -> Assist */}
      <text x={360} y={54} textAnchor="middle" className={LABEL}>
        Employees · managers · finance teams
      </text>
      <line x1={360} y1={62} x2={360} y2={82} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={200} y={84} w={320} h={72} title="Assist" sub="Front door · browser, Slack, Microsoft Teams" />

      {/* Assist -> Registry */}
      <line x1={360} y1={156} x2={360} y2={206} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={370} y={186} className={LABEL}>
        runs agents as the user
      </text>

      <Node
        x={200}
        y={208}
        w={320}
        h={112}
        title="Registry"
        sub="System of record for every agent"
        rows={["Owner · role · permissions · data · status", "Meridian, partner, and Studio-built agents"]}
        emphasis
      />

      {/* Studio -> Registry */}
      <Node x={40} y={232} w={136} h={64} title="Studio" sub="Low-code builder" />
      <line x1={176} y1={264} x2={198} y2={264} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      {/* Registry <-> Gateway */}
      <line x1={520} y1={264} x2={560} y2={264} vectorEffect="non-scaling-stroke" className={HAIR} markerStart={m} markerEnd={m} />
      <Node
        x={560}
        y={208}
        w={200}
        h={112}
        title="Gateway"
        sub="Policy enforcement point"
        rows={["Approval holds · scopes", "Cost ceilings · identity"]}
      />

      {/* Outside the boundary */}
      <text x={784} y={150} className={LABEL}>
        Outside the boundary
      </text>
      <path d="M784 192 H772 V264 H762" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <path d="M760 264 H784" vectorEffect="non-scaling-stroke" className={HAIR} />
      <path d="M760 264 H772 V336 H782" vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <Ext x={784} y={164} w={160} title="Third-party agents" sub="MCP · A2A protocols" />
      <Ext x={784} y={236} w={160} title="Identity provider" sub="OIDC · SAML · SCIM" />
      <Ext x={784} y={308} w={160} title="Observability" sub="OpenTelemetry (OTLP)" />

      {/* Down to Data Fabric */}
      <line x1={108} y1={296} x2={108} y2={370} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <line x1={360} y1={320} x2={360} y2={370} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={370} y={350} className={LABEL}>
        every read logged
      </text>
      <line x1={600} y1={320} x2={600} y2={370} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <text x={590} y={350} textAnchor="end" className={LABEL}>
        scoped reads
      </text>

      <Node x={40} y={372} w={600} h={104} title="Data Fabric" sub="Zero-copy access · security inherited from the source" />
      <Chip x={58} y={436} w={78} label="Snowflake" />
      <Chip x={144} y={436} w={84} label="Databricks" />
      <Chip x={236} y={436} w={72} label="BigQuery" />
      <Chip x={316} y={436} w={106} label="Apache Iceberg" />
      <Chip x={430} y={436} w={124} label="3,000+ connectors" />
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

      <rect x={6} y={12} width={332} height={556} rx={14} strokeDasharray="6 6" vectorEffect="non-scaling-stroke" className={HAIR} />
      <Legend x={20} cy={12} w={112} id="arch-sm-legend" />

      <text x={172} y={44} textAnchor="middle" className={LABEL}>
        Employees · managers · finance teams
      </text>
      <line x1={172} y1={50} x2={172} y2={66} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={22} y={68} w={300} h={60} title="Assist" sub="Front door · browser, Slack, Teams" />
      <line x1={172} y1={128} x2={172} y2={150} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node
        x={22}
        y={152}
        w={300}
        h={92}
        title="Registry"
        sub="System of record for every agent"
        rows={["Owner · role · permissions · data · status"]}
        emphasis
      />

      <path d="M172 244 V256 H94 V266" vectorEffect="non-scaling-stroke" className={HAIR} />
      <path d="M172 244 V256 H250 V266" vectorEffect="non-scaling-stroke" className={HAIR} />

      <Node x={22} y={268} w={144} h={100} title="Studio" sub="Low-code builder" rows={["Approvals built in", "Evaluation sets"]} />
      <Node x={178} y={268} w={144} h={100} title="Gateway" sub="Policy on every call" rows={["MCP · A2A · OTLP", "OIDC · SAML · SCIM"]} />

      <line x1={94} y1={368} x2={94} y2={390} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />
      <line x1={250} y1={368} x2={250} y2={390} vectorEffect="non-scaling-stroke" className={HAIR} markerEnd={m} />

      <Node x={22} y={392} w={300} h={124} title="Data Fabric" sub="Zero-copy · security inherited" />
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
        Six parts, one boundary. Assist is the front door, Registry the system of record, Gateway the policy point at the
        edge, Studio the builder, Data Fabric the base, and Trust the constraints every agent runs inside.
      </figcaption>
    </figure>
  );
}
