'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ExternalLink, Zap, Code, Image as ImageIcon, Shield } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
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
      <section className="relative w-full overflow-hidden min-h-[90vh] flex items-center pt-24 pb-20 px-6">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/10 blur-[150px] rounded-full opacity-60" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full opacity-40" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center z-10">
            
            {/* Left Content */}
            <div className="text-left space-y-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400"
                >
                    <span className="w-2 h-2 rounded-full bg-electric animate-pulse" />
                    v2.0 // SYSTEM_ONLINE
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] font-jua"
                >
                    IDENTITY <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                        REDEFINED.
                    </span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed border-l-2 border-electric pl-6"
                >
                    Stop sending expired invites. Turn your Discord ID into a 
                    <span className="text-white font-bold"> permanent, dynamic profile card </span> 
                    that never dies.
                </motion.p>
                
                {/* Input CTA */}
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="flex flex-col sm:flex-row gap-4 max-w-lg"
                >
                   <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-electric/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-duration-500" />
                        <div className="relative flex items-center bg-black/50 border border-white/10 rounded-xl px-4 py-4 focus-within:border-electric transition-colors">
                            <span className="text-zinc-500 font-mono select-none mr-2">dscrd.wtf/</span>
                            <input 
                              type="text" 
                              placeholder="username" 
                              className="bg-transparent text-white placeholder:text-zinc-700 outline-none flex-1 font-mono font-bold"
                            />
                        </div>
                   </div>
                   <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all font-heading uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                        Claim Now
                   </button>
                </motion.div>

                <div className="flex items-center gap-6 text-sm text-zinc-500 font-mono pt-4">
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-electric" /> No Auth Required
                    </span>
                    <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-electric" /> Instant Sync
                    </span>
                </div>
            </div>

            {/* Right Visuals (Abstract Card) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-electric via-purple-500 to-cyan-500 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
                
                {/* Floating Card Mockup */}
                <div className="relative bg-[#09090b] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-electric to-transparent" />
                    
                    {/* Fake Profile Content */}
                    <div className="flex flex-col items-center text-center pt-8 pb-12">
                        <div className="w-32 h-32 rounded-full border-4 border-zinc-800 bg-zinc-900 mb-6 relative">
                            <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                                alt="Demo"
                                className="w-full h-full rounded-full"
                            />
                            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-[#09090b]" />
                        </div>
                        <h3 className="text-3xl font-jua text-white mb-1">Felix The Cat</h3>
                        <p className="font-mono text-electric mb-6">@felix_dev</p> 
                        
                        <div className="w-full max-w-xs space-y-3">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition">
                                <span className="font-heading text-zinc-400">Website</span>
                                <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition">
                                <span className="font-heading text-zinc-400">Github</span>
                                <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decor elements */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-zinc-800 rounded-2xl border border-white/10 flex items-center justify-center -rotate-12">
                    <Zap className="w-10 h-10 text-electric" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-auto px-6 py-3 bg-black rounded-full border border-white/10 flex items-center gap-2 rotate-6 shadow-xl">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-mono text-xs text-white">LIVE</span>
                </div>
            </motion.div>

        </div>
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
