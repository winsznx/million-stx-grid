// Core types
export type { PixelData, PixelEvent, GridState, FrequencyEntry } from "./types";
export { HIRO_EVENTS_PAGE_SIZE, CLIENT_GRID_SIZE, TOTAL_GRID_CELLS } from "./constants";

// Grid utilities
export { encodeCoord, decodeCoord, isValidCoord } from "./grid/encodeCoord";
export { getPixel, isPixelPainted, getPaintedCoordinates, getPaintedCount } from "./grid/gridUtils";
export { isPixelEvent, assertPixelEvent } from "./grid/guards";
export { groupBy } from "./grid/groupBy";
export { getLatestEvent, getEventsAtBlock } from "./grid/latestEvent";
export { filterEventsByPainter, filterEventsByColor, filterEventsByRegion, filterEventsByBlockRange } from "./grid/filterEvents";
export { isValidPixelEvent } from "./grid/validateEvent";
export { getColorDistribution, getPainterDistribution, getGridFillRate } from "./grid/gridStats";
export { replayEventsToGrid } from "./grid/replayEvents";
export { parseEventRepr } from "./grid/parseEventRepr";
export type { ParsedPixelEvent } from "./grid/parseEventRepr";
export { createGridSnapshot } from "./grid/snapshot";
export type { GridSnapshot } from "./grid/snapshot";
export { fetchAllPixelEvents } from "./grid/fetchAllEvents";

// React hook
export { useCanvasSync } from "./hooks/useCanvasSync";
