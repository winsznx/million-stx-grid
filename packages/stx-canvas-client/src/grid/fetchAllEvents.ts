import { PixelEvent } from "../types";

interface HiroEventValue {
  hex: string;
  repr: string;
}

interface HiroContractLogEntry {
  event_type: string;
  tx_id: string;
  block_height: number;
  contract_log?: {
    value: HiroEventValue;
  };
}

interface HiroEventsResponse {
  results: HiroContractLogEntry[];
  total: number;
  limit: number;
  offset: number;
}

function parseReprValue(repr: string): Record<string, string> | null {
  const result: Record<string, string> = {};

  const colorMatch = repr.match(/color:\s*"([^"]+)"/);
  if (colorMatch) result.color = colorMatch[1];

  const xMatch = repr.match(/x:\s*u(\d+)/);
  if (xMatch) result.x = xMatch[1];

  const yMatch = repr.match(/y:\s*u(\d+)/);
  if (yMatch) result.y = yMatch[1];

  const painterMatch = repr.match(/painter:\s*([A-Z0-9]+)/i);
  if (painterMatch) result.painter = painterMatch[1];

  const eventMatch = repr.match(/event:\s*"([^"]+)"/);
  if (eventMatch) result.event = eventMatch[1];

  if (!result.event || !result.x || !result.y || !result.color) return null;
  return result;
}

export async function fetchAllPixelEvents(
  contractIdentifier: string,
  hiroApiBase: string
): Promise<PixelEvent[]> {
  const events: PixelEvent[] = [];
  const PAGE_SIZE = 50;
  let offset = 0;

  while (true) {
    const url = `${hiroApiBase}/extended/v1/contract/${contractIdentifier}/events?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Hiro API error fetching contract events: ${response.status} ${response.statusText} (offset: ${offset})`
      );
    }

    const data: HiroEventsResponse = await response.json();

    for (const entry of data.results) {
      if (entry.event_type !== "smart_contract_log") continue;
      if (!entry.contract_log?.value?.repr) continue;

      const parsed = parseReprValue(entry.contract_log.value.repr);
      if (!parsed || parsed.event !== "pixel-painted") continue;

      events.push({
        x: parseInt(parsed.x, 10),
        y: parseInt(parsed.y, 10),
        color: parsed.color,
        painter: parsed.painter,
        txId: entry.tx_id,
        blockHeight: entry.block_height,
      });
    }

    if (data.results.length < PAGE_SIZE) break;
    offset += limit;
  }

  events.sort((a, b) => a.blockHeight - b.blockHeight);
  return events;
}
