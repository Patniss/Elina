import { supabase } from "/Elina/js/core/supabase.js";
import { sortMovies, filterMovies } from "/Elina/js/modules/movies/movies.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapMoviesWithStatus } from "/Elina/js/modules/usersMovies/usersMovies.status.js";

export async function loadAllMovies(field, asc, filter) {
    let query = supabase.from("movies").select("*, users_movies(*)");
    query = sortMovies(query, field, asc);
    query = filterMovies(query, filter);

    const movies = await querySupabase(query);
    const moviesWithStatus = await mapMoviesWithStatus(movies);

    return moviesWithStatus;
}