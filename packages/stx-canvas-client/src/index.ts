export type { PixelEvent, GridState, CanvasSyncResult } from "./types";
export { fetchAllPixelEvents } from "./grid/fetchAllEvents";
export { replayEventsToGrid } from "./grid/replayEvents";
export { encodeCoord, decodeCoord, isValidCoord, coordToIndex, indexToCoord } from "./grid/encodeCoord";
export { useCanvasSync } from "./hooks/useCanvasSync";
export { getGridDimensions, countFilledPixels, getPixelAt } from "./grid/gridUtils";
export { parseEventRepr } from "./grid/parseEventRepr";
