"use client";

import { DESIGN } from "@/lib/constants";

/**
 * CSS-based neon spinner for loading states.
 */
export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <div
      className="inline-block animate-spin rounded-full border-2 border-t-transparent"
      style={{
        width: size,
        height: size,
        borderColor: `${DESIGN.primaryNeon}22`,
        borderTopColor: DESIGN.primaryNeon,
      }}
    />
  );
}
