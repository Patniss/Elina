import { moviesStore } from "/Elina/js/data/movies.store.js";
import { loadAllMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderPaginationAll } from "/Elina/js/modules/movies/movies.layout.js";

export async function initMovies() {
    moviesStore.subscribe(() => {
        renderAllMovies();
        renderPaginationAll();
    })
}

export async function refreshMovies() {
    const movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
    moviesStore.setState({
        movies,
        currentPage: 1
    });
    console.log(moviesStore.movies);
}

export async function changePage(page) {
    moviesStore.setCurrentPage(page);
}