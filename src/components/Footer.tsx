import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 pt-16 pb-12 relative overflow-hidden rounded-t-[3rem] bg-black/40 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        
        <div className="md:col-span-2">
           <Link href="/" className="inline-block font-black text-2xl tracking-tighter mb-4 text-white hover:text-electric transition-colors font-sans duration-300">
             dscrd<span className="text-electric">.wtf</span>
           </Link>
           <p className="text-sm text-gray-500 font-mono mb-8 max-w-xs mx-auto md:mx-0 leading-relaxed">
             The identity layer for Discord. <br/>
             Stop sending expired invites.
           </p>
           <div className="flex justify-center md:justify-start gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-500 font-mono">All Systems Normal</span>
           </div>
        </div>

        <div>
           <h4 className="font-bold text-white mb-4 font-sans">Legal</h4>
           <ul className="space-y-2 text-sm text-gray-500 font-mono">
              <li><Link href="/legal/terms" className="hover:text-electric transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-electric transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/refund" className="hover:text-electric transition-colors">Refund Policy</Link></li>
           </ul>
        </div>

        <div>
           <h4 className="font-bold text-white mb-4 font-sans">Project</h4>
           <ul className="space-y-2 text-sm text-gray-500 font-mono">
              <li><Link href="https://github.com" className="hover:text-electric transition-colors">GitHub</Link></li>
              <li><Link href="/pricing" className="hover:text-electric transition-colors">Pricing</Link></li>
              <li><Link href="/#fuel" className="hover:text-electric transition-colors">Donate</Link></li>
           </ul>
        </div>

      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-center">
         <p className="text-xs text-gray-600 font-mono flex items-center justify-center gap-1">
           Made with <span className="text-red-900 animate-pulse">♥</span> (and spite) by 
           <a href="https://something.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline decoration-electric/30 underline-offset-4 decoration-2 hover:decoration-electric">
             Something Dev
           </a>
         </p>
      </div>
    </footer>
  )
}
