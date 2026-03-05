import { supabase } from "/Elina/js/core/supabase.js";
import { sortMovies, filterMovies, sortUsersMovies } from "/Elina/js/modules/movies/movies.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapMoviesWithStatus, mapNolistMovies } from "/Elina/js/modules/usersMovies/usersMovies.status.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function loadAllMovies(field, asc, filter, catFilter) {
    let query = supabase.from("movies").select("*, users_movies(*)");
    
    query = sortMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);
    let moviesWithStatus;
    if (catFilter) {
        moviesWithStatus = await mapNolistMovies(movies);
    } else moviesWithStatus = await mapMoviesWithStatus(movies);

    return moviesWithStatus;
}

export async function loadToseeMovies(field, asc, filter) {
    const userId = await getUserId();
    let query = supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", false);
    
    query = sortUsersMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);

    return movies;
}

export async function loadSeenMovies(field, asc, filter) {
    const userId = await getUserId();
    let query = supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", true);
    
    query = sortUsersMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);

    return movies;
}