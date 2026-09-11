import { Markdown } from "@/components/content/markdown";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { homeFaqs } from "@/content/faqs";
import { homeCopy } from "@/content/home";
import { siteConfig } from "@/lib/site";

/** Buyer FAQ. Answers stay in the DOM when closed and are mirrored in faqJsonLd on the page. */
export function HomeFaq() {
  const copy = homeCopy.sections.faq;
  return (
    <Section bordered="top" aria-labelledby="faq-heading" id="faq">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <SectionHeader
              eyebrow={copy.eyebrow}
              title={<span id="faq-heading">{copy.title}</span>}
              lede={copy.lede}
              className="mb-6 lg:mb-8"
            />
            <div className="flex flex-col gap-3">
              <ArrowLink href={siteConfig.links.security} tone="muted">
                Security and data handling
              </ArrowLink>
              <ArrowLink href={`${siteConfig.links.pricing}#faq`} tone="muted">
                Pricing and credits
              </ArrowLink>
              <ArrowLink href={siteConfig.links.contact} tone="muted">
                Ask a question
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.06} className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue="faq-0" className="border-t border-border">
              {homeFaqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <Markdown variant="compact">{faq.answer}</Markdown>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
