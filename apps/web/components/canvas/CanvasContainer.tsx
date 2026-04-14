"use client";

import { ReactNode } from "react";
import { CANVAS_SIZE } from "@/lib/constants";

interface CanvasContainerProps {
  zoom: number;
  children: ReactNode;
}

export function CanvasContainer({ zoom, children }: CanvasContainerProps) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: CANVAS_SIZE * zoom,
        height: CANVAS_SIZE * zoom,
      }}
    >
      {children}
    </div>
  );
}
