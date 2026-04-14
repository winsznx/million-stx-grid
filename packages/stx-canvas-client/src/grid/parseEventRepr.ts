interface ParsedPixelEvent {
  event: string;
  x: string;
  y: string;
  color: string;
  painter: string;
}

export function parseEventRepr(repr: string): ParsedPixelEvent | null {
  const result: Partial<ParsedPixelEvent> = {};

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
  return result as ParsedPixelEvent;
}
