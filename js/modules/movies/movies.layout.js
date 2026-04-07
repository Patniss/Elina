import { filters } from "/Elina/js/data/genres.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { refreshMovies } from "/Elina/js/modules/movies/movies.controller.js";
import { renderPaginationAll } from "/Elina/js/modules/movies/movies.pagination.js";
import { toggleDropdown } from "/Elina/js/ui/toggles.js";

const sortButtons = [
    { id: "sort-az", field: "title", asc: true },
    { id: "sort-za", field: "title", asc: false },
    { id: "sort-19", field: "year", asc: true },
    { id: "sort-91", field: "year", asc: false },
];

export function filterMovies(query, genre, fromUsersMovies = false) {
    if (genre) {
        const table = fromUsersMovies ? "movies.genres" : "genres";
        query = query.ilike(table, `%${genre}%`);
    }

    return query;
}

export function onlyNoListDisplay() {
    const buttonDisplay = document.getElementById("display-only-nolist");

    buttonDisplay.addEventListener("click", () => {
        if (moviesStore.catFilter !== "nolist") {
            moviesStore.catFilter = "nolist";
            buttonDisplay.textContent = "Tous les films";
        } else {
            moviesStore.catFilter = "";
            buttonDisplay.textContent = "Films non ajoutés";
        }

        refreshMovies();
        renderPaginationAll();
    })
}

export function sortFilterMovies(refresh) {
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

    for (const filter of filters) {
        const btn = document.getElementById(filter.id);
        btn.addEventListener("click", async () => {
            moviesStore.genreFilter = filter.genre;
            displayFilter.textContent = filter.label;
            contentFilter.classList.add("is-hidden");
            await refresh()
        });
    }

    for (const sort of sortButtons) {
        const btn = document.getElementById(sort.id);
        btn.addEventListener("click", async () => {
            moviesStore.sortField = sort.field;
            moviesStore.sortAsc = sort.asc;
            contentSort.classList.add("is-hidden");
            await refresh();
        });
    }
}

export function sortMovies(query, field, asc, fromUsersMovies = false) {
    switch (field) {
        case "year":
            query = query
                .order("year", { ascending: asc, foreignTable: fromUsersMovies ? "movies" : undefined })
                .order("title", { ascending: true, foreignTable: fromUsersMovies ? "movies" : undefined });
            break;

        case "title":
            query = query.order("title", { ascending: asc, foreignTable: fromUsersMovies ? "movies" : undefined })
            break;

        case "seen":
            query = query.order("date_seen", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc, foreignTable: fromUsersMovies ? "movies" : undefined })
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