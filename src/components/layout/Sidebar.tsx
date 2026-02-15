'use client';

import {
  Home,
  User,
  Link2,
  Server,
  Settings,
  Zap,
  LogOut,
  X,
} from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import type { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', icon: Home, href: '/dashboard' },
  { label: 'Identity', icon: User, href: '/dashboard/identity' },
  { label: 'Links', icon: Link2, href: '/dashboard/links' },
  { label: 'Servers', icon: Server, href: '/dashboard/servers' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <NextLink
      href={item.href}
      className={cn(
        "w-full px-4 py-3 rounded-xl flex items-center gap-3 text-sm transition-all duration-200 border border-transparent font-medium",
        isActive
          ? "bg-electric text-white shadow-lg shadow-electric/25"
          : "text-zinc-400 hover:bg-white/5 hover:text-white"
      )}
    >
      <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-zinc-500 group-hover:text-white")} />
      <span>{item.label}</span>
    </NextLink>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full bg-[#050507] py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 rounded-xl bg-electric flex items-center justify-center shadow-lg shadow-electric/20">
          <Zap className="w-6 h-6 text-white" fill="currentColor" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-jua text-white leading-none">dscrd</span>
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Workspace</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="px-2 mb-2">
            <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">Menu</span>
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            isActive={
              item.href === '/dashboard'
                ? pathname === '/dashboard'
                : pathname.startsWith(item.href)
            }
          />
        ))}
      </div>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="flex items-center gap-3 mb-4 px-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <img
            className="w-10 h-10 rounded-xl border border-white/10 shadow-sm"
            src={session?.user?.image || ''}
            alt={session?.user?.name || 'User'}
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate font-heading">
              {session?.user?.name || 'User'}
            </div>
            <div className="text-[10px] text-zinc-500 truncate font-mono">
              {(session?.user as Record<string, unknown>)?.tier === 'verified'
                ? 'VERIFIED'
                : 'FREE PLAN'}
            </div>
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-zinc-500 text-sm font-medium transition-all duration-200 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <nav className="hidden lg:flex w-[260px] min-h-screen border-r border-surface-border bg-surface-bg fixed left-0 top-0 z-20">
      <SidebarContent />
    </nav>
  );
}

export function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-64 bg-surface-bg border-r border-surface-border shadow-xl transform transition-transform duration-300">
        <div className="absolute top-2 right-2">
           <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
             <X size={20} />
           </button>
        </div>
        <SidebarContent />
      </div>
    </div>
  );
}
