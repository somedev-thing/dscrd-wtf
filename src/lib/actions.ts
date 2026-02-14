'use server'

import { auth } from "@/auth"
import dbConnect from "@/lib/db"
import Profile from "@/lib/models/Profile"
import Link from "@/lib/models/Link"
import Server from "@/lib/models/Server"
import ServerPage from "@/lib/models/ServerPage"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function ensureProfile() {
  const session = await auth()
  if (!session?.user) return null

  await dbConnect()

  let profile = await Profile.findOne({ userId: session.user.id }).lean()

  if (!profile) {
    try {
      profile = await Profile.create({
        userId: session.user.id,
        // @ts-ignore
        username: session.user.username || session.user.name?.replace(/\s+/g, '').toLowerCase(),
        bio: 'Just another dscrd.wtf user',
        themeConfig: { color: '#5865F2', mode: 'dark' }
      })
      profile = JSON.parse(JSON.stringify(profile))
    } catch (error) {
      console.error("Error creating profile:", error)
      return null
    }
  }

  // Convert _id to id for compatibility
  return { ...profile, id: (profile as any)._id?.toString() }
}

export async function addLink(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const icon = formData.get('icon') as string || 'link'

  await Link.create({
    userId: session.user.id,
    title,
    url,
    icon,
    position: 0
  })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard/redirects')
}

export async function deleteLink(linkId: string) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()
  await Link.deleteOne({ _id: linkId, userId: session.user.id })

  revalidatePath('/dashboard')
  revalidatePath('/dashboard/links')
  revalidatePath('/dashboard/redirects')
}

export async function updateTheme(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const color = formData.get('color') as string
  const mode = formData.get('mode') as string

  await Profile.updateOne(
    { userId: session.user.id },
    { $set: { themeConfig: { color, mode } } }
  )

  revalidatePath('/dashboard')
}

export async function trackClick(linkId: string) {
  await dbConnect()
  await Link.updateOne({ _id: linkId }, { $inc: { clicks: 1 } })
}

// --- SERVER MANAGEMENT ---

export async function createServer(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const guildId = formData.get('guildId') as string | null
  const icon = formData.get('icon') as string | null

  if (!name || !slug) return

  const existing = await Server.findOne({ slug })
  if (existing) redirect('/dashboard/servers?error=slug_taken')

  const server = await Server.create({
    ownerId: session.user.id,
    name,
    slug,
    discordGuildId: guildId || null,
    icon: icon || null,
    themeConfig: { color: '#5865F2', mode: 'dark' }
  })

  redirect(`/dashboard/servers/${server._id}`)
}

export async function updateServer(serverId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const server = await Server.findOne({ _id: serverId, ownerId: session.user.id })
  if (!server) return

  const theme = {
    color: formData.get('color') as string,
    mode: formData.get('mode') as string
  }

  await Server.updateOne({ _id: serverId }, { $set: { themeConfig: theme } })

  revalidatePath(`/dashboard/servers/${serverId}`)
  revalidatePath(`/${server.slug}`)
}

export async function createServerPage(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const serverId = formData.get('serverId') as string
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string

  const server = await Server.findById(serverId)
  if (!server || server.ownerId !== session.user.id) return

  await ServerPage.create({
    serverId,
    title,
    slug,
    content,
    position: 0
  })

  revalidatePath(`/dashboard/servers/${serverId}/pages`)
}

export async function deleteServerPage(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const pageId = formData.get('id') as string
  const serverId = formData.get('serverId') as string

  const page = await ServerPage.findById(pageId)
  if (!page) return

  const server = await Server.findById(page.serverId)
  if (!server || server.ownerId !== session.user.id) return

  await ServerPage.deleteOne({ _id: pageId })
  revalidatePath(`/dashboard/servers/${serverId}/pages`)
}

export async function deleteServer(formData: FormData) {
  const session = await auth()
  if (!session?.user) return

  await dbConnect()

  const serverId = formData.get('id') as string

  const server = await Server.findById(serverId)
  if (!server || server.ownerId !== session.user.id) return

  await Server.deleteOne({ _id: serverId })
  redirect('/dashboard/servers')
}
