"use client";

import { ZOOM_LEVELS } from "@/lib/constants";
import { Button } from "../ui/Button";

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

/**
 * UI controls for adjusting the canvas zoom level.
 */
export function ZoomControls({ zoom: currentZoom, onZoomChange }: ZoomControlsProps) {
  return (
    <div className="flex items-center gap-2 bg-black/40 p-2 rounded-lg border border-white/5">
      {ZOOM_LEVELS.map((zoom) => (
        <Button
          key={zoom}
          variant={currentZoom === zoom ? "primary" : "secondary"}
          size="sm"
          onClick={() => onZoomChange(zoom)}
          className="min-w-[40px]"
        >
          {zoom}x
        </Button>
      ))}
    </div>
  );
}
