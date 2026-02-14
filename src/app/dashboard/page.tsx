import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Plus, ArrowRight, BarChart3, Users, ExternalLink, RefreshCw, Filter, Edit, Play } from 'lucide-react'
import Image from 'next/image'
import { ensureProfile } from "@/lib/actions"
import { getLinksByUserId } from "@/lib/data"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await ensureProfile()
  const links = await getLinksByUserId(session.user.id)

  // Calculate stats
  const totalClicks = links?.reduce((acc: number, link: any) => acc + (link.clicks || 0), 0) || 0
  const activeLinks = links?.length || 0

  // Calculate badges
  const flags = session.user.flags || 0;
  const badges = [];
  // ... (badges mapping logic stays the same)
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
  if (session.user.premium_type && session.user.premium_type > 0) badges.push({ name: 'Nitro', icon: '/assets/discordnitro.svg' });

  return (
     <>
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 border-b border-[#222]/50 bg-black/80 backdrop-blur-md sticky top-0 z-30">
            <div>
                <h1 className="font-heading font-bold text-xl text-white font-sans">Dashboard</h1>
                <p className="text-xs text-gray-500 font-mono">System Status: Online</p>
            </div>
            
            <div className="flex items-center gap-4">
                {/* Fuel Status */}
                <div className="hidden md:flex items-center gap-3 bg-[#111] border border-[#222] px-3 py-1.5 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fanta opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-fanta"></span>
                    </span>
                    <span className="text-xs font-bold text-gray-300 font-sans">Fuel: 100%</span>
                </div>

                <div className="h-8 w-px bg-[#222]"></div>

                <Link href="/dashboard/links" className="bg-white text-black hover:bg-electric hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 font-sans">
                    Create Link <ArrowRight size={16} />
                </Link>
            </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 lg:p-10 overflow-y-auto">
            
            {/* Top Grid (Bento Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                
                {/* Main Stat */}
                <div className="bg-[#0a0a0a] border border-[#222] hover:border-[#333] transition-colors p-6 rounded-2xl flex flex-col justify-between h-40 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-6 text-electric opacity-10 group-hover:scale-110 transition-transform">
                        <BarChart3 size={64} />
                    </div>
                    <div className="text-gray-400 text-sm font-mono font-medium">TOTAL CLICKS</div>
                    <div>
                        <div className="text-4xl font-black text-white font-sans">{totalClicks}</div>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                                ▲ Link Activity
                            </span>
                        </div>
                    </div>
                </div>

                {/* Secondary Stat */}
                <div className="bg-[#0a0a0a] border border-[#222] hover:border-[#333] transition-colors p-6 rounded-2xl flex flex-col justify-between h-40">
                    <div className="text-gray-400 text-sm font-mono font-medium">ACTIVE LINKS</div>
                    <div>
                        <div className="text-4xl font-black text-white font-sans">{activeLinks}</div>
                        <div className="text-xs text-gray-500 mt-2 font-sans">Unlimited Plan Active</div>
                    </div>
                </div>

                {/* Verified Upsell (Or Status) */}
                <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl md:col-span-2 bg-gradient-to-r from-electric/10 to-transparent border-electric/30 flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-electric text-white text-[10px] font-black px-2 py-0.5 rounded font-mono">VERIFIED</span>
                            <span className="text-xs text-gray-400 font-sans">One-time payment</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white font-sans">Power User Active</h3>
                        <p className="text-sm text-gray-400 mt-1 max-w-sm font-sans">You have access to Custom CSS, Themes, and Animated Banners.</p>
                    </div>
                    <div className="hidden md:flex gap-3 relative z-10">
                        <button className="px-4 py-2 bg-[#111] border border-[#222] hover:border-white text-white rounded-lg text-sm font-medium transition-colors font-sans">Manage Config</button>
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left: Active Links List */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white font-sans">Active Connections</h2>
                        <div className="flex gap-2">
                             <button className="p-2 text-gray-500 hover:text-white transition-colors"><Filter size={18} /></button>
                             <button className="p-2 text-gray-500 hover:text-white transition-colors"><RefreshCw size={18} /></button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        
                        {/* User Profile Link */}
                        <div className="bg-[#0a0a0a] border border-[#222] hover:border-[#333] p-4 rounded-xl flex items-center gap-4 group hover:bg-[#111]/50 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-electric shrink-0 relative overflow-hidden">
                                {session.user.image ? 
                                   <Image src={session.user.image} alt="Avatar" width={48} height={48} className="object-cover w-full h-full opacity-80" /> : 
                                   <Users size={24} />
                                }
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-mono font-bold truncate">/{profile?.username || session.user.username}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                </div>
                                <div className="text-xs text-gray-500 truncate font-mono">Target: Public Profile</div>
                            </div>
                            <div className="text-right px-4 hidden sm:block">
                                <Link href={`/${profile?.username || session.user.username}`} target="_blank" className="text-xs text-electric hover:underline">
                                    View Live
                                </Link>
                            </div>
                        </div>

                        {/* Database Links */}
                        {links && links.map((link: any) => (
                            <div key={link.id} className="bg-[#0a0a0a] border border-[#222] hover:border-[#333] p-4 rounded-xl flex items-center gap-4 group hover:bg-[#111]/50 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center text-gray-400 shrink-0">
                                    <span className="font-mono text-xs">LINK</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-white font-mono font-bold truncate">{link.title}</span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate font-mono">Target: {link.url}</div>
                                </div>
                                <div className="text-right px-4 hidden sm:block">
                                    <div className="text-sm font-bold text-white font-mono">{link.clicks}</div>
                                    <div className="text-[10px] text-gray-600 font-mono uppercase">Clicks</div>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link href="/dashboard/links" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"><Edit size={16} /></Link>
                                    <a href={link.url} target="_blank" className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-electric"><ExternalLink size={16} /></a>
                                </div>
                            </div>
                        ))}
                        
                        {links?.length === 0 && (
                            <div className="text-center py-6 text-gray-500 text-sm font-mono border border-dashed border-[#222] rounded-xl">
                                No additional links found. Add some in Connections!
                            </div>
                        )}

                    </div>
                </div>

                {/* Right: Quick Tools */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-lg font-bold text-white font-sans">Tools</h2>
                    
                    {/* CSS Editor Widget */}
                    <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-xl">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-bold text-white font-sans">Custom CSS</span>
                            <span className="text-[10px] font-mono text-electric border border-electric/30 px-1 rounded">ACTIVE</span>
                        </div>
                        <div className="bg-black border border-[#222] rounded-lg p-3 font-mono text-xs text-gray-400 overflow-hidden relative">
                            <div className="absolute top-2 right-2 flex gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            </div>
                            <span className="text-purple-400">.profile-card</span> {'{'}<br/>
                            &nbsp;&nbsp;<span className="text-blue-400">border</span>: <span className="text-orange-400">1px solid</span> <span className="text-green-400">#0072ff</span>;<br/>
                            &nbsp;&nbsp;<span className="text-blue-400">background</span>: <span className="text-green-400">black</span>;<br/>
                            {'}'}
                        </div>
                        <button className="w-full mt-4 bg-[#111] hover:bg-[#222] border border-[#222] text-xs font-bold text-white py-2 rounded-lg transition-colors font-sans">
                            Open Editor
                        </button>
                    </div>

                    {/* QR Code Widget */}
                    <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-xl flex items-center gap-4">
                        <div className="bg-white p-1 rounded-lg">
                            {/* Fake QR */}
                            <div className="w-12 h-12 bg-cover" style={{ backgroundImage: `url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dscrd.wtf/${session.user.username || 'user'}')` }}></div>
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white font-sans">Profile QR</div>
                            <div className="text-xs text-gray-500 font-sans">For business cards</div>
                        </div>
                        <button className="ml-auto p-2 hover:bg-[#111] rounded-lg text-gray-400 hover:text-white"><ArrowRight size={16} className="rotate-90" /></button>
                    </div>
                    
                    {/* User Badges Widget */}
                    {badges.length > 0 && (
                        <div className="bg-[#0a0a0a] border border-[#222] p-5 rounded-xl">
                            <div className="text-sm font-bold text-white font-sans mb-3">Your Badges</div>
                            <div className="flex flex-wrap gap-2">
                                {badges.map((b) => (
                                    <div key={b.name} className="w-8 h-8 p-1 bg-[#111] border border-[#222] rounded flex items-center justify-center" title={b.name}>
                                        <img src={b.icon} alt={b.name} className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
     </>
  )
}
