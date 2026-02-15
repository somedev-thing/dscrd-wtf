'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loader2, Save, AtSign, Palette, Layout, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function IdentityPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  
  // Form State
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    fetch('/api/identity')
      .then(res => {
        if (res.ok) return res.json();
        if (res.status === 404) return null;
        throw new Error('Failed to fetch');
      })
      .then(data => {
        if (data) {
          setProfile(data);
          setHandle(data.handle || '');
          setBio(data.bio || '');
          setTheme(data.theme || 'dark');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/identity', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, bio, theme }),
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
    return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-electric" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="font-jua text-4xl mb-2">My Identity</h1>
        <p className="text-zinc-400 font-heading">Manage your public profile and presence.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500">Handle</label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
              <input 
                type="text" 
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="username"
                className="w-full bg-surface-card border border-surface-border focus:border-electric rounded-xl py-4 pl-12 pr-4 font-mono text-lg text-white outline-none transition-colors"
                required
              />
            </div>
            <p className="text-xs text-zinc-500">Public URL: dscrd.wtf/@{handle || 'username'}</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500">Bio</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the world who you are..."
              className="w-full h-32 bg-surface-card border border-surface-border focus:border-electric rounded-xl p-4 font-body text-white outline-none transition-colors resize-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500">Theme</label>
            <div className="grid grid-cols-3 gap-4">
              {['dark', 'electric', 'void'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`p-4 rounded-xl border-2 transition-all capitalize font-heading font-medium ${
                    theme === t 
                      ? 'border-electric bg-electric/10 text-white' 
                      : 'border-surface-border bg-surface-card text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-4 bg-electric hover:bg-electric-hover text-white rounded-xl font-heading font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-electric/20 disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            Save Identity
          </button>

        </form>

        {/* Preview */}
        <div className="relative">
           <div className="lg:sticky lg:top-24">
              <label className="block text-sm font-bold uppercase tracking-wider text-zinc-500 mb-4">Preview</label>
              
              {/* Profile Card Mock */}
              <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl transition-colors duration-500 ${
                theme === 'electric' ? 'bg-[#001025]' : 
                theme === 'void' ? 'bg-black' : 
                'bg-[#09090b]'
              }`}>
                 {/* Banner */}
                 <div className={`h-1/3 w-full bg-gradient-to-br ${
                   theme === 'electric' ? 'from-electric to-cyan-500' : 
                   theme === 'void' ? 'from-zinc-900 to-black' : 
                   'from-zinc-800 to-zinc-900'
                 } relative`}>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                 </div>

                 {/* Avatar */}
                 <div className="absolute top-[25%] left-6 w-24 h-24 rounded-full border-4 border-black bg-zinc-800 overflow-hidden">
                    {session?.user?.image ? (
                      <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                        <Zap className="text-zinc-500" />
                      </div>
                    )}
                 </div>

                 <div className="pt-16 px-6 pb-6">
                    <h2 className="font-jua text-3xl text-white">{session?.user?.name || 'User'}</h2>
                    <p className="font-mono text-electric text-sm mb-4">@{handle || 'username'}</p>
                    
                    <p className="text-zinc-400 font-body text-sm leading-relaxed mb-6">
                      {bio || 'No bio yet.'}
                    </p>

                    <div className="grid gap-3">
                       <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-white/10" />
                         <div className="h-2 w-24 bg-white/10 rounded" />
                       </div>
                       <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
                         <div className="w-8 h-8 rounded bg-white/10" />
                         <div className="h-2 w-32 bg-white/10 rounded" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
