export const HIRO_API_BASE = process.env.NEXT_PUBLIC_HIRO_API_BASE!;
export const CONTRACT_DEPLOYER = process.env.NEXT_PUBLIC_CONTRACT_DEPLOYER!;
export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME!;
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;
export const GRID_SIZE = Number(process.env.NEXT_PUBLIC_GRID_SIZE!);
export const POLL_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_POLL_INTERVAL_MS!);
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const PIXEL_SIZE = 6;
export const DEVICE_PIXEL_RATIO_DEFAULT = 1;
export const CANVAS_SIZE = GRID_SIZE * PIXEL_SIZE;
export const DEFAULT_BG_COLOR = "#1a1a2e";
export const HOVER_BORDER_WIDTH = 1;
export const HIGHLIGHT_COLOR = "#00ff94";

export const ZOOM_LEVELS = [1, 2, 4, 8] as const;
export const DEFAULT_ZOOM = 1;
export const MIN_ZOOM = ZOOM_LEVELS[0];
export const MAX_ZOOM = ZOOM_LEVELS[ZOOM_LEVELS.length - 1];

export const COLOR_PALETTE: string[] = [
  "#FFFFFF", "#E4E4E4", "#888888", "#222222",
  "#FFA7D1", "#E50000", "#E59500", "#A06A42",
  "#E5D900", "#94E044", "#02BE01", "#00E5F0",
  "#0083C7", "#0000EA", "#CF6EE4", "#820080",
  "#FF6B35", "#00FF94", "#7B61FF", "#FF3C6E",
  "#00CFFF", "#FFCC00", "#FF85A1", "#B5EAD7",
  "#C7B8EA", "#FF9AA2", "#FFB7B2", "#FFDAC1",
  "#E2F0CB", "#B5EAD7", "#C7B8EA", "#0a0a0f",
];

export const DESIGN = {
  bg: "#0a0a0f",
  canvasBg: "#1a1a2e",
  primaryNeon: "#00ff94",
  secondaryNeon: "#7b61ff",
  danger: "#ff3c6e",
  textPrimary: "#e8e8f0",
  textMuted: "#5a5a7a",
  fontDisplay: "'JetBrains Mono', monospace",
  fontBody: "'Syne', sans-serif",
} as const;
export const PALETTE_COLUMNS = 8;
export const PALETTE_SWATCH_SIZE = 28;
export const TRUNCATE_START = 5;
export const TRUNCATE_END = 3;
export const TOP_PAINTERS_LIMIT = 20;
export const LIVE_FEED_LIMIT = 20;
export const STACKS_BLOCK_TIME_MINUTES = 10;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const FAVICON_SIZE = 32;
export const APPLE_ICON_SIZE = 180;
export const PENDING_PULSE_DURATION = "1.5s";
export const BUTTON_SHADOW_OFFSET = 4;
export const BUTTON_HOVER_OFFSET = 2;
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
