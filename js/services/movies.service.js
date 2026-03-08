import { supabase } from "/Elina/js/core/supabase.js";
import { handleButtonState } from "/Elina/js/ui/button.js";

export async function addMovie(button, movieTitle, movieYear, movieGenres, moviePoster, movieTime, movieSynopsis) {
    const { data, error } = await supabase
        .from("movies")
        .insert([{
            title: movieTitle,
            year: movieYear, 
            complete: false, 
            genres: movieGenres, 
            poster: moviePoster, 
            time: movieTime, 
            synopsis: movieSynopsis 
        }]).select("*");
    
    if (error) {
        console.error(error);
        handleButtonState(button, "error");
        return;
    }

    return data.id;
}

export async function fethAllMovies() {
    const { data, error } = await supabase
        .from("movies")
        .select(`*, users_movies(*)`);
    
    if (error) {
        console.error(error);
        return;
    }

    return data;
}

export async function getAllIncompleteMovies() {
    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .eq("complete", false)
        .order("title", { ascending: true });
    
    if (error) {
        console.log(error);
        return;
    }

    return data;
}

export async function getAllMovies() {
    const { data, error } = await supabase
        .from("movies")
        .select("*");
    
    if (error) {
        console.log(error);
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

export async function movieComplete(uuid) {
    const { data, error } = await supabase
        .from("movies")
        .update([{ complete: true }])
        .eq("id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

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