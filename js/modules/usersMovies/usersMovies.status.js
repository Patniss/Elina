export function mapMoviesWithStatus(data, userId) {
    
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