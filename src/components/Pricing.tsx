
import Link from 'next/link'

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-4xl mx-auto text-center mb-32 px-6">
      <h2 className="text-4xl md:text-5xl font-black mb-4 font-sans text-white">Pay once. Own it.</h2>
      <p className="text-gray-400 mb-12 font-body">We need to pay for the domain renewal (€24/yr). We aren't trying to buy a yacht.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        
        {/* Free Tier */}
        <div className="bg-card rounded-[2.5rem] p-8 border-dashed border-gray-800 text-left opacity-70 hover:opacity-100 transition-opacity">
          <h3 className="text-xl font-bold text-gray-300 mb-2 font-sans">Lurker</h3>
          <div className="text-4xl font-black text-white mb-6 font-sans">€0 <span className="text-sm font-normal text-gray-500 font-body">/ forever</span></div>
          <ul className="space-y-3 text-sm text-gray-400 mb-8 font-mono">
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-green-500"></i> 1 User Profile Link</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-green-500"></i> Standard Dark Theme</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-green-500"></i> "Powered by" Badge</li>
          </ul>
          <Link href="/login" className="block w-full py-3 rounded-full bg-white/5 text-center font-bold text-white hover:bg-white/10 transition-colors font-sans">
            Start Free
          </Link>
        </div>

        {/* Paid Tier */}
        <div className="bg-card rounded-[2.5rem] p-8 border border-electric relative overflow-hidden text-left transform md:scale-105 shadow-[0_0_40px_rgba(0,114,255,0.15)] group hover:shadow-[0_0_60px_rgba(0,114,255,0.25)] transition-all">
          <div className="absolute top-0 right-0 bg-electric text-white text-xs font-bold px-4 py-2 rounded-bl-2xl font-mono">NO SUBSCRIPTIONS</div>
          <h3 className="text-xl font-bold text-white mb-2 font-sans flex items-center gap-2"> Verified <i className="lni lni-star-1 text-white"></i></h3>
          <div className="text-4xl font-black text-white mb-6 font-sans">€4 <span className="text-sm font-normal text-gray-500 font-body">/ one-time</span></div>
          <p className="text-xs text-electric mb-6 font-mono">Basically the price of a Döner.</p>
          <ul className="space-y-3 text-sm text-gray-300 mb-8 font-mono">
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-electric"></i> Unlimited Custom Slugs</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-electric"></i> Custom Themes (Void, Cyberpunk)</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-electric"></i> Custom CSS Injection</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-electric"></i> Remove Badge</li>
            <li className="flex items-center gap-2"><i className="lni lni-checkmark text-electric"></i> Animated Banners</li>
          </ul>
          <Link href="/checkout" className="block w-full py-3 rounded-full bg-electric text-center font-bold text-white hover:bg-white hover:text-black transition-colors font-sans">
            Get Verified
          </Link>
        </div>

      </div>
    </section>
  )
}
