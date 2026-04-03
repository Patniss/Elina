import { getUserId, getSisterId } from "/Elina/js/services/profiles.service.js";
import { updateMoviesSeen, updateTimeMoviesSeen, updateMoviesTosee } from "/Elina/js/services/profilesData.service.js";
import { supabase } from "/Elina/js/core/supabase.js";

export async function addUserMovie(movieId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_movies")
        .insert([{
            user_id: userId,
            movie_id: movieId,
            seen: false,
            date_seen: null
        }]).select();

    if (error) {
        console.log(error);
        return;
    }

    await updateMoviesTosee();
}

export async function deleteUserMovie(movieId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    await updateMoviesTosee(-1);
}

export async function getDateSeen(movieId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("date_seen")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    if (data) {
        if (data.date_seen === "1900-01-01") {
            return null;
        }
    }

    return data?.date_seen || null;
}

export async function getFavAllSisterMovies() {
    const sisterId = await getSisterId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", sisterId)
        .eq("seen", true)
        .eq("fav", "fav")
        .order("title", { ascending: true, foreignTable: "movies" });
    
    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getFavMovies() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", true)
        .eq("fav", "fav")
        .order("title", { ascending: true, foreignTable: "movies" });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getFavSharedSisterMovies() {
    const userFavMovies = await getFavMovies();
    const sisterFavMovies = await getFavAllSisterMovies();

    const movieIds = new Set(sisterFavMovies.map(item => item.movie_id));

    const ourFavMovies = userFavMovies.filter(item => movieIds.has(item.movie_id));

    return ourFavMovies;
}

export async function getFavSisterMovies() {
    const userFavMovies = await getFavMovies();
    const sisterFavMovies = await getFavAllSisterMovies();

    const movieIds = new Set(userFavMovies.map(item => item.movie_id));

    const onlySisterFavMovies = sisterFavMovies.filter(item => !movieIds.has(item.movie_id));

    return onlySisterFavMovies;
}

export async function getFavUnklikeMovie(movieId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("fav")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    return data?.fav || null;
}

export async function getGenresToseeMovie(genres) {
    const userId = await getUserId();
    let list = [];

    if (genres.length > 0) {
        const results = await Promise.all(
            genres.map(async (genre) => {
                const { data, error } = await supabase
                    .from("users_movies")
                    .select("*, movies(*)")
                    .eq("user_id", userId)
                    .eq("seen", false)
                    .ilike("movies.genres", `%${genre}%`);

                if (error) {
                    console.error(error);
                    return [];
                }

                data.forEach(movie => {
                    if (!list.includes(movie.id)) {
                        list.push(movie.id);
                    }
                });

                return data;
            })
        );

        results.forEach(moviesArray => {
            moviesArray.forEach(movie => {
                if (!list.find(m => m.movie_id === movie.movie_id)) {
                    list.push(movie);
                }
            });
        });
    } else {
        const { data, error } = await supabase
            .from("users_movies")
            .select("movie_id")
            .eq("user_id", userId)
            .eq("seen", false);
        
        if (error) {
            console.error(error);
            return [];
        }

        list = data.map(item => item.movie_id);
    }

    return list;
}

export async function getLastSeenMovies() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", true)
        .not("date_seen", "is", null)
        .neq("date_seen", "1900-01-01")
        .order("date_seen", { ascending: false })
        .limit(5);

    if (error) {
        console.error(error);
        return;
    }

    return data;
}

export async function getLastSeenSisterMovies() {
    const sisterId = await getSisterId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", sisterId)
        .eq("seen", true)
        .not("date_seen", "is", null)
        .neq("date_seen", "1900-01-01")
        .order("date_seen", { ascending: false })
        .limit(5);

    if (error) {
        console.error(error);
        return;
    }

    return data;
}

export async function getStatusMovie(movieId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("seen")
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    return data?.seen || null;
}

export async function getOnlyToseeSisterMovies() {
    const userToseeMovies = await getToseeMovies();
    const sisterToseeMovies = await getToseeSisterMovies();

    const movieIds = new Set(userToseeMovies.map(item => item.movie_id));
    
    const toseeSharedMovies = sisterToseeMovies.filter(item => !movieIds.has(item.movie_id));

    return toseeSharedMovies;
}

export async function getSeenTimeMovie() {
    const userId = await getUserId();

    const { data, error } = await supabase
    .from("users_movies")
    .select(`*, movies(time)`)
    .eq("user_id", userId)
    .eq("seen", true);
    
  if (error) {
    console.error(error);
    return;
  }

  return data.reduce((sum, movie) => sum + Number(movie.movies.time), 0);
}

export async function getSeenTimeMovieSister() {
    const sisterId = await getSisterId();
    
    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(time)")
        .eq("user_id", sisterId)
        .eq("seen", true);

    if (error) {
        console.error(error);
        return;
    }
    
    return data.reduce((sum, movie) => sum + Number(movie.movies.time), 0);
}

export async function getToseeMovies() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", false)
        .order("title", { ascending: true, foreignTable: "movies" });
    
    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getToseeSharedMovies() {
    const userToseeMovies = await getToseeMovies();
    const sisterToseeMovies = await getToseeSisterMovies();

    const movieIds = new Set(sisterToseeMovies.map(item => item.movie_id));
    
    const toseeSharedMovies = userToseeMovies.filter(item => movieIds.has(item.movie_id));

    return toseeSharedMovies;
}

export async function getToseeSisterMovies() {
    const sisterId = await getSisterId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", sisterId)
        .eq("seen", false)
        .order("title", { ascending: true, foreignTable: "movies" });

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getTotalSeenMovies() {
    const userId = await getUserId();

    const { count, error } = await supabase
        .from("users_movies")
        .select(`*`, { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("seen", true);
    
  if (error) {
    console.error(error);
    return;
  }

  return count;
}

export async function getTotalSeenMoviesSister() {
    const sisterId = await getSisterId();

    const { count, error } = await supabase
        .from("users_movies")
        .select(`*`, { count: "exact", head: true })
        .eq("user_id", sisterId)
        .eq("seen", true);

    if (error) {
        console.error(error);
        return;
    }

    return count;
}

export async function getTotalToseeMovies() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_movies")
        .select(`*`)
        .eq("user_id", userId)
        .eq("seen", false);
    
  if (error) {
    console.error(error);
    return;
  }
  
  return data.length;
}

export async function getTotalToseeMoviesSister() {
    const sisterId = await getSisterId();

    const { data, error } = await supabase
        .from("users_movies")
        .select("*")
        .eq("user_id", sisterId)
        .eq("seen", false);

    if (error) {
        console.error(error);
        return;
    }

    return data.length;
}

export async function getUserMovie(movieId) {
    const userId = await getUserId();
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

export async function updateDateSeenMovie(uuid, date_seen) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_movies")
        .update({date_seen: date_seen})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}

export async function updateFavMovie(uuid, fav) {
    const userId = await getUserId();
    
    const { error } = await supabase
        .from("users_movies")
        .update({fav: fav})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}

export async function updateOwnPoster(uuid, link) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_movies")
        .update({own_poster: link})
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}

export async function updateSeenUserMovie(movieId, seenState) {
    const userId = await getUserId();
    
    const { error } = await supabase
        .from("users_movies")
        .update({seen: seenState})
        .eq("user_id", userId)
        .eq("movie_id", movieId)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    if (seenState === true) {
        await updateMoviesSeen(1);
        await updateTimeMoviesSeen(movieId);
        await updateMoviesTosee(-1);
    } else {
        await updateMoviesSeen(-1)
        await updateTimeMoviesSeen(movieId);
        await updateMoviesTosee(1);
    }
}
