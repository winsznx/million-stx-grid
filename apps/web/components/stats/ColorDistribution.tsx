"use client";

import { useMemo } from "react";
import { getColorDistribution, type GridState } from "@winsznx/stx-canvas-client";

interface ColorDistributionProps {
  grid: GridState;
}

interface ColorStat {
  color: string;
  count: number;
  percentage: number;
}

/**
 * Visual representation of color usage across the grid.
 */
export function ColorDistribution({ grid }: ColorDistributionProps) {
  const stats = useMemo<ColorStat[]>(() => {
    const counts = getColorDistribution(grid);
    const total = grid.size;
    if (total === 0) return [];
    return Array.from(counts.entries())
      .map(([color, count]) => ({
        color,
        count,
        percentage: Math.round((count / total) * 1000) / 10,
      }))
      .sort((a, b) => b.count - a.count);
  }, [grid]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold opacity-50">COLOR DISTRIBUTION</h3>
      <div className="flex h-2 w-full rounded-full overflow-hidden">
        {stats.slice(0, 10).map((stat) => (
          <div
            key={stat.color}
            style={{ backgroundColor: stat.color, width: `${stat.percentage}%` }}
            title={`${stat.color}: ${stat.percentage}%`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2">
        {stats.slice(0, 6).map((stat) => (
          <div key={stat.color} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
              <span className="text-[10px] opacity-60 font-mono">{stat.color}</span>
            </div>
            <span className="text-[10px] font-bold">{stat.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
