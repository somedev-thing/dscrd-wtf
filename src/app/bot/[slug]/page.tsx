import { redirect } from "next/navigation"

// Mock Bot Database for now. In real app, this would be `bots` table.
const BOTS: Record<string, string> = {
    'nyra': 'https://discord.com/oauth2/authorize?client_id=123&permissions=0&scope=bot'
}

export default async function BotRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const target = BOTS[slug]

  if (target) {
    // In future: await trackClick('bot', params.slug)
    redirect(target)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
        404 - Bot Not Found
    </div>
  )
}
