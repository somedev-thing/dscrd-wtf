import { Coffee, Heart, Lightning } from '@phosphor-icons/react/dist/ssr'

export default function Fuel() {
  return (
    <section id="fuel" className="max-w-2xl mx-auto bg-card border border-border hover:border-fanta/40 rounded-[2.5rem] p-10 text-center relative overflow-hidden group transition-colors mb-24 mx-6">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 pointer-events-none"></div>
      <div className="inline-block p-3 rounded-full bg-orange-500/10 mb-4 group-hover:scale-110 transition-transform">
        <Coffee size={32} weight="duotone" className="text-fanta" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-4 font-sans">The Fuel Supply</h2>
      <p className="text-gray-400 mb-8 font-body">
        I don't drink coffee. This server runs on <strong>Coke Vanilla</strong>, <strong>Fanta Exotic</strong>, and pure spite. 
        If you like the service, help keep the sugar levels high.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="px-6 py-3 rounded-full bg-[#111] border border-white/10 hover:border-orange-500 hover:text-orange-400 transition-colors flex items-center justify-center gap-2 font-mono text-sm">
          <Heart size={18} weight="fill" /> Buy me a Coke (€2)
        </button>
        <button className="px-6 py-3 rounded-full bg-[#111] border border-white/10 hover:border-fanta hover:text-fanta transition-colors flex items-center justify-center gap-2 font-mono text-sm">
          <Lightning size={18} weight="fill" /> Buy me a Fanta (€3)
        </button>
      </div>
    </section>
  )
}
