import { renderPagination } from "/Elina/js/ui/pagination.js";
import { showsStore } from "/Elina/js/data/shows.store.js";
import { renderAllShows } from "/Elina/js/modules/shows/shows.render.js";

export function sortShows(query, field, asc) {
    switch (field) {
        case "title":
            query = query.order("title", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc })
            break;
    }

    return query;
}

export function filterShows(query, genre) {
    if (genre) {
        query = query.ilike("genres", `%${genre}%`);
    }

    return query;
}


export function renderPaginationAll(totalItems) {
  renderPagination({
    containerId: "pagination-list",
    currentPage: showsStore.currentPage[all],
    totalItems: totalItems,
    pageSize: showsStore.pageSize,
    setCurrentPage: (page) => currentPage[all] = page,
    onPageChange: renderAllShows
  });
}