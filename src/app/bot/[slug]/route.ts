import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: bot } = await supabase
    .from('bots')
    .select('invite_url')
    .eq('slug', slug)
    .single()

  if (bot?.invite_url) {
    return redirect(bot.invite_url)
  }

  return redirect('/')
}
