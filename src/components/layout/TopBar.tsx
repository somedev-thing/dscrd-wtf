'use client';

import {
  Menu,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';

interface TopBarProps {
  onMenuOpen: () => void;
}

function generateBreadcrumbs(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });
  return crumbs;
}

export function TopBar({ onMenuOpen }: TopBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const breadcrumbs = generateBreadcrumbs(pathname);
  const userSlug = (session?.user as Record<string, unknown>)?.slugs;
  const publicSlug = Array.isArray(userSlug) && userSlug.length > 0 ? userSlug[0] : null;

  return (
    <header className="w-full h-16 border-b border-surface-border bg-surface-bg/80 flex items-center px-4 md:px-6 sticky top-0 z-10 backdrop-blur-md">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-1 text-zinc-400 hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center text-sm">
            <ol className="flex items-center">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center">
                    {index > 0 && (
                      <ChevronRight className="w-3 h-3 text-zinc-500 mx-2" />
                    )}
                    <NextLink
                      href={crumb.href}
                      className={`
                        transition-colors hover:text-white
                        ${isLast ? 'text-white font-semibold' : 'text-zinc-500 font-normal'}
                      `}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {crumb.label}
                    </NextLink>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* View Public Page */}
        {publicSlug && (
           <a
             href={`/${publicSlug}`}
             target="_blank"
             className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-surface-border text-zinc-400 text-xs font-medium hover:bg-surface-hover hover:text-white hover:border-zinc-700 transition-all"
           >
             View Public Page
             <ExternalLink className="w-3.5 h-3.5" />
           </a>
        )}
      </div>
    </header>
  );
}
