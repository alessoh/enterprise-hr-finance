import Link from "next/link";

import { Markdown } from "@/components/content/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import type { Faq } from "@/content/types";

export function SecurityFaq({ faqs }: { faqs: Faq[] }) {
  return (
    <Section id="faq" aria-labelledby="faq-heading">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>FAQ</Eyebrow>
              <h2 id="faq-heading" className="text-h2 mt-5">
                Questions security reviewers ask.
              </h2>
              <p className="text-lede mt-5">
                Short answers to the questions that come up in every review. The long answers, with evidence, are in
                the security packet.
              </p>
              <p className="mt-6 text-sm text-fg-muted">
                Something missing?{" "}
                <Link
                  href="/contact?intent=sales"
                  className="font-medium text-accent underline-offset-4 hover:text-accent-hover hover:underline"
                >
                  Ask the security team
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-border">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <Markdown variant="compact">{faq.answer}</Markdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
