"use client";

import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";
import { Spinner } from "./Spinner";

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export function LoadingSpinner({ message = "Loading...", className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: DESIGN.fontDisplay,
        color: DESIGN.textMuted,
        fontSize: 16,
      }}
    >
      <Spinner size={24} />
      <span>{message}</span>
    </div>
  );
}
