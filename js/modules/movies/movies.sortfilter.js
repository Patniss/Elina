import { filters } from "/Elina/js/data/genres.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { toggleDropdown } from "/Elina/js/ui/toggles.js";
import { refreshMovies } from "/Elina/js/modules/movies/movies.controller.js";

const sortButtons = [
    { id: "sort-az", field: "title", asc: true },
    { id: "sort-za", field: "title", asc: false },
    { id: "sort-19", field: "year", asc: true },
    { id: "sort-91", field: "year", asc: false },
  ];

export function sortFilterMovies() {
    const btnSort = document.getElementById("button-content-sort");
    const contentSort = document.getElementById("dropdown-content-sort");
    const btnFilter = document.getElementById("button-content-filter");
    const contentFilter = document.getElementById("dropdown-content-filter");
    const displayFilter = document.getElementById("filter-display");

    const dropdownSort = btnSort.closest(".dropdown");
    const dropdownFilter = btnFilter.closest(".dropdown");
    
    btnSort.addEventListener("click", () => {
        console.log("bouton tri cliqué");
        toggleDropdown(dropdownSort, dropdownFilter);
    });
    
    btnFilter.addEventListener("click", () => {
        console.log("bouton filtre cliqué")
        toggleDropdown(dropdownFilter, dropdownSort);
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
                if (otherId !== id) el.classList.add("is-hidden");
                else el.classList.remove("is-hidden");
            });
            moviesStore.sortField = field;
            moviesStore.sortAsc = asc;
            refreshMovies();
        })
    });
}