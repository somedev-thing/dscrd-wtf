import { supabase } from "@/lib/supabase"

export default async function ServerOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Might fetch analytics here later
  
  return (
    <div className="p-6 lg:p-10">
        <h2 className="text-xl font-bold text-white mb-6">Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-mono mb-1">TOTAL VIEWS</div>
                <div className="text-3xl font-bold text-white">0</div>
            </div>
            <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-mono mb-1">MEMBERS JOINED</div>
                <div className="text-3xl font-bold text-white">0</div>
            </div>
             <div className="bg-[#0a0a0a] border border-[#222] p-6 rounded-xl">
                <div className="text-gray-500 text-sm font-mono mb-1">PAGES</div>
                <div className="text-3xl font-bold text-white">1</div>
            </div>
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl">
            <h3 className="text-blue-400 font-bold mb-2">Setup Checklist</h3>
            <ul className="list-disc list-inside text-sm text-gray-400 space-y-2">
                <li className="line-through text-gray-600">Create Server</li>
                <li>Add an Icon and Banner (Go to Design)</li>
                <li>Write a Description</li>
                <li>Create Rules Page</li>
            </ul>
        </div>
    </div>
  )
}
