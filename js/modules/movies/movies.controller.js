import { initResearchMovie } from "/Elina/js/modules/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { loadAllMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";
import { initToggleSection } from "/Elina/js/ui/toggles.js";

let unsubscribe;

export async function initMovies() {
    unsubscribe?.();

    if (list === "tosee" || list === "seen") {
        initToggleSection({
            toggleId: "toggle-tosee",
            contentId: "div-tosee-movies",
            arrowId: "arrow-tosee"
        });

        initToggleSection({
            toggleId: "toggle-seen",
            contentId: "div-seen-movies",
            arrowId: "arrow-seen"
        });
    }

    unsubscribe = moviesStore.subscribe((list) => {
        if (list === "all") renderAllMovies();
        if (list === "tosee" || list === "seen") renderMyMovies();
    });

    initResearchMovie();

    await refreshMovies(list);
}

export async function refreshMovies() {
    let movies;
    switch (list) {
        case "all":
            movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
            break;
    
        case "tosee":
            movies = await loadToseeMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
            break;
        
        case "seen":
            movies = await loadSeenMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
            break;
    }

    if (list === "tosee" || list === "seen") {
        moviesStore.setState({
            movies: {
                ...moviesStore.movies,
                tosee,
                seen
            },
            currentPage: {
                ...moviesStore.currentPage,
                tosee: 1,
                seen: 1
            }
        });
    }
    
    moviesStore.setMoviesAndPage(list, movies, 1);
}

export async function changePage(list, page) {
    moviesStore.setCurrentPage(list, page);
}