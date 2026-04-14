import { fetchAllPixelEvents, type PixelEvent } from "@winsznx/stx-canvas-client";
import { CONTRACT_IDENTIFIER, HIRO_API_BASE } from "./constants";

export function fetchGridEvents(): Promise<PixelEvent[]> {
  return fetchAllPixelEvents(CONTRACT_IDENTIFIER, HIRO_API_BASE);
}

export async function fetchTotalPainted(): Promise<number> {
  const events = await fetchGridEvents();
  return events.length;
}

export function getUniquePainters(events: PixelEvent[]): string[] {
  return Array.from(new Set(events.map(e => e.painter)));
}
