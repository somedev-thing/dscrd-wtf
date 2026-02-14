import { supabase } from "@/lib/supabase"
import { updateServer } from "@/lib/actions"

export default async function ServerDesignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: server } = await supabase.from('servers').select('*').eq('id', id).single()

  const currentTheme = server?.theme_config || { color: '#5865F2', mode: 'dark' }
  const colors = [
    { name: 'Discord Blue', value: '#5865F2' },
    { name: 'Electric Blue', value: '#0072ff' },
    { name: 'Fanta Orange', value: '#ff9100' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Crimson Red', value: '#ef4444' },
    { name: 'Royal Purple', value: '#8b5cf6' },
  ]

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">Server Design</h2>
        
        <form action={updateServer.bind(null, id)} className="space-y-8">
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl">
                <h2 className="text-lg font-bold text-white mb-4">Accent Color</h2>
                <div className="flex flex-wrap gap-4">
                    {colors.map((c) => (
                        <label key={c.value} className="cursor-pointer group relative">
                            <input type="radio" name="color" value={c.value} defaultChecked={currentTheme.color === c.value} className="peer sr-only" />
                            <div className="w-16 h-16 rounded-full border-2 border-[#222] peer-checked:border-white transition-all flex items-center justify-center" style={{ backgroundColor: c.value }}>
                                <div className="w-6 h-6 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity transform scale-0 peer-checked:scale-100"></div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-white text-black hover:bg-electric hover:text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2">
                    <i className="lni lni-color-palette"></i> Save Design
                </button>
            </div>
        </form>
    </div>
  )
}
