import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

const GRID_COLORS = [
  "#00ff94", "#7b61ff", "#ff3c6e", "#00cfff", "#ffcc00",
  "#e50000", "#02be01", "#cf6ee4", "#ff6b35", "#0083c7",
  "#94e044", "#ffa7d1", "#e5d900", "#0000ea", "#820080",
  "#a06a42", "#ff85a1", "#b5ead7", "#e4e4e4", "#222222",
  "#888888", "#ffffff", "#c7b8ea", "#ff9aa2", "#ffb7b2",
  "#ffdac1", "#e2f0cb", "#00e5f0", "#0a0a0f", "#1a1a2e",
];

export async function GET() {
  const squareSize = 60;
  const cols = 10;
  const rows = 6;
  const gridWidth = cols * squareSize;
  const gridHeight = rows * squareSize;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0f",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: gridWidth,
            marginBottom: 40,
          }}
        >
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div
              key={i}
              style={{
                width: squareSize,
                height: squareSize,
                backgroundColor: GRID_COLORS[i % GRID_COLORS.length],
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#00ff94",
              fontFamily: "monospace",
              letterSpacing: -1,
            }}
          >
            THE MILLION STX GRID
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#5a5a7a",
              marginTop: 12,
            }}
          >
            r/place on Bitcoin
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
