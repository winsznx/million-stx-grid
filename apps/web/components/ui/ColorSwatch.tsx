"use client";

interface ColorSwatchProps {
  color: string;
  size?: number;
}

export function ColorSwatch({ color, size = 14 }: ColorSwatchProps) {
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        border: "1px solid rgba(255,255,255,0.2)",
        flexShrink: 0,
      }}
    />
  );
}
