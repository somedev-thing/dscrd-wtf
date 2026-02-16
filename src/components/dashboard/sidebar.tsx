'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  DashboardFill, 
  DashboardFilled,
  IdCardFill, 
  IdCardFilled,
  ServerFill, 
  ServerFilled,
  DirectionArrrowRightFill, 
  CreditCardFill, 
  CreditCardFilled,
  SettingsFill,
  SettingsFilled,
  LogoutFill,
  Zap,
  ThunderstormFill
} from '@/components/icons';
import { clsx } from 'clsx';
import { signOut } from 'next-auth/react';

const sidebarLinks = [
  { label: 'Overview', href: '/dashboard', icon: DashboardFill, activeIcon: DashboardFilled },
  { label: 'Identity', href: '/dashboard/identity', icon: IdCardFill, activeIcon: IdCardFilled },
  { label: 'Servers', href: '/dashboard/servers', icon: ServerFill, activeIcon: ServerFilled },
  { label: 'Redirects', href: '/dashboard/redirects', icon: DirectionArrrowRightFill, activeIcon: DirectionArrrowRightFill }, // No filled for this one yet
  { label: 'Billing', href: '/dashboard/billing', icon: CreditCardFill, activeIcon: CreditCardFilled },
  { label: 'Account', href: '/dashboard/account', icon: SettingsFill, activeIcon: SettingsFilled },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-[#09090b]/90 backdrop-blur-xl border-r border-white/10 flex flex-col z-40 hidden md:flex transition-all">
      
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center text-white shadow-lg shadow-electric/20 group-hover:scale-105 transition-transform">
                <ThunderstormFill className="w-5 h-5" />
            </div>
            <span className="font-jua text-xl text-white tracking-wide group-hover:text-electric transition-colors">
                dscrd<span className="text-zinc-600">.wtf</span>
            </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Menu
        </div>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
          const Icon = isActive && link.activeIcon ? link.activeIcon : link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-heading font-medium text-sm group relative overflow-hidden",
                isActive 
                  ? "bg-white/10 text-white" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className={clsx("w-5 h-5 transition-colors", isActive ? "text-white" : "text-zinc-500 group-hover:text-white")} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User / Footer */}
      <div className="p-4 border-t border-white/5">
         <button 
           onClick={() => signOut({ callbackUrl: '/' })}
           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all font-heading font-medium text-sm group"
         >
            <LogoutFill className="w-5 h-5 group-hover:text-red-400 transition-colors" />
            Sign Out
         </button>
      </div>
    </aside>
  );
}
