"use client";

import { COLOR_PALETTE } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect?: (color: string) => void;
  onSelectColor?: (color: string) => void;
}

/**
 * Interactive color picker for the canvas grid.
 */
export function ColorPalette({ selectedColor, onColorSelect, onSelectColor }: ColorPaletteProps) {
  const handleSelect = onColorSelect ?? onSelectColor ?? (() => {});
  return (
    <div className="grid grid-cols-8 gap-2 p-4 bg-black/40 rounded-xl border border-white/5">
      {COLOR_PALETTE.map((color) => (
        <button
          key={color}
          onClick={() => handleSelect(color)}
          className={cn(
            "w-8 h-8 rounded-md transition-all hover:scale-110 active:scale-95 border-2",
            selectedColor === color ? "border-white scale-110" : "border-transparent hover:border-white/20"
          )}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
}
