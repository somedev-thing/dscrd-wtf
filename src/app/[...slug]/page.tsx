import { notFound, redirect } from "next/navigation"
import dbConnect from "@/lib/db"
import Profile from "@/lib/models/Profile"
import LinkModel from "@/lib/models/Link"
import Server from "@/lib/models/Server"
import Bot from "@/lib/models/Bot"
import Link from "next/link"
import Image from "next/image"
import { 
    Message01Icon, 
    Link01Icon,
    AlertCircleIcon,
    Robot01Icon,
    ServerStack02Icon,
    UserCircleIcon,
    Home01Icon
} from "hugeicons-react"
import * as Icons from "hugeicons-react"

// Force dynamic rendering for these routes
export const dynamic = 'force-dynamic'

interface Props {
    params: Promise<{ slug: string[] }>
}

export default async function CatchAllPage({ params }: Props) {
    const { slug } = await params
    
    // 1. Check for User Profile: /@handle
    if (slug.length === 1 && slug[0].startsWith('%40')) {
        const username = slug[0].replace('%40', '').replace('@', '')
        return renderUserProfile(username)
    }
    // Handle unencoded @
    if (slug.length === 1 && slug[0].startsWith('@')) {
        const username = slug[0].replace('@', '')
        return renderUserProfile(username)
    }

    // 2. Check for Bot Invite: /bot/[slug]
    if (slug[0] === 'bot' && slug[1]) {
        await dbConnect()
        const bot = await Bot.findOne({ slug: slug[1] })
        if (bot) {
            await Bot.updateOne({ _id: bot._id }, { $inc: { clicks: 1 } })
            return redirect(bot.inviteUrl)
        }
    }

    // 3. Check for Server: /server/[slug]
    if (slug[0] === 'server' && slug[1]) {
        await dbConnect()
        const server = await Server.findOne({ slug: slug[1] })
        if (server) {
            return (
                <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center flex-col gap-4">
                    <ServerStack02Icon size={48} className="text-electric" />
                    <h1 className="text-2xl font-bold">Server: {server.name}</h1>
                    <p className="text-gray-400">Server pages coming soon.</p>
                </div>
            )
        }
    }

    return notFound()
}

async function renderUserProfile(username: string) {
    await dbConnect()
    const profile = await Profile.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } }).lean()

    if (!profile) {
        return notFound()
    }

    const links = await LinkModel.find({ userId: profile.userId }).sort({ position: 1 }).lean()
    
    // In Mongoose lean() returns POJO, so _id is available but id might not be virtualized automatically depending on setup.
    // We used default schema which usually has _id.

    const themeColor = profile.themeConfig?.color || '#5865F2'

    // Icon helper
    const renderIcon = (iconName: string) => {
        const name = iconName.charAt(0).toUpperCase() + iconName.slice(1) + "Icon"
        // @ts-ignore
        const IconComponent = Icons[name] || Icons.Link01Icon
        return <IconComponent size={20} />
    }

    return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
             {/* The Card */}
             <div className="w-full max-w-md bg-[#000] rounded-[40px] border-8 border-[#111] shadow-2xl relative overflow-hidden flex flex-col">
                        
                {/* Custom Banner */}
                <div className="w-full h-32 relative" style={{ backgroundColor: themeColor }}>
                    {profile.banner ? (
                        <Image src={profile.banner} alt="Banner" fill className="object-cover" />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                    )}
                </div>

                {/* Profile Info */}
                <div className="px-6 -mt-12 mb-6 relative z-10">
                    <div className="relative inline-block">
                        {profile.image ? (
                            <Image src={profile.image} alt="Avatar" width={96} height={96} className="rounded-full border-8 border-[#000]" />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gray-700 border-8 border-[#000] flex items-center justify-center text-2xl font-bold text-white">
                                {username[0].toUpperCase()}
                            </div>
                        )}
                        {/* Nitro Status Indicator (Mock) */}
                        {profile.isPremium && (
                            <div className="absolute bottom-1 right-2 w-6 h-6 rounded-full bg-[#000] flex items-center justify-center" title="Nitro User">
                                    <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                            </div>
                        )}
                    </div>
                    
                    <h1 className="text-2xl font-bold text-white mt-2">@{username}</h1>
                    
                    <div className="mt-4 p-4 rounded-2xl bg-[#111] border border-[#222]">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">About Me</h3>
                        <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{profile.bio || "No bio yet."}</p>
                    </div>
                </div>

                {/* Message Button */}
                <div className="px-6 mb-6">
                    <a 
                        href={`https://discord.com/users/${profile.userId}`} 
                        target="_blank"
                        className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        style={{ backgroundColor: themeColor, boxShadow: `0 0 20px -5px ${themeColor}40` }}
                    >
                        <Message01Icon size={20} fill="currentColor" className="text-white" />
                        Message on Discord
                    </a>
                </div>

                {/* Links Grid */}
                <div className="flex-1 px-6 pb-8 space-y-3">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Links</h3>
                    {links.length > 0 ? (
                        links.map((link: any) => (
                            <a 
                                key={link._id} 
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

                <div className="px-6 pb-4 text-center">
                    <Link href="/" className="text-[10px] text-gray-600 font-mono hover:text-white transition-colors">
                        dscrd.wtf
                    </Link>
                </div>
            </div>
        </div>
    )
}
