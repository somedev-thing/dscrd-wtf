import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex items-center justify-center text-center p-4">
      <div className="max-w-md">
        <div className="w-24 h-24 bg-surface-card rounded-3xl flex items-center justify-center mx-auto mb-8 border border-surface-border rotate-12">
          <AlertTriangle className="w-12 h-12 text-electric" />
        </div>
        <h1 className="font-jua text-6xl text-white mb-4">404</h1>
        <h2 className="font-heading text-2xl text-zinc-400 mb-8">This coordinate is empty space.</h2>
        <Link 
          href="/"
          className="px-8 py-3 bg-electric hover:bg-electric-hover text-white rounded-xl font-heading font-bold transition-all hover:scale-105"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
