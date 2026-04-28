"use client";

import { type GridState } from "@winsznx/stx-canvas-client";
import { encodeCoord } from "@winsznx/stx-canvas-client";
import { Card } from "../ui/Card";
import { truncateAddress } from "@/lib/stacks-utils";

interface SelectedPixelInfoProps {
  x: number;
  y: number;
  grid: GridState;
}

/**
 * Detailed information panel for a selected pixel.
 */
export function SelectedPixelInfo({ x, y, grid }: SelectedPixelInfoProps) {
  const pixel = grid.get(encodeCoord(x, y));

  return (
    <Card className="p-4 w-64 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-sm">PIXEL INFO</h3>
        <span className="text-xs opacity-50">({x}, {y})</span>
      </div>
      <div className="space-y-1">
        <p className="text-xs opacity-50 uppercase tracking-wider font-semibold">Painter</p>
        <p className="font-mono text-sm">{pixel ? truncateAddress(pixel.painter) : "None"}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded border border-white/10" style={{ backgroundColor: pixel?.color || "#1a1a2e" }} />
        <p className="font-mono text-xs">{pixel?.color || "DEFAULT"}</p>
      </div>
    </Card>
  );
}
