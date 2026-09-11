import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/content/types";

export interface PricingFaqProps {
  faqs: Faq[];
}

/** Every answer stays in the DOM (the primitive force-mounts content), so crawlers read all of them. */
export function PricingFaq({ faqs }: PricingFaqProps) {
  return (
    <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-border">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} value={`faq-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>
            <p>{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
