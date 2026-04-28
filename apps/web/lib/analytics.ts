import type { PixelEvent } from "@winsznx/stx-canvas-client";

export function getActivityByHour(events: PixelEvent[]): Map<number, number> {
  const hourCounts = new Map<number, number>();
  for (let i = 0; i < 24; i++) hourCounts.set(i, 0);
  for (const event of events) {
    if (event.timestamp === null) continue;
    const hour = new Date(event.timestamp * 1000).getUTCHours();
    hourCounts.set(hour, (hourCounts.get(hour) ?? 0) + 1);
  }
  return hourCounts;
}

export function getMostActiveBlock(events: PixelEvent[]): number {
  const blockCounts = new Map<number, number>();
  for (const event of events) {
    blockCounts.set(event.blockHeight, (blockCounts.get(event.blockHeight) ?? 0) + 1);
  }
  let maxBlock = 0;
  let maxCount = 0;
  for (const [block, count] of blockCounts) {
    if (count > maxCount) {
      maxCount = count;
      maxBlock = block;
    }
  }
  return maxBlock;
}

export function getEventsPerBlock(events: PixelEvent[]): number {
  if (events.length === 0) return 0;
  const uniqueBlocks = new Set(events.map(e => e.blockHeight)).size;
  return events.length / uniqueBlocks;
}
