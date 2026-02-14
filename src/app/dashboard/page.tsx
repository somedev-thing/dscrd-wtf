import { auth } from "@/auth"
import { redirect } from "next/navigation"
import dbConnect from "@/lib/db"
import Server from "@/lib/models/Server"
import { createServer } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight01Icon, PlusSignIcon, ServerStack02Icon, Rocket01Icon, Settings02Icon, ChartBarLineIcon } from "hugeicons-react"

interface DiscordGuild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: number
}

async function getDiscordGuilds(accessToken: string): Promise<DiscordGuild[]> {
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

function getGuildIconUrl(guild: DiscordGuild): string | null {
  if (!guild.icon) return null
  const ext = guild.icon.startsWith("a_") ? "gif" : "png"
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${ext}?size=128`
}

export default async function DashboardOverview() {
  const session = await auth()
  if (!session?.user) redirect("/")

  // @ts-ignore – accessToken is stored in JWT
  const accessToken = session.user.accessToken as string | undefined
  const allGuilds = accessToken ? await getDiscordGuilds(accessToken) : []
  const adminGuilds = allGuilds.filter(g => g.owner || (g.permissions & 0x20) !== 0)

  // Fetch registered servers
  await dbConnect()
  const registeredServers = await Server.find({ ownerId: session.user.id }).sort({ createdAt: -1 }).lean()
  const serialized = registeredServers.map((s: any) => ({ ...s, id: s._id.toString(), _id: s._id.toString() }))
  
  const registeredIds = new Set(serialized.map((s: any) => s.discordGuildId) || [])

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        
        {/* Header */}
        <div className="flex justify-between items-center">
             <div>
                <h1 className="text-3xl font-bold font-sans text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Select a server to manage or create a new one.</p>
             </div>
             {/* Profile/Settings Quick Link (optional, cleaner without) */}
        </div>

        {/* Invite Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-electric to-purple-600 p-8 md:p-10 shadow-lg shadow-electric/20 group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                        <Rocket01Icon size={40} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Invite our Bot</h2>
                        <p className="text-white/80 max-w-md">
                            Try our Discord bot with one-click setup. 
                            Automate your community management today.
                        </p>
                    </div>
                </div>
                <Link href="/bot/invite" className="bg-white text-electric hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg">
                    <PlusSignIcon size={18} /> Invite now
                </Link>
             </div>
        </div>

        {/* Select Server Section */}
        <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ServerStack02Icon size={24} className="text-gray-400" />
                Select Server
            </h2>
            <p className="text-gray-500 mb-6 -mt-4 text-sm">Select the server to configure dscrd.wtf pages for.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Custom Create Card */}
                <div className="glass-card p-6 rounded-2xl border border-dashed border-white/10 hover:border-electric/50 transition-colors flex flex-col justify-center items-center text-center gap-4 group cursor-pointer min-h-[160px]">
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-electric transition-all">
                        <PlusSignIcon size={24} />
                     </div>
                     <div>
                        <h3 className="font-bold text-white">Create Custom Server</h3>
                        <p className="text-xs text-gray-500 mt-1">For manual setup without bot</p>
                     </div>
                </div>

                {/* Render Admin Guilds */}
                {adminGuilds.map((guild) => {
                  const isRegistered = registeredIds.has(guild.id)
                  const registeredServer = serialized?.find((s: any) => s.discordGuildId === guild.id)
                  const iconUrl = getGuildIconUrl(guild)

                  if (isRegistered && registeredServer) {
                      // LINKED SERVER CARD
                      return (
                          <Link key={guild.id} href={`/dashboard/servers/${registeredServer.id}`} className="glass-card p-4 rounded-2xl hover:bg-white/5 transition-all flex items-center gap-4 group border border-white/5 hover:border-electric/30">
                              <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden shrink-0 border border-white/10 group-hover:border-electric/50 transition-colors">
                                  {iconUrl ? (
                                      <img src={iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                                  ) : (
                                      <span className="text-xl font-bold text-gray-400">{guild.name.charAt(0)}</span>
                                  )}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-white truncate text-lg group-hover:text-electric transition-colors">{guild.name}</h3>
                                  <p className="text-xs text-green-400 font-mono mt-1">Active</p>
                              </div>
                              <div className="text-gray-500 group-hover:text-white transition-colors">
                                  <Settings02Icon size={20} />
                              </div>
                          </Link>
                      )
                  } else {
                      // UNLINKED GUILD CARD
                       return (
                          <div key={guild.id} className="glass-card p-4 rounded-2xl opacity-60 hover:opacity-100 transition-all flex items-center gap-4 group grayscale hover:grayscale-0">
                              <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                                  {iconUrl ? (
                                      <img src={iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                                  ) : (
                                      <span className="text-xl font-bold text-gray-400">{guild.name.charAt(0)}</span>
                                  )}
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-white truncate text-lg">{guild.name}</h3>
                                  <form action={createServer} className="flex mt-2">
                                        <input type="hidden" name="name" value={guild.name} />
                                        <input type="hidden" name="guildId" value={guild.id} />
                                        <input type="hidden" name="icon" value={iconUrl || ''} />
                                        <input type="hidden" name="slug" value={guild.id} /> {/* Temp slug */}
                                        <button className="text-xs bg-white text-black px-3 py-1 rounded-lg font-bold hover:bg-electric hover:text-white transition-colors">
                                            Setup
                                        </button>
                                  </form>
                              </div>
                          </div>
                      )
                  }
                })}
            </div>
        </section>

         {/* Placeholder for Command Usage / Other Stats */}
         <section className="pt-8 border-t border-white/5">
            <h2 className="text-lg font-bold text-white mb-4">Command Usage</h2>
            <p className="text-sm text-gray-500 mb-6">Use of commands of your server</p>
            
            <div className="p-12 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4">
                <div className="p-4 bg-white/5 rounded-full text-gray-600">
                    <ChartBarLineIcon size={32} />
                </div>
                <p className="text-gray-500">Statistics coming soon.</p>
            </div>
         </section>

         <footer className="pt-10 pb-4 text-center">
             <p className="text-[10px] text-gray-600 font-mono">
                Inspired by <a href="https://github.com/fuma-nama" target="_blank" className="hover:text-electric transition-colors">fuma-nama</a>
            </p>
         </footer>
    </div>
  )
}
