import { auth } from "@/auth"
import { redirect, notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default async function ServerLayout({ children, params }: { children: React.ReactNode, params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect("/")
  
  const { id } = await params

  // Verify ownership
  const { data: server } = await supabase
    .from('servers')
    .select('*')
    .eq('id', id)
    .eq('owner_id', session.user.id)
    .single()

  if (!server) notFound()

  return (
    <div className="flex flex-col h-full bg-[#111] lg:bg-transparent">
        {/* Server Headers */}
        <div className="p-6 lg:p-10 border-b border-[#222]">
            <Link href="/dashboard/servers" className="text-sm text-gray-500 hover:text-white mb-4 flex items-center gap-1 font-mono">
                <i className="lni lni-arrow-left text-xs"></i> Back to Servers
            </Link>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#000] border border-[#222] flex items-center justify-center text-2xl font-bold font-heading text-white">
                    {server.icon ? <img src={server.icon} className="w-full h-full object-cover rounded-2xl"/> : server.name.charAt(0)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1 font-heading">{server.name}</h1>
                    <div className="flex items-center gap-3">
                        <a href={`/${server.slug}`} target="_blank" className="text-electric text-sm font-mono hover:underline">dscrd.wtf/{server.slug}</a>
                        <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-1.5 py-0.5 rounded">ONLINE</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#222] px-6 lg:px-10 overflow-x-auto">
            <NavLink href={`/dashboard/servers/${id}`} icon="lni-dashboard">Overview</NavLink>
            <NavLink href={`/dashboard/servers/${id}/pages`} icon="lni-notebook-1">Pages</NavLink>
            <NavLink href={`/dashboard/servers/${id}/design`} icon="lni-colour-palette-3">Design</NavLink>
            <NavLink href={`/dashboard/servers/${id}/settings`} icon="lni-gear-1">Settings</NavLink>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
            {children}
        </div>
    </div>
  )
}

function NavLink({ href, children, icon }: { href: string, children: React.ReactNode, icon: string }) {
    return (
        <Link href={href} className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-gray-400 hover:text-white border-b-2 border-transparent hover:border-white/20 transition-all whitespace-nowrap">
            <i className={`lni ${icon}`}></i> {children}
        </Link>
    )
}
