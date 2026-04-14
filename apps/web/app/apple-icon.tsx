import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <div style={{ width: 90, height: 90, background: "#00ff94" }} />
        <div style={{ width: 90, height: 90, background: "#7b61ff" }} />
        <div style={{ width: 90, height: 90, background: "#ff3c6e" }} />
        <div style={{ width: 90, height: 90, background: "#0a0a0f" }} />
      </div>
    ),
    { ...size }
  );
}
