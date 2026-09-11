import { Markdown } from "@/components/content/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

export interface ArticleFaqProps {
  faqs: Faq[];
  className?: string;
}

/** Hairline accordion. Every answer stays in the DOM; the page passes the same array to faqJsonLd. */
export function ArticleFaq({ faqs, className }: ArticleFaqProps) {
  return (
    <Accordion type="single" collapsible className={cn("border-t border-border", className)}>
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`faq-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <Markdown variant="compact">{faq.answer}</Markdown>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
