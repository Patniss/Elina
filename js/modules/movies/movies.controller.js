import { initResearchAllMovie, initResearchToseeMovies, initResearchSeenMovies } from "/Elina/js/modules/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { sortFilterMovies, onlyNoListDisplay } from "/Elina/js/modules/movies/movies.layout.js";
import { loadAllMovies, loadToseeMovies, loadSeenMovies, loadNoListMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderPaginationAll } from "/Elina/js/modules/movies/movies.pagination.js";
import { renderAllMovies, renderSeenMovies, renderToseeMovies } from "/Elina/js/modules/movies/movies.render.js";
import { initToggleSection } from "/Elina/js/ui/toggles.js";

export async function changePage(page) {
    moviesStore.setCurrentPage("all", page);
}

export async function refreshSeenMovies() {
    try {
        const movies = await loadSeenMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("seen", movies, 1);
    } catch (error) {
        console.error("Erreur refreshSeenMovies:", error);
    }
}

export async function initMovies() {
    moviesStore.genreFilter = "";
    moviesStore.catFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;

    moviesStore.subscribe(() => {
        renderAllMovies();
    });

    initResearchAllMovie();
    sortFilterMovies(loadAllMovies, "all", renderPaginationAll);
    onlyNoListDisplay();

    await refreshMovies(loadAllMovies, "all");
}

export async function initSeenMovies() {
    moviesStore.genreFilter = "";
    moviesStore.catFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;
    
    moviesStore.subscribe(() => {
        renderSeenMovies();
    });

    initResearchSeenMovies();
    sortFilterMovies(loadSeenMovies, "seen");

    await refreshSeenMovies();
}

export async function initToseeMovies() {
    moviesStore.genreFilter = "";
    moviesStore.catFilter = "";
    moviesStore.sortField = "title";
    moviesStore.sortAsc = true;

    moviesStore.subscribe(() => {
        renderToseeMovies();
    });

    initResearchToseeMovies();
    sortFilterMovies(loadToseeMovies, "tosee");

    await refreshToseeMovies();
}

export async function refreshMovies(load, list) {
    const movies = moviesStore.catFilter === "nolist"
        ? await loadNoListMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter)
        : await load(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    
    moviesStore.setMoviesAndPage(list, movies, 1);
}

export async function refreshToseeMovies() {
    try {
        const movies = await loadToseeMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("tosee", movies, 1);
    } catch (error) {
        console.error("Erreur refreshToseeMovies:", error);
    }
}
