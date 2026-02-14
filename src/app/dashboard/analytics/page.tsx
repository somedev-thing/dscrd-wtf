import { ensureProfile } from "@/lib/actions"


export default async function AnalyticsPage() {
  const profile = await ensureProfile()
  
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">Analytics</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Deep dive into your traffic sources.</p>

        <div className="bg-[#0a0a0a] border border-[#222] p-12 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center mb-6">
                <i className="lni lni-bar-chart-2 text-electric text-3xl"></i>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Detailed Analytics Coming Soon</h2>
            <p className="text-gray-500 max-w-md">
                We are building a powerful analytics engine to track referrers, geography, and device types.
            </p>
        </div>
    </div>
  )
}
