import { supabase } from "/Elina/js/supabase.js";

export async function movieContent(uuid) {
    supabase
    .from("movies")
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }
  
}