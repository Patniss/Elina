import { getUserId } from "/Elina/js/services/profiles.service.js";
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
    
    const { data, error } = await supabase
        .from("users_movies")
        .insert([{
            user_id: userId,
            movie_id: movieId,
            seen: false,
            date_seen: new Date().toISOString()
        }]).select();

    if (error) {
        console.log(error);
        return;
    }
}

export async function removeUserMovie(userId, movieId) {
    const { data, error } = await supabase
        .from("users_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateSeenUserMovie(userId, movieId, seenState) {
    const { data, error } = await supabase
        .from("users_movies")
        .update({seen: seenState})
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    if (error) {
        console.log(error);
        return;
    }
}

export async function updateDateSeenMovie(movieId, dateSeen) {
    const userId = await getUserId()

    const { data, error } = await supabase
        .from("users_movies")
        .update({date_seen: dateSeen})
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    if (error) {
        console.log(error);
        return;
    }
}