import { supabase } from "/Elina/js/core/supabase.js";

export async function addingShow(title, genres, averageMin, state, nbSeasons, logo) {
    const { data, error } = await supabase
        .from("shows")
        .insert([{
            title: title,
            genres: genres,
            average_min: averageMin,
            state: state,
            complete: false,
            nb_seasons: nbSeasons,
            logo: logo,
            logo_large: null
        }]).select("id").single();
    
    if (error) {
        console.error("Erreur lors de l'ajout d'une série :", error);
        throw error;
    }

    return data;
}

export async function getShow(showId) {
    const { data, error } = await supabase
        .from("shows")
        .select("*")
        .eq("id", showId)
        .single();
    
    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getShowId(seasonId) {
    const { data, error } = await supabase
        .from("seasons")
        .select("show_id")
        .eq("id", seasonId)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data.show_id;
}

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