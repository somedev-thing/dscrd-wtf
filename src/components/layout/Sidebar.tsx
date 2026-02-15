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
        "w-full px-3 py-2.5 rounded-lg flex items-center gap-3 text-sm transition-all duration-200",
        isActive
          ? "bg-electric-glow text-electric font-semibold"
          : "text-zinc-400 hover:bg-surface-hover hover:text-white font-normal"
      )}
    >
      <item.icon className="w-4 h-4" />
      <span>{item.label}</span>
    </NextLink>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-full py-4 px-3">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 py-2 mb-6">
        <div className="p-1.5 rounded-lg bg-electric-glow flex items-center justify-center">
          <Zap className="w-4 h-4 text-electric" />
        </div>
        <div className="text-lg font-extrabold tracking-tight">
          dscrd
          <span className="text-electric">.wtf</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-1 flex-1">
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

      <div className="h-px bg-surface-border mb-3" />

      {/* User miniprofile + fuel */}
      <div className="px-1">
        <div className="flex items-center gap-3 mb-3">
          <img
            className="w-8 h-8 rounded-full border-2 border-surface-border"
            src={session?.user?.image || ''}
            alt={session?.user?.name || 'User'}
          />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">
              {session?.user?.name || 'User'}
            </div>
            <div className="text-xs text-zinc-500 truncate">
              {(session?.user as Record<string, unknown>)?.tier === 'verified'
                ? '✓ Verified'
                : 'Lurker'}
            </div>
          </div>
        </div>

        {/* Fuel Level */}
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-zinc-500">Fuel</span>
            <span className="text-xs text-zinc-500">69%</span>
          </div>
          <div className="w-full h-1 bg-surface-border rounded-full overflow-hidden">
            <div className="h-full bg-electric w-[69%]" />
          </div>
        </div>

        {/* Sign out */}
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full px-3 py-2 rounded-lg flex items-center gap-3 text-zinc-500 text-sm transition-all duration-200 hover:bg-surface-hover hover:text-red-500"
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
