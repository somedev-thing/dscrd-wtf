'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-void flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto border border-red-500/20">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-white font-jua tracking-tight">System Failure</h1>
          <p className="text-zinc-400">
            Something broke in the void. We've logged it.
          </p>
          {error.digest && (
            <code className="block mt-2 text-xs text-zinc-600 font-mono bg-zinc-900 p-1 rounded">
              Digest: {error.digest}
            </code>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="w-full bg-zinc-900 text-zinc-400 font-bold py-3 rounded-xl hover:bg-zinc-800 transition-colors border border-zinc-800 hover:border-zinc-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
