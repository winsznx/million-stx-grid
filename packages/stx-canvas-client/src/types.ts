/** Core pixel data stored on the grid. */
export interface PixelData {
  readonly color: string;
  readonly painter: string;
}

/** A single pixel-painted event from the contract. */
export interface PixelEvent {
  readonly x: number;
  readonly y: number;
  readonly color: string;
  readonly painter: string;
  readonly txId: string;
  readonly blockHeight: number;
  readonly timestamp: number | null;
}

/** Map of encoded coordinates to pixel data. */
export type GridState = Map<string, PixelData>;

/** Frequency entry for color or painter distribution. */
export interface FrequencyEntry {
  readonly key: string;
  readonly count: number;
  readonly percentage: number;
}
