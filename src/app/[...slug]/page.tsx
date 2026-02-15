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
    dark: 'text-white bg-zinc-950',
    electric: 'text-white bg-slate-950',
    void: 'text-white bg-black',
  };

  const bgClass = themeColors[profile.theme as keyof typeof themeColors] || themeColors.dark;

  return (
    <div className={`min-h-screen ${bgClass} font-sans selection:bg-electric selection:text-white flex items-center justify-center p-4`}>
       
       <div className={`w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative group ${
         profile.theme === 'electric' ? 'bg-[#001229]' : 'bg-[#09090b]'
       }`}>
          
          {/* Top Info Button */}
          <Link href="/" className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 backdrop-blur text-white/50 hover:text-white transition-colors">
            <Zap className="w-4 h-4" />
          </Link>

          {/* Banner */}
          <div className={`h-40 w-full relative overflow-hidden bg-gradient-to-r ${
            profile.theme === 'electric' ? 'from-electric to-blue-600' : 'from-zinc-800 to-zinc-900'
          }`}>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30" />
             {/* If we had a banner image, valid here */}
          </div>

          {/* Avatar Base */}
          <div className="relative px-6 pb-8">
             <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-[6px] border-[#09090b] overflow-hidden bg-zinc-800 z-10">
                {user?.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-700 text-zinc-500">
                    <Zap />
                  </div>
                )}
             </div>

             <div className="pt-14">
                <h1 className="font-jua text-3xl text-white flex items-center gap-2">
                  {user?.name || handle}
                  {/* Verified Badge placeholder */}
                  {/* <div className="w-5 h-5 bg-electric text-white rounded-full flex items-center justify-center text-[10px]"><Check /></div> */}
                </h1>
                <p className="font-mono text-electric text-sm mb-4">@{handle}</p>

                {profile.bio && (
                  <p className="text-zinc-400 font-heading text-sm leading-relaxed mb-6">
                    {profile.bio}
                  </p>
                )}
             </div>

             {/* Links/Stats - Placeholder for now until we have Links model */}
             <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center text-electric">
                       <Hexagon className="w-5 h-5" />
                     </div>
                     <span className="font-heading font-medium text-white">My Server</span>
                   </div>
                   <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
                 <div className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                       <Globe className="w-5 h-5" />
                     </div>
                     <span className="font-heading font-medium text-white">Website</span>
                   </div>
                   <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
             </div>

             <footer className="mt-8 text-center border-t border-white/5 pt-4">
                <Link href="/" className="font-jua text-xs text-zinc-600 hover:text-electric transition-colors uppercase tracking-widest">
                  dscrd.wtf
                </Link>
             </footer>
          </div>
       </div>

    </div>
  );
}
