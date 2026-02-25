import { supabase } from "/Elina/js/core/supabase.js";
import { handleButtonState } from "/Elina/js/ui/button.js";

export async function searchMovies(query) {
    const { data, error } = await supabase
        .from("movies")
        .select("id, title, year")
        .ilike("title", `%${query}%`)
        .order("title", { ascending: true })
        .limit(5);
    
    if (error) {
        console.error(error);
        return;
    }

    return data;
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

export async function addMovie(button) {
    const { data, error } = await supabase
        .from("movies")
        .insert([{
            title: movieTitle,
            year: movieYear, 
            complete: movieComplete, 
            genres: movieGenres, 
            poster: moviePoster, 
            time: movieTime, 
            synopsis: movieSynopsis 
        }]);
    
    if (error) {
        console.error(error);
        handleButtonState(button, "error");
        return;
    }
}