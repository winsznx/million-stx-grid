"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { GridState, PixelEvent } from "../types";
import { fetchAllPixelEvents } from "../grid/fetchAllEvents";
import { replayEventsToGrid } from "../grid/replayEvents";

interface CanvasSyncState {
  readonly grid: GridState;
  readonly events: readonly PixelEvent[];
  readonly totalEvents: number;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => void;
}

/**
 * React hook that continuously syncs grid state from the Hiro API.
 * @param contractId - The deployed contract identifier.
 * @param apiBase - The Hiro API base URL.
 * @param pollMs - Polling interval in milliseconds.
 */
export function useCanvasSync(
  contractId: string,
  apiBase: string,
  pollMs: number
): CanvasSyncState {
  const [grid, setGrid] = useState<GridState>(new Map());
  const [events, setEvents] = useState<readonly PixelEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const allEvents = await fetchAllPixelEvents(contractId, apiBase);
      const newGrid = replayEventsToGrid(allEvents);
      setEvents(allEvents);
      setGrid(newGrid);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to sync canvas";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [contractId, apiBase]);

  useEffect(() => {
    fetchData();
    intervalRef.current = setInterval(fetchData, pollMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchData, pollMs]);

  return { grid, events, totalEvents: events.length, isLoading, error, refresh: fetchData };
}
