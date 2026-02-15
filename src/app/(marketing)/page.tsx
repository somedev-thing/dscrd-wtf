'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Code, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-electric selection:text-white">
      
      {/* Beta Pill */}
      <div className="pt-8 flex justify-center">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-electric animate-pulse" />
          <span className="text-xs font-medium text-zinc-400">Beta v0.1: Things might break.</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-20 md:pt-32 text-center max-w-5xl mx-auto z-10">
        
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-electric/20 blur-[120px] rounded-full opacity-50" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            
            {/* Grid Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
            </svg>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-black tracking-tight leading-none mb-8 font-jua drop-shadow-2xl"
        >
          Stop sending <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-400 to-zinc-700">expired invites.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-2 font-medium"
        >
          The identity layer for Discord. Turn your User ID into a beautiful, permanent profile card.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-electric font-bold mb-12 uppercase tracking-widest font-heading"
        >
          No more dead links.
        </motion.p>

        {/* Hero Input */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.3 }}
           className="max-w-md mx-auto relative group"
        >
          <div className="absolute inset-0 bg-electric/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex items-center bg-[#0d0d10] border border-white/10 rounded-full p-2 pl-6 shadow-2xl shadow-electric/10">
            <span className="text-zinc-500 font-mono">dscrd.wtf/</span>
            <input 
              type="text" 
              placeholder="username" 
              className="bg-transparent text-white placeholder:text-zinc-700 outline-none flex-1 font-mono"
            />
            <button className="p-3 bg-electric hover:bg-electric-hover text-white rounded-full transition-colors shadow-lg shadow-electric/20">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid */}
      <section className="px-6 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Not Just a Redirect (Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-[#0d0d10] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group"
          >
             <div className="relative z-10 max-w-md">
                <h3 className="text-3xl font-bold mb-4 font-heading">Not just a redirect.</h3>
                <p className="text-zinc-400 leading-relaxed">
                  We render a server-side profile card. It pulls your avatar, banner, and bio live from Discord API. It even shows what you're playing.
                </p>
             </div>
             
             {/* Visual */}
             <div className="mt-12 relative">
                <div className="bg-[#09090b] border border-white/10 rounded-2xl p-4 max-w-sm ml-auto transform translate-x-4 md:translate-x-0 group-hover:scale-[1.02] transition-transform duration-500">
                   <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                         <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dustin" className="w-16 h-16" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                           <h4 className="text-white font-bold text-lg">Dustin</h4>
                           <span className="bg-electric/20 text-electric text-[10px] px-1.5 py-0.5 rounded font-mono">DEV</span>
                         </div>
                         <p className="text-xs text-zinc-500 mt-1 max-w-[200px]">Fullstack dev. 80% unfinished projects. I don't drink coffee.</p>
                         <div className="mt-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">CODING VS CODE</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>

             {/* Decoration */}
             <div className="absolute top-0 right-0 p-8 opacity-20">
               <Zap className="w-32 h-32 text-electric" />
             </div>
          </motion.div>

          {/* Card 2: Dynamic Embeds (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0d0d10] border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between"
          >
             <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                   <ImageIcon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading">Dynamic Embeds</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Paste your link in chat. It generates a custom Open Graph image instantly. Flex your banner.
                </p>
             </div>

             <div className="bg-[#18181b] rounded-lg p-3 border-l-4 border-electric w-full transform group-hover:-translate-y-2 transition-transform">
                <div className="text-xs text-electric mb-1">dscrd.wtf</div>
                <div className="text-sm text-zinc-400">Check out my profile</div>
             </div>
          </motion.div>

          {/* Card 3: Privacy */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0d0d10] border border-white/5 rounded-[32px] p-8 md:p-12 text-center"
          >
             <div className="w-12 h-12 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-zinc-400" />
             </div>
             <h3 className="text-lg font-bold mb-3 font-heading">No Creepy Tracking</h3>
             <p className="text-zinc-400 text-sm">
               We just count clicks so you can feel famous. No cookies, no ad-tech BS.
             </p>
          </motion.div>

          {/* Card 4: Bot Devs */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="md:col-span-2 bg-[#0d0d10] border border-white/5 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
          >
             <div>
               <h3 className="text-2xl font-bold mb-2 font-heading">For Bot Devs</h3>
               <p className="text-zinc-400">
                 Create <span className="bg-electric/20 text-electric px-1 rounded">dscrd.wtf/bot/my-bot</span> links. Track invite sources.
               </p>
             </div>
             <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <Code className="w-6 h-6 text-zinc-500" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-zinc-600 text-sm">
         <p>© 2024 dscrd.wtf. Not affiliated with Discord Inc.</p>
      </footer>
    </div>
  );
}
