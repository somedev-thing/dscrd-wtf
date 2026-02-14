import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Image from 'next/image'
import { ensureProfile } from "@/lib/actions"
import { getLinksByUserId } from "@/lib/data"
import Link from "next/link"
import { 
  ArrowRight01Icon, 
  ChartBarLineIcon, 
  UserGroupIcon, 
  FilterHorizontalIcon, 
  RefreshIcon, 
  PencilEdit02Icon, 
  LinkSquare01Icon,
  InformationCircleIcon
} from 'hugeicons-react'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await ensureProfile()
  const links = await getLinksByUserId(session.user.id)

  // Calculate badges from profile
  const badges = profile?.selected_badges || [];
  // Fallback if empty (logic should ideally be handling this server-side or in profile creation)
  // If we want to show ALL eligible badges:
  const eligibleBadges = [];
  const flags = session.user.flags || 0;
  if (flags & (1 << 0)) eligibleBadges.push({ name: 'Discord Staff', icon: '/assets/discordstaff.svg' });
  if (flags & (1 << 1)) eligibleBadges.push({ name: 'Partnered Server Owner', icon: '/assets/discordpartner.svg' });
  if (flags & (1 << 2)) eligibleBadges.push({ name: 'HypeSquad Events', icon: '/assets/hypesquadevents.svg' });
  if (flags & (1 << 3)) eligibleBadges.push({ name: 'Bug Hunter Level 1', icon: '/assets/discordbughunter1.svg' });
  if (flags & (1 << 6)) eligibleBadges.push({ name: 'House Bravery', icon: '/assets/hypesquadbravery.svg' });
  if (flags & (1 << 7)) eligibleBadges.push({ name: 'House Brilliance', icon: '/assets/hypesquadbrilliance.svg' });
  if (flags & (1 << 8)) eligibleBadges.push({ name: 'House Balance', icon: '/assets/hypesquadbalance.svg' });
  if (flags & (1 << 9)) eligibleBadges.push({ name: 'Early Supporter', icon: '/assets/discordearlysupporter.svg' });
  if (flags & (1 << 14)) eligibleBadges.push({ name: 'Bug Hunter Level 2', icon: '/assets/discordbughunter2.svg' });
  if (flags & (1 << 17)) eligibleBadges.push({ name: 'Verified Bot Developer', icon: '/assets/discordbotdev.svg' });
  if (flags & (1 << 18)) eligibleBadges.push({ name: 'Certified Moderator', icon: '/assets/discordmod.svg' });
  if (flags & (1 << 22)) eligibleBadges.push({ name: 'Active Developer', icon: '/assets/activedeveloper.svg' });
  if (session.user.premium_type && session.user.premium_type > 0) eligibleBadges.push({ name: 'Nitro', icon: '/assets/discordnitro.svg' });

  // If user hasn't selected badges, show all eligible
  const displayBadges = badges.length > 0 ? badges : eligibleBadges;

  // Calculate stats
  const totalClicks = links?.reduce((acc: number, link: any) => acc + (link.clicks || 0), 0) || 0
  const activeLinks = links?.length || 0

  return (
     <>
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-10 sticky top-0 z-30">
            <div>
                <h1 className="font-heading font-black text-2xl text-white">Dashboard</h1>
                <p className="text-sm text-gray-500 font-sans">Welcome back, {session.user.name}</p>
            </div>

            <div className="flex items-center gap-6">
                <Link href="/dashboard/links" className="bg-white text-black hover:bg-electric hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 font-sans group">
                    Create Link <ArrowRight01Icon size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </header>

        {/* Dashboard Content */}
        <div className="px-10 pb-10 overflow-y-auto">

            {/* Top Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                {/* Main Stat */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 text-electric opacity-10 group-hover:scale-110 transition-transform">
                        <ChartBarLineIcon size={64} />
                    </div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-electric/10 text-electric border border-electric/20">
                                <ChartBarLineIcon size={24} />
                            </div>
                            <span className="text-gray-400 font-medium">Total Clicks</span>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white font-sans tracking-tight">{totalClicks}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-green-400 text-xs font-bold font-mono">
                                    +12% vs last week
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Stat */}
                <div className="glass-card p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 text-phantom-accent opacity-10 group-hover:scale-110 transition-transform">
                        <LinkSquare01Icon size={64} />
                    </div>
                    <div className="flex flex-col h-full justify-between relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-phantom-accent/10 text-phantom-accent border border-phantom-accent/20">
                                <LinkSquare01Icon size={24} />
                            </div>
                            <span className="text-gray-400 font-medium">Active Links</span>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-white font-sans tracking-tight">{activeLinks}</div>
                            <div className="text-xs text-gray-500 mt-2 font-sans">Unlimited Plan Active</div>
                        </div>
                    </div>
                </div>

                {/* Verified Upsell (Or Status) */}
                <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl md:col-span-2 bg-gradient-to-r from-electric/10 to-transparent border-electric/30 flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            {profile?.plan === 'pro' ? (
                                <span className="bg-electric text-white text-[10px] font-black px-2 py-0.5 rounded font-mono">PRO PLAN</span>
                            ) : (
                                <span className="bg-gray-700 text-white text-[10px] font-black px-2 py-0.5 rounded font-mono">FREE PLAN</span>
                            )}
                            <span className="text-xs text-gray-400 font-sans">
                                {profile?.plan === 'pro' ? 'Active Subscription' : 'Upgrade to Pro'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white font-sans">
                            {profile?.plan === 'pro' ? 'Power User Active' : 'Unlock Full Potential'}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1 max-w-sm font-sans">
                            {profile?.plan === 'pro'
                             ? 'You have access to Custom CSS, Themes, and Animated Banners.'
                             : 'Get access to themes, banners, and removed branding.'}
                        </p>
                    </div>
                    <div className="hidden md:flex gap-3 relative z-10">
                        <Link href="/pricing" className="px-4 py-2 bg-[#111] border border-[#222] hover:border-white text-white rounded-lg text-sm font-medium transition-colors font-sans">
                            {profile?.plan === 'pro' ? 'Manage Billing' : 'Upgrade Now'}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Active Links List */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white font-sans">Recent Connections</h2>
                        <div className="flex gap-2">
                             <button className="p-2 text-gray-500 hover:text-white transition-colors"><FilterHorizontalIcon size={18} /></button>
                             <button className="p-2 text-gray-500 hover:text-white transition-colors"><UserGroupIcon size={24} /></button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">

                        {links && links.map((link: any) => (
                            <div key={link.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 shrink-0 group-hover:text-white transition-colors">
                                        <LinkSquare01Icon size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-white font-bold truncate text-lg">{link.title}</span>
                                            <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate font-mono flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-electric"></span>
                                            {link.url}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <div className="text-lg font-bold text-white font-mono">{link.clicks}</div>
                                        <div className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">Clicks</div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href="/dashboard/links" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><PencilEdit02Icon size={18} /></Link>
                                    <a href={link.url} target="_blank" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-electric"><LinkSquare01Icon size={18} /></a>
                                </div>
                                </div>
                            </div>
                        ))}

                        {links?.length === 0 && (
                            <div className="text-center py-12 text-gray-500 text-sm font-mono glass-card rounded-3xl flex flex-col items-center justify-center gap-4">
                                <div className="p-4 rounded-full bg-white/5 text-gray-600">
                                    <LinkSquare01Icon size={32} />
                                </div>
                                <p>No connections yet.</p>
                                <Link href="/dashboard/links" className="text-electric hover:underline">Create your first link</Link>
                            </div>
                        )}

                    </div>
                </div>

                {/* Right: Quick Tools */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-bold text-white font-sans">Tools</h2>

                    {/* CSS Editor Widget */}
                    <div className="glass-card p-6 rounded-3xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-white font-sans">Custom CSS</span>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        </div>
                        <div className="bg-[#050505] border border-white/5 rounded-xl p-4 font-mono text-xs text-gray-400 overflow-hidden relative mb-4">
                            <span className="text-phantom-accent">.profile-card</span> {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-electric">border</span>: <span className="text-fanta">1px solid</span> <span className="text-white">#fff</span>;<br/>
                            {'}'}
                        </div>
                        <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white py-3 rounded-xl transition-colors font-sans">
                            Open Editor
                        </button>
                    </div>


                    {/* User Badges Widget */}
                    <div className="glass-card p-6 rounded-3xl">
                        <div className="text-sm font-bold text-white font-sans mb-4">Your Badges</div>
                        <div className="flex flex-wrap gap-2">
                            {displayBadges.length > 0 ? (
                                displayBadges.map((badge: any) => (
                                    <div key={badge.name} className="w-10 h-10 p-2 bg-white/5 rounded-lg border border-white/5 hover:border-electric/50 transition-colors flex items-center justify-center tooltip" title={badge.name}>
                                        <Image src={badge.icon} alt={badge.name} width={24} height={24} className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                                    </div>
                                ))
                            ) : (
                                <div className="w-full text-center text-gray-500 text-xs">No badges to display.</div>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {/* Mini Footer */}
            <div className="mt-10 pt-6 border-t border-[#222] flex justify-between items-center text-xs text-gray-600 font-mono">
                <div>&copy; 2026 dscrd.wtf</div>
                <div className="flex gap-4">
                    <Link href="/legal/terms" className="hover:text-gray-400">Terms</Link>
                    <Link href="/legal/privacy" className="hover:text-gray-400">Privacy</Link>
                    <Link href="https://twitter.com/dscrdwtf" className="hover:text-gray-400">Twitter</Link>
                </div>
            </div>

        </div>
     </>
  )
}
