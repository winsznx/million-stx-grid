import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT, DESIGN } from "@/lib/constants";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "The Million STX Grid";

  return new ImageResponse(
    (
      <div style={{ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: DESIGN.bg, color: DESIGN.textPrimary, fontFamily: "monospace" }}>
        <div style={{ fontSize: 48, fontWeight: 700, color: DESIGN.primaryNeon }}>{title}</div>
        <div style={{ fontSize: 24, marginTop: 16, opacity: 0.6 }}>r/place on Bitcoin</div>
      </div>
    ),
    { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }
  );
}
