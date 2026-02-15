"use client"

import { useState } from "react"
import { 
  InstagramIcon, 
  TwitterIcon, 
  GithubIcon, 
  YoutubeIcon, 
  TwitchIcon, 
  Linkedin01Icon, 
  Globe02Icon, 
  Link01Icon, 
  SpotifyIcon,
  DiscordIcon,
  TiktokIcon,
  Search01Icon,
  Cancel01Icon
} from "hugeicons-react"

const ICONS = [
  { name: "Instagram", value: "instagram", icon: InstagramIcon },
  { name: "Twitter/X", value: "twitter", icon: TwitterIcon },
  { name: "GitHub", value: "github", icon: GithubIcon },
  { name: "YouTube", value: "youtube", icon: YoutubeIcon },
  { name: "Twitch", value: "twitch", icon: TwitchIcon },
  { name: "LinkedIn", value: "linkedin", icon: Linkedin01Icon },
  { name: "Website", value: "website", icon: Globe02Icon },
  { name: "Link", value: "link", icon: Link01Icon },
  { name: "Spotify", value: "spotify", icon: SpotifyIcon },
  { name: "Discord", value: "discord", icon: DiscordIcon },
  { name: "TikTok", value: "tiktok", icon: TiktokIcon },
]

interface IconPickerProps {
  value: string
  onChange: (value: string) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")

  const selected = ICONS.find(i => i.value === value) || ICONS.find(i => i.value === 'link')
  const SelectedIcon = selected?.icon || Link01Icon

  const filtered = ICONS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="relative">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <SelectedIcon size={24} className="text-white" />
      </button>

      {isOpen && (
        <div className="absolute top-14 left-0 z-50 w-64 bg-[#111] border border-white/10 rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200">
           {/* Header */}
           <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1">
                <Search01Icon size={16} className="absolute left-3 top-2.5 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search icons..." 
                  className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-electric"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                <Cancel01Icon size={18} />
              </button>
           </div>

           {/* Grid */}
           <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar">
              {filtered.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                        onChange(item.value)
                        setIsOpen(false)
                    }}
                    className={`p-2 rounded-lg flex items-center justify-center transition-colors ${value === item.value ? 'bg-electric text-white' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
                    title={item.name}
                  >
                    <Icon size={20} />
                  </button>
                )
              })}
           </div>
        </div>
      )}
      
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  )
}
