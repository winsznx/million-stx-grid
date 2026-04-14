"use client";

import { DESIGN } from "@/lib/constants";

interface ColorCount {
  color: string;
  count: number;
}

interface ColorDistributionProps {
  colors: ColorCount[];
  limit?: number;
}

export function ColorDistribution({ colors, limit = 10 }: ColorDistributionProps) {
  const topColors = colors.slice(0, limit);
  const maxCount = topColors.length > 0 ? topColors[0].count : 1;

  return (
    <div>
      <h3 style={{ fontFamily: DESIGN.fontDisplay, color: DESIGN.textPrimary, fontSize: 16, marginBottom: 12 }}>
        Top Colors
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {topColors.map(({ color, count }) => (
          <div key={color} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 16, height: 16, backgroundColor: color, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
            <div style={{ flex: 1, height: 6, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, backgroundColor: color, opacity: 0.7 }} />
            </div>
            <span style={{ fontFamily: DESIGN.fontDisplay, fontSize: 11, color: DESIGN.textMuted, minWidth: 30, textAlign: "right" }}>
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
