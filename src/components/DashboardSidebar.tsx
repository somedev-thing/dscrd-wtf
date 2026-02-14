'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  DashboardSquare01Icon, 
  LinkSquare01Icon, 
  ChartBarLineIcon, 
  PaintBoardIcon, 
  Settings02Icon, 
  ArrowRight01Icon, 
  Logout01Icon, 
  Menu01Icon, 
  Cancel01Icon, 
  ServerStack02Icon,
  UserCircleIcon
} from 'hugeicons-react'
import { useState } from 'react'

export default function DashboardSidebar({ user }: { user: any }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const NavItem = ({ href, icon: Icon, label, exact = false }: { href: string, icon: any, label: string, exact?: boolean }) => {
    const active = exact ? pathname === href : isActive(href)
    return (
      <Link 
        href={href} 
        onClick={() => setIsOpen(false)}
        className={`sidebar-link group ${active ? 'active' : ''}`}
      >
        <Icon size={20} className={active ? "text-white" : "text-gray-400 group-hover:text-white transition-colors"} />
        <span className="font-medium font-sans text-sm tracking-wide">{label}</span>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 glass-card rounded-lg text-white shadow-lg"
        >
          {isOpen ? <Cancel01Icon size={24} /> : <Menu01Icon size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-void/95 backdrop-blur-xl border-r border-border z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:bg-transparent lg:border-r lg:border-white/5 lg:shadow-none
      `}>
        {/* Header */}
        <div className="h-24 flex items-center px-8">
           <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 relative shadow-[0_0_20px_-5px_var(--color-electric)] rounded-xl overflow-hidden">
                <Image 
                  src="/assets/img/dscrd-logo-icon.png" 
                  alt="dscrd" 
                  width={40} 
                  height={40} 
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                dscrd.wtf
              </span>
           </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          
          
          <div className="px-4 pb-2">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-2">Main Menu</div>
          </div>
          <NavItem href="/dashboard" icon={DashboardSquare01Icon} label="Dashboard" exact />
          <NavItem href="/dashboard/profile" icon={UserCircleIcon} label="Profile" />
          <NavItem href="/dashboard/links" icon={LinkSquare01Icon} label="Connections" />
          <NavItem href="/dashboard/servers" icon={ServerStack02Icon} label="Servers" />
          
          <div className="px-4 pb-2 pt-6">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono mb-2">Configuration</div>
          </div>
          <NavItem href="/dashboard/analytics" icon={ChartBarLineIcon} label="Analytics" />
          <NavItem href="/dashboard/design" icon={PaintBoardIcon} label="Theme" />
          <NavItem href="/dashboard/settings" icon={Settings02Icon} label="Settings" />
        </div>

        {/* User Footer */}
        <div className="p-6">
          <div className="glass-card p-4 rounded-2xl flex items-center gap-3 group cursor-pointer hover:bg-white/5 transition-colors">
             <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-electric to-phantom-accent p-[1px]">
                <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                    {user.image ? (
                    <Image src={user.image} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                        {user.name?.charAt(0)}
                    </div>
                    )}
                </div>
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate font-sans">{user.name}</p>
                <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    <p className="text-[10px] text-gray-400 font-mono">ONLINE</p>
                </div>
             </div>
             <button className="text-gray-500 hover:text-white transition-colors">
               <Logout01Icon size={18} />
             </button>
          </div>
        </div>
      </aside>
    </>
  )
}
