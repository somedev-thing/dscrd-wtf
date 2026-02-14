
import Image from 'next/image'

export default function Features() {
  return (
    <section id="features" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 px-6">
      
      {/* Card 1: The Profile Preview */}
      <div className="md:col-span-2 bg-card border border-border hover:border-electric/60 hover:shadow-[0_0_30px_rgba(0,114,255,0.05)] rounded-[2.5rem] p-10 relative overflow-hidden group transition-all duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500">
          <i className="lni lni-user-4 text-white text-7xl stroke-1"></i>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2 font-sans">Not just a redirect.</h3>
            <p className="text-gray-400 max-w-md font-body">We render a server-side profile card. It pulls your avatar, banner, and bio live from Discord API. It even shows what you're playing.</p>
          </div>
          
          {/* Mock Profile Card */}
          <div className="mt-8 bg-[#18181b] border border-white/5 rounded-2xl p-4 flex gap-4 max-w-sm mx-auto transform group-hover:scale-105 transition-transform duration-500 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-electric flex items-center justify-center shrink-0 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Dustin" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-bold truncate font-sans">Dustin <span className="text-electric text-xs bg-electric/10 px-1.5 py-0.5 rounded ml-1 font-mono">✓ DEV</span></h4>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2 font-body">Fullstack dev. 80% unfinished projects. I don't drink coffee.</p>
              <div className="mt-2 flex gap-2 items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-mono text-gray-500 uppercase">Coding VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2: Smart Embeds */}
      <div className="bg-card border border-border hover:border-electric/60 hover:shadow-[0_0_30px_rgba(0,114,255,0.05)] rounded-[2.5rem] p-8 relative overflow-hidden group transition-all duration-300">
        <div className="h-full flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center mb-4 text-electric group-hover:scale-110 transition-transform">
            <i className="lni lni-mountains-2 text-electric text-2xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2 font-sans">Dynamic Embeds</h3>
            <p className="text-sm text-gray-400 font-body">Paste your link in chat. It generates a custom Open Graph image instantly. Flex your banner.</p>
          </div>
          {/* Fake Embed Visual */}
          <div className="mt-6 border-l-4 border-electric bg-[#2f3136] p-3 rounded-r text-xs font-mono text-gray-400 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="text-electric font-bold">dscrd.wtf</div>
            <div>Check out my profile</div>
          </div>
        </div>
      </div>

      {/* Card 3: Anti-Tracking */}
      <div className="bg-card border border-border hover:border-electric/60 hover:shadow-[0_0_30px_rgba(0,114,255,0.05)] rounded-[2.5rem] p-8 flex flex-col justify-center items-center text-center group transition-all duration-300">
        <i className="lni lni-shield-2 text-gray-700 group-hover:text-green-500 transition-colors text-6xl stroke-1 mb-4"></i>
        <h3 className="font-bold text-white font-sans">No Creepy Tracking</h3>
        <p className="text-sm text-gray-400 mt-2 font-body">We just count clicks so you can feel famous. No cookies, no ad-tech BS.</p>
      </div>

      {/* Card 4: Bot Devs */}
      <div className="md:col-span-2 bg-card border border-border hover:border-electric/60 hover:shadow-[0_0_30px_rgba(0,114,255,0.05)] rounded-[2.5rem] p-8 flex items-center justify-between group cursor-pointer transition-all duration-300">
         <div>
            <h3 className="text-2xl font-bold text-white mb-1 font-sans">For Bot Devs</h3>
            <p className="text-gray-400 text-sm font-body">Create <code className="bg-white/10 px-1 rounded text-electric font-mono">dscrd.wtf/bot/my-bot</code> links. Track invite sources.</p>
         </div>
         <div className="w-16 h-16 rounded-full bg-[#111] border border-white/5 flex items-center justify-center group-hover:rotate-12 transition-transform">
            <i className="lni lni-code-1 text-gray-500 group-hover:text-electric transition-colors text-3xl"></i>
         </div>
      </div>

    </section>
  )
}
