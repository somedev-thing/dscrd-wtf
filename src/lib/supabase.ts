import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Use this for Server Components and Server Actions (Admin access)
export const supabase = createClient(supabaseUrl, supabaseKey)
