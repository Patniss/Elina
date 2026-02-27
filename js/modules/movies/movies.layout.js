import { renderPagination } from "/Elina/js/ui/pagination.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";
import { moviesStore } from "/Elina/js/modules/movies/movies.store.js";

export function sortMovies(query, field, asc) {
    switch (field) {
        case "year":
            query = query
                .order("year", { ascending: asc })
                .order("title", { ascending: true });
            break;

        case "title":
            query = query.order("title", { ascending: asc })
            break;

        case "date":
            query = query.order("title", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc })
            break;
    }

    return query;
}

export function filterMovies(query, genre) {
    if (genre) {
        query = query.ilike("genres", `%${genre}%`);
    }

    return query;
}

export function renderPaginationAll(totalItems) {
  renderPagination({
    containerId: "pagination_nb",
    currentPage: moviesStore.currentPageAll,
    totalItems: totalItems,
    pageSize: moviesStore.pageSize,
    setCurrentPage: (page) => currentPageAll = page,
    onPageChange: renderAllMovies
  });
}