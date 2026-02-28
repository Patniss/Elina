import { moviesStore } from "/Elina/js/modules/movies/movies.store.js";
import { renderPagination } from "/Elina/js/ui/pagination.js";
import { renderAllMovies, renderToseeMovies, renderSeenMovies } from "/Elina/js/modules/movies/movies.render.js";

export function renderPaginationAll() {
    console.log("renderPaginationAll appelée");
    renderPagination({
        containerId: "pagination-list",
        currentPage: moviesStore.currentPage.all,
        totalItems: moviesStore.movies.all.length,
        pageSize: moviesStore.pageSize,
        setCurrentPage: (page) => { moviesStore.setCurrentPage("all", page); },
        onPageChange: () => { renderAllMovies(); }
    })
}

export function renderPaginationTosee() {
    const container = document.getElementById("pagination-list-tosee");

    renderPagination({
        container,
        currentPage: moviesStore.currentPageTosee,
        totalItems: moviesStore.moviesTosee.length,
        pageSize: moviesStore.pageSize,
        onPageChange: (page) => {
            moviesStore.currentPageTosee = page;
            renderToseeMovies();
        }
    });
}

export function renderPaginationSeen() {
    const container = document.getElementById("pagination-list-seen");

    renderPagination({
        container,
        currentPage: moviesStore.currentPageSeen,
        totalItems: moviesStore.moviesSeen.length,
        pageSize: moviesStore.pageSize,
        onPageChange: (page) => {
            moviesStore.currentPageSeen = page;
            renderSeenMovies();
        }
    });
}