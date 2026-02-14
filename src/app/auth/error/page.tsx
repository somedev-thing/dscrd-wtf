'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { Suspense } from 'react'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="max-w-md w-full bg-[#0e0e0e] border border-red-900/50 rounded-3xl p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-red-500/5 ptr-events-none"></div>
      
      <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
        <i className="lni lni-warning text-3xl"></i>
      </div>

      <h1 className="text-2xl font-bold text-white mb-2 font-sans">Authentication Error</h1>
      
      <div className="bg-black/50 rounded-xl p-4 mb-6 border border-white/5">
        <code className="text-red-400 font-mono text-sm break-all">
          {error || "Unknown Error"}
        </code>
      </div>

      <p className="text-gray-400 mb-8 font-body text-sm">
        Something went wrong while trying to sign you in. 
        It might be a database issue or a configuration mismatch.
      </p>

      <Link href="/" className="block w-full py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors font-sans">
        Return Home
      </Link>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <Suspense fallback={<div className="text-white">Loading...</div>}>
         <ErrorContent />
      </Suspense>
    </main>
  )
}
