import { supabase } from "/Elina/js/core/supabase.js";

export async function addSeason(nbSeason, showId, nbEpisodes) {
    const { data, error } = await supabase
        .from("seasons")
        .insert([{
            season: nbSeason,
            show_id: showId,
            nb_episodes: nbEpisodes
        }]).single();

    if (error) {
        console.error("Erreur lors de l'ajout d'une saison :", error);
        return;
    }
}

export async function getNbEpisode(seasonId) {
    const { data, error } = await supabase
        .from("seasons")
        .select("nb_episodes")
        .eq("id", seasonId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return data.nb_episodes;
}

export async function getNbSeason(seasonId) {
    const { data, error } = await supabase
        .from("seasons")
        .select("season")
        .eq("id", seasonId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return data.season;
}

export async function getSeasonId(showId, nbSeason) {
    const { data, error } = await supabase
        .from("seasons")
        .select("id")
        .eq("show_id", showId)
        .eq("season", nbSeason)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return data.id;
}

export async function getSeasonsOfShow(showId) {
    const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("show_id", showId)
        .order("season", { ascending: true });
    
    if (error) {
        console.error(error);
        return;
    }

    return data?.map(season => season.id) || [];
}

export async function getTotalSeasons(showId) {
    const { count, error } = await supabase
        .from("seasons")
        .select("season", { count: "exact", head: true })
        .eq("show_id", showId);

    if (error) {
        console.error(error);
        return;
    }

    return count;
}