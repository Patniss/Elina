import { initResearchAllMovie, initResearchToseeMovies, initResearchSeenMovies } from "/Elina/js/modules/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { sortFilterMovies, onlyNoListDisplay } from "/Elina/js/modules/movies/movies.layout.js";
import { loadAllMovies, loadToseeMovies, loadSeenMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies, renderSeenMovies, renderToseeMovies } from "/Elina/js/modules/movies/movies.render.js";
import { initToggleSection } from "/Elina/js/ui/toggles.js";

export async function initMovies() {
    moviesStore.genreFilter = "";
    moviesStore.catFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;

    moviesStore.subscribe(() => {
        renderAllMovies();
    });

    initResearchAllMovie();
    sortFilterMovies();
    onlyNoListDisplay();

    await refreshMovies();
}

export async function refreshMovies() {
    let movies;
    if (moviesStore.catFilter === "nolist") {
        movies = await loadNoListMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    } else movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    
    moviesStore.setMoviesAndPage("all", movies, 1);
}

export async function changePage(page) {
    moviesStore.setCurrentPage("all", page);
}

export async function initMyMovies() {
    moviesStore.genreFilter = "";
    moviesStore.catFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;

    initToggleSection({
        toggleId: "toggle-tosee",
        contentId: "div-tosee-movies",
        arrowId: "arrow-tosee",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });
    
    initToggleSection({
        toggleId: "toggle-seen",
        contentId: "div-seen-movies",
        arrowId: "arrow-seen",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    moviesStore.subscribe(() => {
        renderToseeMovies();
        renderSeenMovies();
    });

    initResearchToseeMovies();
    initResearchSeenMovies();
    sortFilterMovies();

    await refreshToseeMovies();
    await refreshSeenMovies();
}

export async function refreshToseeMovies() {
    try {
        const movies = await loadToseeMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("tosee", movies, 1);
    } catch (error) {
        console.error("Erreur refreshToseeMovies:", error);
    }
}

export async function refreshSeenMovies() {
    try {
        const movies = await loadSeenMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("seen", movies, 1);
    } catch (error) {
        console.error("Erreur refreshSeenMovies:", error);
    }
}