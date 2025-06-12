import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lhkphzwvcfmbuqffzgza.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxoa3Boend2Y2ZtYnVxZmZ6Z3phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mjg3MDIsImV4cCI6MjA2NTMwNDcwMn0.p31o7RjYC-Wf6b2hcM6XVcvdWbJF4H8IO1gAm9tpQ84";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
