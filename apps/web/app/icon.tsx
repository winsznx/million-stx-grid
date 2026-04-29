import { ImageResponse } from "next/og";
import { FAVICON_SIZE, DESIGN } from "@/lib/constants";

export const size = { width: FAVICON_SIZE, height: FAVICON_SIZE };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: FAVICON_SIZE, height: FAVICON_SIZE, display: "flex", alignItems: "center", justifyContent: "center", background: DESIGN.bg, borderRadius: 4 }}>
        <div style={{ width: 20, height: 20, background: DESIGN.primaryNeon, borderRadius: 2 }} />
      </div>
    ),
    { ...size }
  );
}
