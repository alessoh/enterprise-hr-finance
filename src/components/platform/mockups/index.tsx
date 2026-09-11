import type { ComponentType } from "react";

import { AssistMockup } from "./assist-mockup";
import { DataFabricMockup } from "./data-fabric-mockup";
import { GatewayMockup } from "./gateway-mockup";
import { RegistryMockup } from "./registry-mockup";
import { StudioMockup } from "./studio-mockup";

export type MockupProps = { className?: string };

/** Product mockup per platform pillar slug. Trust has no mockup; it links to /security. */
export const pillarMockups: Record<string, ComponentType<MockupProps>> = {
  registry: RegistryMockup,
  gateway: GatewayMockup,
  "data-fabric": DataFabricMockup,
  studio: StudioMockup,
  assist: AssistMockup,
};

export function PillarMockup({ slug, className }: { slug: string } & MockupProps) {
  const Mockup = pillarMockups[slug];
  return Mockup ? <Mockup className={className} /> : null;
}

export { AssistMockup, DataFabricMockup, GatewayMockup, RegistryMockup, StudioMockup };
