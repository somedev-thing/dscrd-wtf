"use client"

import { useState } from "react"
import Image from "next/image"
import { 
    PaintBrush01Icon, 
    Link01Icon, 
    Delete02Icon, 
    PlusSignIcon,
    Copy01Icon,
    CheckmarkCircle02Icon,
    Message01Icon
} from "hugeicons-react"
import { IconPicker } from "@/components/dashboard/IconPicker"
import * as Icons from "hugeicons-react"
import { useRouter } from "next/navigation"

interface IdentityClientProps {
    user: any
    profile: any
    initialLinks: any[]
}

const COLOR_PRESETS = [
    { name: 'Discord', value: '#5865F2' },
    { name: 'Electric', value: '#0072ff' },
    { name: 'Fanta', value: '#ff9100' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Crimson', value: '#ef4444' },
    { name: 'Purple', value: '#8b5cf6' },
]

export function IdentityClient({ user, profile, initialLinks }: IdentityClientProps) {
    const router = useRouter()
    const [links, setLinks] = useState(initialLinks)
    const [themeColor, setThemeColor] = useState(profile.themeConfig?.color || '#5865F2')
    const [copied, setCopied] = useState(false)
    const [isAddingLink, setIsAddingLink] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const handleCopy = () => {
        navigator.clipboard.writeText(`https://dscrd.wtf/@${profile.username}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const renderIcon = (iconName: string) => {
        const name = iconName.charAt(0).toUpperCase() + iconName.slice(1) + "Icon"
        // @ts-ignore
        const IconComponent = Icons[name] || Icons.Link01Icon
        return <IconComponent size={20} />
    }

    const updateTheme = async (color: string) => {
        setThemeColor(color) // Optimistic update
        try {
            await fetch('/api/identity', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ themeConfig: { color, mode: 'dark' } })
            })
            router.refresh()
        } catch (error) {
            console.error("Failed to update theme", error)
        }
    }

    const handleAddLink = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget)
        const data = {
            title: formData.get('title'),
            url: formData.get('url'),
            icon: formData.get('icon')
        }

        try {
            const res = await fetch('/api/identity/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            const newLink = await res.json()
            setLinks([...links, newLink])
            setIsAddingLink(false)
            router.refresh()
        } catch (error) {
            console.error("Failed to add link", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteLink = async (id: string) => {
        const oldLinks = [...links]
        setLinks(links.filter(l => l._id !== id)) // Optimistic
        try {
            await fetch(`/api/identity/links?id=${id}`, { method: 'DELETE' })
            router.refresh()
        } catch (error) {
            console.error("Failed to delete link", error)
            setLinks(oldLinks) // Revert
        }
    }

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: Editor */}
            <div className="flex-1 space-y-8 overflow-y-auto lg:pr-4 custom-scrollbar">
                <div>
                    <h1 className="text-2xl font-bold font-heading text-white mb-2">Identity</h1>
                    <p className="text-gray-400 font-mono text-sm">Customize your public profile.</p>
                </div>

                {/* Theme Color Picker */}
                <div className="glass-card p-6 rounded-3xl">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <PaintBrush01Icon size={16} /> Theme Color
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {COLOR_PRESETS.map((c) => (
                            <button
                                key={c.value}
                                onClick={() => updateTheme(c.value)}
                                className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center ${themeColor === c.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                                style={{ backgroundColor: c.value }}
                            >
                                {themeColor === c.value && <div className="w-4 h-4 bg-white rounded-full" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Links Manager */}
                <div className="glass-card p-6 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <Link01Icon size={16} /> Links
                        </h2>
                        <button 
                            onClick={() => setIsAddingLink(!isAddingLink)}
                            className="text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                        >
                            <PlusSignIcon size={14} /> Add Link
                        </button>
                    </div>

                    {/* Add Link Form */}
                    {isAddingLink && (
                        <div className="mb-6 p-4 bg-black/30 rounded-xl border border-white/5 animate-in slide-in-from-top-2">
                             <form onSubmit={handleAddLink} className="flex gap-3">
                                 <input type="hidden" name="icon" value="link" id="icon-input" />
                                 <IconPicker value="link" onChange={(v) => {
                                     const el = document.getElementById('icon-input') as HTMLInputElement
                                     if(el) el.value = v
                                 }} />
                                 <div className="flex-1 space-y-2">
                                     <input name="title" placeholder="Title" required className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-electric outline-none" />
                                     <input name="url" placeholder="URL" required className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-electric outline-none" />
                                 </div>
                                 <button disabled={isLoading} type="submit" className="bg-electric hover:bg-electric/80 text-white px-4 rounded-lg font-bold text-sm disabled:opacity-50">
                                     {isLoading ? '...' : 'Add'}
                                 </button>
                             </form>
                        </div>
                    )}

                    {/* Links List */}
                    <div className="space-y-3">
                        {links.map((link: any) => (
                            <div key={link._id || link.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl group hover:bg-white/10 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-black/30 flex items-center justify-center text-gray-400">
                                    {renderIcon(link.icon || 'link')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-white text-sm">{link.title}</div>
                                    <div className="text-xs text-gray-500 truncate">{link.url}</div>
                                </div>
                                <button 
                                    onClick={() => handleDeleteLink(link._id || link.id)}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Delete02Icon size={16} />
                                </button>
                            </div>
                        ))}
                        {links.length === 0 && !isAddingLink && (
                            <div className="text-center py-8 text-gray-500 text-sm">
                                No links yet. Add one to show on your profile.
                            </div>
                        )}
                    </div>
                </div>

                {/* Bio (Read Only for now) */}
                <div className="glass-card p-6 rounded-3xl opacity-50 pointer-events-none">
                     <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Bio</h2>
                     <textarea readOnly defaultValue={profile.bio} className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-gray-400 resize-none h-24" />
                     <p className="text-[10px] text-gray-600 mt-2">Bio syncing from Discord coming soon.</p>
                </div>
            </div>

            {/* RIGHT: Live Preview */}
            <div className="lg:w-[400px] xl:w-[450px] shrink-0 flex flex-col">
                <div className="sticky top-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Preview</h2>
                        <button onClick={handleCopy} className="flex items-center gap-2 text-xs font-medium text-electric hover:text-white transition-colors">
                            {copied ? <CheckmarkCircle02Icon size={14} /> : <Copy01Icon size={14} />}
                            {copied ? 'Copied!' : 'Copy Public URL'}
                        </button>
                    </div>

                    {/* The Preview Card - Authentically styled to look like custom page */}
                    <div className="w-full aspect-[3/5] bg-[#000] rounded-[40px] border-8 border-[#111] shadow-2xl relative overflow-hidden flex flex-col">
                        
                        {/* Custom Banner */}
                        <div className="w-full h-32 relative group" style={{ backgroundColor: themeColor }}>
                            {user.banner ? (
                                <Image src={`https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=600`} alt="Banner" fill className="object-cover" />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                            )}
                        </div>

                        {/* Profile Info */}
                        <div className="px-6 -mt-12 mb-6 relative z-10">
                            <div className="relative inline-block">
                                {user.image ? (
                                    <Image src={user.image} alt="Avatar" width={96} height={96} className="rounded-full border-8 border-[#000]" />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-gray-700 border-8 border-[#000] flex items-center justify-center text-2xl font-bold">{user.name?.[0]}</div>
                                )}
                                {/* Nitro Status Indicator (Mock based on premium_type) */}
                                {user.premium_type > 0 && (
                                    <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-[#000] flex items-center justify-center" title="Nitro User">
                                         <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                                    </div>
                                )}
                            </div>
                            
                            <h1 className="text-2xl font-bold text-white mt-2">{user.name}</h1>
                            <p className="text-sm font-mono opacity-80" style={{ color: themeColor }}>@{profile.username}</p>
                            
                            <div className="mt-4 p-4 rounded-2xl bg-[#111] border border-[#222]">
                                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">About Me</h3>
                                <p className="text-sm text-gray-300 leading-relaxed">{profile.bio}</p>
                            </div>
                        </div>

                        {/* Message Button */}
                        <div className="px-6 mb-6">
                            <a 
                                href={`https://discord.com/users/${user.id}`} 
                                target="_blank"
                                className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                style={{ backgroundColor: themeColor, boxShadow: `0 0 20px -5px ${themeColor}40` }}
                            >
                                <Message01Icon size={20} fill="currentColor" className="text-white" />
                                Message on Discord
                            </a>
                        </div>

                        {/* Links Grid */}
                        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-3 custom-scrollbar">
                           <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Links</h3>
                           {links.length > 0 ? (
                               links.map((link: any) => (
                                   <a 
                                      key={link._id || link.id} 
                                      href={link.url}
                                      target="_blank"
                                      className="flex items-center gap-4 p-3 rounded-xl bg-[#111] hover:bg-[#1a1a1a] border border-[#222] transition-colors group"
                                   >
                                       <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#000] text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                           {renderIcon(link.icon || 'link')}
                                       </div>
                                       <div className="flex-1 min-w-0">
                                           <div className="font-bold text-white text-sm truncate">{link.title}</div>
                                       </div>
                                       <div className="text-gray-600 -rotate-45 group-hover:text-white transition-colors">
                                           <Link01Icon size={16} />
                                       </div>
                                   </a>
                               ))
                           ) : (
                               <div className="text-center py-8 text-gray-600 text-xs border border-dashed border-[#222] rounded-xl">
                                   No links added.
                               </div>
                           )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
