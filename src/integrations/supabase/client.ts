// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yuecjlxdznlhsejjdfhy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1ZWNqbHhkem5saHNlampkZmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODcxMDIsImV4cCI6MjA2MDk2MzEwMn0.Q1Z5BWT6AAjxIL4dwc17PAfMCws512GgegHPuclXSoc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);