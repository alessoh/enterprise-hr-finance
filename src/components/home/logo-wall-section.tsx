import { Container } from "@/components/ui/container";
import { LogoWall } from "@/components/ui/logo-wall";
import { Section } from "@/components/ui/section";
import { homeCopy } from "@/content/home";

export function LogoWallSection() {
  return (
    <Section spacing="none" bordered="both" aria-label="Design partners" className="py-10 lg:py-12">
      <Container>
        <LogoWall label={homeCopy.logoWallLabel} />
      </Container>
    </Section>
  );
}
