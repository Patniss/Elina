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