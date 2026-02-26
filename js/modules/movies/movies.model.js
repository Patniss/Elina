export function normalizeMovie(movie) {
    const source = movie.movies ?? movie;

    return {
        movieId: source.id,
        movieTitle: source.title,
        movieYear: source.year,
        moviePoster: movie.own_poster ?? source.poster,
        movieSeen: movie.seen ?? null
    }
}