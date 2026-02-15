'use client';

import { MousePointerClick, Link2, Eye, Zap, ArrowRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { StatCard } from '@/components/dashboard/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'there';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clicks"
          value="1,247"
          icon={MousePointerClick}
          description="+12% from last month"
        />
        <StatCard
          title="Active Links"
          value="8"
          icon={Link2}
          description="3 links pending"
        />
        <StatCard
          title="Profile Views"
          value="420"
          icon={Eye}
          description="+5% from last month"
        />
        <StatCard
          title="Engagement"
          value="+12.5%"
          icon={Zap}
          description="+2.1% from last month"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              You have 3 new notifications from your servers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for activity graph or list */}
            <div className="h-[200px] flex items-center justify-center border rounded-md border-dashed text-muted-foreground">
               Activity Graph Placeholder
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
             <CardDescription>
              Manage your identity and links.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <Button asChild className="w-full justify-between" variant="secondary">
                <Link href="/dashboard/identity">
                   <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Edit Profile</span>
                   <ArrowRight className="w-4 h-4" />
                </Link>
             </Button>
             <Button asChild className="w-full justify-between" variant="outline">
                <Link href="/dashboard/links">
                   <span className="flex items-center gap-2"><Link2 className="w-4 h-4" /> Create Link</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
