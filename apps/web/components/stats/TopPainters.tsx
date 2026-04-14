"use client";

import { DESIGN } from "@/lib/constants";
import type { PainterRank } from "@/hooks/useTopPainters";

interface TopPaintersProps {
  painters: PainterRank[];
}

export function TopPainters({ painters }: TopPaintersProps) {
  const truncate = (addr: string): string =>
    addr.length > 12 ? `${addr.slice(0, 8)}…${addr.slice(-4)}` : addr;

  return (
    <div>
      <h2
        style={{
          fontFamily: DESIGN.fontDisplay,
          color: DESIGN.primaryNeon,
          fontSize: 20,
          marginBottom: 16,
        }}
      >
        Top Painters
      </h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: DESIGN.fontDisplay,
          fontSize: 13,
        }}
      >
        <thead>
          <tr style={{ color: DESIGN.textMuted, textAlign: "left" }}>
            <th style={{ padding: "8px 12px" }}>#</th>
            <th style={{ padding: "8px 12px" }}>Address</th>
            <th style={{ padding: "8px 12px", textAlign: "right" }}>Pixels</th>
          </tr>
        </thead>
        <tbody>
          {painters.map((painter, idx) => (
            <tr
              key={painter.address}
              style={{
                color: DESIGN.textPrimary,
                borderTop: `1px solid rgba(255,255,255,0.05)`,
              }}
            >
              <td style={{ padding: "8px 12px", color: DESIGN.textMuted }}>
                {idx + 1}
              </td>
              <td style={{ padding: "8px 12px" }}>
                {truncate(painter.address)}
              </td>
              <td
                style={{
                  padding: "8px 12px",
                  textAlign: "right",
                  color: DESIGN.primaryNeon,
                }}
              >
                {painter.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
