'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Showcase', href: '/showcase' },
  { label: 'Open Source', href: '/open-source' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-5xl mx-auto h-16 px-6 bg-[#09090b]/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-between shadow-2xl shadow-black/50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
           <div className="relative h-8 w-32 transition-transform group-hover:scale-105">
             <Image 
               src="/dscrd.wtf-logo-full.png" 
               alt="dscrd.wtf" 
               fill 
               className="object-contain"
               priority
             />
           </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-zinc-400 hover:text-white font-heading font-medium transition-all text-sm uppercase tracking-wider hover:bg-white/5 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>
          
        <div className="hidden md:flex items-center gap-4">
          <div className="h-6 w-px bg-white/10" />
          {session ? (
            <Link
              href="/dashboard"
              className="px-5 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg font-bold font-heading uppercase tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          ) : (
             <Link
              href="/login"
              className="px-5 py-2 bg-electric hover:bg-electric-hover text-white rounded-lg font-bold font-heading uppercase tracking-wide transition-all shadow-lg shadow-electric/20 hover:shadow-electric/40 hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-6 right-6 bg-[#09090b] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-2xl z-50">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-lg text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl font-jua uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link
              href={session ? "/dashboard" : "/login"}
              className="w-full text-center py-3 bg-electric text-white rounded-xl font-jua uppercase shadow-lg shadow-electric/20"
            >
              {session ? 'Dashboard' : 'Log In'}
            </Link>
        </div>
      )}
    </nav>
  );
}
