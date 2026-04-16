export const queryKeys = {
  all: ["stx-canvas"] as const,
  events: () => [...queryKeys.all, "events"] as const,
  eventsPage: (offset: number) => [...queryKeys.events(), offset] as const,
  painters: () => [...queryKeys.all, "painters"] as const,
  painter: (address: string) => [...queryKeys.painters(), address] as const,
  pixel: (x: number, y: number) => [...queryKeys.all, "pixel", x, y] as const,
  stats: () => [...queryKeys.all, "stats"] as const,
} as const;
