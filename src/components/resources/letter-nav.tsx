import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function letterId(letter: string): string {
  return `letter-${letter.toLowerCase()}`;
}

/**
 * CSS-only active state for the rail. `:has()` lets the anchor that points at the
 * currently targeted letter group paint itself, so clicking a letter leaves a
 * visible mark with no client JS. Without `:has()` support the rail still has
 * hover, focus and disabled states.
 */
function activeLetterCss(available: ReadonlySet<string>): string {
  const rules = LETTERS.filter((letter) => available.has(letter))
    .map((letter) => `html:has(#${letterId(letter)}:target) [data-letter="${letter.toLowerCase()}"]`)
    .join(",");
  if (!rules) return "";
  return `${rules}{background-color:var(--color-fg);color:var(--color-bg);}`;
}

export interface LetterNavProps {
  /** Letters that have at least one term. Others render as inert placeholders. */
  available: ReadonlySet<string>;
  className?: string;
}

/** Sticky A–Z index under the header. Plain anchors; no client JS. */
export function LetterNav({ available, className }: LetterNavProps) {
  const css = activeLetterCss(available);

  return (
    <nav
      aria-label="Jump to letter"
      className={cn(
        "sticky top-[4.5rem] z-30 border-y border-border bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/85",
        className,
      )}
    >
      {css ? <style dangerouslySetInnerHTML={{ __html: css }} /> : null}
      <Container>
        <div className="flex items-center gap-4 py-2.5">
          <p className="eyebrow hidden shrink-0 border-r border-border pr-4 md:block">A–Z</p>
          <ol className="-mx-1 flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {LETTERS.map((letter) => {
              const has = available.has(letter);
              return (
                <li key={letter} className="shrink-0">
                  {has ? (
                    <a
                      href={`#${letterId(letter)}`}
                      data-letter={letter.toLowerCase()}
                      className="inline-flex size-8 items-center justify-center rounded-md text-sm font-medium text-fg-muted transition-colors duration-150 ease-standard hover:bg-bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                    >
                      {letter}
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      title={`No terms under ${letter}`}
                      className="inline-flex size-8 items-center justify-center text-sm font-normal text-fg-faint select-none"
                    >
                      {letter}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </nav>
  );
}
