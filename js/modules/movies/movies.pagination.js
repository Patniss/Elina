import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderPagination } from "/Elina/js/ui/pagination.js";
import { renderAllMovies, renderToseeMovies, renderSeenMovies } from "/Elina/js/modules/movies/movies.render.js";

export function renderPaginationAll() {
    renderPagination(
        "pagination-list",
        moviesStore.currentPage.all,
        moviesStore.movies.all.length,
        moviesStore.pageSize,
        (page) => { moviesStore.setCurrentPage("all", page); },
        () => { renderAllMovies(); })
}

export function renderPaginationTosee() {
    renderPagination(
        "pagination-list-tosee",
        moviesStore.currentPage.tosee,
        moviesStore.movies.tosee.length,
        moviesStore.pageSize,
        (page) => { moviesStore.setCurrentPage("tosee", page); },
        () => { renderToseeMovies(); })
}

export function renderPaginationSeen() {
    renderPagination(
        "pagination-list-seen",
        moviesStore.currentPage.seen,
        moviesStore.movies.seen.length,
        moviesStore.pageSize,
        (page) => { moviesStore.setCurrentPage(seen, page); },
        () => { renderSeenMovies(); })
}