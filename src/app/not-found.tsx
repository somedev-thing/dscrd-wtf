import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
       {/* Background Glitch Elements */}
       <div className="absolute inset-0 bg-void">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electric/20 blur-[100px] animate-pulse rounded-full"></div>
       </div>

       <div className="relative z-10">
         <h1 className="text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent leading-none select-none font-sans">
           404
         </h1>
         <div className="text-2xl md:text-4xl font-bold text-white mb-8 font-sans">
           Lost in the <span className="text-electric">Void</span>.
         </div>
         <p className="text-gray-400 mb-12 max-w-md mx-auto font-body">
           The page you are looking for has been consumed by the singularity. Or maybe you just typed it wrong.
         </p>
         <Link href="/" className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-electric hover:text-white transition-all transform hover:scale-105 font-mono">
           Return to Safety
         </Link>
       </div>
    </main>
  )
}
