'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2, Save, AtSign, Plus, Trash2, Link as LinkIcon, RefreshCw, Zap, Palette, Bold, Italic, Underline, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple Markdown Parser for Bio
const MarkdownBio = ({ content }: { content: string }) => {
  if (!content) return null;
  
  // Quick and dirty parser for: **bold**, *italic*, __underline__, ||spoiler||, `code`, [link](url)
  // Note: For a production app, use 'react-markdown' or similar. 
  // But user asked for specific "semi markdown".
  
  const parse = (text: string) => {
    let parts = [];
    let lastIndex = 0;
    
    // Regex for all supported types
    // Order matters! Code > Spoiler > Bold > Italic > Underline > Link
    const regex = /(\*\*(.*?)\*\*)|(\*(.*?)\*)|(__((?:[^_]|_[^_])*)__)|(\|\|(.*?)\|\|)|(`(.*?)`)|(\[(.*?)\]\((.*?)\))|\n/g;
    
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={lastIndex}>{text.substring(lastIndex, match.index)}</span>);
      }
      
      const [full, bold, boldTxt, italic, italicTxt, underline, underlineTxt, spoiler, spoilerTxt, code, codeTxt, link, linkTxt, linkUrl] = match;
      const key = match.index;

      if (bold) parts.push(<strong key={key} className="font-bold text-white">{boldTxt}</strong>);
      else if (italic) parts.push(<em key={key} className="italic text-zinc-300">{italicTxt}</em>);
      else if (underline) parts.push(<u key={key} className="underline decoration-zinc-500 underline-offset-2">{underlineTxt}</u>);
      else if (spoiler) parts.push(
        <span key={key} className="bg-zinc-800 text-transparent hover:text-white rounded px-1 transition-colors cursor-pointer select-none">
          {spoilerTxt}
        </span>
      );
      else if (code) parts.push(<code key={key} className="bg-zinc-800 text-electric rounded px-1 font-mono text-xs py-0.5">{codeTxt}</code>);
      else if (link) parts.push(
        <a key={key} href={linkUrl} target="_blank" rel="noopener noreferrer" className="text-electric hover:underline hover:text-electric-hover">
          {linkTxt}
        </a>
      );
      else if (match[0] === '\n') parts.push(<br key={key} />);
      
      lastIndex = regex.lastIndex;
    }
    
    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.substring(lastIndex)}</span>);
    }
    
    return parts;
  };

  return <div className="text-sm text-zinc-400 whitespace-pre-wrap leading-relaxed">{parse(content)}</div>;
};

export default function IdentityPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  // Form State
  const [theme, setTheme] = useState('dark');
  const [links, setLinks] = useState<any[]>([]);
  
  // New Link State
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkLabel, setNewLinkLabel] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/identity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, socials: links }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to save');
        setSaving(false);
        return;
      }

      const updated = await res.json();
      setProfile(updated);
      alert('Identity Saved');
    } catch (error) {
      alert('Error saving identity');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-electric w-8 h-8" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-jua text-5xl mb-3 text-white">Identity</h1>
          <p className="text-zinc-400 font-heading text-lg">Manage your digital presence. Synced with Discord.</p>
        </div>
        <button 
          onClick={fetchProfile} 
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-zinc-700 transition-all font-mono text-sm uppercase tracking-wider"
        >
          <RefreshCw className="w-4 h-4" /> Sync Disord
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Editor Column */}
        <div className="lg:col-span-7 space-y-8">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Identity Card (Read Only) */}
            <section className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-6">
               <h3 className="text-xl font-jua text-white flex items-center gap-2">
                 <Zap className="w-5 h-5 text-electric" /> Core Identity
               </h3>
               
               <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Handle</label>
                    <div className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-300 font-mono flex items-center justify-between group cursor-help relative">
                      <span>@{profile?.handle || '...'}</span>
                      <ShieldAlert className="w-4 h-4 text-zinc-600 group-hover:text-electric transition-colors" />
                      
                      {/* Hint Tooltip */}
                      <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-black border border-white/10 rounded-lg shadow-xl text-xs text-zinc-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                        Username is locked to your Discord handle. Change it on Discord to update.
                      </div>
                    </div>
                    <p className="mt-1.5 text-[10px] text-zinc-500 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Synced with Discord
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Display Name</label>
                    <div className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-300 font-heading">
                      {profile?.displayName || session?.user?.name}
                    </div>
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Bio</label>
                  <div className="px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-zinc-400 font-body text-sm min-h-[5rem]">
                    {profile?.bio ? <MarkdownBio content={profile.bio} /> : 'No bio synced from Discord.'}
                  </div>
               </div>
            </section>

            {/* Links Manager */}
            <section className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-6">
               <h3 className="text-xl font-jua text-white flex items-center gap-2">
                 <LinkIcon className="w-5 h-5 text-purple-500" /> Links
               </h3>
               
               <div className="space-y-3">
                 <AnimatePresence>
                   {links.map((link, i) => (
                     <motion.div 
                        key={i} 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-3 p-3 bg-zinc-900/50 border border-white/5 rounded-xl group"
                     >
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                          <LinkIcon className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                           <div className="font-heading font-medium text-white truncate">{link.platform}</div>
                           <div className="font-mono text-xs text-zinc-500 truncate">{link.url}</div>
                        </div>
                        <button 
                          type="button"
                          onClick={() => handleRemoveLink(i)} 
                          className="p-2 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                     </motion.div>
                   ))}
                 </AnimatePresence>
               </div>

               <div className="flex flex-col md:flex-row gap-3 pt-3 border-t border-white/5">
                 <input 
                   type="text" 
                   placeholder="Label (e.g. Website)" 
                   value={newLinkLabel}
                   onChange={e => setNewLinkLabel(e.target.value)}
                   className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-electric transition-colors"
                 />
                 <input 
                   type="text" 
                   placeholder="URL (https://...)" 
                   value={newLinkUrl}
                   onChange={e => setNewLinkUrl(e.target.value)}
                   className="flex-[2] bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-electric transition-colors"
                 />
                 <button 
                   type="button" 
                   onClick={handleAddLink}
                   disabled={!newLinkLabel || !newLinkUrl}
                   className="bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white p-3 rounded-xl transition-colors"
                 >
                   <Plus className="w-5 h-5" />
                 </button>
               </div>
            </section>

            {/* Theme */}
            <section className="bg-black/40 border border-white/5 p-6 rounded-3xl space-y-6">
               <h3 className="text-xl font-jua text-white flex items-center gap-2">
                 <Palette className="w-5 h-5 text-pink-500" /> Theme
               </h3>
               <div className="grid grid-cols-3 gap-4">
                  {['dark', 'electric', 'void'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`p-4 rounded-xl border-2 transition-all capitalize font-heading font-medium text-center ${
                        theme === t 
                          ? 'border-electric bg-electric/10 text-white' 
                          : 'border-white/5 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
               </div>
            </section>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-5 bg-electric hover:bg-electric-hover text-white rounded-2xl font-jua uppercase tracking-widest text-xl transition-all shadow-xl shadow-electric/10 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {saving ? <Loader2 className="animate-spin" /> : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Preview Column */}
        <div className="lg:col-span-5 relative z-30">
           <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                 <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Live Preview</label>
                 <div className="px-2 py-1 bg-electric/20 text-electric text-[10px] font-mono rounded uppercase">
                   dscrd.wtf/@{profile?.handle || 'user'}
                 </div>
              </div>

              {/* Card Mockup */}
              <div className={`relative w-full aspect-[3/4.5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-colors duration-500 ${
                 theme === 'electric' ? 'bg-[#001025]' : 
                 theme === 'void' ? 'bg-black' : 
                 'bg-[#09090b]'
              }`}>
                 {/* Banner */}
                 <div className={`h-1/3 w-full relative overflow-hidden`}>
                    {profile?.banner ? (
                       <img src={profile.banner} alt="Banner" className="w-full h-full object-cover" />
                    ) : (
                       <div className={`w-full h-full bg-gradient-to-br ${
                         theme === 'electric' ? 'from-electric to-cyan-500' : 'from-zinc-800 to-zinc-900'
                       }`}>
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                       </div>
                    )}
                 </div>

                 {/* Avatar */}
                 <div className="absolute top-[25%] left-6 w-24 h-24 rounded-full border-[6px] border-[#09090b] bg-zinc-800 overflow-hidden shadow-xl">
                    {profile?.image ? (
                      <img src={profile.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                        <Zap className="text-zinc-500" />
                      </div>
                    )}
                 </div>

                 <div className="pt-16 px-6 pb-6">
                    <h2 className="font-jua text-3xl text-white flex items-center gap-2">
                       {profile?.displayName || session?.user?.name || 'User'}
                    </h2>
                    <p className="font-mono text-electric text-sm mb-4 opacity-80">@{profile?.handle || 'username'}</p>
                    
                    <div className="text-zinc-400 font-heading text-sm leading-relaxed mb-6 line-clamp-4">
                       {profile?.bio ? <MarkdownBio content={profile.bio} /> : 'No bio yet.'}
                    </div>

                    <div className="space-y-2">
                       {links.length > 0 ? links.map((link, i) => (
                         <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                             <img src={`https://www.google.com/s2/favicons?domain=${link.url}&sz=32`} alt="icon" className="w-4 h-4 opacity-70" onError={(e) => (e.currentTarget.src = '')} />
                           </div>
                           <span className="font-heading font-medium text-white text-sm">{link.platform}</span>
                         </div>
                       )) : (
                         <>
                           <div className="h-10 w-full rounded-xl bg-white/5 animate-pulse" />
                           <div className="h-10 w-3/4 rounded-xl bg-white/5 animate-pulse" />
                         </>
                       )}
                    </div>
                 </div>

                 {/* Footer Branding */}
                 <div className="absolute bottom-6 left-0 right-0 text-center">
                    <div className="inline-flex items-center gap-2 opacity-30 grayscale hover:grayscale-0 transition-all cursor-pointer">
                       <img src="/dscrd-logo-icon.png" className="w-4 h-4" />
                       <span className="font-jua text-xs text-white">dscrd.wtf</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
