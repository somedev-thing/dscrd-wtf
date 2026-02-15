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
      <body className="bg-void text-white font-sans flex items-center justify-center min-h-screen p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-4xl font-black font-jua">Critical Error</h1>
          <p className="text-zinc-400">The entire system has crashed. This is awkward.</p>
          <button
            onClick={() => reset()}
            className="bg-electric text-white px-6 py-3 rounded-xl font-bold hover:bg-electric-hover transition-colors"
          >
            Reboot System
          </button>
        </div>
      </body>
    </html>
  );
}
