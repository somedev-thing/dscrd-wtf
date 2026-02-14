import Link from 'next/link'
import { Grid3X3, Tag, ArrowRight, User } from 'lucide-react'
import { auth } from "@/auth"
import SignInButton from "./SignInButton"

export default async function Navbar() {
  const session = await auth()

  return (
    <nav className="fixed w-full z-40 top-0 left-0 right-0 px-6 pt-6 pointer-events-none flex justify-center">
      <div className="w-full max-w-2xl bg-black/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-3 flex items-center justify-between pointer-events-auto transition-all hover:bg-black/80 hover:border-white/10 shadow-lg shadow-black/50">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-3 group px-2">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#1e1e1e] to-black border border-white/5 flex items-center justify-center group-hover:border-electric/50 group-hover:shadow-[0_0_15px_rgba(0,114,255,0.3)] transition-all duration-300 relative overflow-hidden">
             <div className="absolute inset-0 bg-electric/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="font-extrabold text-electric text-sm relative z-10">D</span>
          </div>
          <span className="font-bold tracking-tight text-gray-200 group-hover:text-white transition-colors font-sans">dscrd.wtf</span>
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
           <Link href="/#features" className="px-4 py-2 rounded-full hover:bg-white/5 transition-all text-xs font-medium text-gray-400 hover:text-white flex items-center gap-2">
              <span className="hidden sm:inline">Features</span>
              <Grid3X3 size={14} className="sm:hidden"/>
           </Link>
           <Link href="/pricing" className="px-4 py-2 rounded-full hover:bg-white/5 transition-all text-xs font-medium text-gray-400 hover:text-white flex items-center gap-2">
              <span className="hidden sm:inline">Pricing</span>
              <Tag size={14} className="sm:hidden"/>
           </Link>
           {/* Mobile hidden link */}
           <Link href="/how-it-works" className="hidden sm:flex px-4 py-2 rounded-full hover:bg-white/5 transition-all text-xs font-medium text-gray-400 hover:text-white items-center gap-2">
               How it works
           </Link>
        </div>

        {/* Auth / CTA */}
        <div className="pl-2 flex items-center gap-2">
           {session?.user ? (
             <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-xs font-bold font-sans">
               <User size={14} />
               <span className="hidden sm:inline">Dashboard</span>
             </Link>
           ) : (
             <SignInButton />
           )}
        </div>
      </div>
    </nav>
  )
}

