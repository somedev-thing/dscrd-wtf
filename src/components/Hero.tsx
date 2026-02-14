"use client"

import { useState } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

export default function Hero() {
  const [username, setUsername] = useState('')

  return (
    <header className="max-w-5xl mx-auto text-center mb-32 pt-24 px-6">
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#111] border border-white/10 text-xs font-mono text-gray-300 mb-8 hover:border-electric/50 transition-colors cursor-crosshair select-none active:scale-95 duration-200">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-electric"></span>
        </span>
        <span>Beta v0.1: Things might break.</span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9] font-sans">
        Stop sending <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 via-white to-gray-500">expired invites.</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10 font-body">
        The identity layer for Discord. Turn your User ID into a beautiful, permanent profile card. <br/>
        <span className="text-electric font-medium">No more dead links.</span>
      </p>

      {/* URL Builder Demo */}
      <div className="max-w-md mx-auto relative group">
        <div className="absolute inset-0 bg-electric blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full duration-500"></div>
        <div className="relative flex items-center bg-card border border-border rounded-full p-2 pl-6 shadow-2xl transition-all duration-300 group-hover:border-electric/50">
          <span className="text-gray-500 font-mono">dscrd.wtf/</span>
          <input 
            type="text" 
            placeholder="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-transparent border-none outline-none text-white font-mono placeholder-gray-700 w-full ml-1 focus:ring-0"
          />
          <button className="bg-electric text-white p-3 rounded-full hover:bg-white hover:text-black transition-colors shadow-lg shadow-electric/20">
            <ArrowRight size={20} weight="bold" />
          </button>
        </div>
      </div>
    </header>
  )
}
