import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { createServer } from "@/lib/actions"
import Link from "next/link"

export default async function ServersPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const { data: servers } = await supabase
    .from('servers')
    .select('*')
    .eq('owner_id', session.user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">My Servers</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage your Discord communities.</p>

        {/* Create Server Form */}
        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="lni lni-plus text-electric"></i> Create New Server Page
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

        {/* Server List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servers && servers.length > 0 ? (
                servers.map((server: any) => (
                    <Link key={server.id} href={`/dashboard/servers/${server.id}`} className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl hover:border-electric/50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                {server.icon ? (
                                    <img src={server.icon} alt={server.name} className="w-full h-full object-cover rounded-xl" />
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
                            Manage Server <i className="lni lni-arrow-right ml-2"></i>
                        </div>
                    </Link>
                ))
            ) : (
                <div className="col-span-full text-center py-12 border border-dashed border-[#222] rounded-xl text-gray-500">
                    No servers found. Create one to get started.
                </div>
            )}
        </div>
    </div>
  )
}
