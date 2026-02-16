import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-void text-white selection:bg-electric/30 font-body">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <footer className="py-12 border-t border-white/5 bg-[#050505] text-center text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
           <div className="space-y-4">
              <div className="relative h-6 w-24 opacity-80 hover:opacity-100 transition-opacity">
                 <Image src="/dscrd.wtf-logo-full.png" alt="dscrd.wtf" fill className="object-contain object-left" />
              </div>
              <p className="text-xs text-zinc-600">
                The ultimate identity layer for your digital presence.
              </p>
           </div>
           <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-xs">
                 <li><Link href="/features" className="hover:text-electric transition-colors">Features</Link></li>
                 <li><Link href="/pricing" className="hover:text-electric transition-colors">Pricing</Link></li>
                 <li><Link href="/showcase" className="hover:text-electric transition-colors">Showcase</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-xs">
                 <li><Link href="/docs" className="hover:text-electric transition-colors">Documentation</Link></li>
                 <li><Link href="/open-source" className="hover:text-electric transition-colors">Open Source</Link></li>
                 <li><Link href="/status" className="hover:text-electric transition-colors">Status</Link></li>
              </ul>
           </div>
           <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-xs">
                 <li><Link href="/legal/privacy" className="hover:text-electric transition-colors">Privacy Policy</Link></li>
                 <li><Link href="/legal/terms" className="hover:text-electric transition-colors">Terms of Service</Link></li>
              </ul>
           </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; {new Date().getFullYear()} dscrd.wtf</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
