'use client';

import { 
    UsersGroupTwoFill, 
    EyeFill, 
    CursorClickFill, 
    RocketFill,
    SettingsFill
} from '@/components/icons';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DashboardOverview() {
  return (
    <>
      <div className="flex items-center justify-between">
         <div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Overview</h1>
            <p className="text-zinc-400">Welcome back, Commander.</p>
         </div>
         <button className="px-4 py-2 bg-electric text-white rounded-lg font-bold text-sm shadow-lg shadow-electric/20 hover:bg-electric-hover transition-colors flex items-center gap-2 group">
            <div className="relative w-4 h-4 transition-transform group-hover:scale-110">
                 <Image src="/dscrd-logo-icon.png" alt="Icon" fill className="object-contain" />
            </div>
            Share Profile
         </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Views" 
            value="1,234" 
            change="+12%" 
            icon={EyeFill} 
            color="text-blue-400"
            bg="bg-blue-500/10"
          />
          <StatCard 
            title="Link Clicks" 
            value="856" 
            change="+5%" 
            icon={CursorClickFill} 
            color="text-emerald-400"
            bg="bg-emerald-500/10"
          />
          <StatCard 
            title="Active Servers" 
            value="3" 
            change="0%" 
            icon={UsersGroupTwoFill} 
            color="text-purple-400"
            bg="bg-purple-500/10"
          />
           <StatCard 
            title="Plan" 
            value="Free" 
            change="Upgrade" 
            changeType="upgrade"
            icon={RocketFill} 
            color="text-orange-400"
            bg="bg-orange-500/10"
          />
      </div>

      {/* Recent Activity / Identity Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-[#0d0d10] border border-white/5 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-heading">Recent Activity</h3>
                  <button className="text-xs text-zinc-500 hover:text-white">View All</button>
              </div>
              <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition">
                          <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-mono text-zinc-500">
                                  JP
                              </div>
                              <div>
                                  <div className="text-sm font-bold text-white">New view on Profile</div>
                                  <div className="text-xs text-zinc-500">Just now • Paris, FR</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#0d0d10] border border-white/5 rounded-3xl p-6">
              <h3 className="text-lg font-bold font-heading mb-6">Quick Actions</h3>
              <div className="space-y-3">
                  <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center gap-3 transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
                          <SettingsFill className="w-4 h-4 text-electric" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Edit Profile</span>
                  </button>
                   <button className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left flex items-center gap-3 transition-colors group">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                          <UsersGroupTwoFill className="w-4 h-4 text-purple-500" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Manage Servers</span>
                  </button>
              </div>
          </div>

      </div>
    </>
  );
}

function StatCard({ title, value, change, icon: Icon, color, bg, changeType }: any) {
    return (
        <div className="bg-[#0d0d10] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
                {changeType === 'upgrade' ? (
                     <span className="text-xs font-bold text-electric bg-electric/10 px-2 py-1 rounded-full cursor-pointer hover:bg-electric hover:text-white transition-colors">UPGRADE</span>
                ) : (
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">{change}</span>
                )}
            </div>
            <div>
                <div className="text-zinc-500 text-sm font-medium mb-1">{title}</div>
                <div className="text-2xl font-bold font-heading text-white">{value}</div>
            </div>
        </div>
    )
}
