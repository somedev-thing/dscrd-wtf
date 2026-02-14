import { ensureProfile } from "@/lib/actions"

export default async function SettingsPage() {
  const profile = await ensureProfile()
  
  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold font-heading text-white mb-2">Settings</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">Manage account preferences.</p>

        <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-4">Danger Zone</h2>
            <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button disabled className="bg-red-500/10 text-red-500 border border-red-500/50 px-4 py-2 rounded-lg text-sm font-bold opacity-50 cursor-not-allowed">
                Delete Account (Coming Soon)
            </button>
        </div>
    </div>
  )
}
