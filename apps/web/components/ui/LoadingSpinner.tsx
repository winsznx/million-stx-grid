"use client";

import { DESIGN } from "@/lib/constants";

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div
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
      <div
        style={{
          width: 24,
          height: 24,
          border: `2px solid ${DESIGN.textMuted}`,
          borderTopColor: DESIGN.primaryNeon,
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span>{message}</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
