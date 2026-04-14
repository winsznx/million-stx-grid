export interface PixelEvent {
  x: number;
  y: number;
  color: string;
  painter: string;
  txId: string;
  blockHeight: number;
}

export type GridState = Map<string, { color: string; painter: string }>;

export interface CanvasSyncResult {
  grid: GridState;
  totalEvents: number;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => void;
}
