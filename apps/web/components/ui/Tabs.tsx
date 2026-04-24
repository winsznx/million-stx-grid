"use client";

import { ReactNode, useState } from "react";
import { cn } from "@/lib/cn";
import { DESIGN } from "@/lib/constants";

interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[];
}

/**
 * Tabbed navigation component with neon active state.
 */
export function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);

  return (
    <div>
      <div className="flex border-b border-muted mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-bold transition-colors border-b-2 -mb-[2px]",
              active === tab.id ? "border-primary-neon text-primary-neon" : "border-transparent text-muted"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
