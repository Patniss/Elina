import { supabase } from "/Elina/js/core/supabase.js";

export async function getUserMovie(userId, movieId) {
    const { data, error } = await supabase
        .from("users_movies")
        .select("*")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return;
    }

    return data;
}

export async function addUserMovie(userId, movieId) {
    console.log("supabase instance:", supabase);
    console.log("supabase url:", supabase?.supabaseUrl);
    
    const { data, error } = await supabase
        .from("users_movies")
        .insert([{
            user_id: userId,
            movie_id: movieId,
            seen: false,
            date_seen: new Date().toISOString()
        }]).select();

    return { data, error };
}

export async function removeUserMovie(userId, movieId) {
    const { data, error } = await supabase
        .from("users_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();
    
    return { data, error };
}

export async function updateSeenUserMovie(userId, movieId, seenState) {
    const { data, error } = await supabase
        .from("users_movies")
        .update({seen: seenState})
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    return { data, error };
}