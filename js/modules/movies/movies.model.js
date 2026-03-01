export function normalizeMovie(movie) {
    const source = movie.movies ?? movie;

    return {
        id: source.id,
        title: source.title,
        year: source.year,
        poster: movie.own_poster ?? source.poster,
        seen: movie.seen ?? null
    }
}