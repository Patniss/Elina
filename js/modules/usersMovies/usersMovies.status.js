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

export async function mapNolistMovies(data) {
    const userId = await getUserId();
    if (!data) return [];

    return data.reduce((acc, movie) => {
        const userMovie = movie.users_movies.find(
            um => um.user_id === userId
        );

        if (!userMovie || userMovie.seen === null) {
            acc.push({
                ...movie,
                seen: userMovie.seen,
                ownPoster: userMovie.own_poster
            });
        }

        return acc;
    }, []);
}