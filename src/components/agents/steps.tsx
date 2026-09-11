import type { HowItWorksStep } from "@/content/types";
import { cn } from "@/lib/utils";

export interface StepsProps extends React.HTMLAttributes<HTMLOListElement> {
  steps: HowItWorksStep[];
  /** Grid columns on lg. 4 for a row of steps, 1 for a stacked list beside other content. */
  columns?: 1 | 2 | 4;
  /** Anchor each step (#step-1 ...) so HowTo JSON-LD step URLs resolve. */
  anchor?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Numbered steps with mono labels and a hairline above each. */
export function Steps({ steps, columns = 4, anchor = false, className, ...props }: StepsProps) {
  const stacked = columns === 1;
  return (
    <ol
      className={cn(
        "grid",
        columns === 4 && "gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4",
        columns === 2 && "gap-x-8 gap-y-8 sm:grid-cols-2",
        className,
      )}
      {...props}
    >
      {steps.map((step) => (
        <li
          key={step.step}
          id={anchor ? `step-${step.step}` : undefined}
          className={cn(
            "border-t border-border scroll-mt-24",
            stacked ? "flex gap-6 py-6 first:border-t-0 first:pt-0 last:pb-0" : "pt-5",
          )}
        >
          <span className={cn("tabular block font-mono text-xs text-fg-subtle", stacked && "w-8 shrink-0 pt-1")}>
            {pad(step.step)}
          </span>
          <div className={cn(!stacked && "mt-4")}>
            <h3 className="text-h6 text-fg">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
