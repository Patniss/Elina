import { supabase } from "/Elina/js/core/supabase.js";
import { getMovie } from "/Elina/js/services/movies.service.js";
import { getUserId, getSisterId } from "/Elina/js/services/profiles.service.js";
import { getShow } from "/Elina/js/services/shows.service.js";

export async function getProfileData() {
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

export async function getSisterData() {
    const sisterId = await getSisterId();

    const { data, error } = await supabase
        .from("profiles_data")
        .select("*")
        .es("user_id", sisterId)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function updateCurrentShows(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
    const currentShows = dataProfile.current_shows;
    const newNb = parseInt(currentShows) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"current_shows": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateEpisodesSeen(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
    const episodesSeen = dataProfile.episodes_seen;
    const newNb = parseInt(episodesSeen) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"episodes_seen": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateEpisodesTosee(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
    const episodesTosee = dataProfile.episodes_tosee;
    const nwNb = parseInt(episodesTosee) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"episodes_tosee": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateFinishedShows(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
    const finishedShows = dataProfile.finished_shows;
    const newNb = parseInt(finishedShows) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"finished_shows": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateMoviesSeen(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
    const moviesSeen = dataProfile.movies_seen;
    const newNb = parseInt(moviesSeen) + nb;

    const { error } = await supabase
        .from("profiles_data")
        .update({"movies_seen": newNb})
        .eq("user_id", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function updateMoviesTosee(nb) {
    if (!nb) nb = 1;
    const userId = await getUserId();
    const dataProfile = await getProfileData();
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

export async function updateTimeMoviesSeen(movieId) {
    const userId = await getUserId();

    const dataProfile = await getProfileData();
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

export async function updateTimeShowsSeen(showId, nbEp, add) {
    if (!nbEp) nbEp = 1;
    if (!add) add = true;
    const userId = await getUserId();

    const dataProfile = await getProfileData();
    const timeShowsSeen = dataProfile.time_shows_seen;

    const dataShow = await getShow(showId);
    const averageTime = parseInt(dataShow.average_min);
    const showTime = add === false ? (averageTime * nbEp) * -1 : averageTime * nbEp;

    const newTime = parseInt(timeShowsSeen) + parseInt(showTime);

    const { error } = await supabase
        .from("profiles_data")
        .update({"time_shows_seen": newTime})
        .eq("user_time", userId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

}