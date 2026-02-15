import Link from "next/link"
import { Home01Icon, Search01Icon } from "hugeicons-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* glitched 404 */}
        <div className="relative">
            <h1 className="text-[120px] font-black text-[#111] leading-none select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-electric bg-black/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-electric/20">
                    Lost in Void
                </span>
            </div>
        </div>

        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
            <p className="text-gray-400 max-w-xs mx-auto">
                The identified object could not be resolved in this sector.
            </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <Link href="/" className="glass-card p-4 rounded-2xl hover:bg-white/5 transition-all group flex flex-col items-center gap-2">
                <Home01Icon size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-sm font-bold text-gray-400 group-hover:text-white">Return Home</span>
            </Link>
            <Link href="/dashboard" className="glass-card p-4 rounded-2xl hover:bg-white/5 transition-all group flex flex-col items-center gap-2">
                <Search01Icon size={24} className="text-gray-500 group-hover:text-white transition-colors" />
                <span className="text-sm font-bold text-gray-400 group-hover:text-white">Dashboard</span>
            </Link>
        </div>

        <div className="text-xs text-gray-600 font-mono">
            Error Code: 404_NOT_FOUND
        </div>
      </div>
    </div>
  )
}
