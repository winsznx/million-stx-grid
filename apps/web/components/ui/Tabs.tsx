"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeId, onChange, className }: TabsProps) {
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div className={cn(className)}>
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: 4,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active?.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "none",
                borderBottom: `2px solid ${isActive ? DESIGN.primaryNeon : "transparent"}`,
                color: isActive ? DESIGN.primaryNeon : DESIGN.textMuted,
                fontFamily: DESIGN.fontDisplay,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" style={{ paddingTop: 16 }}>
        {active?.content}
      </div>
    </div>
  );
}
