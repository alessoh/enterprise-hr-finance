import type { CaseStudyTimelinePhase } from "@/content/types";

/** Vertical hairline rail with one node per phase; weeks in mono, phase title, one-line description. */
export function StoryTimeline({ phases }: { phases: CaseStudyTimelinePhase[] }) {
  return (
    <ol className="relative border-l border-border">
      {phases.map((phase, index) => (
        <li key={`${phase.weeks}-${phase.phase}`} className="relative pb-8 pl-8 last:pb-0">
          <span
            aria-hidden
            className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-fg ring-4 ring-bg"
          />
          <p className="tabular font-mono text-[0.8125rem] text-fg-subtle">
            <span className="sr-only">Phase {index + 1}: </span>
            {phase.weeks}
          </p>
          <h3 className="mt-1.5 text-h5 text-fg">{phase.phase}</h3>
          <p className="mt-1.5 max-w-[60ch] text-[0.9375rem] leading-relaxed text-pretty text-fg-muted">
            {phase.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
