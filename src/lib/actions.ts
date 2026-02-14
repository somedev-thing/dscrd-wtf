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
// --- SERVER MANAGEMENT ---

export async function createServer(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  
  if (!name || !slug) return { error: 'Missing fields' }

  // Check slug availability (should also check reserved usernames)
  const { data: existing } = await supabase.from('servers').select('id').eq('slug', slug).single()
  if (existing) return { error: 'Slug already taken' }

  const { data: server, error } = await supabase.from('servers').insert({
      owner_id: session.user.id,
      name,
      slug,
      theme_config: { color: '#5865F2', mode: 'dark' }
  }).select().single()

  if (error) return { error: error.message }
  
  redirect(`/dashboard/servers/${server.id}`)
}

export async function updateServer(serverId: string, formData: FormData) {
    const session = await auth()
    if (!session?.user) return
  
    // Validate owner
    const { data: server } = await supabase.from('servers').select('id').eq('id', serverId).eq('owner_id', session.user.id).single()
    if (!server) return { error: 'Unauthorized' }

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

