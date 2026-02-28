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

export async function addUserMovie(movieId) {
    const userId = await getUserId();

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

export async function removeUserMovie(movieId) {
    const userId = await getUserId();

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

export async function updateSeenUserMovie(movieId, seenState) {
    const userId = await getUserId();
    
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

export async function updateDateSeenMovie(uuid, date_seen) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .update({date_seen: date_seen})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}

export async function updateFavMovie(uuid, fav) {
    const userId = await getUserId();
    
    const { data, error } = await supabase
        .from("users_movies")
        .update({fav: fav})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}

export async function updateOwnPoster(uuid, link) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .update({own_poster: own_poster})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}