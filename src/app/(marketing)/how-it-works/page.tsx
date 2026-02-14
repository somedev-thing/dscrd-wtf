
import Link from 'next/link'

export default function HowItWorks() {
  return (
    <main className="pt-40 pb-24 px-6 min-h-screen max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-black mb-16 text-center font-sans tracking-tight">How it <span className="text-electric">Works</span></h1>
      
      <div className="space-y-24 relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-electric via-electric/50 to-transparent hidden md:block"></div>

        {/* Step 1 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          <div className="hidden md:flex w-16 h-16 rounded-full bg-card border border-electric items-center justify-center z-10 shrink-0">
             <i className="lni lni-user-4 text-electric text-xl"></i>
          </div>
          <div className="bg-card border border-border p-8 rounded-[2rem] flex-1">
             <h2 className="text-2xl font-bold mb-4 text-white font-sans">1. Connect Discord</h2>
             <p className="text-gray-400 font-body mb-4">
               Sign in with your Discord account. We fetch your current avatar, banner, bio, and activity status. 
               We do NOT ask for email or join servers for you.
             </p>
             <div className="text-xs font-mono bg-black/50 p-3 rounded text-gray-500">
               Scope: identify, connections
             </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start">
          <div className="hidden md:flex w-16 h-16 rounded-full bg-card border border-electric items-center justify-center z-10 shrink-0">
             <i className="lni lni-colour-palette-3 text-electric text-xl"></i>
          </div>
          <div className="bg-card border border-border p-8 rounded-[2rem] flex-1">
             <h2 className="text-2xl font-bold mb-4 text-white font-sans">2. Customize Card</h2>
             <p className="text-gray-400 font-body">
               Choose a theme (Void, Cyberpunk, or Light... if you must). Set a custom slug like <span className="text-electric">dscrd.wtf/dustin</span>.
               Add your other socials (GitHub, Twitter, etc.).
             </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col md:flex-row gap-8 items-start">
           <div className="hidden md:flex w-16 h-16 rounded-full bg-card border border-electric items-center justify-center z-10 shrink-0">
             <i className="lni lni-share-1 text-electric text-xl"></i>
          </div>
          <div className="bg-card border border-border p-8 rounded-[2rem] flex-1">
             <h2 className="text-2xl font-bold mb-4 text-white font-sans">3. Share Everywhere</h2>
             <p className="text-gray-400 font-body mb-6">
               Put the link in your bio. When people click it, they see your live status. 
               Paste it in Discord chat, and it renders a beautiful dynamic embed.
             </p>
             <Link href="/" className="inline-flex items-center gap-2 text-electric hover:text-white transition-colors font-bold">
               Get Started <i className="lni lni-arrow-right"></i>
             </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
