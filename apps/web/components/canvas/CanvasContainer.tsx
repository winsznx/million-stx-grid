"use client";

import { ReactNode, forwardRef } from "react";
import { CANVAS_SIZE } from "@/lib/constants";

interface CanvasContainerProps {
  zoom: number;
  children: ReactNode;
}

/**
 * Responsive container for the canvas, handling overflow and high-level zoom scaling.
 */
export const CanvasContainer = forwardRef<HTMLDivElement, CanvasContainerProps>(
  function CanvasContainer({ zoom, children }, ref) {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          overflow: "hidden",
          width: CANVAS_SIZE * zoom,
          height: CANVAS_SIZE * zoom,
          transition: "width 0.2s ease, height 0.2s ease",
          borderRadius: "8px",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {children}
      </div>
    );
  }
);
