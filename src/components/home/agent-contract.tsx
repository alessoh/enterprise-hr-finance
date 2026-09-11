import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { agentContract } from "@/content/agents";

/**
 * The positioning section: what a Meridian agent is and is not, and the six
 * terms every agent runs under (agentContract, shown again on every agent page).
 */
export function AgentContract() {
  return (
    <Section background="subtle" bordered="both" aria-labelledby="contract-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>The agent contract</Eyebrow>
            <h2 id="contract-heading" className="text-h2 mt-5">
              Six terms every agent runs under.
            </h2>
            <p className="text-lede mt-6">
              Not a chatbot, and not an open-ended assistant. Meridian ships narrow, governed agents, each
              scoped to one workflow, operating on your HR and finance data under your own security model.
            </p>
            <p className="mt-5 text-base leading-relaxed text-fg-muted">
              The same six terms apply to every agent on the platform, whether Meridian built it, a partner did,
              or your team did in Studio. They are enforced at the Gateway, below the agent, so no prompt and no
              builder can switch them off.
            </p>
            <ArrowLink href="/security" className="mt-8">
              How the terms are enforced
            </ArrowLink>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <ol className="border-t border-border">
              {agentContract.map((term, index) => (
                <li
                  key={term}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-baseline gap-4 border-b border-border py-5 lg:grid-cols-[3.5rem_minmax(0,1fr)] lg:py-6"
                >
                  <span className="tabular font-mono text-xs text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h4 lg:text-h3 text-fg">{term}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
