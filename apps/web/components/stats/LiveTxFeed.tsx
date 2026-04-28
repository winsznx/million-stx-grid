"use client";

import { useMemo } from "react";
import type { PixelEvent } from "@winsznx/stx-canvas-client";
import { truncateAddress } from "@/lib/stacks-utils";
import { LIVE_FEED_LIMIT } from "@/lib/constants";

interface LiveTxFeedProps {
  events: PixelEvent[];
}

function timeAgo(unixSeconds: number | null): string {
  if (unixSeconds === null) return "—";
  const seconds = Math.max(0, Math.floor(Date.now() / 1000 - unixSeconds));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

/**
 * Real-time feed of recent paint transactions.
 */
export function LiveTxFeed({ events }: LiveTxFeedProps) {
  const recent = useMemo(
    () => [...events].sort((a, b) => b.blockHeight - a.blockHeight).slice(0, LIVE_FEED_LIMIT),
    [events]
  );

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold opacity-50">LIVE FEED</h3>
      <div className="space-y-2">
        {recent.map((tx) => (
          <div key={tx.txId} className="text-[11px] bg-black/20 p-2 rounded border border-white/5 space-y-1">
            <div className="flex justify-between">
              <span className="font-bold text-primary-neon">{truncateAddress(tx.painter)}</span>
              <span className="opacity-30">{timeAgo(tx.timestamp)} ago</span>
            </div>
            <div className="opacity-60">
              Painted pixel <span className="font-mono">({tx.x}, {tx.y})</span> with color
              <span className="font-mono ml-1" style={{ color: tx.color }}>{tx.color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
