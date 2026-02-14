import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ensureProfile, updateTheme } from "@/lib/actions"
import { PaintBrush01Icon } from "hugeicons-react"

export default async function IdentityThemePage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await ensureProfile()
  const currentTheme = profile?.themeConfig || { color: '#5865F2', mode: 'dark' }

  const colors = [
    { name: 'Discord Blue', value: '#5865F2' },
    { name: 'Electric Blue', value: '#0072ff' },
    { name: 'Fanta Orange', value: '#ff9100' },
    { name: 'Emerald Green', value: '#10b981' },
    { name: 'Crimson Red', value: '#ef4444' },
    { name: 'Royal Purple', value: '#8b5cf6' },
    { name: 'Hot Pink', value: '#ec4899' },
    { name: 'Cyber Lime', value: '#84cc16' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 className="text-2xl font-bold font-heading text-white mb-2">Theme & Design</h1>
            <p className="text-gray-400 font-mono text-sm">Customize how your profile looks to visitors.</p>
        </div>

        <form action={updateTheme} className="space-y-8">
            {/* Accent Color */}
            <div className="glass-card p-6 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <PaintBrush01Icon size={20} className="text-electric" />
                    Accent Color
                </h2>
                <div className="flex flex-wrap gap-4">
                    {colors.map((c) => (
                        <label key={c.value} className="cursor-pointer group relative">
                            <input type="radio" name="color" value={c.value} defaultChecked={currentTheme.color === c.value} className="peer sr-only" />
                            <div className="w-14 h-14 rounded-full border-2 border-white/10 peer-checked:border-white transition-all shadow-lg" style={{ backgroundColor: c.value }}>
                            </div>
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{c.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Mode */}
            <div className="glass-card p-6 rounded-3xl">
                <h2 className="text-lg font-bold text-white mb-4">Mode</h2>
                <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="mode" value="dark" defaultChecked={currentTheme.mode === 'dark'} className="peer sr-only" />
                        <div className="p-4 rounded-xl border-2 border-white/10 peer-checked:border-electric bg-black text-center transition-all">
                            <div className="text-white font-bold mb-1">🌙 Dark</div>
                            <div className="text-xs text-gray-500">Default void</div>
                        </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="mode" value="light" defaultChecked={currentTheme.mode === 'light'} className="peer sr-only" />
                        <div className="p-4 rounded-xl border-2 border-white/10 peer-checked:border-electric bg-gray-200 text-center transition-all">
                            <div className="text-black font-bold mb-1">☀️ Light</div>
                            <div className="text-xs text-gray-600">Clean mode</div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="bg-electric hover:bg-electric/80 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_-5px_var(--color-electric)]">
                    Save Theme
                </button>
            </div>
        </form>
    </div>
  )
}
