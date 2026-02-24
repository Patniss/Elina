import { supabase } from "/Elina/js/core/supabase.js";

export async function searchMovies(query) {
    return await supabase
        .from("movies")
        .select("id, title, year")
        .ilike("title", '%{query}%')
        .order("title", { ascending: true })
        .limit(5);
}

export async function fetchUserMovie(uuid, userId) {
    
}