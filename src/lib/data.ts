import { supabase } from "@/lib/supabase"
import { cache } from 'react'

// --- USER DATA ---

export const getProfileByUsername = cache(async (username: string) => {
  // Handle handle with or without @
  const cleanUsername = username.startsWith('%40') ? username.slice(3) : (username.startsWith('@') ? username.slice(1) : username)

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, users(name, image, emailVerified)') // Join with users table to get image/name
    .eq('username', cleanUsername)
    .single()

  return profile
})

export const getLinksByUserId = cache(async (userId: string) => {
    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('position', { ascending: true })
      .order('created_at', { ascending: false })
  
    return links
})

// --- SERVER DATA ---

export const getServerBySlug = cache(async (slug: string) => {
    const { data: server } = await supabase
        .from('servers')
        .select('*')
        .eq('slug', slug)
        .single()
    return server
})

export const getServerPage = cache(async (serverId: string, slug: string) => {
    const { data: page } = await supabase
        .from('server_pages')
        .select('*')
        .eq('server_id', serverId)
        .eq('slug', slug)
        .single()
    return page
})

export const getServerPages = cache(async (serverId: string) => {
    const { data: pages } = await supabase
        .from('server_pages')
        .select('id, slug, title, position')
        .eq('server_id', serverId)
        .order('position', { ascending: true })
        .order('created_at', { ascending: true })
    return pages
})
