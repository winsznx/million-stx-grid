/** Parsed fields from a Clarity print event repr string. */
export interface ParsedPixelEvent {
  readonly event: string;
  readonly x: string;
  readonly y: string;
  readonly color: string;
  readonly painter: string;
}

const REGEX_COLOR = /color:\s*"([^"]+)"/;
const REGEX_X = /x:\s*u(\d+)/;
const REGEX_Y = /y:\s*u(\d+)/;
const REGEX_PAINTER = /painter:\s*([A-Z0-9]+)/i;
const REGEX_EVENT = /event:\s*"([^"]+)"/;

/**
 * Parses a Clarity repr string into structured event data.
 * @returns Parsed event or null if the repr is malformed.
 */
export function parseEventRepr(repr: string): ParsedPixelEvent | null {
  const color = REGEX_COLOR.exec(repr)?.[1];
  const x = REGEX_X.exec(repr)?.[1];
  const y = REGEX_Y.exec(repr)?.[1];
  const painter = REGEX_PAINTER.exec(repr)?.[1];
  const event = REGEX_EVENT.exec(repr)?.[1];
  if (!event || !x || !y || !color || !painter) return null;
  return { event, x, y, color, painter };
}
