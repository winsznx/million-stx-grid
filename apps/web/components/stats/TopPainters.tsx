"use client";

import type { PainterCount } from "@/hooks/useTopPainters";
import { truncateAddress } from "@/lib/stacks-utils";

interface TopPaintersProps {
  painters: PainterCount[];
}

/**
 * Leaderboard component showing most active addresses on the grid.
 */
export function TopPainters({ painters }: TopPaintersProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold opacity-50 mb-4">TOP PAINTERS</h3>
      {painters.map((painter, i) => (
        <div key={painter.address} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-30 w-4 font-mono">{i + 1}</span>
            <span className="font-mono text-sm">{truncateAddress(painter.address)}</span>
          </div>
          <span className="text-xs font-bold text-primary-neon">{painter.count} PX</span>
        </div>
      ))}
    </div>
  );
}
