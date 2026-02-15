import { promises as fs } from 'fs';
import path from 'path';
import { Search, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import ClientSearch from './client-search';

async function getReservedNames() {
  const filePath = path.join(process.cwd(), 'public', 'reserved-names.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function ReservedNamesPage() {
  const data = await getReservedNames();
  
  // Flatten data for the client component
  const allReserved: Record<string, string> = {};
  
  if (data.reserved) {
      if (Array.isArray(data.reserved.system_critical)) {
          data.reserved.system_critical.forEach((name: string) => allReserved[name] = 'System Critical');
      }
      if (Array.isArray(data.reserved.top_bots)) {
          data.reserved.top_bots.forEach((name: string) => allReserved[name] = 'Top Bot (Reserved)');
      }
      if (Array.isArray(data.reserved.major_communities)) {
          data.reserved.major_communities.forEach((name: string) => allReserved[name] = 'Major Community');
      }
      if (Array.isArray(data.reserved.high_value_generics)) {
          data.reserved.high_value_generics.forEach((name: string) => allReserved[name] = 'High Value Generic');
      }
  }

  return (
    <div className="min-h-screen bg-void pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-jua text-white mb-4">Reserved Names</h1>
            <p className="text-zinc-400 max-w-xl mx-auto">
                {data.meta?.description || "Check if a handle is reserved to prevent impersonation."}
            </p>
        </div>

        <div className="bg-[#0d0d10] border border-white/10 rounded-3xl p-8 shadow-2xl">
            <ClientSearch reservedNames={allReserved} />
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-[#0d0d10] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold font-heading mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" /> Policy
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    {data.meta?.policy || "Reserved names connect be registered by standard users."}
                </p>
            </div>
            <div className="bg-[#0d0d10] border border-white/5 p-6 rounded-2xl">
                <h3 className="text-white font-bold font-heading mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Claiming
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    If you own the brand/bot associated with a reserved name, open a ticket in our Discord. 
                    You must verify ownership via the associated account.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
