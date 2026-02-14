import dbConnect from "@/lib/db"
import Server from "@/lib/models/Server"
import { deleteServer } from "@/lib/actions"
import { ShieldWarning, Trash } from "@phosphor-icons/react/dist/ssr"

export default async function ServerSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  await dbConnect()
  const server = await Server.findById(id).lean() as any

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
        
        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl mb-8">
            <h3 className="text-lg font-bold text-white mb-2">General Configuration</h3>
            <div className="space-y-4">
                 <div>
                    <label className="block text-sm text-gray-400 mb-1">Server Name</label>
                    <input type="text" value={server?.name} disabled className="w-full bg-[#111] border border-[#222] rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
                 </div>
                 <div>
                    <label className="block text-sm text-gray-400 mb-1">Slug (URL)</label>
                    <div className="flex">
                        <span className="bg-[#111] border border-r-0 border-[#222] rounded-l-lg px-4 py-2 text-gray-500">dscrd.wtf/</span>
                        <input type="text" value={server?.slug} disabled className="flex-1 bg-[#111] border border-[#222] rounded-r-lg px-4 py-2 text-gray-500 cursor-not-allowed" />
                    </div>
                 </div>
            </div>
        </div>

        <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-red-500 mb-2 flex items-center gap-2">
                <ShieldWarning size={24} weight="duotone" /> Danger Zone
            </h3>
            <p className="text-gray-400 text-sm mb-6">Deleting a server is irreversible. All pages and data will be lost.</p>
            
            <form action={deleteServer}>
                <input type="hidden" name="id" value={id} />
                <button type="submit" className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2">
                    <Trash size={18} weight="bold" /> Delete Server
                </button>
            </form>
        </div>
    </div>
  )
}
