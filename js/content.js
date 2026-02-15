import { supabase } from "/Elina/js/supabase.js";

export async function movieContent(uuid) {
    const { data:movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    const movieTitle = document.getElementById("movie-title");

    movieTitle.textContent = movie.title;

    const casting = await supabase
    .from("movies_casting")
    .select("*")
    .eq("movie_id", uuid)

}