import { supabase } from "/Elina/js/core/supabase.js";
import { getMovie } from "/Elina/js/services/movies.service.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function getProfilesData() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("profiles_data")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function majMoviesSeen(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfilesData();
    const moviesSeen = dataProfile.movies_seen;
    const newNb = parseInt(moviesSeen) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"movies_seen": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return
    }
}

export async function majMoviesTosee(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfilesData();
    const moviesTosee = dataProfile.movies_tosee;
    const newNb = parseInt(moviesTosee) + nb;

    console.log(userId);

    const { error } = await supabase
        .from("profiles_data")
        .update({"movies_tosee": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return
    }
}

export async function majTimeMoviesSeen(movieId) {
    const userId = await getUserId();

    const dataProfile = await getProfilesData();
    const timeMoviesSeen = dataProfile.time_movies_seen;

    const dataMovie = await getMovie(movieId);
    const movieTime = dataMovie.time;

    const newTime = parseInt(timeMoviesSeen) + parseInt(movieTime);

    const { error } = await supabase
        .from("profiles_data")
        .update({"time_movies_seen": newTime})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return
    }
}