import { supabase } from "/Elina/js/core/supabase.js";

export async function addDrama(title, genres, episodes, synopsis, poster, complete) {
    const { data, error } = await supabase
        .from("dramas")
        .insert([{
            title: title,
            genres: genres,
            episodes: episodes,
            synopsis: synopsis,
            complete: complete,
            poster: poster
        }]).single().select("id");

    if (error) {
        console.error(error);
        return null;
    }

    return data.id;
}