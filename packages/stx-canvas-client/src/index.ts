export type { PixelEvent, GridState, CanvasSyncResult } from "./types";
export { fetchAllPixelEvents } from "./grid/fetchAllEvents";
export { replayEventsToGrid } from "./grid/replayEvents";
export { encodeCoord, decodeCoord, isValidCoord, coordToIndex, indexToCoord } from "./grid/encodeCoord";
export { useCanvasSync } from "./hooks/useCanvasSync";
export { getGridDimensions, countFilledPixels, getPixelAt } from "./grid/gridUtils";
export { parseEventRepr } from "./grid/parseEventRepr";
export { getColorDistribution, getPainterDistribution, getGridFillRate } from "./grid/gridStats";
export {
  filterEventsByPainter,
  filterEventsByColor,
  filterEventsByRegion,
  filterEventsByBlockRange,
} from "./grid/filterEvents";
export { isValidPixelEvent } from "./grid/validateEvent";
export { isPixelEvent, assertPixelEvent } from "./grid/guards";
export { groupBy } from "./grid/groupBy";
export { getLatestEvent, getEventsAtBlock } from "./grid/latestEvent";
export { createGridSnapshot, type GridSnapshot } from "./grid/snapshot";
export {
  DEFAULT_GRID_SIZE,
  DEFAULT_POLL_INTERVAL_MS,
  DEFAULT_HIRO_API_BASE,
  HIRO_EVENTS_PAGE_SIZE,
  CONTRACT_LOG_EVENT_TYPE,
  PIXEL_PAINTED_EVENT_NAME,
} from "./constants";
