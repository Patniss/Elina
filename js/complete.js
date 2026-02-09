import { supabase } from "/Elina/js/supabase.js";

export async function completeMovie(uuid) {
    const movie = await supabase
    .from("movies")
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    const movieTitle = document.getElementById("movie-title");
    const yearMovie = document.getElementById("movie-year");

    movieTitle.textContent = movie.title;
    yearMovie.textContent = movie.year;
}