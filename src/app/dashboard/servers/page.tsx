import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { createServer } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"

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

export default async function ServersPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  // @ts-ignore – accessToken is stored in JWT
  const accessToken = session.user.accessToken as string | undefined

  // Fetch Discord guilds where user is admin/owner
  const allGuilds = accessToken ? await getDiscordGuilds(accessToken) : []
  // Filter to guilds where user has MANAGE_GUILD (0x20) or is owner
  const adminGuilds = allGuilds.filter(g => g.owner || (g.permissions & 0x20) !== 0)

  // Also fetch any servers already registered in our DB
  const { data: registeredServers } = await supabase
    .from('servers')
    .select('*')
    .eq('owner_id', session.user.id)
    .order('created_at', { ascending: false })
  
  const registeredIds = new Set(registeredServers?.map(s => s.discord_guild_id) || [])

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">My Servers</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage your Discord communities and create public server pages.</p>

        {/* Registered Servers */}
        {registeredServers && registeredServers.length > 0 && (
          <>
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Registered Server Pages</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {registeredServers.map((server: any) => (
                    <Link key={server.id} href={`/dashboard/servers/${server.id}`} className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl hover:border-electric/50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors overflow-hidden">
                                {server.icon ? (
                                    <img src={server.icon} alt={server.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-xl font-bold">{server.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded font-mono">
                                ACTIVE
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-electric transition-colors">{server.name}</h3>
                        <p className="text-sm text-gray-500 font-mono mb-4">dscrd.wtf/{server.slug}</p>
                        <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-1 transition-transform">
                            Manage <i className="lni lni-arrow-right ml-2"></i>
                        </div>
                    </Link>
                ))}
            </div>
          </>
        )}

        {/* Discord Guilds (not yet registered) */}
        <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Your Discord Servers</div>
        {adminGuilds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {adminGuilds.map((guild) => {
                  const isRegistered = registeredIds.has(guild.id)
                  const iconUrl = getGuildIconUrl(guild)
                  return (
                    <div key={guild.id} className={`bg-[#0a0a0a] border ${isRegistered ? 'border-electric/30' : 'border-[#222]'} p-5 rounded-xl transition-all`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center overflow-hidden shrink-0">
                                {iconUrl ? (
                                    <img src={iconUrl} alt={guild.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-lg font-bold text-gray-400">{guild.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-white truncate">{guild.name}</h3>
                                <div className="flex items-center gap-2">
                                    {guild.owner && <span className="text-[10px] font-mono text-electric bg-electric/10 px-1.5 py-0.5 rounded">OWNER</span>}
                                    {isRegistered && <span className="text-[10px] font-mono text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">LINKED</span>}
                                </div>
                            </div>
                        </div>
                        {isRegistered ? (
                            <div className="text-xs text-gray-500 font-mono">Already registered</div>
                        ) : (
                            <form action={createServer} className="flex gap-2">
                                <input type="hidden" name="name" value={guild.name} />
                                <input type="hidden" name="guildId" value={guild.id} />
                                <input type="hidden" name="icon" value={iconUrl || ''} />
                                <input 
                                    type="text" 
                                    name="slug" 
                                    placeholder="slug" 
                                    required
                                    className="flex-1 bg-black border border-[#222] rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-electric transition-colors"
                                />
                                <button type="submit" className="bg-white text-black hover:bg-electric hover:text-white px-4 py-1.5 rounded-lg text-sm font-bold transition-all shrink-0">
                                    Create
                                </button>
                            </form>
                        )}
                    </div>
                  )
              })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-[#222] rounded-xl text-gray-500 mb-10">
              {accessToken ? 'No servers found where you are admin or owner.' : 'Please sign in again to grant server access.'}
          </div>
        )}

        {/* Manual Create Form */}
        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="lni lni-plus text-electric"></i> Create Custom Server Page
            </h2>
            <form action={createServer} className="flex flex-col md:flex-row gap-4">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Server Name" 
                    required
                    className="flex-1 bg-black border border-[#222] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                />
                <div className="flex-[2] relative">
                    <span className="absolute left-3 top-2 text-gray-500">dscrd.wtf/</span>
                    <input 
                        type="text" 
                        name="slug" 
                        placeholder="slug" 
                        required
                        className="w-full bg-black border border-[#222] rounded-lg pl-24 pr-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-white text-black hover:bg-electric hover:text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                    Create
                </button>
            </form>
        </div>
    </div>
  )
}
