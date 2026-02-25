import { getUserId } from "/Elina/js/services/profiles.services.js";
import { sortMovies, filterMovies } from "/Elina/js/modules/movies/movies.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapMoviesWithStatus } from "/Elina/js/modules/usersMovies/usersMovies.status.js";

export async function loadAllMovies(field, asc, filter) {
    const userId = await getUserId();

    let query = supabase.from("movies").select("*, users_movies(*)");
    query = sortMovies(query, field, asc);
    query = filterMovies(query, filter);

    movies = await querySupabase(query);
    const moviesWithStatus = mapMoviesWithStatus(movies, userId);

    return moviesWithStatus;
}