import { ensureProfile } from "@/lib/actions"
import { getLinksByUserId } from "@/lib/data"
import { addLink, deleteLink } from "@/lib/actions"


// Server Action wrapper for delete (needs bind but simple form for now)
async function handleDelete(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  if (id) await deleteLink(id)
}

export default async function LinksPage() {
  const profile = await ensureProfile()
  if (!profile) return <div>Error loading profile</div>

  const links = await getLinksByUserId(profile.user_id)

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">Links</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage the links displayed on your public profile.</p>

        {/* Add Link Form */}
        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl mb-8">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <i className="lni lni-plus text-electric"></i> Add New Connection
            </h2>
            <form action={addLink} className="flex flex-col md:flex-row gap-4">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title (e.g. Website)" 
                    required
                    className="flex-1 bg-black border border-[#222] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                />
                <input 
                    type="url" 
                    name="url" 
                    placeholder="URL (https://...)" 
                    required
                    className="flex-[2] bg-black border border-[#222] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition-colors"
                />
                <button 
                    type="submit" 
                    className="bg-white text-black hover:bg-electric hover:text-white px-6 py-2 rounded-lg font-bold transition-all"
                >
                    Add
                </button>
            </form>
        </div>

        {/* Links List */}
        <div className="space-y-4">
            {links && links.length > 0 ? (
                links.map((link: any) => (
                    <div key={link.id} className="bg-[#0a0a0a] border border-[#222] p-4 rounded-xl flex items-center justify-between group hover:border-[#333] transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-[#111] flex items-center justify-center text-gray-400">
                                <i className="lni lni-link-2 text-xl"></i>
                            </div>
                            <div>
                                <div className="font-bold text-white">{link.title}</div>
                                <div className="text-xs text-gray-500 font-mono truncate max-w-xs">{link.url}</div>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="text-xs text-gray-600 font-mono uppercase hidden sm:block">
                                {link.clicks} Clicks
                            </div>
                            <form action={handleDelete}>
                                <input type="hidden" name="id" value={link.id} />
                                <button type="submit" className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                                    <i className="lni lni-trash-3 text-lg"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12 border border-dashed border-[#222] rounded-xl text-gray-500">
                    No connections added yet.
                </div>
            )}
        </div>
    </div>
  )
}
