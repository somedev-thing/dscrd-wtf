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
    <div className="flex min-h-screen font-sans">
        {/* Background handled by globals.css body */}

        {/* SIDEBAR */}
        <DashboardSidebar user={session.user} />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col relative z-10 w-full lg:w-0 overflow-hidden">
            {children}
        </main>
    </div>
  )
}
