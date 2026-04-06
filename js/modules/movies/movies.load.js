import { supabase } from "/Elina/js/core/supabase.js";
import { sortMovies, filterMovies } from "/Elina/js/modules/movies/movies.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapMoviesWithStatus } from "/Elina/js/modules/usersMovies/usersMovies.status.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function loadAllMovies(field, asc, filter) {
    let query = supabase.from("movies").select("*, users_movies(*)");
    
    query = sortMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);
    const moviesWithStatus = await mapMoviesWithStatus(movies);

    return moviesWithStatus;
}

export async function loadNoListMovies(field, asc, filter) {
    let query = supabase
        .from("movies")
        .select("*, users_movies(*)");
    
    query = sortMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);
    const moviesWithStatus = await mapMoviesWithStatus(movies);

    let noListMovies = [];

    moviesWithStatus.forEach(movie => {
        if (movie.seen === null) { noListMovies.push(movie) }
    });

    return noListMovies;
}

export async function loadSeenMovies(field, asc, filter) {
    const userId = await getUserId();
    let query = supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", true);
    
    query = sortMovies(query, field, asc, true);
    query = filterMovies(query, filter, true);

    const movies = await querySupabase(query);
    
    let displayMovies = [];
    movies.forEach(movie => {
        if (movie.movies !== null) {
            displayMovies.push(movie);
        }
    });

    return displayMovies;
}

export async function loadToseeMovies(field, asc, filter) {
    const userId = await getUserId();
    let query = supabase
        .from("users_movies")
        .select("*, movies(*)")
        .eq("user_id", userId)
        .eq("seen", false);
    
    query = sortMovies(query, field, asc, true);
    query = filterMovies(query, filter, true);

    const movies = await querySupabase(query);
    
    let displayMovies = [];
    movies.forEach(movie => {
        if (movie.movies !== null) {
            displayMovies.push(movie);
        }
    });

    return displayMovies;
}