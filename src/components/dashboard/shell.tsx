"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Session } from "next-auth"

interface DashboardShellProps {
  children: React.ReactNode
  session: Session | null
}

export function DashboardShell({ children, session }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar 
        session={session} 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen} 
      />
      <div className="flex flex-col">
        <DashboardHeader 
            session={session} 
            setMobileOpen={setMobileOpen} 
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/20">
          {children}
        </main>
      </div>
    </div>
  )
}
