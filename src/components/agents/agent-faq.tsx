import { Markdown } from "@/components/content/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/types";
import { cn } from "@/lib/utils";

export interface AgentFaqProps {
  faqs: Faq[];
  className?: string;
}

/** Hairline accordion. Every answer is in the DOM (forceMount); the page passes the same array to faqJsonLd. */
export function AgentFaq({ faqs, className }: AgentFaqProps) {
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
