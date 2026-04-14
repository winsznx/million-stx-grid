import { useState, useEffect, useCallback, useRef } from "react";
import { fetchAllPixelEvents } from "../grid/fetchAllEvents";
import { replayEventsToGrid } from "../grid/replayEvents";
import { CanvasSyncResult, GridState } from "../types";

const DEFAULT_POLL_INTERVAL_MS = 15_000;

export function useCanvasSync(
  contractIdentifier: string,
  hiroApiBase: string,
  pollingIntervalMs: number = DEFAULT_POLL_INTERVAL_MS
): CanvasSyncResult {
  const [grid, setGrid] = useState<GridState>(new Map());
  const [totalEvents, setTotalEvents] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMountedRef = useRef(true);
  const consecutiveErrorsRef = useRef(0);

  const configValid =
    !!contractIdentifier &&
    !contractIdentifier.includes("undefined") &&
    !!hiroApiBase &&
    !hiroApiBase.includes("undefined");

  const fetchAndReplay = useCallback(
    async (isInitial: boolean) => {
      if (!configValid) {
        setError("Missing contract configuration. Check environment variables.");
        setIsLoading(false);
        return;
      }

      if (isInitial) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      try {
        const events = await fetchAllPixelEvents(contractIdentifier, hiroApiBase);
        if (!isMountedRef.current) return;
        const newGrid = replayEventsToGrid(events);
        setGrid(newGrid);
        setTotalEvents(events.length);
        consecutiveErrorsRef.current = 0;
      } catch (err) {
        if (!isMountedRef.current) return;
        consecutiveErrorsRef.current += 1;
        setError(err instanceof Error ? err.message : "Failed to fetch canvas state");

        if (consecutiveErrorsRef.current >= 3 && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    },
    [contractIdentifier, hiroApiBase, configValid]
  );

  const refresh = useCallback(() => {
    consecutiveErrorsRef.current = 0;
    fetchAndReplay(false);
  }, [fetchAndReplay]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchAndReplay(true);

    if (configValid) {
      intervalRef.current = setInterval(() => {
        fetchAndReplay(false);
      }, pollingIntervalMs);
    }

    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetchAndReplay, pollingIntervalMs, configValid]);

  return { grid, totalEvents, isLoading, isRefreshing, error, refresh };
}
