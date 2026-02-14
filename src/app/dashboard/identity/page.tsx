import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ensureProfile } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { UserCircleIcon, PaintBrush01Icon, Link01Icon } from "hugeicons-react"

export default async function IdentityPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await ensureProfile()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-2xl font-bold font-heading text-white mb-2">Identity</h1>
            <p className="text-gray-400 font-mono text-sm">Manage your public /@{profile?.username || 'handle'} profile.</p>
        </div>

        {/* Profile Preview Card */}
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            {/* Banner Area */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-electric/30 to-purple-600/20 rounded-t-3xl" />
            
            <div className="relative z-10 pt-16 flex flex-col items-center text-center">
                {session.user.image ? (
                    <Image 
                        src={session.user.image} 
                        alt={session.user.name || "Avatar"} 
                        width={96} 
                        height={96} 
                        className="rounded-full border-4 border-[#050508] shadow-lg"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center border-4 border-[#050508]">
                        <span className="text-2xl font-bold text-white">{session.user.name?.[0]}</span>
                    </div>
                )}
                
                <h2 className="text-xl font-bold text-white mt-4">{session.user.name}</h2>
                <p className="text-electric font-mono text-sm">@{profile?.username}</p>
                <p className="text-gray-400 text-sm mt-2 max-w-md">{profile?.bio}</p>
                
                <div className="flex items-center gap-3 mt-4">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded-full border ${
                        profile?.plan === 'pro' 
                            ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' 
                            : 'text-gray-400 bg-white/5 border-white/10'
                    }`}>
                        {profile?.plan === 'pro' ? '⚡ VERIFIED' : 'FREE'}
                    </span>
                </div>
            </div>
        </div>

        {/* Quick Links to Sub-sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/dashboard/identity/theme" className="glass-card p-6 rounded-2xl hover:border-electric/50 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center text-electric group-hover:bg-electric group-hover:text-white transition-all">
                        <PaintBrush01Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Theme & Design</h3>
                        <p className="text-xs text-gray-500">Customize your profile appearance</p>
                    </div>
                </div>
            </Link>

            <Link href="/dashboard/identity/links" className="glass-card p-6 rounded-2xl hover:border-electric/50 transition-all group">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all">
                        <Link01Icon size={24} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">Social Links</h3>
                        <p className="text-xs text-gray-500">Manage links on your profile</p>
                    </div>
                </div>
            </Link>
        </div>

        {/* Edit Bio Section */}
        <div className="glass-card p-6 rounded-3xl">
            <h2 className="text-lg font-bold text-white mb-4">Edit Bio</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Username</label>
                    <div className="flex items-center">
                        <span className="bg-white/5 border border-r-0 border-white/10 rounded-l-xl px-4 py-3 text-gray-500">@</span>
                        <input 
                            type="text" 
                            defaultValue={profile?.username || ''} 
                            className="flex-1 bg-white/5 border border-white/10 rounded-r-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors"
                            disabled
                        />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-1 font-mono">Username changes coming soon.</p>
                </div>
                <div>
                    <label className="block text-sm text-gray-400 mb-2">Bio</label>
                    <textarea 
                        defaultValue={profile?.bio || ''} 
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors resize-none"
                        disabled
                    />
                    <p className="text-[10px] text-gray-600 mt-1 font-mono">Bio editing coming soon.</p>
                </div>
            </form>
        </div>
    </div>
  )
}
