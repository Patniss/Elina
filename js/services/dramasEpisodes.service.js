import { supabase } from "/Elina/js/core/supabase.js";

export async function addDramaEpisode(nbEpisode, idDrama, timeEpisode) {
    const { data, error } = await supabase
        .from("dramas_episodes")
        .insert([{
            episode: nbEpisode,
            drama_id: idDrama,
            time: timeEpisode
        }]).single.select("id");

    if (error) {
        console.error(error);
        return null;
    }

    return data.id;
}