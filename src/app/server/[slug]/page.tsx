import { redirect } from "next/navigation"

// Mock Server Database for now.
const SERVERS: Record<string, string> = {
    'chill': 'https://discord.gg/chill'
}

export default async function ServerRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const target = SERVERS[slug]

  if (target) {
     // In future: await trackClick('server', params.slug)
    redirect(target)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
        404 - Server Not Found
    </div>
  )
}
