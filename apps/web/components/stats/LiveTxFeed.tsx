"use client";

import { useGridStats } from "@/hooks/useGridStats";
import { truncateAddress } from "@/lib/stacks-utils";
import { formatDistanceToNow } from "date-fns";

/**
 * Real-time feed of recent paint transactions.
 */
export function LiveTxFeed() {
  const { recentTxs } = useGridStats();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold opacity-50">LIVE FEED</h3>
      <div className="space-y-2">
        {recentTxs.map((tx) => (
          <div key={tx.txid} className="text-[11px] bg-black/20 p-2 rounded border border-white/5 space-y-1">
            <div className="flex justify-between">
              <span className="font-bold text-primary-neon">{truncateAddress(tx.sender)}</span>
              <span className="opacity-30">{formatDistanceToNow(new Date(tx.timestamp))} ago</span>
            </div>
            <div className="opacity-60">
              Painted pixel <span className="font-mono">(${tx.x}, ${tx.y})</span> with color 
              <span className="font-mono ml-1" style={{ color: tx.color }}>{tx.color}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
