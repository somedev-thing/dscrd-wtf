import { supabase } from "@/lib/supabase"
import { createServerPage, deleteServerPage } from "@/lib/actions"
import { Plus, AppWindow, Trash } from "@phosphor-icons/react/dist/ssr"


export default async function ServerPagesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: pages } = await supabase.from('server_pages').select('*').eq('server_id', id).order('position')

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Pages</h2>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage the content pages for your server.</p>

        {/* Create Page Form */}
        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus size={20} weight="bold" className="text-electric" /> Create New Page
            </h2>
            <form action={createServerPage} className="flex flex-col gap-4">
                <input type="hidden" name="serverId" value={id} />
                <div className="flex gap-4">
                    <input type="text" name="title" placeholder="Page Title (e.g. Rules)" required className="flex-1 bg-black border border-[#222] rounded-lg px-4 py-2 text-white" />
                    <div className="flex-[1] relative">
                         <span className="absolute left-3 top-2 text-gray-500">/</span>
                         <input type="text" name="slug" placeholder="slug" required className="w-full bg-black border border-[#222] rounded-lg pl-6 pr-4 py-2 text-white" />
                    </div>
                </div>
                <textarea name="content" placeholder="# Page Content (Markdown)" rows={5} className="w-full bg-black border border-[#222] rounded-lg px-4 py-2 text-white font-mono text-sm"></textarea>
                <div className="flex justify-end">
                    <button type="submit" className="bg-white text-black hover:bg-electric hover:text-white px-6 py-2 rounded-lg font-bold transition-all">Create Page</button>
                </div>
            </form>
        </div>

        {/* Page List */}
        <div className="space-y-4">
            {pages && pages.length > 0 ? (
                pages.map((page: any) => (
                    <div key={page.id} className="bg-[#0a0a0a] border border-[#222] p-4 rounded-xl flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <AppWindow size={24} className="text-gray-500" />
                            <div>
                                <div className="font-bold text-white">{page.title}</div>
                                <div className="text-xs text-gray-500 font-mono">/{page.slug}</div>
                            </div>
                        </div>
                        <form action={deleteServerPage}>
                             <input type="hidden" name="id" value={page.id} />
                             <input type="hidden" name="serverId" value={id} />
                             <button type="submit" className="text-gray-500 hover:text-red-500 p-2"><Trash size={20} /></button>
                        </form>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 text-gray-500">No pages yet.</div>
            )}
        </div>
    </div>
  )
}
