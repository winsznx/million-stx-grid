"use client";

import { DESIGN } from "@/lib/constants";
import type { PixelEvent } from "@winsznx/stx-canvas-client";

interface LiveTxFeedProps {
  events: PixelEvent[];
}

function timeAgo(blockHeight: number, latestBlock: number): string {
  const blocksDiff = latestBlock - blockHeight;
  const minutesDiff = blocksDiff * 10;
  if (minutesDiff < 1) return "just now";
  if (minutesDiff < 60) return `${minutesDiff}m ago`;
  const hours = Math.floor(minutesDiff / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function LiveTxFeed({ events }: LiveTxFeedProps) {
  const recentEvents = events.slice(-20).reverse();
  const latestBlock = events.length > 0 ? events[events.length - 1].blockHeight : 0;
  const truncate = (addr: string): string =>
    addr.length > 8 ? `${addr.slice(0, 5)}…${addr.slice(-3)}` : addr;

  return (
    <div>
      <h2
        style={{
          fontFamily: DESIGN.fontDisplay,
          color: DESIGN.secondaryNeon,
          fontSize: 20,
          marginBottom: 16,
        }}
      >
        Live Feed
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {recentEvents.map((event) => (
          <div
            key={`${event.txId}-${event.x}-${event.y}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 12px",
              borderLeft: `3px solid ${event.color}`,
              fontFamily: DESIGN.fontDisplay,
              fontSize: 12,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                backgroundColor: event.color,
                flexShrink: 0,
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <span style={{ color: DESIGN.textPrimary }}>
              {truncate(event.painter)}
            </span>
            <span style={{ color: DESIGN.textMuted }}>
              ({event.x}, {event.y})
            </span>
            <span
              style={{ color: DESIGN.textMuted, marginLeft: "auto", fontSize: 11 }}
            >
              {timeAgo(event.blockHeight, latestBlock)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
