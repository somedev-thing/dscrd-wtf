'use server'

import { auth } from "@/auth"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function ensureProfile() {
  const session = await auth()
  if (!session?.user) return null

  // Check if profile exists
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (!profile) {
    // Create new profile
    const { data: newProfile, error } = await supabase
      .from('profiles')
      .insert({
        user_id: session.user.id,
        username: session.user.username || session.user.name?.replace(/\s+/g, '').toLowerCase(),
        bio: 'Just another dscrd.wtf user',
        theme_config: {
            color: '#0072ff',
            mode: 'dark'
        }
      })
      .select()
      .single()
      
    if (error) {
        console.error("Error creating profile:", error)
        return null
    }
    return newProfile
  }

  return profile
}

export async function addLink(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const icon = formData.get('icon') as string || 'link'

  await supabase.from('links').insert({
    user_id: session.user.id,
    title,
    url,
    icon,
    position: 0 // Default to top
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/links')
}

export async function deleteLink(linkId: string) {
    const session = await auth()
    if (!session?.user) return
  
    await supabase.from('links').delete().eq('id', linkId).eq('user_id', session.user.id)
  
    revalidatePath('/dashboard')
    revalidatePath('/dashboard/links')
}

export async function updateTheme(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  const color = formData.get('color') as string
  const mode = formData.get('mode') as string

  // Get current profile first to merge or just update
  // JSONB updates in Supabase/Postgres can be partial, but let's just overwrite the config for now or fetch-then-update
  
  // Actually, let's just update the profile's theme_config
  await supabase.from('profiles').update({
    theme_config: { color, mode }
  }).eq('user_id', session.user.id)

  revalidatePath('/dashboard')
  revalidatePath(`/${session.user.username}`) // Revalidate public profile
}

export async function trackClick(linkId: string) {
    await supabase.rpc('increment_clicks', { link_id: linkId })
    // If RPC doesn't exist, fallback to raw update:
    // const { data: link } = await supabase.from('links').select('clicks').eq('id', linkId).single()
    // await supabase.from('links').update({ clicks: (link?.clicks || 0) + 1 }).eq('id', linkId)
    
    // Using simple increment for now since RPC might not be set up
    const { data: link } = await supabase.from('links').select('clicks').eq('id', linkId).single()
    if (link) {
        await supabase.from('links').update({ clicks: link.clicks + 1 }).eq('id', linkId)
    }
}

// --- SERVER MANAGEMENT ---

export async function createServer(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const guildId = formData.get('guildId') as string | null
  const icon = formData.get('icon') as string | null
  
  if (!name || !slug) return

  // Check slug availability (should also check reserved usernames)
  const { data: existing } = await supabase.from('servers').select('id').eq('slug', slug).single()
  if (existing) redirect('/dashboard/servers?error=slug_taken')

  const { data: server, error } = await supabase.from('servers').insert({
      owner_id: session.user.id,
      name,
      slug,
      discord_guild_id: guildId || null,
      icon: icon || null,
      theme_config: { color: '#5865F2', mode: 'dark' }
  }).select().single()

  if (error) return
  
  redirect(`/dashboard/servers/${server.id}`)
}

export async function updateServer(serverId: string, formData: FormData) {
    const session = await auth()
    if (!session?.user) return
  
    // Validate owner
    const { data: server } = await supabase.from('servers').select('id, slug').eq('id', serverId).eq('owner_id', session.user.id).single()
    if (!server) return

    const theme = {
        color: formData.get('color') as string,
        mode: formData.get('mode') as string
    }

    await supabase.from('servers').update({
        theme_config: theme,
        // banner, icon hooks here
    }).eq('id', serverId)

    revalidatePath(`/dashboard/servers/${serverId}`)
    revalidatePath(`/${server.slug}`) // Revalidate public page
}

export async function createServerPage(formData: FormData) {
    const session = await auth()
    if (!session?.user) return

    const serverId = formData.get('serverId') as string
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string

    // Validate ownership
    const { data: server } = await supabase.from('servers').select('owner_id').eq('id', serverId).single()
    if (!server || server.owner_id !== session.user.id) return

    await supabase.from('server_pages').insert({
        server_id: serverId,
        title,
        slug,
        content,
        position: 0 // Default to top? or bottom
    })

    revalidatePath(`/dashboard/servers/${serverId}/pages`)
}

export async function deleteServerPage(formData: FormData) {
    const session = await auth()
    if (!session?.user) return

    const pageId = formData.get('id') as string
    const serverId = formData.get('serverId') as string // passed for revalidation context

     // Validate ownership of page -> server -> owner
     // Simplified check:
    const { data: page } = await supabase.from('server_pages').select('server_id, servers(owner_id)').eq('id', pageId).single()
    
    // @ts-ignore
    if (!page || page.servers.owner_id !== session.user.id) return

    await supabase.from('server_pages').delete().eq('id', pageId)
    revalidatePath(`/dashboard/servers/${serverId}/pages`)
}

export async function deleteServer(formData: FormData) {
    const session = await auth()
    if (!session?.user) return

    const serverId = formData.get('id') as string
    
    // Validate ownership
    const { data: server } = await supabase.from('servers').select('owner_id').eq('id', serverId).single()
    if (!server || server.owner_id !== session.user.id) return

    await supabase.from('servers').delete().eq('id', serverId)
    redirect('/dashboard/servers')
}


