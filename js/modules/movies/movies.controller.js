import { moviesStore } from "/Elina/js/data/movies.store.js";
import { loadAllMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderPaginationAll } from "/Elina/js/modules/movies/movies.layout.js";

export async function refreshMovies() {
    const movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    moviesStore.setMoviesAndPage("all", movies, 1);
}

export async function initMovies() {
    moviesStore.subscribe(() => {
        renderAllMovies();
        renderPaginationAll();
    });

    await refreshMovies();
}

export async function changePage(page) {
    moviesStore.setCurrentPage("all", page);
}