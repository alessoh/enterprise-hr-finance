import { ArrowLink } from "@/components/ui/arrow-link";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import type { Testimonial } from "@/content/types";
import { customerPath } from "@/lib/seo/routes";

export interface TestimonialWallProps {
  testimonials: Testimonial[];
  /** Company -> case study slug, for a "Read the story" link under the attribution. */
  storyByCompany: Record<string, string>;
}

/** Two-column quote wall. Body Geist 18px, initials avatar attribution, no photos. */
export function TestimonialWall({ testimonials, storyByCompany }: TestimonialWallProps) {
  return (
    <ul className="columns-1 gap-6 md:columns-2">
      {testimonials.map((t) => {
        const storySlug = storyByCompany[t.company];
        return (
          <Card as="li" key={`${t.name}-${t.company}`} padding="md" className="mb-6 break-inside-avoid">
            <figure className="flex flex-col">
              <blockquote className="text-body-lg text-pretty text-fg">
                <p>&ldquo;{t.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <Avatar name={t.name} size="md" tone="ink" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fg">{t.name}</p>
                  <p className="text-[0.8125rem] text-fg-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
                {storySlug ? (
                  <ArrowLink href={customerPath(storySlug)} size="sm" tone="muted" className="ml-auto shrink-0">
                    Read the story
                  </ArrowLink>
                ) : null}
              </figcaption>
            </figure>
          </Card>
        );
      })}
    </ul>
  );
}
