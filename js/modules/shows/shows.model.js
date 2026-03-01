export function normalizeShow(show) {
    const source = show.shows ?? show;

    return {
        id: source.id,
        title: source.title,
        genres: source.genres,
        averageMin: source.average_min,
        state: source.state,
        complete: source.complete,
        seasons: source.nb_seasons,
        logo: source.logo,
        logoLarge: source.logo_large,
        userState: source.user_state
    }
}