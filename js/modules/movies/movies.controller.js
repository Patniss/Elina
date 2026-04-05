import { initResearchAllMovie, initResearchToseeMovies, initResearchSeenMovies } from "/Elina/js/modules/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { sortFilterMovies, onlyNoListDisplay } from "/Elina/js/modules/movies/movies.layout.js";
import { loadAllMovies, loadToseeMovies, loadSeenMovies, loadNoListMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderPaginationAll, renderPaginationSeen, renderPaginationTosee } from "/Elina/js/modules/movies/movies.pagination.js";
import { renderAllMovies, renderSeenMovies, renderToseeMovies } from "/Elina/js/modules/movies/movies.render.js";

export async function changePage(page) {
    moviesStore.setCurrentPage("all", page);
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
    sortFilterMovies(loadAllMovies, "all", refreshMovies);
    onlyNoListDisplay();

    await refreshMovies();
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
    sortFilterMovies(loadSeenMovies, "seen", refreshSeenMovies);

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
    sortFilterMovies(loadToseeMovies, "tosee", refreshToseeMovies);

    await refreshToseeMovies();
}

export async function refreshMovies() {
    const movies = moviesStore.catFilter === "nolist"
        ? await loadNoListMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter)
        : await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    
    moviesStore.setMoviesAndPage("all", movies, 1);
}

export async function refreshSeenMovies() {
    try {
        const movies = await loadSeenMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("seen", movies, 1);
    } catch (error) {
        console.error("Erreur refreshSeenMovies:", error);
    }
    document.getElementById("list-seen-movies").scrollIntoView({
        behavior: "smooth",
        inline: "start"
    });
}

export async function refreshToseeMovies() {
    try {
        const movies = await loadToseeMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
        moviesStore.setMoviesAndPage("tosee", movies, 1);
    } catch (error) {
        console.error("Erreur refreshToseeMovies:", error);
    }
    document.getElementById("list-tosee-movies").scrollIntoView({
        behavior: "smooth",
        inline: "start"
    });
}
