'use client'

import { trackClick } from "@/lib/actions"
import { LinkSimple } from "@phosphor-icons/react"

export default function TrackedLink({ id, url, title, className, theme }: { id: string, url: string, title: string, className?: string, theme?: any }) {
    return (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackClick(id)}
            className={`flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group ${className}`}
        >
            <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{title}</span>
            <LinkSimple size={18} className="text-gray-500 group-hover:text-white transition-colors" />
        </a>
    )
}
