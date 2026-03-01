import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderPagination } from "/Elina/js/ui/pagination.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";

export function renderPaginationAll() {
    renderPagination(
        "pagination-list",
        moviesStore.currentPage.all,
        moviesStore.movies.all.length,
        moviesStore.pageSize,
        (page) => { moviesStore.setCurrentPage("all", page); },
        () => { renderAllMovies(); })
}