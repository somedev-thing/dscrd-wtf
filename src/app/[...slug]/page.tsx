import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';
import { Metadata } from 'next';
import { ArrowUpRight, Zap, Hexagon, Globe } from 'lucide-react';
import Link from 'next/link';

// Force dynamic since we're using params and DB
export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug }  = await params;
  if (!slug[0].startsWith('%40') && !slug[0].startsWith('@')) return {}; // Only handle @handle

  const handle = slug[0].replace(/^%40|^@/, '');
  await dbConnect();
  const profile = await Profile.findOne({ handle });

  if (!profile) return { title: 'Profile Not Found' };

  return {
    title: `${profile.handle} | dscrd.wtf`,
    description: profile.bio || `Check out ${profile.handle}'s profile on dscrd.wtf`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const { slug } = await params;
  
  // Handle Routing Logic
  // Check for @handle
  const isHandle = slug.length === 1 && (slug[0].startsWith('%40') || slug[0].startsWith('@'));
  
  if (!isHandle) {
    // If it's a vanity URL like /myhandle (without @), technically we could support it too?
    // User said "/@handle" mostly.
    // For now, if not @, 404.
    notFound();
  }

  const handle = slug[0].replace(/^%40|^@/, '');

  await dbConnect();
  // We need to populate User data too (avatar/name) from Auth User?
  // Profile has `userId`. We need to fetch User info.
  // But User is in a different model/collection.
  // We need `UserModel` too.
  
  const profile = await Profile.findOne({ handle });
  
  if (!profile) {
    console.log('Profile not found for handle:', handle);
    notFound();
  }

  // Fetch User Display Name/Avatar from UserModel (assuming we have one)
  // Or maybe we should store display name/avatar in Profile for faster reads?
  // For now, let's use a placeholder or try to fetch validation.
  // Actually, standard NextAuth users collection is `users`.
  const mongoose = await import('mongoose');
  const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({ name: String, image: String }));
  const user = await User.findById(profile.userId);


  const themeColors = {
    dark: 'bg-[#09090b]',
    electric: 'bg-[#001229]',
    void: 'bg-black',
    custom: 'bg-[#09090b]' // Fallback for custom, overridden by inline styles
  };

  const bgClass = themeColors[profile.theme as keyof typeof themeColors] || themeColors.dark;
  
  // Custom Theme Styles
  const customStyle = profile.theme === 'custom' && profile.customColors ? {
      backgroundColor: profile.customColors.background || '#09090b', // Fallback
      backgroundImage: `linear-gradient(to bottom right, ${profile.customColors.start}, ${profile.customColors.end})`
  } : {};

  // Accent color for glow
  const accentColor = () => {
      if (profile.theme === 'electric') return '#7928CA';
      if (profile.theme === 'custom') return profile.customColors?.accent || '#7928CA';
      return '#ffffff';
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-electric selection:text-white flex items-center justify-center p-4 relative overflow-hidden ${bgClass}`} style={customStyle}>
       
       {/* Background ambient glow matching theme */}
       <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/0 blur-[120px] animate-pulse" style={{ backgroundColor: `${accentColor()}20` }} />
          <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-indigo-500/20 to-purple-500/0 blur-[120px] animate-pulse" style={{ backgroundColor: `${accentColor()}20` }} />
       </div>

       <div className={`w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative group bg-[#09090b]`}
            style={{
                boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px -20px ${accentColor()}30`
            }}
       >
          {/* Glass Overlay Texture */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Top Info Button */}
          <Link href="/" className="absolute top-4 left-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur text-white/50 hover:text-white transition-colors border border-white/5 hover:border-white/20">
            <Zap className="w-4 h-4" />
          </Link>

          {/* Banner */}
          <div className="h-48 w-full relative overflow-hidden group/banner">
            {profile.banner ? (
                   <img src={profile.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
               ) : (
                   <div className="w-full h-full bg-zinc-800/50" style={{ backgroundColor: profile.bannerColor || '#27272a' }} />
               )}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
          </div>

          {/* Content Container */}
          <div className="relative px-8 pb-10 -mt-12">
             
             {/* Avatar Area */}
             <div className="relative mb-4">
                 <div className="w-24 h-24 rounded-full border-[3px] border-[#09090b] bg-[#09090b] relative z-10 overflow-hidden shadow-2xl">
                    {user?.image ? (
                        <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                         <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-500 font-bold text-2xl">
                            {(user?.name || handle)[0].toUpperCase()}
                        </div>
                    )}
                 </div>
                 {/* Online Status */}
                 <div className="absolute bottom-1 right-[calc(100%-6rem)] z-20 w-6 h-6 bg-[#09090b] rounded-full flex items-center justify-center translate-x-1/2">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#09090b]" />
                 </div>
             </div>

             {/* Badges */}
             <div className="absolute top-4 right-8 flex gap-2 z-20">
                 {(profile.badges || []).map((badge: string, i: number) => (
                     <div key={i} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-[10px] text-white/50 shadow-lg" title={badge}>
                         🏆
                     </div>
                 ))}
             </div>

             {/* User Info */}
             <div className="space-y-1 mb-6">
                <h1 className="font-jua text-3xl text-white flex items-center gap-2 tracking-tight">
                  {profile.displayName || user?.name || handle}
                  <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-[10px] font-mono text-white/80 tracking-widest uppercase backdrop-blur-sm">
                      LVL 1
                  </span>
                </h1>
                <p className="font-mono text-electric text-sm tracking-wide">@{handle}</p>
             </div>

             {/* Bio */}
             <div className="relative p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md text-sm text-zinc-300 leading-relaxed mb-8 group hover:bg-white/10 transition-colors">
                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-black/60 rounded text-[10px] text-zinc-500 uppercase font-bold tracking-wider backdrop-blur border border-white/5">
                    About
                </div>
                {profile.bio || "No bio yet."}
             </div>

             {/* Links */}
             {profile.socials && profile.socials.length > 0 ? (
                 <div className="flex flex-wrap gap-3">
                    {profile.socials.map((link: any, i: number) => {
                         // Simple Icon Mapping locally or verify imports
                         // For now using Generic
                         return (
                            <a 
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all shadow-lg text-[10px]"
                                title={link.platform}
                            >
                                {/* We can't easily import dynamic icons here without the full list mapping, so using platform initial or generic globe */}
                                <Globe className="w-5 h-5" />
                            </a>
                         )
                    })}
                 </div>
             ) : (
                <div className="text-center py-4 rounded-xl border border-dashed border-white/5 text-zinc-600 text-xs">
                    No socials linked
                </div>
             )}

             <footer className="mt-12 text-center">
                <Link href="/" className="font-jua text-xs text-zinc-700 hover:text-electric transition-colors uppercase tracking-[0.2em] hover:tracking-[0.3em] duration-300">
                  dscrd.wtf
                </Link>
             </footer>
          </div>
       </div>
    </div>
  );
}
