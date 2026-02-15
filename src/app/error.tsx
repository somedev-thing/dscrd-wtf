'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-6 font-sans relative overflow-hidden">
       {/* Background */}
        <div className="absolute inset-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 blur-[100px] rounded-full" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20 shadow-2xl shadow-red-500/10 backdrop-blur-md">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-white font-jua tracking-tight">System Failure</h1>
          <p className="text-zinc-400">
            Something broke in the void. It's not you, it's us.
          </p>
          {error.digest && (
            <code className="block mt-4 text-xs text-red-400 font-mono bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
              Error Digest: {error.digest}
            </code>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full bg-white/5 text-zinc-400 font-bold py-4 rounded-xl hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10 flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
