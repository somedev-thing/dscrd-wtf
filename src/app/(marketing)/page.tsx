'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import { 
  RocketFill, 
  LightningFill, 
  ShieldCheckFill, 
  CodeFill, 
  ExternalLink,
  RobotFill,
  GlobeFill
} from '@/components/icons';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-electric selection:text-white overflow-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center pt-32 pb-20 px-6">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 right-[-10%] w-[800px] h-[800px] bg-electric/20 blur-[150px] rounded-full opacity-50 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full opacity-30" />
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center z-10">
            
            {/* Left Content */}
            <div className="text-left space-y-8">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-electric animate-pulse shadow-[0_0_10px_#7928CA]" />
                    SYSTEM_ONLINE // v2.0
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] font-heading"
                >
                    IDENTITY <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                        REDEFINED
                    </span>
                    <span className="text-electric">.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed border-l-2 border-electric/50 pl-6"
                >
                    Clean paths, deep functionality. No trailing slashes. <br/>
                    Turn your Discord ID into a 
                    <span className="text-white font-bold"> permanent, dynamic hub </span> 
                    that never dies.
                </motion.p>
                
                {/* CTA */}
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="flex flex-col sm:flex-row gap-4 max-w-lg pt-4"
                >
                   <Link href="/pricing" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all font-heading uppercase tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2">
                        <RocketFill className="w-5 h-5" />
                        Get Started
                   </Link>
                   <Link href="/features" className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 border border-white/10 transition-all font-heading uppercase tracking-wide flex items-center justify-center gap-2">
                        Explore Features
                   </Link>
                </motion.div>
            </div>

            {/* Right Visuals (Glass Card) */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
                className="relative hidden lg:block perspective-1000"
            >
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-electric/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]" />
                    
                    {/* Mock Profile */}
                    <div className="flex flex-col items-center text-center pt-8 pb-12 relative z-10">
                        <div className="w-32 h-32 rounded-full border-4 border-white/5 bg-zinc-900 mb-6 relative shadow-lg shadow-black/50">
                            <img 
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Phantom" 
                                alt="Demo"
                                className="w-full h-full rounded-full"
                            />
                            <div className="absolute bottom-1 right-1 w-7 h-7 bg-green-500 rounded-full border-4 border-black" />
                        </div>
                        <h3 className="text-3xl font-heading text-white mb-1">Phantom</h3>
                        <p className="font-mono text-electric mb-8">@phantom_dev</p> 
                        
                        <div className="w-full max-w-xs space-y-3">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition cursor-pointer group/item">
                                <span className="font-heading text-zinc-400 group-hover/item:text-white transition-colors">GitHub</span>
                                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover/item:text-electric transition-colors" />
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition cursor-pointer group/item">
                                <span className="font-heading text-zinc-400 group-hover/item:text-white transition-colors">Server</span>
                                <GlobeFill className="w-4 h-4 text-zinc-500 group-hover/item:text-electric transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Discord Sync */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-[#0d0d10] border border-white/5 rounded-[32px] p-10 relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
               <LightningFill className="w-40 h-40 text-electric" />
             </div>
             <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-electric/10 flex items-center justify-center mb-6">
                   <LightningFill className="w-6 h-6 text-electric" />
                </div>
                <h3 className="text-3xl font-bold mb-4 font-heading text-white">Instant Sync.</h3>
                <p className="text-zinc-400 leading-relaxed max-w-md">
                  We render a server-side profile card that pulls your avatar, banner, and bio live from Discord API. 
                  Update Discord, update the world.
                </p>
             </div>
          </motion.div>

          {/* Card 2: Security */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-[#0d0d10] border border-white/5 rounded-[32px] p-10 relative overflow-hidden flex flex-col justify-between"
          >
             <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
                   <ShieldCheckFill className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-heading text-white">No Tracking.</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  We just count clicks. No cookies, no pixels, no creepy ad-tech.
                </p>
             </div>
          </motion.div>

          {/* Card 3: Bot Devs */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="bg-[#0d0d10] border border-white/5 rounded-[32px] p-10 flex flex-col justify-between"
          >
             <div>
               <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6">
                    <RobotFill className="w-6 h-6 text-pink-500" />
               </div>
               <h3 className="text-2xl font-bold mb-2 font-heading text-white">Bot Invites</h3>
               <p className="text-zinc-400 text-sm">
                 Smart redirects for your bots. Track where your invites come from.
               </p>
             </div>
             <div className="mt-6">
                <div className="px-3 py-2 bg-black rounded-lg border border-white/10 font-mono text-xs text-zinc-500">
                    dscrd.wtf/bot/<span className="text-pink-500">nyra</span>
                </div>
             </div>
          </motion.div>

          {/* Card 4: Open Source */}
          <motion.div 
             whileHover={{ y: -5 }}
             className="md:col-span-2 bg-[#0d0d10] border border-white/5 rounded-[32px] p-10 flex items-center justify-between gap-8 relative overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent" />
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-2 font-heading text-white">Open Source to the Core.</h3>
               <p className="text-zinc-400 max-w-lg mb-6">
                 We believe in transparency. Host it yourself if you want. We won't stop you.
               </p>
               <Link href="/open-source" className="inline-flex items-center gap-2 text-white font-bold hover:text-electric transition-colors">
                  View on GitHub <ExternalLink className="w-4 h-4" />
               </Link>
             </div>
             <div className="hidden md:block">
                <CodeFill className="w-32 h-32 text-zinc-800" />
             </div>
          </motion.div>

        </div>
      </section>

      <footer className="py-12 text-center text-zinc-600 text-sm border-t border-white/5 bg-[#050505]">
         <div className="flex items-center justify-center gap-6 mb-4">
             <Link href="/legal/terms" className="hover:text-zinc-400 transition-colors">Terms</Link>
             <Link href="/legal/privacy" className="hover:text-zinc-400 transition-colors">Privacy</Link>
             <Link href="https://twitter.com/dscrdwtf" className="hover:text-zinc-400 transition-colors">Twitter</Link>
         </div>
         <p>© 2026 dscrd.wtf. Not affiliated with Discord Inc.</p>
      </footer>
    </div>
  );
}
