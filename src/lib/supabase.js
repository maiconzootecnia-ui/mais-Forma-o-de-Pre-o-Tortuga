import { createClient } from '@supabase/supabase-js'

// Credenciais do projeto (podem ser sobrescritas por env vars no build)
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://zyxnnzqcazdbcwwlxkfl.supabase.co'

const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_KEY ||
  'sb_publishable_dF-PvNX8IDhF2TC9YEX32A__g-oI450'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
})
