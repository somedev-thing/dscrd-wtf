'use client';

import { MousePointerClick, Link2, Eye, Zap } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { StatCard } from '@/components/cards/StatCard';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'there';

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-extrabold mb-1 tracking-tight">
          Welcome back, {userName}
          <span className="ml-2">⚡</span>
        </h1>
        <p className="text-sm text-zinc-500">
          Here&apos;s what&apos;s happening with your identity layer.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          label="Total Clicks"
          value={1247}
          icon={MousePointerClick}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          label="Active Links"
          value={8}
          icon={Link2}
        />
        <StatCard
          label="Profile Views"
          value={420}
          icon={Eye}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/dashboard/identity"
            className="group block bg-surface-card border border-surface-border rounded-xl transition-all duration-200 hover:border-electric hover:bg-surface-hover hover:-translate-y-0.5"
          >
            <div className="p-5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-electric-glow group-hover:bg-electric/20 transition-colors">
                <Zap size={18} className="text-electric" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-0.5">Edit Your Profile</p>
                <p className="text-xs text-zinc-500">Customize your public identity</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/links"
            className="group block bg-surface-card border border-surface-border rounded-xl transition-all duration-200 hover:border-electric hover:bg-surface-hover hover:-translate-y-0.5"
          >
             <div className="p-5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-electric-glow group-hover:bg-electric/20 transition-colors">
                <Link2 size={18} className="text-electric" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-0.5">Create a New Link</p>
                <p className="text-xs text-zinc-500">Add a redirect, bot, or server link</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
