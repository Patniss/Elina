import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderPagination } from "/Elina/js/ui/pagination.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";

export function renderPaginationAll() {
    const container = document.getElementById("pagination-list");
    renderPagination({
        container: container,
        currentPage: moviesStore.currentPage.all,
        totalItems: moviesStore.movies.all.length,
        pageSize: moviesStore.pageSize,
        setCurrentPage: (page) => { moviesStore.setCurrentPage("all", page); },
        onPageChange: () => { renderAllMovies(); }
    })
}