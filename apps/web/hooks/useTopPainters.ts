import { useMemo } from "react";
import type { PixelEvent } from "@winsznx/stx-canvas-client";

export interface PainterRank {
  address: string;
  count: number;
}

export function useTopPainters(
  events: PixelEvent[],
  limit: number = 20
): PainterRank[] {
  return useMemo(() => {
    const counts = new Map<string, number>();

    for (const event of events) {
      counts.set(event.painter, (counts.get(event.painter) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([address, count]) => ({ address, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }, [events, limit]);
}
