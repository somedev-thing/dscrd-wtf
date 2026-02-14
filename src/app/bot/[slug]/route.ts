import { redirect } from 'next/navigation'
import dbConnect from '@/lib/db'
import Bot from '@/lib/models/Bot'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  await dbConnect()
  const bot = await Bot.findOne({ slug })

  if (bot?.inviteUrl) {
    return redirect(bot.inviteUrl)
  }

  return redirect('/')
}
