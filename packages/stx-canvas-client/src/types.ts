export interface PixelEvent {
  x: number;
  y: number;
  color: string;
  painter: string;
  txId: string;
  blockHeight: number;
  timestamp: number | null;
}

export type GridState = Map<string, { color: string; painter: string }>;

export interface FetchProgress {
  pagesLoaded: number;
  eventsLoaded: number;
}

export interface CanvasSyncResult {
  grid: GridState;
  totalEvents: number;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => void;
}

export interface PaginationOptions {
  limit?: number;
  maxPages?: number;
}
