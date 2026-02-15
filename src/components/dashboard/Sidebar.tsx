"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { 
    DashboardSquare01Icon, 
    LinkSquare01Icon, 
    UserCircleIcon,
    Settings02Icon, 
    Logout01Icon,
    Menu01Icon,
    Cancel01Icon,
    ServerStack02Icon,
    CreditCardIcon
} from "hugeicons-react"
import { useState } from "react"

const NAV_ITEMS = [
    { label: "Overview", href: "/dashboard", icon: DashboardSquare01Icon },
    { label: "Profile", href: "/dashboard/identity", icon: UserCircleIcon },
    { label: "Servers", href: "/dashboard/servers", icon: ServerStack02Icon },
    // { label: "Redirects", href: "/dashboard/redirects", icon: LinkSquare01Icon },
    { label: "Settings", href: "/dashboard/settings", icon: Settings02Icon },
    // { label: "Billing", href: "/dashboard/billing", icon: CreditCardIcon },
]

export function Sidebar({ user }: { user: any }) {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Toggle */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 glass-card rounded-lg text-white shadow-lg bg-black/50 backdrop-blur-md border border-white/10"
            >
                {isOpen ? <Cancel01Icon /> : <Menu01Icon />}
            </button>

            {/* Sidebar Container - STICKY */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 
                lg:sticky lg:top-0 lg:h-screen
                glass-card-no-blur border-r border-white/5 bg-[#050508]/80 backdrop-blur-xl
                flex flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                {/* Header */}
                <div className="p-8 flex items-center gap-3 shrink-0">
                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-purple-600 flex items-center justify-center shadow-lg shadow-electric/20">
                        <Image src="/assets/img/dscrd-logo-icon.png" alt="Logo" width={24} height={24} className="brightness-0 invert" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white font-sans">dscrd.wtf</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        
                        return (
                            <Link 
                                key={item.href} 
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group
                                    ${isActive 
                                        ? 'bg-electric text-white shadow-lg shadow-electric/20 font-medium' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <Icon size={20} className={isActive ? "text-white" : "text-gray-500 group-hover:text-white transition-colors"} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User & Footer */}
                <div className="p-4 border-t border-white/5 bg-black/20 shrink-0">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
                        {user.image ? (
                            <Image src={user.image} alt={user.name} width={40} height={40} className="rounded-full" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <span className="text-white font-bold">{user.name?.[0]}</span>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link href="/api/auth/signout" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <Logout01Icon size={18} />
                        </Link>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] text-gray-600 font-mono">
                            Inspired by <a href="https://github.com/fuma-nama" target="_blank" className="hover:text-electric transition-colors">fuma-nama</a>
                        </p>
                    </div>
                </div>
            </aside>
            
            {/* Overlay for Mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
