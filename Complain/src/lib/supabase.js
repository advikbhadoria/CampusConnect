import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://zfsliystnmioxpvytbfy.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9i0iI_YPf9ZvBqiWpO2Ejw_2z0GHVvA';

let client = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.warn('Supabase client init exception, falling back to mock:', err);
}

export const supabase = client;
export default supabase;
