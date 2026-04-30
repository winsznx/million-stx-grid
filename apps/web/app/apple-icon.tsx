import { ImageResponse } from "next/og";
import { APPLE_ICON_SIZE, DESIGN } from "@/lib/constants";

export const size = { width: APPLE_ICON_SIZE, height: APPLE_ICON_SIZE };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: APPLE_ICON_SIZE, height: APPLE_ICON_SIZE, display: "flex", alignItems: "center", justifyContent: "center", background: DESIGN.bg, borderRadius: 32 }}>
        <div style={{ width: 100, height: 100, background: DESIGN.primaryNeon, borderRadius: 16 }} />
      </div>
    ),
    { ...size }
  );
}
