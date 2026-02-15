import Link from "next/link";
import { ChevronRight, Book, Code, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-void text-zinc-300 font-sans">
       <nav className="fixed top-0 w-full z-50 border-b border-surface-border bg-void/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-heading font-bold text-xl text-white">
             dscrd<span className="text-electric">.wtf</span> / docs
          </div>
          <Link href="/" className="text-sm hover:text-white transition-colors">Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-[240px_1fr] gap-12">
        <aside className="hidden md:block sticky top-32 self-start">
          <h5 className="font-bold text-white mb-4">Getting Started</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-electric block">Introduction</a></li>
            <li><a href="#" className="hover:text-white block">Installation</a></li>
            <li><a href="#" className="hover:text-white block">Authentication</a></li>
          </ul>
           <h5 className="font-bold text-white mt-8 mb-4">API Reference</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white block">Identity</a></li>
            <li><a href="#" className="hover:text-white block">Servers</a></li>
            <li><a href="#" className="hover:text-white block">Bots</a></li>
          </ul>
        </aside>

        <main className="prose prose-invert prose-blue max-w-none">
          <h1 className="font-heading text-4xl mb-6">Introduction</h1>
          <p className="lead text-lg text-zinc-400 mb-8">
            dscrd.wtf is the ultimate identity layer for Discord power users and communities. 
            Create beautiful profiles, manage server landing pages, and route traffic intelligently.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-12 not-prose">
            <div className="p-6 rounded-xl bg-surface-card border border-surface-border">
              <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-4">
                <Book className="w-5 h-5 text-electric" />
              </div>
              <h3 className="text-white font-bold mb-2">Guides</h3>
              <p className="text-sm mb-4">Step-by-step tutorials to set up your profile and servers.</p>
              <div className="flex items-center text-electric text-sm font-medium">
                Read guides <ChevronRight className="w-4 h-4" />
              </div>
            </div>
             <div className="p-6 rounded-xl bg-surface-card border border-surface-border">
              <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-4">
                <Terminal className="w-5 h-5 text-electric" />
              </div>
              <h3 className="text-white font-bold mb-2">API Reference</h3>
              <p className="text-sm mb-4">Programmatic access to your dscrd.wtf resources.</p>
               <div className="flex items-center text-electric text-sm font-medium">
                View API <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <h2>Quick Start</h2>
          <p>Get up and running in less than 2 minutes.</p>
          
          <div className="bg-surface-elevated p-4 rounded-lg border border-surface-border font-mono text-sm">
            <span className="text-purple-400">npm</span> install dscrd-cli
          </div>
        </main>
      </div>
    </div>
  );
}
