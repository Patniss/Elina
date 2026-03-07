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

export async function getNbEpisode(showId, nbSeason) {
    const idSeason = await getSeasonId(showId, nbSeason);

    const { data, error } = await supabase
        .from("seasons")
        .select("nb_episodes")
        .eq("id", idSeason)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return data.nb_episodes;
}

export async function getSeasonId(showId, nbSeason) {
    console.log(nbSeason, typeof nbSeason);
    
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