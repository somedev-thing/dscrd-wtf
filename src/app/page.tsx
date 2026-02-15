import Link from "next/link";
import { Zap, Shield, Globe, ArrowRight, Check } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-electric/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-void/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading font-bold text-xl">
             <div className="p-1.5 bg-electric-glow rounded-lg">
               <Zap className="w-4 h-4 text-electric" />
             </div>
             dscrd<span className="text-electric">.wtf</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="text-zinc-400 hover:text-white transition-colors">Docs</Link>
            <Link 
              href="/login" 
              className="px-4 py-2 bg-white text-black rounded-full hover:bg-zinc-200 transition-colors font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-electric/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-electric mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
            </span>
            v1.0 is now live
          </div>
          
          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            The Identity Layer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple-500">
              for Discord Power Users
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Create stunning profiles, manage server pages, and deploy smart redirects. 
            Syncs automatically with your Discord identity.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="px-8 py-4 bg-electric hover:bg-electric-hover text-white rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-electric/25"
            >
              Claim your handle
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/showcase"
              className="px-8 py-4 bg-surface-card border border-surface-border hover:border-zinc-600 text-zinc-300 hover:text-white rounded-xl font-medium transition-all"
            >
              View Showcase
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-surface-bg/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Discord Synced",
                desc: "Your profile updates automatically when you change your Discord avatar or banner."
              },
              {
                icon: Globe,
                title: "Custom Domains",
                desc: "Connect your own domain (e.g. chill.dscrd.wtf) for your server pages."
              },
              {
                icon: Zap,
                title: "Smart Redirects",
                desc: "Create shortlinks like /go/ticket that route users instantly."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-surface-card border border-surface-border hover:border-electric/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-electric" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400">Start for free, upgrade for power.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-3xl bg-surface-card border border-surface-border relative">
              <h3 className="font-heading text-2xl font-bold mb-2">Starter</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['1 Profile Card', '2 Server Pages', '1 Bot Redirect', 'Standard Support'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-zinc-400">
                    <Check className="w-5 h-5 text-zinc-600" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block w-full py-3 text-center rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-medium transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="p-8 rounded-3xl bg-surface-card border border-electric relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-electric text-xs font-bold text-white rounded-bl-xl">POPULAR</div>
              <h3 className="font-heading text-2xl font-bold mb-2">Plus</h3>
              <div className="text-4xl font-bold mb-6">$2.99<span className="text-lg text-zinc-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8">
                {['Unlimited Pages', '10 Bot Redirects', '/go/ Shortlinks', 'Priority Support', 'Custom CSS'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-electric" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="block w-full py-3 text-center rounded-xl bg-electric hover:bg-electric-hover text-white font-medium transition-colors shadow-lg shadow-electric/25">
                Upgrade to Plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-center text-zinc-600 text-sm">
        <p>&copy; {new Date().getFullYear()} dscrd.wtf. All rights reserved.</p>
      </footer>
    </div>
  );
}
