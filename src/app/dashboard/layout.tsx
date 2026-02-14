import Link from 'next/link'
import { auth } from "@/auth"
import { redirect } from "next/navigation"

import DashboardSidebar from "@/components/DashboardSidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className="flex h-screen overflow-hidden bg-black text-gray-200 font-sans selection:bg-electric selection:text-white">
        {/* Grid Background */}
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
             style={{
               backgroundImage: 'linear-gradient(to right, #222 1px, transparent 1px), linear-gradient(to bottom, #222 1px, transparent 1px)',
               backgroundSize: '40px 40px',
               maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
             }}>
        </div>

        {/* SIDEBAR */}
        <DashboardSidebar user={session.user} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col relative z-10 bg-black overflow-hidden">
            {children}
        </main>
    </div>
  )
}
