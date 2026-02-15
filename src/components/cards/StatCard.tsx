'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatCard({ label, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl transition-all duration-200 hover:border-zinc-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
              {label}
            </p>
            <p className="text-2xl font-bold text-white">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <p className={`text-xs font-medium ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </p>
            )}
          </div>
          <div className="p-2.5 rounded-lg bg-electric-glow">
            <Icon className="w-5 h-5 text-electric" />
          </div>
        </div>
      </div>
    </div>
  );
}
