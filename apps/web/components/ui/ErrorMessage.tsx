"use client";

import { DESIGN } from "@/lib/constants";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        fontFamily: DESIGN.fontDisplay,
        color: DESIGN.danger,
        fontSize: 14,
        textAlign: "center",
      }}
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "8px 16px",
            border: `1px solid ${DESIGN.danger}`,
            background: "transparent",
            color: DESIGN.danger,
            fontFamily: DESIGN.fontDisplay,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
