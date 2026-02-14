import { getProfileByUsername, getLinksByUserId, getServerBySlug, getServerPage, getServerPages } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"

import TrackedLink from "@/components/TrackedLink"
import Link from "next/link"

export const revalidate = 60 // Revalidate every minute

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  
  // Check if User Profile
  const firstSegment = slug[0]
  const isUser = firstSegment.startsWith('@') || firstSegment.startsWith('%40')

  if (isUser) {
    const username = firstSegment
    const profile = await getProfileByUsername(username)
    if (!profile) return { title: 'User Not Found | dscrd.wtf' }
    return {
        title: `${profile.username} | dscrd.wtf`,
        description: profile.bio || `Check out ${profile.username}'s profile on dscrd.wtf`,
        openGraph: { images: [profile.users?.image || ''] }
    }
  } else {
    // Server
    const serverSlug = firstSegment
    const server = await getServerBySlug(serverSlug)
    if (!server) return { title: 'Not Found | dscrd.wtf' }
    
    // Subpage
    if (slug.length > 1) {
        const pageSlug = slug[1]
        const page = await getServerPage(server.id, pageSlug)
        return {
            title: `${page?.title || 'Page'} | ${server.name} | dscrd.wtf`,
            description: `Read ${page?.title} on ${server.name}`
        }
    }

    return {
        title: `${server.name} | dscrd.wtf`,
        description: server.description || `Join ${server.name} on Discord`
    }
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const firstSegment = slug[0]
  const isUser = firstSegment.startsWith('@') || firstSegment.startsWith('%40')

  // --- USER PROFILE VIEW ---
  if (isUser) {
      if (slug.length > 1) notFound() // Users don't have subpages yet

      const username = firstSegment
      const profile = await getProfileByUsername(username)

      if (!profile) notFound()

      const links = await getLinksByUserId(profile.user_id)
      const theme = profile.theme_config || { color: '#0072ff', mode: 'dark' }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 selection:bg-white selection:text-black font-sans"
            style={{ backgroundColor: theme.mode === 'light' ? '#f4f4f5' : '#09090b', color: theme.mode === 'light' ? '#18181b' : '#e4e4e7' }}>
            
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(circle at 50% 0%, ${theme.color} 0%, transparent 60%)` }}>
            </div>

            <main className="w-full max-w-md z-10">
                <div className="backdrop-blur-xl border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]"
                    style={{ 
                        backgroundColor: theme.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(20,20,20,0.6)',
                        borderColor: theme.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
                    }}>
                    
                    <div className="h-32 w-full relative" style={{ backgroundColor: theme.color }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    </div>

                    <div className="px-6 pb-8 -mt-12">
                        <div className="flex justify-between items-end mb-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl p-1 bg-white/10 backdrop-blur-sm border border-white/20">
                                    <Image 
                                        src={profile.users?.image || '/assets/img/dscrd-logo-icon.png'} 
                                        alt={profile.username} 
                                        width={96} height={96} 
                                        className="w-full h-full object-cover rounded-xl bg-black"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="text-2xl font-bold font-heading flex items-center gap-2">
                                {profile.users?.name || profile.username}
                            </h1>
                            <p className="text-sm opacity-60 font-mono">@{profile.username}</p>
                            {profile.bio && <p className="mt-3 text-sm leading-relaxed opacity-80">{profile.bio}</p>}
                        </div>

                        <div className="flex flex-col gap-3">
                            {links && links.length > 0 ? (
                                links.map((link: any) => (
                                    <TrackedLink key={link.id} link={link} theme={theme} />
                                ))
                            ) : (
                                <div className="text-center py-8 opacity-40 text-sm font-mono">No links added yet.</div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
      )
  }

  // --- SERVER VIEW ---
  else {
      const serverSlug = firstSegment
      const server = await getServerBySlug(serverSlug)
      
      if (!server) notFound()

      // Determine Page content
      let content = null
      let title = "Home"

      if (slug.length === 1) {
          // Home
           // Default Home logic or fetch specific home page if it exists in pages table?
           // For now, let's just show basic info
           title = "Home"
      } else {
          // Subpage
          const pageSlug = slug[1]
          const page = await getServerPage(server.id, pageSlug)
          if (!page) notFound()
          title = page.title
          content = page.content
      }

      // Fetch sidebar pages
      const pages = await getServerPages(server.id)

      const theme = server.theme_config || { color: '#0072ff', mode: 'dark' }

      return (
        <div className="min-h-screen font-sans" style={{ backgroundColor: theme.mode === 'light' ? '#f4f4f5' : '#09090b', color: theme.mode === 'light' ? '#18181b' : '#e4e4e7' }}>
            
            {/* Banner */}
            <div className="h-64 w-full relative overflow-hidden bg-black">
                {server.banner ? (
                    <Image src={server.banner} alt="Banner" fill className="object-cover opacity-50" />
                ) : (
                    <div className="absolute inset-0" style={{ backgroundColor: theme.color }}></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto flex items-end gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-black border-4 border-[#09090b] shadow-2xl relative overflow-hidden">
                         {server.icon ? (
                             <Image src={server.icon} alt="Icon" fill className="object-cover" />
                         ) : (
                             <div className="w-full h-full flex items-center justify-center bg-[#222] text-2xl font-bold">{server.name.charAt(0)}</div>
                         )}
                    </div>
                    <div className="mb-2">
                        <h1 className="text-4xl font-bold font-heading text-white">{server.name}</h1>
                        <p className="text-white/60 max-w-2xl">{server.description}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-1">
                    <div className="sticky top-8 space-y-2">
                        <div className="text-xs font-mono uppercase opacity-50 mb-4 tracking-widest">Navigation</div>
                        <Link href={`/${serverSlug}`} className={`block px-4 py-2 rounded-lg transition-colors ${slug.length === 1 ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}>
                             Home
                        </Link>
                        {pages && pages.map((p: any) => (
                            <Link key={p.id} href={`/${serverSlug}/${p.slug}`} className={`block px-4 py-2 rounded-lg transition-colors ${slug.length > 1 && slug[1] === p.slug ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}>
                                {p.title}
                            </Link>
                        ))}

                        <div className="pt-8">
                            <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#5865F2]/20 flex items-center justify-center gap-2">
                                <Image src="/assets/discord-white.svg" width={20} height={20} alt="Discord" />
                                Join Server
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-3">
                    <div className="bg-[#111] border border-[#222] rounded-2xl p-8 min-h-[500px]">
                        <h2 className="text-3xl font-heading font-bold mb-6 pb-4 border-b border-[#222]">{title}</h2>
                        <div className="prose prose-invert max-w-none">
                            {content ? (
                                <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} /> 
                                // In real app, use specific markdown parser
                            ) : (
                                <div className="text-center py-20 opacity-50">
                                    <i className="lni lni-notebook-1 text-5xl mx-auto mb-4 opacity-50"></i>
                                    <p>Welcome to {server.name}.</p>
                                    <p className="text-sm">This page shows the server status and information.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

            </div>

        </div>
      )
  }
}
