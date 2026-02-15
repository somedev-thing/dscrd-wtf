"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Session } from "next-auth"
import { 
  CreditCard, 
  Globe, 
  Home, 
  LayoutGrid, 
  LogOut, 
  Menu, 
  Settings, 
  ShieldCheck, 
  User, 
  Zap,
  ChevronRight
} from "lucide-react"
import { signOut } from "next-auth/react"

interface DashboardSidebarProps {
  session: Session | null
  mobileOpen?: boolean
  setMobileOpen?: (open: boolean) => void
}

const navItems = [
  { label: 'Overview', icon: LayoutGrid, href: '/dashboard' },
  { label: 'Identity', icon: User, href: '/dashboard/identity' },
  { label: 'Redirects', icon: Globe, href: '/dashboard/redirects' },
  { label: 'Servers', icon: Home, href: '/dashboard/servers' },
  { label: 'Billing', icon: CreditCard, href: '/dashboard/billing' },
  { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
]

export function DashboardSidebar({ session, mobileOpen, setMobileOpen }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col gap-4">
      <div className={cn("flex h-14 items-center border-b px-4", isCollapsed ? "justify-center" : "gap-2")}>
        <div className="flex items-center gap-2 font-semibold">
           <div className="h-8 w-8 rounded-lg bg-electric flex items-center justify-center text-white">
             <Zap className="h-5 w-5 fill-current" />
           </div>
           {!isCollapsed && <span className="font-jua text-xl">dscrd.wtf</span>}
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <div className="flex flex-col gap-1 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Button
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                size={isCollapsed ? "icon" : "default"}
                className={cn(
                  "justify-start",
                  isActive && "bg-secondary",
                  isCollapsed && "justify-center"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            )
          })}
        </div>
      </ScrollArea>

      <div className="mt-auto border-t p-4">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
             <Avatar className="h-9 w-9 border">
                <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || "User"} />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
             </Avatar>
             {!isCollapsed && (
                <div className="flex flex-col text-sm">
                    <span className="font-semibold truncate max-w-[120px]">{session?.user?.name}</span>
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                        {(session?.user as any)?.tier === 'verified' ? 'Pro Plan' : 'Free Plan'}
                    </span>
                </div>
             )}
             {!isCollapsed && (
                 <Button variant="ghost" size="icon" className="ml-auto" onClick={() => signOut()}>
                     <LogOut className="h-4 w-4 text-muted-foreground hover:text-destructive"/>
                 </Button>
             )}
          </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex md:flex-col md:h-screen md:sticky md:top-0 w-64 data-[collapsed=true]:w-16 transition-all duration-300" data-collapsed={isCollapsed}>
         <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
           <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
