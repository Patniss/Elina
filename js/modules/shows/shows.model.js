export function normalizeShow(show) {
    const source = show.shows ?? show;

    return {
        showId: source.id,
        showTitle: source.title,
        showGenres: source.genres,
        showAverageMin: source.average_min,
        showState: source.state,
        showComplete: source.complete,
        showNbSeasons: source.nb_seasons,
        showLogo: sourceLogo,
        showLogoLarge: source.logo_large,
        showUserState: source.user_state
    }
}