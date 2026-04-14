import { fetchAllPixelEvents, type PixelEvent } from "@winsznx/stx-canvas-client";
import { CONTRACT_IDENTIFIER, HIRO_API_BASE } from "./constants";

export function fetchGridEvents(): Promise<PixelEvent[]> {
  return fetchAllPixelEvents(CONTRACT_IDENTIFIER, HIRO_API_BASE);
}
