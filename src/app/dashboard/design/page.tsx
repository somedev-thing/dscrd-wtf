import { ensureProfile, updateTheme } from "@/lib/actions"


export default async function ThemePage() {
  const profile = await ensureProfile()
  if (!profile) return <div>Error loading profile</div>

  const currentTheme = profile.theme_config || { color: '#0072ff', mode: 'dark' }

  const colors = [
    { name: 'Electric Blue', value: '#0072ff' },
    { name: 'Fanta Orange', value: '#ff9100' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Crimson Red', value: '#ef4444' },
    { name: 'Royal Purple', value: '#8b5cf6' },
    { name: 'Hot Pink', value: '#ec4899' },
  ]

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">Theme Engine</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Customize the look of your public profile.</p>

        <form action={updateTheme} className="space-y-8">
            
            {/* Mode Selection */}
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl">
                <h2 className="text-lg font-bold text-white mb-4">Appearance Mode</h2>
                <div className="flex gap-4">
                    <label className="cursor-pointer">
                        <input type="radio" name="mode" value="dark" defaultChecked={currentTheme.mode === 'dark'} className="peer sr-only" />
                        <div className="w-32 h-24 rounded-xl border-2 border-[#222] peer-checked:border-electric peer-checked:bg-electric/10 flex flex-col items-center justify-center gap-2 transition-all">
                            <i className="lni lni-moon-half-right-5 text-2xl text-gray-400"></i>
                            <span className="text-sm font-bold text-gray-400 peer-checked:text-white">Dark</span>
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="mode" value="light" defaultChecked={currentTheme.mode === 'light'} className="peer sr-only" />
                        <div className="w-32 h-24 rounded-xl border-2 border-[#222] peer-checked:border-electric peer-checked:bg-electric/10 flex flex-col items-center justify-center gap-2 transition-all bg-white/5">
                            <i className="lni lni-sun-1 text-2xl text-gray-400"></i>
                            <span className="text-sm font-bold text-gray-400 peer-checked:text-white">Light</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Color Selection */}
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl">
                <h2 className="text-lg font-bold text-white mb-4">Accent Color</h2>
                <div className="flex flex-wrap gap-4">
                    {colors.map((c) => (
                        <label key={c.value} className="cursor-pointer group relative">
                            <input type="radio" name="color" value={c.value} defaultChecked={currentTheme.color === c.value} className="peer sr-only" />
                            <div className="w-16 h-16 rounded-full border-2 border-[#222] peer-checked:border-white transition-all flex items-center justify-center" 
                                 style={{ backgroundColor: c.value }}>
                                {/* Checkmark */}
                                <div className="w-6 h-6 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity transform scale-0 peer-checked:scale-100"></div>
                            </div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{c.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-end">
                <button 
                    type="submit" 
                    className="bg-white text-black hover:bg-electric hover:text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                    <i className="lni lni-colour-palette-3"></i> Save Theme
                </button>
            </div>

        </form>

        {/* Preview Area (Simple Logic) */}
        <div className="mt-12 opacity-50 pointer-events-none grayscale">
            <p className="text-center text-xs text-gray-500 font-mono mb-4">PREVIEW (Changes applied on save)</p>
            {/* Could embed an iframe or component of the profile here */}
        </div>
    </div>
  )
}
