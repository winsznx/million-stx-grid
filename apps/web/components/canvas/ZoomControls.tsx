"use client";

import { ZOOM_LEVELS, DESIGN } from "@/lib/constants";

interface ZoomControlsProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

const buttonBase: React.CSSProperties = {
  width: 36,
  height: 36,
  border: `1px solid ${DESIGN.secondaryNeon}`,
  boxShadow: `4px 4px 0px ${DESIGN.secondaryNeon}`,
  background: "transparent",
  color: DESIGN.textPrimary,
  fontFamily: DESIGN.fontDisplay,
  fontSize: 18,
  cursor: "pointer",
  transition: "transform 0.1s, box-shadow 0.1s",
};

export function ZoomControls({ zoom, onZoomChange }: ZoomControlsProps) {
  const currentIdx = ZOOM_LEVELS.indexOf(zoom as (typeof ZOOM_LEVELS)[number]);
  const canZoomOut = currentIdx > 0;
  const canZoomIn = currentIdx < ZOOM_LEVELS.length - 1;

  const handleZoomOut = () => {
    if (canZoomOut) onZoomChange(ZOOM_LEVELS[currentIdx - 1]);
  };

  const handleZoomIn = () => {
    if (canZoomIn) onZoomChange(ZOOM_LEVELS[currentIdx + 1]);
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <button
        onClick={handleZoomOut}
        disabled={!canZoomOut}
        aria-label="Zoom out"
        style={{
          ...buttonBase,
          opacity: canZoomOut ? 1 : 0.3,
          cursor: canZoomOut ? "pointer" : "not-allowed",
        }}
        onMouseDown={(e) => {
          if (canZoomOut) {
            e.currentTarget.style.transform = "translate(4px, 4px)";
            e.currentTarget.style.boxShadow = `0px 0px 0px ${DESIGN.secondaryNeon}`;
          }
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.secondaryNeon}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.secondaryNeon}`;
        }}
      >
        −
      </button>
      <button
        onClick={handleZoomIn}
        disabled={!canZoomIn}
        aria-label="Zoom in"
        style={{
          ...buttonBase,
          opacity: canZoomIn ? 1 : 0.3,
          cursor: canZoomIn ? "pointer" : "not-allowed",
        }}
        onMouseDown={(e) => {
          if (canZoomIn) {
            e.currentTarget.style.transform = "translate(4px, 4px)";
            e.currentTarget.style.boxShadow = `0px 0px 0px ${DESIGN.secondaryNeon}`;
          }
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.secondaryNeon}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.secondaryNeon}`;
        }}
      >
        +
      </button>
    </div>
  );
}
