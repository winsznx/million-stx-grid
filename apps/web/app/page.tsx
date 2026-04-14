"use client";

import { useState, useCallback } from "react";
import { useCanvasSync, encodeCoord } from "@winsznx/stx-canvas-client";
import { PixelCanvas } from "@/components/canvas/PixelCanvas";
import { ColorPalette } from "@/components/canvas/ColorPalette";
import { CoordinateDisplay } from "@/components/canvas/CoordinateDisplay";
import { ZoomControls } from "@/components/canvas/ZoomControls";
import { PendingPixelOverlay } from "@/components/canvas/PendingPixelOverlay";
import { WalletConnectButton } from "@/components/wallet/WalletConnectButton";
import { callPaintPixel } from "@/lib/contract-calls";
import {
  CONTRACT_IDENTIFIER,
  HIRO_API_BASE,
  POLL_INTERVAL_MS,
  CANVAS_SIZE,
  DESIGN,
  COLOR_PALETTE,
  DEFAULT_ZOOM,
} from "@/lib/constants";
import Link from "next/link";

interface PendingPixel {
  x: number;
  y: number;
  color: string;
}

export default function Home() {
  const { grid, totalEvents, isLoading, error, refresh } = useCanvasSync(
    CONTRACT_IDENTIFIER,
    HIRO_API_BASE,
    POLL_INTERVAL_MS
  );

  const [selectedColor, setSelectedColor] = useState(COLOR_PALETTE[17]);
  const [selectedCoord, setSelectedCoord] = useState<{ x: number; y: number } | null>(null);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [pendingPixels, setPendingPixels] = useState<PendingPixel[]>([]);

  const hoverPainter = hoverCoord
    ? grid.get(encodeCoord(hoverCoord.x, hoverCoord.y))?.painter ?? null
    : null;

  const handlePixelClick = useCallback(
    (x: number, y: number) => {
      setSelectedCoord({ x, y });
    },
    []
  );

  const handlePixelHover = useCallback((x: number, y: number) => {
    setHoverCoord({ x, y });
  }, []);

  const handlePaint = useCallback(() => {
    if (!selectedCoord) return;

    if (!walletAddress) {
      const { showConnect } = require("@stacks/connect");
      showConnect({
        appDetails: { name: "The Million STX Grid", icon: "/icon.png" },
        onFinish: (payload: { authResponsePayload: { profile: { stxAddress: { mainnet: string } } } }) => {
          setWalletAddress(payload.authResponsePayload.profile.stxAddress.mainnet);
        },
        onCancel: () => {},
      });
      return;
    }

    const pending: PendingPixel = {
      x: selectedCoord.x,
      y: selectedCoord.y,
      color: selectedColor,
    };
    setPendingPixels((prev) => [...prev, pending]);

    callPaintPixel(
      selectedCoord.x,
      selectedCoord.y,
      selectedColor,
      () => {
        setPendingPixels((prev) =>
          prev.filter((p) => p.x !== pending.x || p.y !== pending.y)
        );
        refresh();
      },
      () => {
        setPendingPixels((prev) =>
          prev.filter((p) => p.x !== pending.x || p.y !== pending.y)
        );
      }
    );

    setSelectedCoord(null);
  }, [selectedCoord, selectedColor, walletAddress, refresh]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: DESIGN.bg,
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h1
          style={{
            fontFamily: DESIGN.fontDisplay,
            fontSize: 18,
            fontWeight: 700,
            color: DESIGN.primaryNeon,
          }}
        >
          THE MILLION STX GRID
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <CoordinateDisplay
            x={hoverCoord?.x ?? null}
            y={hoverCoord?.y ?? null}
            painter={hoverPainter}
          />
          <WalletConnectButton onConnect={setWalletAddress} />
        </div>
      </header>

      {/* Canvas area */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          overflow: "hidden",
        }}
      >
        {isLoading ? (
          <div
            style={{
              fontFamily: DESIGN.fontDisplay,
              color: DESIGN.textMuted,
              fontSize: 16,
            }}
          >
            Loading canvas...
          </div>
        ) : error ? (
          <div
            style={{
              fontFamily: DESIGN.fontDisplay,
              color: DESIGN.danger,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        ) : (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              width: CANVAS_SIZE * zoom,
              height: CANVAS_SIZE * zoom,
            }}
          >
            <PixelCanvas
              grid={grid}
              zoom={zoom}
              onPixelClick={handlePixelClick}
              onPixelHover={handlePixelHover}
            />
            <PendingPixelOverlay pixels={pendingPixels} zoom={zoom} />
          </div>
        )}
      </main>

      {/* Controls */}
      <footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <ColorPalette
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: DESIGN.fontDisplay,
                fontSize: 12,
                color: DESIGN.textMuted,
              }}
            >
              Selected:
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  backgroundColor: selectedColor,
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              />
              {selectedColor}
            </div>
            {selectedCoord && (
              <div
                style={{
                  fontFamily: DESIGN.fontDisplay,
                  fontSize: 12,
                  color: DESIGN.textPrimary,
                }}
              >
                Target: ({selectedCoord.x}, {selectedCoord.y})
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handlePaint}
            disabled={!selectedCoord}
            style={{
              padding: "10px 24px",
              border: `1px solid ${DESIGN.primaryNeon}`,
              boxShadow: selectedCoord
                ? `4px 4px 0px ${DESIGN.primaryNeon}`
                : "none",
              background: selectedCoord ? "transparent" : "rgba(255,255,255,0.02)",
              color: selectedCoord ? DESIGN.primaryNeon : DESIGN.textMuted,
              fontFamily: DESIGN.fontDisplay,
              fontWeight: 700,
              fontSize: 14,
              cursor: selectedCoord ? "pointer" : "not-allowed",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              if (selectedCoord) {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = selectedCoord
                ? `4px 4px 0px ${DESIGN.primaryNeon}`
                : "none";
            }}
            onMouseDown={(e) => {
              if (selectedCoord) {
                e.currentTarget.style.transform = "translate(4px, 4px)";
                e.currentTarget.style.boxShadow = `0px 0px 0px ${DESIGN.primaryNeon}`;
              }
            }}
            onMouseUp={(e) => {
              if (selectedCoord) {
                e.currentTarget.style.transform = "translate(2px, 2px)";
                e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
              }
            }}
          >
            PAINT PIXEL
          </button>

          <ZoomControls zoom={zoom} onZoomChange={setZoom} />

          <Link
            href="/stats"
            style={{
              padding: "10px 20px",
              border: `1px solid ${DESIGN.secondaryNeon}`,
              boxShadow: `4px 4px 0px ${DESIGN.secondaryNeon}`,
              color: DESIGN.secondaryNeon,
              fontFamily: DESIGN.fontDisplay,
              fontSize: 14,
              textDecoration: "none",
              transition: "transform 0.1s, box-shadow 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)";
              e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.secondaryNeon}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.secondaryNeon}`;
            }}
          >
            Stats →
          </Link>
        </div>
      </footer>
    </div>
  );
}
