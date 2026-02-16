'use client';

import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Zap } from '@/components/icons';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-void text-white font-sans selection:bg-electric selection:text-white flex hover:bg-black/90 transition-colors">
      
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-electric flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
            </div>
            <span className="font-jua text-lg">dscrd</span>
          </div>
          
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger>
                  <Menu className="text-zinc-400" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 border-r border-white/10 bg-[#09090b]">
                  <Sidebar />
              </SheetContent>
          </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 min-h-screen p-4 md:p-8 pt-20 md:pt-8 overflow-y-auto">
         <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
         </div>
      </main>

    </div>
  );
}
