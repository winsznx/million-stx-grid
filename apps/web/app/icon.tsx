import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
        <div style={{ width: 16, height: 16, background: "#00ff94" }} />
        <div style={{ width: 16, height: 16, background: "#7b61ff" }} />
        <div style={{ width: 16, height: 16, background: "#ff3c6e" }} />
        <div style={{ width: 16, height: 16, background: "#0a0a0f" }} />
      </div>
    ),
    { ...size }
  );
}
