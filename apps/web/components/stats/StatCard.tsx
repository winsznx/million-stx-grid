"use client";

import { Card } from "../ui/Card";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
}

/**
 * Reusable card for displaying individual grid statistics.
 */
export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card className="p-4 flex flex-col justify-center space-y-1">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
        {icon && <div className="text-white/20">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-mono font-bold">{value}</span>
        {trend && <span className="text-[10px] text-primary-neon font-bold">{trend}</span>}
      </div>
    </Card>
  );
}
