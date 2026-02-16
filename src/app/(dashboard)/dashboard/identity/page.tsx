'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
    SaveFill, 
    PlusFill, 
    TrashFill, 
    LinkFill, 
    RefreshCwFill, 
    LightningFill, 
    GlobeFill,
    GithubFill,
    TiktokFill,
    YoutubeFill,
    InstagramFill,
    FacebookFill,
    TwitterFill,
    BlueskyFill,
    RedditFill,
    ImageFill,
    MailFill,
    CheckCircleFill
} from '@/components/icons';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader } from "@/components/ui/loader";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from 'framer-motion';

const SOCIAL_PROVIDERS = [
    { label: 'Website', value: 'Website', icon: GlobeFill },
    { label: 'GitHub', value: 'GitHub', icon: GithubFill },
    { label: 'Twitter/X', value: 'Twitter', icon: TwitterFill },
    { label: 'TikTok', value: 'TikTok', icon: TiktokFill },
    { label: 'YouTube', value: 'YouTube', icon: YoutubeFill },
    { label: 'Instagram', value: 'Instagram', icon: InstagramFill },
    { label: 'Facebook', value: 'Facebook', icon: FacebookFill },
    { label: 'Bluesky', value: 'Bluesky', icon: BlueskyFill },
    { label: 'Reddit', value: 'Reddit', icon: RedditFill },
    { label: 'Email', value: 'Email', icon: MailFill },
];

export default function IdentityPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  interface UserProfile {
    theme?: string;
    customColors?: {
        start: string;
        end: string;
        accent: string;
    };
    socials?: { platform: string; url: string; icon?: string }[];
    bio?: string;
    displayName?: string;
    image?: string;
    handle?: string;
    banner?: string;
    bannerColor?: string;
    badges?: string[];
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [theme, setTheme] = useState('dark');
  const [customColors, setCustomColors] = useState({ start: '#000000', end: '#000000', accent: '#7928CA' });
  const [links, setLinks] = useState<{ platform: string; url: string; icon?: string }[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkProvider, setNewLinkProvider] = useState('Website');
  const [bio, setBio] = useState('');

  const fetchProfile = () => {
    setLoading(true);
    fetch('/api/identity')
      .then(res => {
        if (res.ok) return res.json();
        if (res.status === 404) return null;
        throw new Error('Failed to fetch');
      })
      .then(data => {
        if (data) {
          setProfile(data);
          setTheme(data.theme || 'dark');
          if (data.customColors) setCustomColors(data.customColors);
          setLinks(data.socials || []);
          setBio(data.bio || '');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAddLink = () => {
    if (!newLinkUrl) return;
    setLinks([...links, { platform: newLinkProvider, url: newLinkUrl }]);
    setNewLinkUrl('');
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/identity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            theme, 
            socials: links, 
            bio,
            customColors: theme === 'custom' ? customColors : undefined
        }),
      });

      if (!res.ok) throw new Error('Failed to save');

      const updated = await res.json();
      setProfile(updated);
    } catch (error) {
      console.error(error);
    } finally {
        // Minimum spinner time for UX
        setTimeout(() => setSaving(false), 500);
    }
  };

  const getSocialIcon = (platform: string) => {
      const provider = SOCIAL_PROVIDERS.find(p => p.value === platform);
      const Icon = provider ? provider.icon : GlobeFill;
      return <Icon className="w-4 h-4" />;
  };

  // Determine card background style
  const cardStyle = () => {
      if (theme === 'electric') return { background: 'linear-gradient(135deg, #1a0b2e 0%, #000000 100%)', borderColor: '#7928CA' };
      if (theme === 'void') return { background: '#000000', borderColor: '#333' };
      if (theme === 'custom') return { 
          background: `linear-gradient(135deg, ${customColors.start} 0%, ${customColors.end} 100%)`, 
          borderColor: customColors.accent 
      };
      return { background: '#09090b', borderColor: '#27272a' }; // Dark default
  };
  
  const accentColor = () => {
      if (theme === 'electric') return '#7928CA';
      if (theme === 'custom') return customColors.accent;
      return '#ffffff';
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader size={64} /></div>;
  }

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto pb-20 md:pb-0">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-2">Identity</h2>
            <p className="text-zinc-400">Manage your digital profile presence.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchProfile} className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 transition-all">
                <RefreshCwFill className="w-4 h-4" /> Sync Discord
            </Button>
            <Button onClick={handleSubmit} disabled={saving} className="bg-electric hover:bg-electric-hover text-white gap-2 shadow-[0_0_20px_rgba(121,40,202,0.3)] transition-all">
                {saving ? <Loader size={16} /> : <SaveFill className="w-4 h-4" />}
                Save Changes
            </Button>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 items-start">
         
         {/* Live Preview - Moves below on Mobile */}
         <div className="lg:col-span-5 lg:order-2 order-2 w-full">
            <div className="lg:sticky lg:top-24 space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Live Preview</h3>
                    <div className="text-[10px] text-emerald-500 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        ONLINE
                    </div>
                </div>
                
                {/* GLASSMORPHISM CARD */}
                <motion.div 
                    layout
                    className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 mx-auto max-w-sm lg:max-w-none"
                    style={{
                        ...cardStyle(),
                         boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px -20px ${accentColor()}20`
                    }}
                >
                    {/* Glass Overlay Texture */}
                    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Banner Image */}
                    <div className="h-1/3 w-full relative overflow-hidden group/banner">
                        {profile?.banner ? (
                            <img src={profile.banner} alt="Banner" className="w-full h-full object-cover transition-transform duration-700 group-hover/banner:scale-105" />
                        ) : (
                            <div className="w-full h-full bg-zinc-800/50" style={{ backgroundColor: profile?.bannerColor || '#27272a' }} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                    </div>

                    {/* Content Container */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 pt-0">
                        
                        {/* Avatar (Overlapping) */}
                        <div className="absolute top-[25%] left-8 transform -translate-y-1/2 z-10">
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="p-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl"
                            >
                                <Avatar className="h-24 w-24 rounded-full border-2 border-white/5">
                                    <AvatarImage src={profile?.image || session?.user?.image || ''} />
                                    <AvatarFallback className="bg-zinc-800 text-zinc-500 text-2xl font-bold">
                                        {profile?.displayName?.[0] || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#09090b] rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-[#09090b]" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Top Right Badges */}
                        <div className="absolute top-4 right-4 flex gap-2 z-20">
                             {(profile?.badges || []).map((badge, i) => (
                                 <div key={i} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur border border-white/10 flex items-center justify-center text-[10px] text-white/50" title={badge}>
                                     🏆
                                 </div>
                             ))}
                        </div>

                        {/* Text Content */}
                        <div className="mt-16 space-y-4 relative z-10 w-full">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 font-heading truncate">
                                    {profile?.displayName || session?.user?.name || 'User'}
                                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-[10px] font-mono text-white/80 tracking-widest uppercase backdrop-blur-sm shrink-0">
                                        LVL 1
                                    </span>
                                </h2>
                                <p className="text-white/60 font-mono text-sm mt-1 truncate">
                                    @{profile?.handle || 'username'}
                                </p>
                            </div>

                            {/* Bio */}
                            <div className="relative p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md text-sm text-zinc-300 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar group">
                                <div className="absolute -top-3 left-4 px-2 py-0.5 bg-black/60 rounded text-[10px] text-zinc-500 uppercase font-bold tracking-wider backdrop-blur">
                                    About
                                </div>
                                {bio || (
                                    <span className="text-zinc-600 italic">No bio set yet. Write something cool...</span>
                                )}
                            </div>

                            {/* Socials Row */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {links.map((link, i) => {
                                    const provider = SOCIAL_PROVIDERS.find(p => p.value === link.platform);
                                    const Icon = provider ? provider.icon : GlobeFill;
                                    return (
                                        <motion.a 
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, translateY: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => {
                                                if (!confirm(`You are leaving dscrd.wtf to visit ${link.url}. Continue?`)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/20 hover:border-white/20 transition-all shadow-lg cursor-pointer"
                                            title={link.platform}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.a>
                                    );
                                })}
                                {links.length === 0 && (
                                    <div className="text-xs text-zinc-600 py-2">No socials linked.</div>
                                )}
                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
         </div>

         {/* Editor Form - Stays on Top on Mobile/Tablet */}
         <div className="lg:col-span-7 lg:order-1 order-1 space-y-6 w-full">
             <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 rounded-xl p-1 mb-8">
                    <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white transition-all">General</TabsTrigger>
                    <TabsTrigger value="socials" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white transition-all">Socials</TabsTrigger>
                    <TabsTrigger value="theme" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white transition-all">Appearance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-6">
                    <Card className="bg-[#09090b] border-white/10 overflow-hidden">
                        <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-white">Profile Information</CardTitle>
                            <CardDescription>Update your bio and view synced info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Banner Field */}
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Banner URL</Label>
                                <div className="flex gap-2">
                                    <Input 
                                        className="bg-white/5 border-white/10 text-white" 
                                        placeholder="https://..." 
                                        defaultValue={profile?.banner}
                                        onChange={(e) => setProfile(prev => prev ? ({ ...prev, banner: e.target.value }) : null)}
                                    />
                                    <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400">
                                        <ImageFill className="w-4 h-4" />
                                    </Button>
                                </div>
                                <p className="text-[0.7rem] text-zinc-500">
                                    Enter an image URL or import from Discord (Nitro required for Banner import).
                                </p>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Display Name</Label>
                                    <div className="relative">
                                        <Input className="bg-white/5 border-white/10 text-white pl-10" value={profile?.displayName || session?.user?.name || ''} disabled />
                                        <div className="absolute left-3 top-2.5 text-zinc-500">
                                            <Avatar className="w-5 h-5 rounded-full">
                                                <AvatarImage src={profile?.image} />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-400">Username</Label>
                                    <div className="relative">
                                        <Input className="bg-white/5 border-white/10 text-white pl-9" value={`@${profile?.handle || 'username'}`} disabled />
                                        <span className="absolute left-3 top-2.5 text-zinc-500">@</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <p className="text-[0.8rem] text-electric flex items-center gap-1.5 bg-electric/10 inline-flex px-3 py-1 rounded-full border border-electric/20">
                                    <LightningFill className="h-3 w-3" /> Synced from Discord
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-400">Bio</Label>
                                <div className="relative">
                                    <Textarea 
                                        placeholder="Tell us about yourself..." 
                                        className="min-h-[160px] bg-black/40 border-white/10 text-white resize-none focus:border-electric focus:ring-1 focus:ring-electric p-4 leading-relaxed" 
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        maxLength={300}
                                    />
                                    <div className="absolute bottom-3 right-3 text-xs text-zinc-600 font-mono">
                                        {bio.length}/300
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="socials" className="space-y-6">
                    <Card className="bg-[#09090b] border-white/10 overflow-hidden">
                        <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-white">Social Links</CardTitle>
                            <CardDescription>Connect your other profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="sm:w-1/3">
                                    <Label className="sr-only">Platform</Label>
                                    <div className="relative">
                                        <select 
                                            className="w-full h-10 bg-[#09090b] border border-white/10 rounded-md text-white px-3 text-sm appearance-none focus:border-electric focus:outline-none"
                                            value={newLinkProvider}
                                            onChange={(e) => setNewLinkProvider(e.target.value)}
                                        >
                                            {SOCIAL_PROVIDERS.map(p => (
                                                <option key={p.value} value={p.value}>{p.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Label className="sr-only">Identifer</Label>
                                    <Input 
                                        className="bg-[#09090b] border-white/10 text-white"
                                        placeholder={newLinkProvider === 'Website' ? "https://..." : "@username"} 
                                        value={newLinkUrl} 
                                        onChange={(e) => setNewLinkUrl(e.target.value)} 
                                    />
                                </div>
                                <Button 
                                    onClick={() => {
                                        if (!newLinkUrl) return;
                                        let finalUrl = newLinkUrl;
                                        // Logic to prepend URL based on platform
                                        if (newLinkProvider !== 'Website' && !newLinkUrl.startsWith('http')) {
                                            const handle = newLinkUrl.replace(/^@/, '');
                                            if (newLinkProvider === 'GitHub') finalUrl = `https://github.com/${handle}`;
                                            if (newLinkProvider === 'Twitter') finalUrl = `https://twitter.com/${handle}`;
                                            if (newLinkProvider === 'TikTok') finalUrl = `https://tiktok.com/@${handle}`;
                                            if (newLinkProvider === 'YouTube') finalUrl = `https://youtube.com/@${handle}`;
                                            if (newLinkProvider === 'Instagram') finalUrl = `https://instagram.com/${handle}`;
                                            if (newLinkProvider === 'Facebook') finalUrl = `https://facebook.com/${handle}`;
                                            if (newLinkProvider === 'Bluesky') finalUrl = `https://bsky.app/profile/${handle}`;
                                            if (newLinkProvider === 'Reddit') finalUrl = `https://reddit.com/user/${handle}`;
                                        }
                                        setLinks([...links, { platform: newLinkProvider, url: finalUrl }]);
                                        setNewLinkUrl('');
                                    }} 
                                    disabled={!newLinkUrl} 
                                    className="bg-white/10 hover:bg-white/20 text-white shrink-0"
                                >
                                    <PlusFill className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="space-y-3">
                                {links.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-12 text-zinc-500 border-2 border-dashed border-white/5 rounded-xl bg-black/20">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                            <LinkFill className="w-5 h-5 opacity-50" />
                                        </div>
                                        <p>No links added yet.</p>
                                    </div>
                                )}
                                <AnimatePresence>
                                    {links.map((link, i) => (
                                        <motion.div 
                                            key={i} 
                                            layout
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4 overflow-hidden">
                                                <div className="h-10 w-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 shrink-0">
                                                   {getSocialIcon(link.platform)}
                                                </div>
                                                <div className="grid gap-0.5 max-w-[200px] sm:max-w-xs">
                                                    <span className="text-sm font-bold text-white flex items-center gap-2">
                                                        {link.platform}
                                                        <CheckCircleFill className="w-3 h-3 text-electric" />
                                                    </span>
                                                    <span className="text-xs text-zinc-500 truncate">{link.url}</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveLink(i)} className="hover:bg-red-500/10 hover:text-red-500 text-zinc-600 transition-colors">
                                                <TrashFill className="h-4 w-4" />
                                            </Button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="theme" className="space-y-6">
                    <Card className="bg-[#09090b] border-white/10 overflow-hidden">
                         <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                            <CardTitle className="text-white">Theme Preference</CardTitle>
                            <CardDescription>Choose how your card looks to others.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-8">
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['dark', 'electric', 'void', 'custom'].map((t) => (
                                    <div 
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`
                                            cursor-pointer rounded-2xl border-2 p-4 text-center capitalize transition-all hover:bg-white/5 relative overflow-hidden group
                                            ${theme === t ? 'border-electric bg-electric/5 scale-[1.02]' : 'border-white/5 bg-[#0d0d10] opacity-80 hover:opacity-100'}
                                        `}
                                    >
                                        <div className={`mb-3 h-12 w-12 mx-auto rounded-full shadow-lg ${
                                            t === 'electric' ? 'bg-gradient-to-br from-electric to-purple-800' :
                                            t === 'void' ? 'bg-black border border-white/10' : 
                                            t === 'custom' ? 'bg-gradient-to-br from-pink-500 to-orange-500' :
                                            'bg-zinc-800'
                                        }`} />
                                        <span className={`text-sm font-bold ${theme === t ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>{t}</span>
                                    </div>
                                ))}
                             </div>

                             {theme === 'custom' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-2 h-2 rounded-full bg-electric animate-pulse"/>
                                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Custom Colors</h4>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Color Inputs */}
                                        {[
                                            { label: 'Start Color', key: 'start' as const },
                                            { label: 'End Color', key: 'end' as const },
                                            { label: 'Accent Color', key: 'accent' as const }
                                        ].map((item) => (
                                            <div key={item.key} className="space-y-2">
                                                <Label className="text-xs text-zinc-400 uppercase tracking-widest font-bold">{item.label}</Label>
                                                <div className="flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-white/10 hover:border-white/20 transition-colors">
                                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-inner shrink-0">
                                                        <Input 
                                                            type="color" 
                                                            className="absolute inset-0 w-[150%] h-[150%] -top-[25%] -left-[25%] p-0 border-0 cursor-pointer opacity-0" 
                                                            value={customColors[item.key]} 
                                                            onChange={(e) => setCustomColors({...customColors, [item.key]: e.target.value})} 
                                                        />
                                                        <div className="w-full h-full" style={{ backgroundColor: customColors[item.key] }} />
                                                    </div>
                                                    <Input 
                                                        className="font-mono text-xs bg-transparent border-none text-white p-0 h-auto focus-visible:ring-0 uppercase placeholder:text-zinc-600" 
                                                        value={customColors[item.key]} 
                                                        onChange={(e) => setCustomColors({...customColors, [item.key]: e.target.value})} 
                                                        maxLength={7}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
             </Tabs>
         </div>
      </div>
    </div>
  );
}
