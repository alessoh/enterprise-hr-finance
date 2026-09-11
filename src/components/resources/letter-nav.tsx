import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function letterId(letter: string): string {
  return `letter-${letter.toLowerCase()}`;
}

export interface LetterNavProps {
  /** Letters that have at least one term. Others render as inert placeholders. */
  available: ReadonlySet<string>;
  className?: string;
}

/** Sticky A–Z index under the header. Plain anchors; no client JS. */
export function LetterNav({ available, className }: LetterNavProps) {
  return (
    <nav
      aria-label="Jump to letter"
      className={cn(
        "sticky top-[4.5rem] z-30 border-y border-border bg-bg/85 backdrop-blur-md supports-[backdrop-filter]:bg-bg/85",
        className,
      )}
    >
      <Container>
        <ol className="-mx-1 flex items-center gap-0.5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LETTERS.map((letter) => {
            const has = available.has(letter);
            return (
              <li key={letter} className="shrink-0">
                {has ? (
                  <a
                    href={`#${letterId(letter)}`}
                    className="tabular inline-flex size-8 items-center justify-center rounded-md text-sm font-medium text-fg-muted transition-colors duration-150 ease-standard hover:bg-bg-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ring"
                  >
                    {letter}
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    className="tabular inline-flex size-8 items-center justify-center text-sm font-medium text-fg-subtle/50 select-none"
                  >
                    {letter}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </nav>
  );
}
