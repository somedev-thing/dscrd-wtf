import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ensureProfile, updateTheme } from "@/lib/actions"
import Image from "next/image"
import { 
    Camera01Icon, 
    PaintBoardIcon, 
    LinkSquare01Icon, 
    Award01Icon, 
    ServerStack02Icon,
    Settings02Icon
} from "hugeicons-react"
import { supabase } from "@/lib/supabase"

async function getDiscordGuilds(accessToken: string) {
    // Reusing the guild fetcher logic or move it to a shared lib?
    // For now, let's keep it simple or assume we fetch mostly for display logic
    try {
        const res = await fetch("https://discord.com/api/v10/users/@me/guilds", {
        headers: { Authorization: `Bearer ${accessToken}` },
        next: { revalidate: 60 },
        })
        if (!res.ok) return []
        return res.json()
    } catch {
        return []
    }
}

export default async function ProfilePage() {
    const session = await auth()
    if (!session?.user) redirect("/")
    
    const profile = await ensureProfile()
    
    // @ts-ignore
    const accessToken = session.user.accessToken
    const guilds = accessToken ? await getDiscordGuilds(accessToken) : []
    const ownedGuilds = guilds.filter((g: any) => g.owner)

    const isPro = profile?.plan === 'pro'

    return (
        <div className="p-6 lg:p-10 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold font-heading text-white mb-2">Edit Profile</h1>
                    <p className="text-gray-400 font-mono text-sm">Customize how your public profile looks at <span className="text-white">dscrd.wtf/@{profile.username}</span></p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-electric hover:bg-electric/80 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-electric/20 text-sm">Save Changes</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Visuals */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Banner & Avatar */}
                    <div className="glass-card p-1 rounded-3xl overflow-hidden group relative">
                        {/* Banner */}
                        <div className="h-48 bg-gray-800 relative w-full">
                            {profile.banner ? (
                                <Image src={profile.banner} alt="Banner" fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-r from-gray-900 to-black flex items-center justify-center text-gray-700 font-mono">
                                    NO BANNER
                                </div>
                            )}
                            <button className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md hover:bg-black/70 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border border-white/10 transition-colors">
                                <Camera01Icon size={16} /> Edit Banner
                            </button>
                        </div>

                        {/* Avatar */}
                        <div className="px-8 relative -mt-12 mb-6 flex items-end justify-between">
                            <div className="w-24 h-24 rounded-2xl bg-black p-1 relative group/avatar">
                                <Image 
                                    src={session.user.image || ''} 
                                    alt="Avatar" 
                                    width={96} 
                                    height={96} 
                                    className="w-full h-full object-cover rounded-xl" 
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/avatar:opacity-100 flex items-center justify-center transition-opacity rounded-xl cursor-pointer">
                                    <Settings02Icon className="text-white" />
                                </div>
                            </div>
                            <div className="mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${isPro ? 'bg-electric/10 text-electric border-electric/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                                    {isPro ? 'PRO ACCOUNT' : 'FREE ACCOUNT'}
                                </span>
                            </div>
                        </div>

                        <div className="px-8 pb-8">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Bio</label>
                            <textarea 
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-electric transition-colors min-h-[100px]"
                                defaultValue={profile.bio || ''}
                                placeholder="Tell the world about yourself..."
                            />
                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                        {!isPro && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8">
                                <PaintBoardIcon size={48} className="text-gray-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Pro Feature</h3>
                                <p className="text-gray-400 mb-6 max-w-sm">Upgrade to Pro to customize your profile theme, colors, and unlock animated backgrounds.</p>
                                <button className="bg-white text-black px-6 py-2 rounded-xl font-bold hover:scale-105 transition-transform">Upgrade Now</button>
                            </div>
                        )}
                        
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2 bg-electric/10 rounded-lg text-electric"><PaintBoardIcon size={20} /></div>
                            <h2 className="text-lg font-bold text-white">Theme & Appearance</h2>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Accent Color</label>
                                <input type="color" className="w-full h-12 rounded-xl bg-transparent cursor-pointer" defaultValue={profile.theme_config?.color || '#0072ff'} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Mode</label>
                                <select className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-electric">
                                    <option value="dark">Dark</option>
                                    <option value="light">Light</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Visibility */}
                <div className="space-y-8">
                    
                    {/* Badges */}
                    <div className="glass-card p-6 rounded-3xl">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><Award01Icon size={20} /></div>
                            <h2 className="text-lg font-bold text-white">Displayed Badges</h2>
                        </div>
                        <div className="text-center py-8 text-gray-500 text-sm border border-dashed border-white/10 rounded-xl">
                            Coming Soon
                        </div>
                    </div>

                    {/* Servers */}
                    <div className="glass-card p-6 rounded-3xl">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><ServerStack02Icon size={20} /></div>
                            <h2 className="text-lg font-bold text-white">Showcase Servers</h2>
                        </div>
                        
                        <div className="space-y-3">
                            {ownedGuilds.length > 0 ? ownedGuilds.map((guild: any) => (
                                <div key={guild.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center shrink-0">
                                            {guild.icon ? <img src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} className="w-full h-full rounded-lg" /> : guild.name[0]}
                                        </div>
                                        <span className="text-sm font-bold text-gray-300 truncate">{guild.name}</span>
                                    </div>
                                    <input type="checkbox" className="toggle" />
                                </div>
                            )) : (
                                <div className="text-sm text-gray-500 text-center">No owned servers found.</div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
