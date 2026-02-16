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
    GlobeFill
} from '@/components/icons';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react"; // Keep loader from lucide for now as mage might not have spinner
import { motion } from 'framer-motion';

export default function IdentityPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  interface UserProfile {
    theme?: string;
    socials?: { platform: string; url: string; icon?: string }[];
    bio?: string;
    displayName?: string;
    image?: string;
    handle?: string;
  }

  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [theme, setTheme] = useState('dark');
  const [links, setLinks] = useState<{ platform: string; url: string; icon?: string }[]>([]);
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkLabel, setNewLinkLabel] = useState('');
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
    if (!newLinkUrl || !newLinkLabel) return;
    setLinks([...links, { platform: newLinkLabel, url: newLinkUrl, icon: 'globe' }]);
    setNewLinkLabel('');
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
        body: JSON.stringify({ theme, socials: links, bio }),
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      const updated = await res.json();
      setProfile(updated);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-electric w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-1">Identity</h2>
            <p className="text-zinc-400">Manage your public profile card.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchProfile} className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2">
                <RefreshCwFill className="w-4 h-4" /> Sync Discord
            </Button>
            <Button onClick={handleSubmit} disabled={saving} className="bg-electric hover:bg-electric-hover text-white gap-2 shadow-lg shadow-electric/20">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <SaveFill className="w-4 h-4" />}
                Save Changes
            </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
         {/* Live Preview */}
         <div className="lg:order-2">
            <div className="sticky top-24">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">Live Preview</h3>
                    <div className="text-xs text-electric flex items-center gap-1">
                        <LightningFill className="w-3 h-3" /> Auto-updates
                    </div>
                </div>
                
                <Card className="overflow-hidden border border-white/10 bg-[#09090b] shadow-2xl relative group">
                    <div className={`h-32 w-full transition-colors duration-500 ${
                        theme === 'electric' ? 'bg-gradient-to-r from-electric to-purple-600' : 
                        theme === 'void' ? 'bg-black border-b border-white/10' :
                        'bg-zinc-800'
                    }`} />
                    
                    <CardContent className="relative pt-0 px-6 pb-8">
                        <div className="absolute -top-12 left-6">
                            <Avatar className="h-24 w-24 border-4 border-[#09090b] bg-zinc-900 shadow-xl">
                              <AvatarImage src={profile?.image || session?.user?.image || ''} />
                              <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-[#09090b]" />
                        </div>
                        
                        <div className="mt-14 mb-6">
                            <h3 className="text-2xl font-bold font-heading text-white flex items-center gap-2">
                                {profile?.displayName || session?.user?.name || 'User'}
                                <span className="bg-electric/20 text-electric text-[10px] px-1.5 py-0.5 rounded font-mono">PRO</span>
                            </h3>
                            <p className="text-electric font-mono text-sm">@{profile?.handle || 'username'}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm leading-relaxed text-zinc-300">
                                {bio || "No bio set."}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {links.map((link, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer group/link">
                                        <GlobeFill className="w-3 h-3 text-zinc-500 group-hover/link:text-white" />
                                        <span className="font-bold text-zinc-300 group-hover/link:text-white">{link.platform}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
         </div>

         {/* Editor */}
         <div className="lg:order-1 space-y-6">
             <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 rounded-xl p-1">
                    <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white">General</TabsTrigger>
                    <TabsTrigger value="socials" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white">Socials</TabsTrigger>
                    <TabsTrigger value="theme" className="rounded-lg data-[state=active]:bg-electric data-[state=active]:text-white">Appearance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4 mt-6">
                    <Card className="bg-[#09090b] border-white/10">
                        <CardHeader>
                            <CardTitle className=" text-white">Profile Information</CardTitle>
                            <CardDescription>Update your bio and view synced info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-zinc-400">Display Name</Label>
                                <Input className="bg-white/5 border-white/10 text-white" value={profile?.displayName || session?.user?.name || ''} disabled />
                                <p className="text-[0.8rem] text-electric flex items-center gap-1">
                                    <LightningFill className="h-3 w-3" /> Synced from Discord
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-zinc-400">Bio</Label>
                                <Textarea 
                                   placeholder="Tell us about yourself..." 
                                   className="min-h-[140px] bg-white/5 border-white/10 text-white resize-none focus:border-electric" 
                                   value={bio}
                                   onChange={(e) => setBio(e.target.value)}
                                />
                                <p className="text-[0.8rem] text-zinc-500">
                                    Supports basic markdown.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="socials" className="space-y-4 mt-6">
                    <Card className="bg-[#09090b] border-white/10">
                        <CardHeader>
                            <CardTitle className="text-white">Social Links</CardTitle>
                            <CardDescription>Add links to your other profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex gap-2 p-4 bg-white/5 rounded-xl border border-white/5">
                                <div className="grid gap-2 flex-1">
                                    <Label className="sr-only">Label</Label>
                                    <Input 
                                        className="bg-black/50 border-white/10 text-white"
                                        placeholder="Label (e.g. Website)" 
                                        value={newLinkLabel} 
                                        onChange={(e) => setNewLinkLabel(e.target.value)} 
                                    />
                                </div>
                                <div className="grid gap-2 flex-[2]">
                                    <Label className="sr-only">URL</Label>
                                    <Input 
                                        className="bg-black/50 border-white/10 text-white"
                                        placeholder="https://..." 
                                        value={newLinkUrl} 
                                        onChange={(e) => setNewLinkUrl(e.target.value)} 
                                    />
                                </div>
                                <Button onClick={handleAddLink} disabled={!newLinkLabel || !newLinkUrl} className="bg-white/10 hover:bg-white/20 text-white">
                                    <PlusFill className="h-4 w-4" />
                                </Button>
                            </div>

                            <Separator className="bg-white/5" />

                            <div className="space-y-3">
                                {links.length === 0 && (
                                    <div className="text-center py-8 text-zinc-500 border-2 border-dashed border-white/5 rounded-xl">
                                        No links added yet.
                                    </div>
                                )}
                                {links.map((link, i) => (
                                    <motion.div 
                                        key={i} 
                                        layout
                                        className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 group"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="h-8 w-8 rounded-lg bg-black/50 flex items-center justify-center border border-white/5">
                                                <LinkFill className="h-4 w-4 text-zinc-400" />
                                            </div>
                                            <div className="grid gap-0.5">
                                                <span className="text-sm font-bold text-white">{link.platform}</span>
                                                <span className="text-xs text-zinc-500 truncate max-w-[200px]">{link.url}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveLink(i)} className="hover:bg-red-500/10 hover:text-red-500 text-zinc-500">
                                            <TrashFill className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="theme" className="space-y-4 mt-6">
                    <Card className="bg-[#09090b] border-white/10">
                         <CardHeader>
                            <CardTitle className="text-white">Theme Preference</CardTitle>
                            <CardDescription>Choose how your card looks to others.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-3 gap-4">
                                {['dark', 'electric', 'void'].map((t) => (
                                    <div 
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`
                                            cursor-pointer rounded-xl border-2 p-4 text-center capitalize transition-all hover:bg-white/5 relative overflow-hidden group
                                            ${theme === t ? 'border-electric bg-electric/5' : 'border-white/5 bg-[#0d0d10]'}
                                        `}
                                    >
                                        {theme === t && (
                                            <div className="absolute top-2 right-2 w-2 h-2 bg-electric rounded-full shadow-[0_0_10px_#7928CA]" />
                                        )}
                                        <div className={`mb-3 h-12 w-12 mx-auto rounded-full shadow-lg ${
                                            t === 'electric' ? 'bg-gradient-to-br from-electric to-purple-800' :
                                            t === 'void' ? 'bg-black border border-white/10' : 'bg-zinc-800'
                                        }`} />
                                        <span className={`text-sm font-bold ${theme === t ? 'text-white' : 'text-zinc-500 group-hover:text-white'}`}>{t}</span>
                                    </div>
                                ))}
                             </div>
                        </CardContent>
                    </Card>
                </TabsContent>
             </Tabs>
         </div>
      </div>
    </div>
  );
}
