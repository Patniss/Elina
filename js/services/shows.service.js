import { supabase } from "/Elina/js/core/supabase.js";

export async function searchShows(query) {
    const { data, error } = await supabase
        .from("shows")
        .select("id, title")
        .ilike("title", `%${query}%`)
        .order("title", { ascending: true })
        .limit(5);
    
    if (error) {
        console.error(error);
        return;
    }

    return data;
}