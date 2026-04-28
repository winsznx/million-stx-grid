# The Million STX Grid

A 100×100 collaborative pixel canvas living entirely on the Stacks blockchain. Every pixel placed is an individual mainnet transaction. Think r/place, but on Bitcoin.

## How It Works

Users connect their Stacks wallet, pick a color from a 32-color palette, click any coordinate on the canvas, and call the `paint-pixel` smart contract function. The full canvas state is reconstructed client-side by replaying all contract print events in chronological order — no backend, no database, pure on-chain state.

## Architecture

The grid state is **not** read via 10,000 individual `get-pixel` calls. Instead, every `paint-pixel` transaction emits a Clarity `print` event containing `{x, y, color, painter}`. The frontend fetches all contract events from the Hiro API in paginated batches, replays them in block order (last write wins), and builds the complete grid in memory.

```
Contract (paint-pixel) → print event → Hiro API → fetchAllEvents → replayEventsToGrid → <canvas>
```

## Repository Structure

```
stx-canvas/
├── contracts/
│   └── stx-canvas.clar              # Clarity smart contract
├── packages/
│   └── stx-canvas-client/           # @winsznx/stx-canvas-client npm package
│       └── src/
│           ├── types.ts              # PixelEvent, GridState, CanvasSyncResult
│           ├── grid/
│           │   ├── fetchAllEvents.ts # Paginated Hiro event fetcher
│           │   ├── replayEvents.ts   # Last-write-wins grid builder
│           │   └── encodeCoord.ts    # "x,y" key encoding
│           └── hooks/
│               └── useCanvasSync.ts  # React hook with polling
├── apps/
│   ├── web/                          # Next.js 14 frontend
│   │   ├── app/                      # App Router pages
│   │   ├── components/               # Canvas, palette, wallet, stats
│   │   ├── lib/                      # Constants, contract calls, fetcher
│   │   └── hooks/                    # useCanvasSync re-export, useTopPainters
│   └── painter/                      # CLI image-to-transactions tool
│       └── src/
│           ├── image-parser.ts       # PNG → pixel instructions via sharp
│           ├── tx-queue.ts           # Sequential transaction broadcaster
│           └── color-utils.ts        # RGB/hex conversion + palette quantization
├── turbo.json
├── pnpm-workspace.yaml
└── vercel.json
```

## Smart Contract

Deployed on Stacks Mainnet. The contract stores pixel colors in a map keyed by `{x, y}` coordinates and emits a print event on every paint operation.

### Functions

| Function | Type | Description |
|---|---|---|
| `paint-pixel (x uint) (y uint) (color string-ascii)` | Public | Paint a pixel at (x,y) with a hex color |
| `get-pixel (x uint) (y uint)` | Read-only | Get the color and painter at a coordinate |
| `get-total-painted` | Read-only | Total number of paint operations |

### Error Codes

| Code | Meaning |
|---|---|
| `u100` | Coordinate out of bounds (x or y ≥ 100) |
| `u101` | Invalid hex color (length ≠ 7) |

## NPM Package

`@winsznx/stx-canvas-client` is a standalone package for building alternate frontends.

```bash
pnpm add @winsznx/stx-canvas-client
```

```typescript
import { useCanvasSync } from "@winsznx/stx-canvas-client";

const { grid, isLoading, refresh } = useCanvasSync(
  "SP1234.stx-canvas",
  "https://api.hiro.so",
  15000
);
```

### Exports

- `useCanvasSync` — React hook for grid state with polling
- `fetchAllPixelEvents` — Paginated event fetcher
- `replayEventsToGrid` — Event array → GridState map
- `encodeCoord` / `decodeCoord` — Coordinate key helpers
- Types: `PixelEvent`, `GridState`, `CanvasSyncResult`

## Painter CLI

A Node.js tool that takes any PNG image and paints it onto the grid by broadcasting individual mainnet transactions.

```bash
pnpm painter --image ./logo.png --x 10 --y 10 --delay 500
pnpm painter --image ./logo.png --x 0 --y 0 --dry-run
```

| Flag | Default | Description |
|---|---|---|
| `--image` | required | Path to PNG file |
| `--x` | `0` | Top-left X offset on grid |
| `--y` | `0` | Top-left Y offset on grid |
| `--delay` | `500` | Milliseconds between transactions |
| `--dry-run` | `false` | Print pixels without broadcasting |

Images are resized to fit within 32×32 and the remaining grid space. Fully transparent pixels are skipped. Coordinates are validated against the 0–99 grid bounds.

### Painter Environment Variables

```
PAINTER_PRIVATE_KEY=<bot wallet private key>
PAINTER_CONTRACT_DEPLOYER=<deployer address>
PAINTER_CONTRACT_NAME=stx-canvas
PAINTER_NETWORK=mainnet            # "mainnet" or "testnet"
```

## Web Application

Next.js 14 App Router frontend with:

- HTML `<canvas>` rendering at 6px per grid pixel (600×600px)
- Separate overlay canvas for hover highlights (no full redraws on mousemove)
- 32-color palette with hard-shadow selection indicator
- Zoom controls: 1x, 2x, 4x, 8x via CSS transform scale
- Pending pixel overlay with pulsing animation during tx confirmation
- Wallet connection via `@stacks/connect` (Leather + Xverse)
- Stats page with top 20 painters leaderboard and live transaction feed
- OG image route via `@vercel/og`
- Programmatic 2×2 mosaic favicon

### Environment Variables

```
NEXT_PUBLIC_HIRO_API_BASE=https://api.hiro.so
NEXT_PUBLIC_CONTRACT_DEPLOYER=<deployer address>
NEXT_PUBLIC_CONTRACT_NAME=stx-canvas
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_APP_URL=https://stxcanvas.xyz
NEXT_PUBLIC_GRID_SIZE=100
NEXT_PUBLIC_POLL_INTERVAL_MS=15000
```

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Canvas Background | `#1a1a2e` |
| Primary Neon | `#00ff94` |
| Secondary Neon | `#7b61ff` |
| Danger | `#ff3c6e` |
| Text Primary | `#e8e8f0` |
| Text Muted | `#5a5a7a` |
| Font Display | JetBrains Mono |
| Font Body | Syne |

Buttons use hard shadows with zero blur — press animation via translate + shadow reduction.

## Getting Started

```bash
# Install dependencies
pnpm install

# Set environment variables
cp .env.example apps/web/.env.local

# Build all packages
pnpm turbo run build

# Start development server
pnpm turbo run dev --filter=web
```

## Deployment

### Contract

1. Deploy `contracts/stx-canvas.clar` to Stacks Mainnet
2. Set deployer address in environment variables
3. Call `paint-pixel` with a test pixel and confirm the print event appears in the Hiro API

### Web App

1. Set all environment variables in Vercel dashboard
2. Push to main — Vercel builds via `turbo run build --filter=web`
3. Verify grid renders, wallet connects, and painting works end-to-end

### NPM Package

```bash
pnpm --filter @winsznx/stx-canvas-client build
pnpm --filter @winsznx/stx-canvas-client publish --access public
```

## Tech Stack

- **Blockchain**: Stacks (Bitcoin L2), Clarity smart contracts
- **Frontend**: Next.js 14, React 18, HTML Canvas API
- **Wallet**: @stacks/connect (Leather, Xverse)
- **Data**: Hiro API event pagination, client-side event replay
- **Image Processing**: sharp
- **Build**: pnpm workspaces, Turborepo
- **Deploy**: Vercel

## License

MIT
