import type { PixelEvent } from "../types";
import { HIRO_EVENTS_PAGE_SIZE } from "../constants";

interface HiroEventValue { readonly hex: string; readonly repr: string; }
interface HiroContractLogEntry {
  readonly event_type: string;
  readonly tx_id: string;
  readonly block_height: number;
  readonly contract_log?: { readonly value: HiroEventValue };
}
interface HiroEventsResponse {
  readonly results: readonly HiroContractLogEntry[];
  readonly total: number;
  readonly limit: number;
  readonly offset: number;
}

function parseReprValue(repr: string): Record<string, string> | null {
  const result: Record<string, string> = {};
  const cm = repr.match(/color:\s*"([^"]+)"/); if (cm) result.color = cm[1];
  const xm = repr.match(/x:\s*u(\d+)/); if (xm) result.x = xm[1];
  const ym = repr.match(/y:\s*u(\d+)/); if (ym) result.y = ym[1];
  const pm = repr.match(/painter:\s*([A-Z0-9]+)/i); if (pm) result.painter = pm[1];
  const em = repr.match(/event:\s*"([^"]+)"/); if (em) result.event = em[1];
  const tm = repr.match(/timestamp:\s*u(\d+)/); if (tm) result.timestamp = tm[1];
  if (!result.event || !result.x || !result.y || !result.color || !result.painter) return null;
  return result;
}

/**
 * Fetches all pixel-painted events from the Hiro API, paginating automatically.
 * Results are sorted by block height ascending.
 */
export async function fetchAllPixelEvents(
  contractIdentifier: string,
  hiroApiBase: string
): Promise<PixelEvent[]> {
  const events: PixelEvent[] = [];
  let offset = 0;
  while (true) {
    const url = `${hiroApiBase}/extended/v1/contract/${contractIdentifier}/events?limit=${HIRO_EVENTS_PAGE_SIZE}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Hiro API error: ${response.status} ${response.statusText} (offset: ${offset})`);
    }
    const data: HiroEventsResponse = await response.json();
    for (const entry of data.results) {
      if (entry.event_type !== "smart_contract_log") continue;
      if (!entry.contract_log?.value?.repr) continue;
      const parsed = parseReprValue(entry.contract_log.value.repr);
      if (!parsed || parsed.event !== "pixel-painted") continue;
      events.push({
        x: parseInt(parsed.x, 10), y: parseInt(parsed.y, 10),
        color: parsed.color, painter: parsed.painter,
        txId: entry.tx_id, blockHeight: entry.block_height,
        timestamp: parsed.timestamp ? parseInt(parsed.timestamp, 10) : null,
      });
    }
    if (data.results.length < HIRO_EVENTS_PAGE_SIZE) break;
    offset += HIRO_EVENTS_PAGE_SIZE;
  }
  events.sort((a, b) => a.blockHeight - b.blockHeight);
  return events;
}
