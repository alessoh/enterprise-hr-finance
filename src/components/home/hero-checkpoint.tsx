import { getLiveSnapshotNow } from "@/lib/live/generator";
import { formatCurrency } from "@/lib/utils";

/**
 * A real approval, pulled from the same live feed the dashboard streams, floated over
 * the hero object. The globe alone is atmosphere; this card is the claim: an agent
 * acted, and a named person still decides. Server-rendered so it costs no client JS.
 */
export function HeroCheckpoint() {
  const { events } = getLiveSnapshotNow();
  const event =
    events.find((e) => e.needsApproval && e.amount !== undefined) ??
    events.find((e) => e.needsApproval) ??
    events[0];

  return (
    <figure className="w-[19.5rem] rounded-xl bg-bg-elevated p-4 shadow-lg ring-1 ring-border sm:w-[21rem]">
      <figcaption className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-fg-subtle">
          At the Gateway
        </span>
        <span className="rounded-sm bg-warning-soft px-1.5 py-0.5 text-[11px] font-medium leading-4 text-warning">
          Needs approval
        </span>
      </figcaption>

      <p className="mt-3 text-[13px] leading-5 font-medium text-fg">{event.title}</p>
      <p className="mt-1 text-[12px] leading-5 text-fg-muted">
        {event.detail}
        {event.amount !== undefined ? (
          <span className="tabular"> · {formatCurrency(event.amount)}</span>
        ) : null}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
        <span className="text-[11.5px] text-fg-subtle">
          {event.agentName.replace(" Agent", "")} · {event.customer}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="rounded-md bg-fg px-2 py-1 text-[11.5px] font-medium text-bg">Approve</span>
          <span className="rounded-md border border-border-strong px-2 py-1 text-[11.5px] font-medium text-fg">
            Decline
          </span>
        </span>
      </div>
    </figure>
  );
}
