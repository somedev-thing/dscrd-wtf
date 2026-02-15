import Link from "next/link";
import { AlertTriangle, Home, Zap } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center text-center p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/10 blur-[100px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

      <div className="max-w-lg relative z-10">
        <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 rotate-12 shadow-2xl shadow-electric/20 backdrop-blur-md">
          <Zap className="w-12 h-12 text-electric" fill="currentColor" />
        </div>
        
        <h1 className="font-jua text-8xl text-white mb-2 tracking-tighter">404</h1>
        <h2 className="font-heading text-xl text-zinc-500 mb-8 uppercase tracking-widest">Signal Lost in Void</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
            href="/"
            className="px-8 py-3 bg-electric hover:bg-electric-hover text-white rounded-xl font-heading font-bold transition-all hover:scale-105 shadow-lg shadow-electric/20 flex items-center gap-2 justify-center"
            >
            <Home className="w-4 h-4" /> Return to Base
            </Link>
            <Link 
            href="/docs"
            className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-heading font-bold transition-all border border-white/10 flex items-center gap-2 justify-center"
            >
            <AlertTriangle className="w-4 h-4 text-zinc-500" /> Report Issue
            </Link>
        </div>
      </div>
    </div>
  );
}
