import { initResearchMovie } from "/Elina/js/modules/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { loadAllMovies, loadMyMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies, renderMyMovies } from "/Elina/js/modules/movies/movies.render.js";
import { initToggleSection } from "/Elina/js/ui/toggles.js";
import { sortFilterMovies } from "/Elina/js/modules/movies/movies.sortfilter.js";

export async function initMovies() {
    moviesStore.genreFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;
    moviesStore.subscribe(() => {
        renderAllMovies();
    });

    initResearchMovie();
    sortFilterMovies();

    await refreshMovies();
}

export async function refreshMovies() {
    const movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    moviesStore.setMoviesAndPage("all", movies, 1);
}

export async function changePage(page) {
    moviesStore.setCurrentPage("all", page);
}

export async function initMyMovies() {
    initToggleSection({
        toggleId: "toggle-tosee",
        contentId: "div-tosee-movies",
        arrowId: "arrow-tosee",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"});
    
    initToggleSection({
        toggleId: "toggle-seen",
        contentId: "div-seen-movies",
        arrowId: "arrow-seen",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"});

    moviesStore.subscribe(() => {
        renderMyMovies();
    });

    await refreshMyMovies();
}

export async function refreshMyMovies() {
    try {
        const movies = await loadMyMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("tosee", movies, 1);
        moviesStore.setMoviesAndPage("seen", movies, 1);
    } catch (error) {
        console.error("Erreur refreshMyMovies:", error);
    }
}