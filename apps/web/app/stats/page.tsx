"use client";

import { useState, useEffect, useMemo } from "react";
import { fetchAllPixelEvents, type PixelEvent } from "@winsznx/stx-canvas-client";
import { TopPainters } from "@/components/stats/TopPainters";
import { LiveTxFeed } from "@/components/stats/LiveTxFeed";
import { useTopPainters } from "@/hooks/useTopPainters";
import { CONTRACT_IDENTIFIER, HIRO_API_BASE, POLL_INTERVAL_MS, DESIGN } from "@/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";

export default function StatsPage() {
  const [events, setEvents] = useState<PixelEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const data = await fetchAllPixelEvents(CONTRACT_IDENTIFIER, HIRO_API_BASE);
        if (isMounted) {
          setEvents(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load events");
          setIsLoading(false);
        }
      }
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const painters = useTopPainters(events, 20);

  const uniquePainters = useMemo(() => {
    const set = new Set(events.map((e) => e.painter));
    return set.size;
  }, [events]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: DESIGN.bg,
        padding: "24px",
      }}
    >
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: DESIGN.fontDisplay,
              fontSize: 24,
              color: DESIGN.primaryNeon,
              marginBottom: 4,
            }}
          >
            Stats & Leaderboard
          </h1>
          <p
            style={{
              fontFamily: DESIGN.fontBody,
              color: DESIGN.textMuted,
              fontSize: 14,
            }}
          >
            The Million STX Grid
          </p>
        </div>
        <Link
          href="/"
          style={{
            padding: "10px 20px",
            border: `1px solid ${DESIGN.primaryNeon}`,
            boxShadow: `4px 4px 0px ${DESIGN.primaryNeon}`,
            color: DESIGN.primaryNeon,
            fontFamily: DESIGN.fontDisplay,
            fontSize: 14,
            textDecoration: "none",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translate(2px, 2px)";
            e.currentTarget.style.boxShadow = `2px 2px 0px ${DESIGN.primaryNeon}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "";
            e.currentTarget.style.boxShadow = `4px 4px 0px ${DESIGN.primaryNeon}`;
          }}
        >
          ← Canvas
        </Link>
      </header>

      {isLoading ? (
        <div
          style={{
            fontFamily: DESIGN.fontDisplay,
            color: DESIGN.textMuted,
            fontSize: 16,
            textAlign: "center",
            marginTop: 48,
          }}
        >
          Loading stats...
        </div>
      ) : error ? (
        <div
          style={{
            fontFamily: DESIGN.fontDisplay,
            color: DESIGN.danger,
            fontSize: 14,
            textAlign: "center",
            marginTop: 48,
          }}
        >
          {error}
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 32,
            }}
          >
            <div
              style={{
                padding: "20px",
                border: `1px solid rgba(255,255,255,0.05)`,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: DESIGN.fontDisplay,
                  fontSize: 32,
                  color: DESIGN.primaryNeon,
                }}
              >
                {events.length.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: DESIGN.fontBody,
                  fontSize: 14,
                  color: DESIGN.textMuted,
                  marginTop: 4,
                }}
              >
                Total Pixels Painted
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                border: `1px solid rgba(255,255,255,0.05)`,
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div
                style={{
                  fontFamily: DESIGN.fontDisplay,
                  fontSize: 32,
                  color: DESIGN.secondaryNeon,
                }}
              >
                {uniquePainters.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: DESIGN.fontBody,
                  fontSize: 14,
                  color: DESIGN.textMuted,
                  marginTop: 4,
                }}
              >
                Unique Painters
              </div>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            <TopPainters painters={painters} />
            <LiveTxFeed events={events} />
          </div>
        </>
      )}
    </div>
  );
}
