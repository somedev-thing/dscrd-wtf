'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useSession } from 'next-auth/react';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Docs', href: '/docs' },
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void/90 backdrop-blur-sm border-b border-surface-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
           <img 
             src="/dscrd-logo-icon.png" 
             alt="dscrd" 
             className="w-8 h-8 rounded-lg" 
           />
           <span className="font-jua text-2xl text-white tracking-wide group-hover:text-electric transition-colors">
             dscrd<span className="text-electric">.wtf</span>
           </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-zinc-400 hover:text-white font-heading font-medium transition-colors text-sm uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
          
          {session ? (
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-surface-elevated hover:bg-electric hover:text-white border border-surface-border hover:border-electric text-white rounded font-jua uppercase tracking-wide transition-all"
            >
              Dashboard
            </Link>
          ) : (
             <Link
              href="/login"
              className="px-6 py-2 bg-electric hover:bg-electric-hover text-white rounded font-jua uppercase tracking-wide transition-all"
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
        <div className="md:hidden bg-void border-b border-surface-border p-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lg text-zinc-400 hover:text-white font-jua uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="w-full text-center py-3 bg-electric text-white rounded font-jua uppercase"
            >
              {session ? 'Dashboard' : 'Log In'}
            </Link>
        </div>
      )}
    </nav>
  );
}
