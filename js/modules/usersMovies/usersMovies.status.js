import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function mapMoviesWithStatus(data) {
    const userId = await getUserId();
    if (!data) return [];
    
    const moviesWithStatus = data.map(movie => {
        const userMovie = movie.users_movies.find(
        um => um.user_id === userId
        );
        
        return {
        ...movie,
        seen: userMovie ? userMovie.seen : null,
        ownPoster: userMovie ? userMovie.own_poster : null
        };
    });

    return moviesWithStatus;
}

export async function updateDateSeenMovie(uuid, date_seen) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("movies")
        .update({
            date_seen: date_seen
        })
        .eq("user_id", userId)
        .eq("movie_id", uuid)
        .single();
    
    if (error) throw error;
}