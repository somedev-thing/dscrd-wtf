'use client';

import { useState } from 'react';
import { Sidebar, MobileSidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-bg flex">
      {/* Sidebar */}
      <Sidebar />
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-[260px] min-w-0">
        <TopBar onMenuOpen={() => setIsMobileMenuOpen(true)} />
        <main className="p-4 md:p-6 lg:p-8 max-w-[1200px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
