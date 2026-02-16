import Link from "next/link";
import { ChevronRight, Book, Code, Terminal } from "lucide-react";
import { Navbar } from '@/components/layout/Navbar';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-void text-zinc-300 font-sans selection:bg-electric selection:text-white">
       <Navbar />

       <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid md:grid-cols-[240px_1fr] gap-12">
        <aside className="hidden md:block sticky top-32 self-start">
          <h5 className="font-bold text-white mb-4 font-heading">Getting Started</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-electric block font-medium">Introduction</a></li>
            <li><a href="#" className="hover:text-white block transition-colors">Installation</a></li>
            <li><a href="#" className="hover:text-white block transition-colors">Authentication</a></li>
          </ul>
           <h5 className="font-bold text-white mt-8 mb-4 font-heading">API Reference</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white block transition-colors">Identity</a></li>
            <li><a href="#" className="hover:text-white block transition-colors">Servers</a></li>
            <li><a href="#" className="hover:text-white block transition-colors">Bots</a></li>
          </ul>
        </aside>

        <main className="prose prose-invert prose-zinc max-w-none">
          <h1 className="font-heading text-4xl mb-6 text-white">Introduction</h1>
          <p className="lead text-xl text-zinc-400 mb-8 leading-relaxed">
            dscrd.wtf is the ultimate identity layer for Discord power users and communities. 
            Create beautiful profiles, manage server landing pages, and route traffic intelligently.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-12 not-prose">
            <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-electric/50 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center mb-4 group-hover:bg-electric/20 transition-colors">
                <Book className="w-5 h-5 text-electric" />
              </div>
              <h3 className="text-white font-bold mb-2 font-heading">Guides</h3>
              <p className="text-sm mb-4 text-zinc-400">Step-by-step tutorials to set up your profile and servers.</p>
              <div className="flex items-center text-electric text-sm font-bold">
                Read guides <ChevronRight className="w-4 h-4" />
              </div>
            </div>
             <div className="p-6 rounded-2xl bg-[#09090b] border border-white/10 hover:border-purple-500/50 transition-colors group cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Terminal className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-white font-bold mb-2 font-heading">API Reference</h3>
              <p className="text-sm mb-4 text-zinc-400">Programmatic access to your dscrd.wtf resources.</p>
               <div className="flex items-center text-purple-500 text-sm font-bold">
                View API <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <h2 className="text-white font-heading">Quick Start</h2>
          <p className="text-zinc-400">Get up and running in less than 2 minutes.</p>
          
          <div className="bg-[#050505] p-4 rounded-xl border border-white/10 font-mono text-sm text-zinc-300 shadow-lg">
            <span className="text-purple-400">npm</span> install dscrd-cli
          </div>
        </main>
      </div>
    </div>
  );
}
