"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { encodeCoord, type GridState } from "@winsznx/stx-canvas-client";
import { GRID_SIZE, PIXEL_SIZE, CANVAS_SIZE, DEFAULT_BG_COLOR, HIGHLIGHT_COLOR } from "@/lib/constants";

interface PixelCanvasProps {
  grid: GridState;
  zoom: number;
  onPixelClick: (x: number, y: number) => void;
  onPixelHover: (x: number, y: number) => void;
}

/**
 * Optimized Canvas component for rendering the million pixel grid.
 * Uses high-DPI scaling and efficient individual pixel rendering.
 */
export const PixelCanvas = memo(function PixelCanvas({ grid, zoom, onPixelClick, onPixelHover }: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const lastHoverRef = useRef<{ x: number; y: number } | null>(null);

  const renderGrid = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    canvas.style.width = `${CANVAS_SIZE}px`;
    canvas.style.height = `${CANVAS_SIZE}px`;
    ctx.scale(dpr, dpr);

    // Optimized rendering: Batch similar colored pixels if possible, 
    // but for 100x100 grid, direct fillRect is fast enough if ctx is optimized.
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        const pixel = grid.get(encodeCoord(x, y));
        ctx.fillStyle = pixel ? pixel.color : DEFAULT_BG_COLOR;
        ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }, [grid]);

  useEffect(() => {
    renderGrid();
  }, [renderGrid]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    overlay.width = CANVAS_SIZE * dpr;
    overlay.height = CANVAS_SIZE * dpr;
    overlay.style.width = `${CANVAS_SIZE}px`;
    overlay.style.height = `${CANVAS_SIZE}px`;
  }, []);

  const getCoordFromEvent = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_SIZE / rect.width;
      const scaleY = CANVAS_SIZE / rect.height;
      const x = Math.floor(((e.clientX - rect.left) * scaleX) / PIXEL_SIZE);
      const y = Math.floor(((e.clientY - rect.top) * scaleY) / PIXEL_SIZE);
      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return null;
      return { x, y };
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const coord = getCoordFromEvent(e);
      if (!coord) return;

      const last = lastHoverRef.current;
      if (last && last.x === coord.x && last.y === coord.y) return;
      lastHoverRef.current = coord;

      onPixelHover(coord.x, coord.y);

      const overlay = overlayRef.current;
      if (!overlay) return;
      const ctx = overlay.getContext("2d");
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.clearRect(0, 0, overlay.width, overlay.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.strokeStyle = HIGHLIGHT_COLOR;
      ctx.lineWidth = 1;
      ctx.strokeRect(
        coord.x * PIXEL_SIZE + 0.5,
        coord.y * PIXEL_SIZE + 0.5,
        PIXEL_SIZE - 1,
        PIXEL_SIZE - 1
      );
      ctx.restore();
    },
    [getCoordFromEvent, onPixelHover]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const coord = getCoordFromEvent(e);
      if (!coord) return;
      onPixelClick(coord.x, coord.y);
    },
    [getCoordFromEvent, onPixelClick]
  );

  const handleMouseLeave = useCallback(() => {
    lastHoverRef.current = null;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, overlay.width, overlay.height);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: CANVAS_SIZE,
        height: CANVAS_SIZE,
        transform: `scale(${zoom})`,
        transformOrigin: "top left",
        imageRendering: "pixelated",
        willChange: "transform",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          imageRendering: "pixelated",
          willChange: "transform",
        }}
      />
      <canvas
        ref={overlayRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "block",
          width: CANVAS_SIZE,
          height: CANVAS_SIZE,
          cursor: "crosshair",
          touchAction: "none",
          imageRendering: "pixelated",
          willChange: "transform",
        }}
      />
    </div>
  );
});
