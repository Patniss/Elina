import { filters } from "/Elina/js/data/genres.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { refreshMovies } from "/Elina/js/modules/movies/movies.controller.js";
import { renderAllMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderPagination } from "/Elina/js/ui/pagination.js";
import { toggleDropdown } from "/Elina/js/ui/toggles.js";

const sortButtons = [
    { id: "sort-az", field: "title", asc: true },
    { id: "sort-za", field: "title", asc: false },
    { id: "sort-19", field: "year", asc: true },
    { id: "sort-91", field: "year", asc: false },
];

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

export function sortUsersMovies(query, field, asc) {
    switch (field) {
        case "year":
            query = query
                .order("year", { ascending: asc, foreignTable: "movies" })
                .order("title", { ascending: true, foreignTable: "movies" });
            break;

        case "title":
            query = query.order("title", { ascending: asc, foreignTable: "movies" })
            break;

        case "date":
            query = query.order("title", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc, foreignTable: "movies" })
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
    containerId: "pagination-list",
    currentPage: moviesStore.currentPage["all"],
    totalItems: totalItems,
    pageSize: moviesStore.pageSize,
    setCurrentPage: (page) => currentPage["all"] = page,
    onPageChange: renderAllMovies
  });
}

export function sortFilterMovies() {
    const btnSort = document.getElementById("button-content-sort");
    const contentSort = document.getElementById("dropdown-content-sort");
    const btnFilter = document.getElementById("button-content-filter");
    const contentFilter = document.getElementById("dropdown-content-filter");
    const displayFilter = document.getElementById("filter-display");
    
    btnSort.addEventListener("click", () => {
        toggleDropdown(contentSort, contentFilter);
    });
    
    btnFilter.addEventListener("click", () => {
        toggleDropdown(contentFilter, contentSort);
    });

    filters.forEach(({id, genre, label}) => {
        const btn = document.getElementById(id);
        btn.addEventListener("click", () => {
            moviesStore.genreFilter = genre;
            displayFilter.textContent = label;
            contentFilter.classList.add("is-hidden");
            refreshMovies();
        })
    });

    sortButtons.forEach(({id, field, asc}) => {
        const btn = document.getElementById(id);
        btn.addEventListener("click", () => {
            sortButtons.forEach(({ id: otherId }) => {
                const el = document.getElementById(otherId);
                if (otherId !== id) el.classList.remove("is-hidden");
                else el.classList.add("is-hidden");
            });
            moviesStore.sortField = field;
            moviesStore.sortAsc = asc;
            refreshMovies();
            renderPaginationAll();
        })
    });
}