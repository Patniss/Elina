export function normalizeShow(show) {
    console.log(show);
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
        logo_large: source.logo_large,
        user_state: source.user_state
    }
}