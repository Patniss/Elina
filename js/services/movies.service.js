import { supabase } from "/Elina/js/core/supabase.js";

export async function searchMovies(query) {
    return await supabase
        .from("movies")
        .select("id, title, year")
        .ilike("title", '%{query}%')
        .order("title", { ascending: true })
        .limit(5);
}

export async function getMovie(uuid) {
    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("id", uuid)
        .single()

    if (error) {
        console.error(error);
        return [];
    }

    return data || [];
}