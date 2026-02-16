import { Navbar } from '@/components/layout/Navbar';
import { RocketFill, CheckCircleFill, CloseCircleFill } from '@/components/icons';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-void text-white">
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="text-center mb-20">
           <h1 className="text-5xl font-black font-heading mb-6">Simple Pricing.</h1>
           <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
             Start for free. Upgrade for power.
           </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
            
            {/* Free */}
            <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl relative">
                <h3 className="text-2xl font-bold font-heading mb-2">Free</h3>
                <div className="text-4xl font-bold mb-6 font-mono">$0<span className="text-lg text-zinc-500 font-sans font-normal">/mo</span></div>
                <p className="text-zinc-400 mb-8 h-12">Perfect for individuals just starting out.</p>
                
                <Link href="/login" className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center rounded-xl font-bold mb-8 transition-colors">
                    Get Started
                </Link>

                <ul className="space-y-4 text-sm text-zinc-300">
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> 1 Profile Card</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> 2 Server Pages</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> 1 Bot Invite Redirect</li>
                    <li className="flex items-center gap-3 opacity-50"><CloseCircleFill className="w-5 h-5 text-zinc-600" /> Custom Domains</li>
                    <li className="flex items-center gap-3 opacity-50"><CloseCircleFill className="w-5 h-5 text-zinc-600" /> /go/ Shortlinks</li>
                </ul>
            </div>

            {/* Plus */}
            <div className="bg-[#0d0d10] border-2 border-electric p-8 rounded-3xl relative transform md:-translate-y-4 shadow-[0_0_50px_-12px_rgba(121,40,202,0.3)]">
                <div className="absolute top-0 right-0 bg-electric text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                    MOST POPULAR
                </div>
                <h3 className="text-2xl font-bold font-heading mb-2 text-white">Plus</h3>
                <div className="text-4xl font-bold mb-6 font-mono text-electric">€2.99<span className="text-lg text-zinc-500 font-sans font-normal">/mo</span></div>
                <p className="text-zinc-400 mb-8 h-12">For power users and community managers.</p>
                
                <Link href="/login" className="block w-full py-3 bg-electric hover:bg-electric-hover text-white text-center rounded-xl font-bold mb-8 transition-colors shadow-lg shadow-electric/25">
                    Upgrade Now
                </Link>

                <ul className="space-y-4 text-sm text-zinc-300">
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Unlimited Profiles</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Unlimited Server Pages</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> 10 Bot Invite Redirects</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Create /go/ shortlinks</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Early Access to Features</li>
                </ul>
            </div>

             {/* Add-on */}
             <div className="bg-[#0d0d10] border border-white/5 p-8 rounded-3xl relative">
                <h3 className="text-2xl font-bold font-heading mb-2">Domains</h3>
                <div className="text-4xl font-bold mb-6 font-mono">€5.00<span className="text-lg text-zinc-500 font-sans font-normal">/once</span></div>
                <p className="text-zinc-400 mb-8 h-12">One-time fee per server.</p>
                
                <Link href="/login" className="block w-full py-3 bg-white/5 hover:bg-white/10 text-white text-center rounded-xl font-bold mb-8 transition-colors">
                    Buy Add-on
                </Link>

                <ul className="space-y-4 text-sm text-zinc-300">
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Custom Subdomain</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> (e.g. chill.dscrd.wtf)</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> Managed SSL</li>
                    <li className="flex items-center gap-3"><CheckCircleFill className="w-5 h-5 text-electric" /> No subscription needed</li>
                </ul>
            </div>

        </div>
      </main>
    </div>
  )
}
