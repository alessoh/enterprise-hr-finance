import { Check } from "lucide-react";

import { getContractLines } from "@/components/agents/agent-contract-lines";
import { ArrowLink } from "@/components/ui/arrow-link";
import { agentContract } from "@/content/agents";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export interface ContractStripProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show the "How it is enforced" link to /security. */
  withLink?: boolean;
}

/** Compact hairline list of the six tenets, for the catalog header. */
export function ContractStrip({ withLink = true, className, ...props }: ContractStripProps) {
  return (
    <div className={cn("border-y border-border", className)} {...props}>
      <div className="flex flex-col gap-4 py-5 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="shrink-0 md:w-44">
          <p className="eyebrow">The agent contract</p>
          <p className="mt-2 text-sm text-fg-muted">Six terms every agent ships with.</p>
          {withLink ? (
            <ArrowLink href="/security" size="sm" tone="accent" className="mt-3">
              How it is enforced
            </ArrowLink>
          ) : null}
        </div>
        {/* One column below sm: at 390px two columns break the longer tenets into
            four ragged lines with an orphan on the last. */}
        {/* Rows share a height so the numerals stay on one baseline when a longer tenet
            wraps: without it, item 04 wrapping dropped the whole second row out of line. */}
        <ol className="grid flex-1 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {agentContract.map((tenet, index) => (
            <li key={tenet} className="flex items-baseline gap-2.5 text-sm text-fg lg:min-h-[2.75rem]">
              <span className="tabular shrink-0 font-mono text-xs text-fg-subtle">{pad(index + 1)}</span>
              <span className="text-pretty">{tenet}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export interface ContractChecklistProps extends React.HTMLAttributes<HTMLOListElement> {
  slug: string;
}

/** The six tenets, checked, each with one line specific to this agent. Two columns on lg. */
export function ContractChecklist({ slug, className, ...props }: ContractChecklistProps) {
  const lines = getContractLines(slug);
  return (
    <ol className={cn("grid gap-x-12 lg:grid-cols-2", className)} {...props}>
      {agentContract.map((tenet, index) => (
        <li key={tenet} className="flex gap-4 border-t border-border py-5">
          <span
            aria-hidden
            className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success"
          >
            <Check className="size-3" strokeWidth={2.5} />
          </span>
          <div className="min-w-0">
            <p className="text-[0.9375rem] font-medium text-fg">{tenet}</p>
            {lines ? <p className="mt-1 text-sm leading-relaxed text-fg-muted">{lines[index]}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
