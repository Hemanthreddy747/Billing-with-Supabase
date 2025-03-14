import { createClient } from "@supabase/supabase-js";
import appConfig from "./src/config/appConfig";

const { url: supabaseUrl, anonKey: supabaseAnonKey } = appConfig.services.supabase;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
