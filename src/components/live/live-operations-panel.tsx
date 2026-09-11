import { getLiveSnapshotNow } from "@/lib/live/generator";
import type { LiveSnapshot } from "@/lib/live/types";

import { LiveOperations } from "./live-operations";

export interface LiveOperationsPanelProps {
  variant?: "compact" | "full";
  /** Pre-computed snapshot, for pages that already fetched one. */
  initial?: LiveSnapshot;
  className?: string;
}

/**
 * Server wrapper: computes the initial snapshot once so the markup is crawlable and the
 * first client paint matches, then hands it to the client island that opens the stream.
 */
export function LiveOperationsPanel({ variant = "compact", initial, className }: LiveOperationsPanelProps) {
  const snapshot = initial ?? getLiveSnapshotNow();
  return <LiveOperations snapshot={snapshot} variant={variant} className={className} />;
}
