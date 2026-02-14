import { auth } from "@/auth"
import { redirect } from "next/navigation"
import * as Avatar from '@radix-ui/react-avatar';
import * as Tooltip from '@radix-ui/react-tooltip';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  const flags = session.user.flags || 0;
  const badges = [];

  if (flags & (1 << 0)) badges.push({ name: 'Discord Staff', icon: '/assets/discordstaff.svg' });
  if (flags & (1 << 1)) badges.push({ name: 'Partnered Server Owner', icon: '/assets/discordpartner.svg' });
  if (flags & (1 << 2)) badges.push({ name: 'HypeSquad Events', icon: '/assets/hypesquadevents.svg' });
  if (flags & (1 << 3)) badges.push({ name: 'Bug Hunter Level 1', icon: '/assets/discordbughunter1.svg' });
  if (flags & (1 << 6)) badges.push({ name: 'House Bravery', icon: '/assets/hypesquadbravery.svg' });
  if (flags & (1 << 7)) badges.push({ name: 'House Brilliance', icon: '/assets/hypesquadbrilliance.svg' });
  if (flags & (1 << 8)) badges.push({ name: 'House Balance', icon: '/assets/hypesquadbalance.svg' });
  if (flags & (1 << 9)) badges.push({ name: 'Early Supporter', icon: '/assets/discordearlysupporter.svg' });
  if (flags & (1 << 14)) badges.push({ name: 'Bug Hunter Level 2', icon: '/assets/discordbughunter2.svg' });
  if (flags & (1 << 17)) badges.push({ name: 'Verified Bot Developer', icon: '/assets/discordbotdev.svg' });
  if (flags & (1 << 18)) badges.push({ name: 'Certified Moderator', icon: '/assets/discordmod.svg' });
  if (flags & (1 << 22)) badges.push({ name: 'Active Developer', icon: '/assets/activedeveloper.svg' });

  if (session.user.premium_type && session.user.premium_type > 0) {
      badges.push({ name: 'Nitro', icon: '/assets/discordnitro.svg' });
  }

  return (
    <main className="pt-32 min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
           <h1 className="text-4xl font-black text-white font-sans">Dashboard</h1>
           <Link href="/api/auth/signout" className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
             <LogOut size={16} /> Sign Out
           </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-[#0e0e0e] border border-[#222] rounded-[2rem] overflow-hidden max-w-md mx-auto relative group">
           {/* Banner Placeholder */}
           <div className="h-32 bg-linear-to-r from-electric to-purple-600 w-full relative">
              <div className="absolute inset-0 bg-black/20"></div>
           </div>

           <div className="px-6 pb-6 relative">
              {/* Avatar */}
              <div className="relative -mt-12 mb-4 inline-block">
                 <Avatar.Root className="w-[100px] h-[100px] rounded-full border-[6px] border-[#0e0e0e] bg-[#222] overflow-hidden">
                    <Avatar.Image 
                      src={session.user.image || ''} 
                      alt={session.user.name || 'User'} 
                      className="object-cover w-full h-full"
                    />
                    <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-electric text-white font-bold text-3xl">
                      {session.user.name?.[0]?.toUpperCase()}
                    </Avatar.Fallback>
                 </Avatar.Root>
                 {/* Status Indicator - Placeholder for now */}
                 <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-[4px] border-[#0e0e0e]"></div>
              </div>

              {/* User Info */}
              <h2 className="text-2xl font-bold text-white font-sans flex items-center gap-2">
                {session.user.name} 
                <span className="text-gray-500 text-lg font-normal font-mono">#{session.user.id?.slice(0, 4) || '0000'}</span>
              </h2>
              
              {/* Badges */}
              <div className="flex gap-2 mt-3 p-2 bg-black/40 rounded-lg w-fit min-h-[40px]">
                {badges.length > 0 ? (
                  <Tooltip.Provider delayDuration={0}>
                    {badges.map((badge) => (
                      <Tooltip.Root key={badge.name}>
                        <Tooltip.Trigger asChild>
                          <div className="w-6 h-6 flex items-center justify-center cursor-help hover:scale-110 transition-transform">
                             <img src={badge.icon} alt={badge.name} className="w-full h-full object-contain" />
                          </div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content className="bg-black border border-white/10 px-3 py-1.5 rounded text-xs text-white shadow-xl z-50 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 font-mono" sideOffset={5}>
                            {badge.name}
                            <Tooltip.Arrow className="fill-white/10" />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    ))}
                  </Tooltip.Provider>
                ) : (
                  <span className="text-xs text-gray-600 font-mono italic px-2">No badges found</span>
                )}
              </div>

              {/* Bio */}
              <div className="mt-6 pt-6 border-t border-white/5">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 font-mono">About Me</h3>
                <p className="text-sm text-gray-300 font-body leading-relaxed">
                   User ID: {session.user.id} <br/>
                   Flags: {flags} (Debug)
                </p>
              </div>

              {/* Edit Button */}
              <button className="w-full mt-6 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-sm font-bold text-white transition-all font-sans">
                Edit Profile
              </button>
           </div>
        </div>
      </div>
    </main>
  )
}
