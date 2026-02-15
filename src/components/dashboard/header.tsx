"use client"

import { PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { usePathname } from "next/navigation"
import { Session } from "next-auth"

interface DashboardHeaderProps {
    session: Session | null
    setMobileOpen: (open: boolean) => void
}

export function DashboardHeader({ session, setMobileOpen }: DashboardHeaderProps) {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(Boolean).slice(1) // remove 'dashboard'

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 sm:max-w-xs">
            {/* Mobile Sidebar Content */}
            <DashboardSidebar session={session} />
        </SheetContent>
      </Sheet>
      
      {/* Breadcrumbs (Simple) */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">Dashboard</span>
        {pathSegments.map((segment) => (
            <span key={segment} className="flex items-center gap-2">
                <span>/</span>
                <span className="capitalize">{segment}</span>
            </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  )
}
