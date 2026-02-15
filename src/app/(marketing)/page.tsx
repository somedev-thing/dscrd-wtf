'use client';

import Link from "next/link";
import { ArrowRight, Zap, Hexagon, X } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-electric selection:text-white pb-20">
      {/* Hero Section */}
      <section className="pt-32 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-surface-border rounded-lg w-fit">
            <div className="w-2 h-2 bg-electric rounded-full animate-pulse" />
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">System Online</span>
          </div>

          <h1 className="font-jua text-6xl md:text-8xl leading-[0.9] text-white">
            YOUR <span className="text-electric">DISCORD</span><br />
            IDENTITY.<br />
            EVOLVED.
          </h1>

          <p className="font-heading text-xl text-zinc-400 max-w-xl">
            Stop using generic link-in-bios. Get a profile that actually looks like it belongs to a gamer.
            Syncs with Discord. 100% customizable.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <Link 
              href="/login"
              className="px-8 py-4 bg-electric hover:bg-electric-hover text-white rounded-lg font-jua text-xl uppercase tracking-wide transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_#ffffff]"
            >
              Claim Handle
            </Link>
            <Link 
              href="/showcase"
              className="px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white text-zinc-300 hover:text-white rounded-lg font-jua text-xl uppercase tracking-wide transition-colors"
            >
              View Showcase
            </Link>
          </div>
        </div>

        {/* Right: The Product (Mock Profile) */}
        <div className="relative group">
          <div className="absolute inset-0 bg-electric/20 rounded-2xl rotate-3 scale-105 blur-xl group-hover:rotate-6 transition-all duration-500 opacity-50" />
          
          <div className="relative bg-[#111] border border-zinc-800 p-6 rounded-2xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            {/* Banner Mock */}
            <div className="h-32 bg-gradient-to-r from-electric to-purple-600 rounded-xl mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            </div>
            
            {/* Avatar Mock */}
            <div className="absolute top-24 left-6 w-24 h-24 bg-surface-card rounded-full border-4 border-[#111] overflow-hidden flex items-center justify-center">
               <Zap className="w-10 h-10 text-electric fill-current" />
            </div>

            <div className="mt-2">
              <h2 className="font-jua text-3xl">Kurokitu</h2>
              <p className="font-mono text-electric text-sm">@kurokitu</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
               {['Developer', 'Gamer', 'Night Owl'].map(tag => (
                 <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono text-zinc-400 uppercase">
                   {tag}
                 </span>
               ))}
            </div>

            <div className="mt-8 grid gap-3">
              <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-between hover:bg-zinc-900 hover:border-electric/50 transition-colors cursor-pointer group/link">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                     <Hexagon className="w-4 h-4 text-zinc-400" />
                   </div>
                   <span className="font-heading font-medium">My Community Server</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover/link:text-electric transform group-hover/link:translate-x-1 transition-all" />
              </div>
               <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center justify-between hover:bg-zinc-900 hover:border-electric/50 transition-colors cursor-pointer group/link">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                     <Zap className="w-4 h-4 text-zinc-400" />
                   </div>
                   <span className="font-heading font-medium">Portfolio</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover/link:text-electric transform group-hover/link:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Separator */}
      <div className="mt-32 py-4 bg-electric overflow-hidden rotate-[-1deg] scale-105">
         <div className="flex gap-8 animate-marquee whitespace-nowrap font-jua text-black text-2xl uppercase tracking-widest">
            <span>Server Pages</span> <span className="opacity-25">//</span> 
            <span>Redirects</span> <span className="opacity-25">//</span> 
            <span>Profiles</span> <span className="opacity-25">//</span> 
            <span>Identity</span> <span className="opacity-25">//</span> 
            <span>Server Pages</span> <span className="opacity-25">//</span> 
            <span>Redirects</span> <span className="opacity-25">//</span> 
            <span>Profiles</span> <span className="opacity-25">//</span> 
            <span>Identity</span>
         </div>
      </div>

      {/* Bento Grid Features */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
         <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 bg-surface-card border border-surface-border rounded-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-32 bg-electric/10 blur-[80px] rounded-full group-hover:bg-electric/20 transition-all" />
               <Zap className="w-12 h-12 text-electric mb-6" />
               <h3 className="font-jua text-4xl mb-4">Syncs with Discord</h3>
               <p className="text-zinc-400 font-heading text-lg max-w-md">
                 Change your avatar on Discord? It updates here. 
                 Change your banner? Updates here. 
                 We pull your Nitro perks, badges, and status.
               </p>
            </div>
            <div className="p-8 bg-surface-card border border-surface-border rounded-2xl flex flex-col justify-end min-h-[300px] relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
               <div className="relative z-10">
                 <h3 className="font-jua text-3xl mb-2">Dark Mode</h3>
                 <p className="text-zinc-500 font-mono text-sm uppercase">Standard Issue</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
