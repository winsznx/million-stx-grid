"use client";

import { cn } from "@/lib/cn";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Skeleton({ width = "100%", height = 16, className }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={cn(className)}
      style={{
        display: "inline-block",
        width,
        height,
        background: "linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 100%)",
        backgroundSize: "200% 100%",
        animation: "stxSkeleton 1.4s ease-in-out infinite",
      }}
    >
      <style>{`@keyframes stxSkeleton { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </span>
  );
}
