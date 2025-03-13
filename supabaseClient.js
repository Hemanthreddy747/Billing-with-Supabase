import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ckwawleazhqdnzctjuag.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrd2F3bGVhemhxZG56Y3RqdWFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzEzNTEsImV4cCI6MjA1NzQ0NzM1MX0.C8FzGGx1d8cD8cRtxDcEqfYdH42qv7BJxYb3G_-OEZA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
