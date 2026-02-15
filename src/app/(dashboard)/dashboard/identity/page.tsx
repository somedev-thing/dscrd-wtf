'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, Save, Plus, Trash2, Link as LinkIcon, RefreshCw, Zap, ShieldAlert, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Will need to create Alert if not exists, or just use div

// Fallback Alert component until created
function SimpleAlert({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={`p-4 rounded-lg border ${className}`}>{children}</div>
}

export default function IdentityPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  const [theme, setTheme] = useState('dark');
  const [links, setLinks] = useState<any[]>([]);
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
      // Could add toast here
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Identity</h2>
            <p className="text-muted-foreground">Manage your public profile and identity settings.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchProfile}>
                <RefreshCw className="mr-2 h-4 w-4" /> Sync Discord
            </Button>
            <Button onClick={handleSubmit} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Changes
            </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         {/* Live Preview */}
         <div className="lg:order-2">
            <Card className="overflow-hidden border-2 border-primary/20 sticky top-24">
                <div className={`h-32 w-full bg-gradient-to-r ${theme === 'electric' ? 'from-blue-600 to-cyan-500' : 'from-zinc-800 to-zinc-900'}`} />
                <CardContent className="relative pt-0">
                    <div className="absolute -top-12 left-6">
                        <Avatar className="h-24 w-24 border-4 border-background bg-zinc-800">
                          <AvatarImage src={profile?.image || session?.user?.image || ''} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </div>
                    
                    <div className="mt-14 mb-6">
                        <h3 className="text-2xl font-bold flex items-center gap-2">
                            {profile?.displayName || session?.user?.name || 'User'}
                        </h3>
                        <p className="text-primary font-mono text-sm">@{profile?.handle || 'username'}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-lg bg-muted p-4 text-sm whitespace-pre-wrap">
                            {bio || "No bio set."}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {links.map((link, i) => (
                                <div key={i} className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full text-xs">
                                    <Globe className="h-3 w-3" />
                                    <span className="font-medium">{link.platform}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 text-xs text-muted-foreground justify-center">
                    Preview Mode
                </CardFooter>
            </Card>
         </div>

         {/* Editor */}
         <div className="lg:order-1 space-y-6">
             <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="socials">Socials</TabsTrigger>
                    <TabsTrigger value="theme">Appearance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your bio and view synced info.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Display Name</Label>
                                <Input value={profile?.displayName || session?.user?.name || ''} disabled />
                                <p className="text-[0.8rem] text-muted-foreground flex items-center gap-1">
                                    <Zap className="h-3 w-3" /> Synced from Discord
                                </p>
                            </div>
                           
                            {/* <div className="space-y-2">
                                <Label>Handle</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">@</span>
                                    <Input className="pl-7" value={profile?.handle || ''} disabled />
                                </div>
                            </div> */}

                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea 
                                   placeholder="Tell us about yourself..." 
                                   className="min-h-[120px]" 
                                   value={bio}
                                   onChange={(e) => setBio(e.target.value)}
                                />
                                <p className="text-[0.8rem] text-muted-foreground">
                                    Supports basic markdown.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="socials" className="space-y-4 mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Links</CardTitle>
                            <CardDescription>Add links to your other profiles.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <div className="grid gap-2 flex-1">
                                    <Label className="sr-only">Label</Label>
                                    <Input 
                                        placeholder="Label (e.g. Website)" 
                                        value={newLinkLabel} 
                                        onChange={(e) => setNewLinkLabel(e.target.value)} 
                                    />
                                </div>
                                <div className="grid gap-2 flex-[2]">
                                    <Label className="sr-only">URL</Label>
                                    <Input 
                                        placeholder="https://..." 
                                        value={newLinkUrl} 
                                        onChange={(e) => setNewLinkUrl(e.target.value)} 
                                    />
                                </div>
                                <Button onClick={handleAddLink} disabled={!newLinkLabel || !newLinkUrl}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                {links.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-4">No links added yet.</p>
                                )}
                                {links.map((link, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className="h-8 w-8 rounded bg-secondary flex items-center justify-center">
                                                <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div className="grid gap-0.5">
                                                <span className="text-sm font-medium">{link.platform}</span>
                                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">{link.url}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveLink(i)}>
                                            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="theme" className="space-y-4 mt-4">
                    <Card>
                         <CardHeader>
                            <CardTitle>Theme Preference</CardTitle>
                            <CardDescription>Choose how your card looks to others.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-3 gap-4">
                                {['dark', 'electric', 'void'].map((t) => (
                                    <div 
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`
                                            cursor-pointer rounded-lg border-2 p-4 text-center capitalize transition-all hover:bg-accent
                                            ${theme === t ? 'border-primary bg-primary/5' : 'border-transparent bg-secondary'}
                                        `}
                                    >
                                        <div className={`mb-2 h-8 w-8 mx-auto rounded-full ${
                                            t === 'electric' ? 'bg-blue-500' :
                                            t === 'void' ? 'bg-black' : 'bg-zinc-800'
                                        }`} />
                                        <span className="text-sm font-medium">{t}</span>
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
