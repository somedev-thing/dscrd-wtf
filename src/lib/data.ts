import { supabase } from "@/lib/supabase"

export async function getLinksByUserId(userId: string) {
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', userId)
    .order('position', { ascending: true })
  
  return links
}
