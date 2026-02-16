import { Navbar } from '@/components/layout/Navbar';
import { RocketFill, LightningFill, ShieldCheckFill, RobotFill } from '@/components/icons';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-void text-white">
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-20">
           <h1 className="text-5xl font-black font-heading mb-6">Why dscrd.wtf?</h1>
           <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
             More than just a link. It's your identity layer for the chat platform we all love.
           </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl">
                <div className="w-12 h-12 bg-electric/10 rounded-xl flex items-center justify-center mb-6">
                    <LightningFill className="w-6 h-6 text-electric" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">Real-Time Sync</h3>
                <p className="text-zinc-400 leading-relaxed">
                    We sync directly with Discord. Change your avatar or banner on Discord, and it updates on your profile instantly. No manual uploads required.
                </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl">
                <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6">
                    <RobotFill className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">Bot-First Ecosystem</h3>
                <p className="text-zinc-400 leading-relaxed">
                    Developers can create branded invite links (`/bot/nyra`) and track click-through rates. Show off your bot's stats directly on its card.
                </p>
            </div>

             {/* Feature 3 */}
             <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                    <ShieldCheckFill className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">Privacy Focused</h3>
                <p className="text-zinc-400 leading-relaxed">
                    We don't track your cross-site behavior. We only count views on your profile to show you basic analytics. Your data stays yours.
                </p>
            </div>

             {/* Feature 4 */}
             <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                    <RocketFill className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 font-heading">Custom Domains</h3>
                <p className="text-zinc-400 leading-relaxed">
                    Link your own domain (e.g., `community.dscrd.wtf`) to your server page. Fully branded, fully managed SSL.
                </p>
            </div>
        </div>
      </main>
    </div>
  )
}
