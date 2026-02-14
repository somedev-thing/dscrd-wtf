'use client'

import { trackClick } from "@/lib/actions"


interface TrackedLinkProps {
    link: {
        id: string
        url: string
        title: string
        icon?: string
    }
    theme: {
        color: string
        mode: string
    }
}

export default function TrackedLink({ link, theme }: TrackedLinkProps) {
  const handleClick = () => {
      // Fire and forget
      trackClick(link.id)
  }

  return (
    <a 
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="group relative overflow-hidden rounded-xl p-4 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-between"
        style={{ 
            backgroundColor: theme.mode === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            border: '1px solid',
            borderColor: theme.mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'
        }}
    >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" 
                style={{ backgroundColor: theme.color }}></div>
        
        <div className="flex items-center gap-3 relative z-10 w-full">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 shrink-0">
                <i className="lni lni-link-2"></i>
            </div>
            <span className="font-medium truncate">{link.title}</span>
        </div>
    </a>
  )
}
