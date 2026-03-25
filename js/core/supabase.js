import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://clffgsknhzqlywvcimcj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZmZnc2tuaHpxbHl3dmNpbWNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODU3MTIsImV4cCI6MjA4NDU2MTcxMn0.4AP0akVP_KSOvV6YIJFMLMCFYcE0Q7hvt8tJwivtOpc";

export const supabase = createClient(supabaseUrl, supabaseKey);