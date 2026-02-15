'use client';

import { useState } from 'react';
import { Search, XCircle, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientSearch({ reservedNames }: { reservedNames: Record<string, string> }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ status: 'available' | 'reserved' | 'invalid', reason?: string } | null>(null);

  const checkName = (value: string) => {
    const clean = value.toLowerCase().trim();
    setQuery(clean);

    if (!clean) {
        setResult(null);
        return;
    }
    
    if (clean.length < 2) {
        setResult({ status: 'invalid', reason: 'Too short' });
        return;
    }

    if (reservedNames[clean]) {
        setResult({ status: 'reserved', reason: reservedNames[clean] });
    } else {
        setResult({ status: 'available' });
    }
  };

  return (
    <div className="space-y-6">
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input 
                type="text" 
                placeholder="Check a handle (e.g. 'api', 'mee6')..." 
                value={query}
                onChange={(e) => checkName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-electric transition-colors font-mono"
            />
        </div>

        <AnimatePresence mode="wait">
            {result && (
                <motion.div 
                    key={result.status}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-6 rounded-xl border ${
                        result.status === 'reserved' ? 'bg-red-500/10 border-red-500/20' :
                        result.status === 'available' ? 'bg-green-500/10 border-green-500/20' :
                        'bg-zinc-800/50 border-white/5'
                    }`}
                >
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${
                             result.status === 'reserved' ? 'bg-red-500/20 text-red-500' :
                             result.status === 'available' ? 'bg-green-500/20 text-green-500' :
                             'bg-zinc-700 text-zinc-400'
                        }`}>
                            {result.status === 'reserved' ? <ShieldAlert className="w-6 h-6" /> :
                             result.status === 'available' ? <CheckCircle2 className="w-6 h-6" /> :
                             <XCircle className="w-6 h-6" />}
                        </div>
                        <div>
                            <h4 className={`text-lg font-bold mb-1 ${
                                result.status === 'reserved' ? 'text-red-400' :
                                result.status === 'available' ? 'text-green-400' :
                                'text-zinc-300'
                            }`}>
                                {result.status === 'reserved' ? `Reserved: ${query}` :
                                 result.status === 'available' ? `Available: ${query}` :
                                 'Invalid Handle'}
                            </h4>
                            <p className="text-zinc-400 text-sm">
                                {result.status === 'reserved' ? (
                                    <>
                                        Category: <span className="text-white font-medium">{result.reason}</span>. 
                                        <br/>This name cannot be registered. If you own this brand, please open a support ticket.
                                    </>
                                ) : result.status === 'available' ? (
                                    "This handle appears to be free! (Subject to final validation during registration)."
                                ) : (
                                    result.reason
                                )}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  );
}
