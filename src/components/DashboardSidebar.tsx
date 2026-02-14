'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface User {
  name?: string | null
  email?: string | null
  image?: string | null
  id?: string
}

export default function DashboardSidebar({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggle = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Header / Hamburger */}
      <div className="lg:hidden h-16 bg-black border-b border-[#222] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
          <Link href="/" className="flex items-center gap-3">
              <Image src="/assets/img/dscrd-logo-icon.png" width={32} height={32} alt="dscrd.wtf" className="rounded-lg" />
              <span className="font-bold text-xl tracking-tight font-sans">dscrd<span className="text-electric">.wtf</span></span>
          </Link>
          <button onClick={toggle} className="text-gray-400 hover:text-white p-2">
            {isOpen ? <i className="lni lni-xmark text-2xl"></i> : <i className="lni lni-menu-hamburger-1 text-2xl"></i>}
          </button>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm" onClick={toggle}></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-black border-r border-[#222] flex flex-col justify-between transition-transform duration-300 transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
          
          {/* Logo Area (Desktop) */}
          <div className="h-20 hidden lg:flex items-center justify-start px-6 border-b border-[#222]/50">
              <Link href="/" className="flex items-center gap-3 group">
                  <Image src="/assets/img/dscrd-logo-icon.png" width={32} height={32} alt="dscrd.wtf" className="rounded-lg" />
                  <span className="font-bold text-xl tracking-tight font-sans">dscrd<span className="text-electric">.wtf</span></span>
              </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-8 space-y-2 mt-16 lg:mt-0">
              <div className="px-6 mb-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">Main</div>
              
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 transition-colors group ${pathname === '/dashboard' ? 'bg-[#111] border-r-2 border-electric text-white' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
              >
                  <i className={`lni lni-dashboard-square-1 text-lg ${pathname === '/dashboard' ? 'text-electric' : 'group-hover:text-electric transition-colors'}`}></i>
                  <span className="font-medium">Dashboard</span>
              </Link>
              <Link 
                href="/dashboard/servers" 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 transition-colors group ${pathname.startsWith('/dashboard/servers') ? 'bg-[#111] border-r-2 border-electric text-white' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
              >
                  <i className={`lni lni-monitor text-lg ${pathname.startsWith('/dashboard/servers') ? 'text-electric' : 'group-hover:text-electric transition-colors'}`}></i>
                  <span className="font-medium">Servers</span>
              </Link>
              <Link 
                href="/dashboard/links" 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 transition-colors group ${pathname === '/dashboard/links' ? 'bg-[#111] border-r-2 border-electric text-white' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
              >
                  <i className={`lni lni-link-2-angular-right text-lg ${pathname === '/dashboard/links' ? 'text-electric' : 'group-hover:text-electric transition-colors'}`}></i>
                  <span className="font-medium">Links</span>
                  <span className="flex ml-auto bg-electric/10 text-electric text-[10px] font-mono px-1.5 py-0.5 rounded">3</span>
              </Link>
              <Link 
                href="/dashboard/analytics" 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 transition-colors group ${pathname === '/dashboard/analytics' ? 'bg-[#111] border-r-2 border-electric text-white' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
              >
                  <i className={`lni lni-bar-chart-4 text-lg ${pathname === '/dashboard/analytics' ? 'text-electric' : 'group-hover:text-electric transition-colors'}`}></i>
                  <span className="font-medium">Analytics</span>
              </Link>

              <div className="px-6 mt-8 mb-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">System</div>
              
              <Link 
                href="/dashboard/design" 
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 transition-colors group ${pathname === '/dashboard/design' ? 'bg-[#111] border-r-2 border-electric text-white' : 'text-gray-400 hover:text-white hover:bg-[#111]'}`}
              >
                  <i className={`lni lni-colour-palette-3 text-lg ${pathname === '/dashboard/design' ? 'text-electric' : 'group-hover:text-electric transition-colors'}`}></i>
                  <span className="font-medium">Design</span>
              </Link>
              <Link href="/dashboard/settings" className="flex items-center gap-4 px-6 py-3 text-gray-400 hover:text-white hover:bg-[#111] transition-colors group">
                  <i className="lni lni-gear-1 text-lg group-hover:text-electric transition-colors"></i>
                  <span className="font-medium">Settings</span>
              </Link>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#222]/50">
              <button className="w-full bg-[#111] hover:bg-[#222] border border-[#222] p-3 rounded-xl flex items-center gap-3 transition-colors group text-left">
                  {user.image && <img src={user.image} className="w-8 h-8 rounded-lg bg-black object-cover" alt="Avatar" />}
                  <div className="overflow-hidden min-w-0">
                      <div className="text-xs font-bold text-white truncate group-hover:text-electric transition-colors">{user.name}</div>
                      <div className="text-[10px] text-gray-500 font-mono truncate">Online</div>
                  </div>
                  <i className="lni lni-arrow-right ml-auto text-gray-600 text-xs"></i>
              </button>
          </div>
      </aside>
    </>
  )
}
