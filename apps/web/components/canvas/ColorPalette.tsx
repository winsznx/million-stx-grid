"use client";

import { COLOR_PALETTE, DESIGN } from "@/lib/constants";

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorPalette({ selectedColor, onSelectColor }: ColorPaletteProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 28px)",
        gap: 4,
        padding: 4,
      }}
    >
      {COLOR_PALETTE.map((color) => {
        const isSelected = color === selectedColor;
        return (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            aria-label={`Select color ${color}`}
            style={{
              width: 28,
              height: 28,
              backgroundColor: color,
              border: isSelected ? `2px solid ${DESIGN.primaryNeon}` : "1px solid rgba(255,255,255,0.1)",
              boxShadow: isSelected
                ? `3px 3px 0px ${DESIGN.primaryNeon}`
                : "none",
              cursor: "pointer",
              padding: 0,
              transition: "box-shadow 0.1s, transform 0.1s, border-color 0.1s",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          />
        );
      })}
    </div>
  );
}
