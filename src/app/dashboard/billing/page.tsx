import { CreditCardIcon } from "hugeicons-react"

export default function BillingPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold font-heading text-white mb-2">Billing</h1>
                <p className="text-gray-400 font-mono text-sm">Manage your Verified status and server subscriptions.</p>
            </div>

            {/* Current Plan */}
            <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-electric/5 rounded-full blur-3xl" />
                <div className="relative z-10">
                    <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Current Plan</div>
                    <h2 className="text-3xl font-bold text-white mb-2">Free · Lurker</h2>
                    <p className="text-gray-400 text-sm mb-6">Basic profile and server pages. Upgrade for custom themes, analytics, and more.</p>
                    
                    <button disabled className="bg-electric/20 text-electric border border-electric/30 px-6 py-3 rounded-xl font-bold cursor-not-allowed flex items-center gap-2">
                        <CreditCardIcon size={20} />
                        Upgrade Coming Soon
                    </button>
                </div>
            </div>

            {/* Plan Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-white mb-1">🫥 Lurker</h3>
                    <div className="text-2xl font-bold text-white mb-4">Free</div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>✓ Public profile page</li>
                        <li>✓ 3 social links</li>
                        <li>✓ 1 server page</li>
                        <li>✓ Basic themes</li>
                        <li className="text-gray-600">✗ Custom domains</li>
                        <li className="text-gray-600">✗ Analytics</li>
                    </ul>
                </div>
                <div className="glass-card p-6 rounded-2xl border border-electric/20 relative">
                    <div className="absolute top-4 right-4 text-[10px] font-mono text-electric bg-electric/10 border border-electric/20 px-2 py-1 rounded-full">SOON</div>
                    <h3 className="text-lg font-bold text-white mb-1">⚡ Verified</h3>
                    <div className="text-2xl font-bold text-white mb-4">$4.99<span className="text-sm text-gray-500">/mo</span></div>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>✓ Everything in Lurker</li>
                        <li>✓ Unlimited links</li>
                        <li>✓ Unlimited server pages</li>
                        <li>✓ Custom themes & CSS</li>
                        <li>✓ Custom subdomains</li>
                        <li>✓ Full analytics</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
