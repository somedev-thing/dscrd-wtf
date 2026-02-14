import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/dashboard/Sidebar"

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
    <div className="flex min-h-screen font-sans bg-[#050508] text-white">
        {/* SIDEBAR */}
        <Sidebar user={session.user} />

         {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col relative z-10 w-full lg:w-0 overflow-hidden bg-dot-pattern">
            {/* Top Navbar Placeholder (if needed, otherwise just padding) */}
            <div className="flex-1 overflow-y-auto p-4 pt-16 lg:p-8">
                 <div className="max-w-7xl mx-auto w-full">
                    {children}
                 </div>
            </div>
        </main>
    </div>
  )
}
