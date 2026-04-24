"use client";

import { useState, useEffect } from "react";

/**
 * Hook for fetching and managing top painters leaderboard.
 */
export function useTopPainters() {
  const [painters, setPainters] = useState<{ address: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { painters, loading };
}
