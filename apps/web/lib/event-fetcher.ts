import { fetchAllPixelEvents, type PixelEvent } from "@winsznx/stx-canvas-client";
import { CONTRACT_IDENTIFIER, HIRO_API_BASE } from "./constants";

/** Fetches all grid events from the Hiro API using the configured contract. */
export function fetchGridEvents(): Promise<PixelEvent[]> {
  return fetchAllPixelEvents(CONTRACT_IDENTIFIER, HIRO_API_BASE);
}

/** Fetches events and returns the total count. */
export async function fetchTotalPainted(): Promise<number> {
  const events = await fetchGridEvents();
  return events.length;
}

/** Extracts unique painter addresses from a list of events. */
export function getUniquePainters(events: readonly PixelEvent[]): readonly string[] {
  return Array.from(new Set(events.map((e) => e.painter)));
}
