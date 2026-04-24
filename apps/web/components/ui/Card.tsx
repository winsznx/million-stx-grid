"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

/**
 * A neon-bordered card component for UI grouping.
 */
export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function Card(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("p-4", className)}
      style={{
        background: DESIGN.canvasBg,
        border: `1px solid ${DESIGN.textMuted}`,
        boxShadow: `4px 4px 0px ${DESIGN.textMuted}`,
      }}
      {...props}
    >
      {children}
    </div>
  );
});
