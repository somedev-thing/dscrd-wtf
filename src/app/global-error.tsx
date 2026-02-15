'use client';
 
import { Jua, Lexend } from 'next/font/google';
import './globals.css';

const jua = Jua({ subsets: ['latin'], weight: '400', variable: '--font-jua' });
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className={`${jua.variable} ${lexend.variable}`}>
      <body className="bg-[#050507] text-white font-sans flex items-center justify-center min-h-screen p-6 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/20 blur-[150px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="text-9xl font-black font-jua text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900">FATAL</h1>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest font-heading">Critical System Failure</h2>
            <p className="text-zinc-400">The entire application has crashed. A hard reboot is required.</p>
          </div>
          
          <button
            onClick={() => reset()}
            className="bg-red-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 uppercase tracking-wider font-heading"
          >
            Reboot System
          </button>
        </div>
      </body>
    </html>
  );
}
