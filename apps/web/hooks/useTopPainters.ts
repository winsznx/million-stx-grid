"use client";

import { useMemo } from "react";
import type { PixelEvent } from "@winsznx/stx-canvas-client";
import { TOP_PAINTERS_LIMIT } from "@/lib/constants";

export interface PainterCount {
  address: string;
  count: number;
}

export function useTopPainters(
  events: PixelEvent[],
  limit: number = TOP_PAINTERS_LIMIT
): PainterCount[] {
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
