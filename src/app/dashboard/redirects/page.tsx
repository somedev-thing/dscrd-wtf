import { ensureProfile } from "@/lib/actions"
import { getLinksByUserId } from "@/lib/data"
import { addLink, deleteLink } from "@/lib/actions"
import { PlusSignIcon, Link01Icon, Delete02Icon } from "hugeicons-react"


// Server Action wrapper for delete (needs bind but simple form for now)
async function handleDelete(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) await deleteLink(id)
}

export default async function RedirectsPage() {
  const profile = await ensureProfile()
  if (!profile) return <div>Error loading profile</div>

  const links = await getLinksByUserId(profile.user_id)

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">Redirects</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage your shortlinks and bot invites.</p>

        {/* Add Link Form */}
        <div className="glass-card p-6 rounded-3xl mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="p-2 bg-electric/10 rounded-lg text-electric"><PlusSignIcon size={20} /></div>
                Add New Connection
            </h2>
            <form action={addLink} className="flex flex-col md:flex-row gap-4">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title (e.g. Website)" 
                    required
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors placeholder:text-gray-600"
                />
                <input 
                    type="url" 
                    name="url" 
                    placeholder="URL (https://...)" 
                    required
                    className="flex-[2] bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-electric transition-colors placeholder:text-gray-600"
                />
                <button 
                    type="submit" 
                    className="bg-electric hover:bg-electric/80 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_-5px_var(--color-electric)]"
                >
                    Add
                </button>
            </form>
        </div>

        {/* Links List */}
        <div className="space-y-4">
            {links && links.length > 0 ? (
                links.map((link: any) => (
                    <div key={link.id} className="glass-card p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                <Link01Icon size={24} />
                            </div>
                            <div>
                                <div className="font-bold text-white text-lg">{link.title}</div>
                                <div className="text-xs text-gray-500 font-mono truncate max-w-xs">{link.url}</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <div className="text-lg font-bold text-white font-mono">{link.clicks}</div>
                                <div className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">Clicks</div>
                            </div>
                            <form action={handleDelete}>
                                <input type="hidden" name="id" value={link.id} />
                                <button type="submit" className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Delete02Icon size={20} />
                                </button>
                            </form>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl text-gray-500 flex flex-col items-center gap-4">
                    <div className="p-4 rounded-full bg-white/5 text-gray-600">
                        <Link01Icon size={32} />
                    </div>
                    No connections added yet.
                </div>
            )}
        </div>
    </div>
  )
}
