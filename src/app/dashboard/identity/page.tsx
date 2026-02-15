import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { ensureProfile, addLink, deleteLink, updateTheme } from "@/lib/actions"
import { getLinksByUserId } from "@/lib/data"
import { IdentityClient } from "./client"

export default async function IdentityPage() {
  const session = await auth()
  if (!session?.user) redirect("/")

  const profile = await ensureProfile()
  const links = await getLinksByUserId(profile.userId)

  return (
    <IdentityClient 
      user={session.user} 
      profile={profile} 
      initialLinks={links} 
    />
  )
}
