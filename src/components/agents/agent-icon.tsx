import {
  Bot,
  CalendarClock,
  CheckSquare,
  FileDiff,
  FileSignature,
  Layers,
  LifeBuoy,
  ScanSearch,
  ShieldCheck,
  Target,
  TrendingUp,
  UserSearch,
  Wallet,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

/** The twelve `agent.icon` names from src/content/agents.ts, resolved to components. */
const icons: Record<string, LucideIcon> = {
  LifeBuoy,
  UserSearch,
  Wallet,
  CalendarClock,
  Target,
  Layers,
  ShieldCheck,
  TrendingUp,
  ScanSearch,
  CheckSquare,
  FileSignature,
  FileDiff,
};

export interface AgentIconProps extends LucideProps {
  /** lucide-react icon name from the content module. */
  name: string;
}

/** 20px line icon, no colored square (DESIGN.md §6 Cards). Falls back to a generic mark. */
export function AgentIcon({ name, ...props }: AgentIconProps) {
  const Icon = icons[name] ?? Bot;
  return <Icon aria-hidden strokeWidth={1.75} {...props} />;
}
