import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderAllMovies, renderToseeMovies, renderSeenMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderPaginationSearch } from "/Elina/js/modules/movies/movies.pagination.js";
import { searchMovies } from "/Elina/js/services/movies.service.js";
import { filterByTitle } from "/Elina/js/ui/search.js";
import { autoToggleSection } from "/Elina/js/ui/toggles.js";
import { debounce } from "/Elina/js/utils/debounce.js";

export function searchAllMovies(input, resultContainer) {
    let searchTimeout;

    $(input).on("input", function () {
        clearTimeout(searchTimeout);

        const query = $(this).val().trim();

        if (query.length < 2) {
            $(resultContainer).hide().empty();
            return;
        };

        searchTimeout = setTimeout(async () => {

            const movies = await searchMovies(query);
            resultContainer.innerHTML = "";

            movies.forEach(movie => {
                const item = document.createElement("div");
                item.textContent = `${movie.title} (${movie.year})`;
                item.classList.add("search-item");
                resultContainer.appendChild(item);
            });

            if (movies.length === 0) {
                resultContainer.style.display = "none";
            } else {
                resultContainer.style.display = "block";
            }
        }, 100);
    })
}

export function initResearchAllMovie() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((query) => {
        const filteredMovies = filterByTitle(
            moviesStore.movies.all,
            query,
            movie => movie.title
        );

        renderAllMovies(filteredMovies);
        renderPaginationSearch("pagination-list", "all", filteredMovies);
    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}

export function initResearchToseeMovies() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((query) => {
        const filteredMovies = filterByTitle(
            moviesStore.movies.tosee,
            query,
            movie => movie.movies.title
        );

        renderToseeMovies(filteredMovies);
        renderPaginationSearch("pagination-list-tosee", "tosee", filteredMovies);

        autoToggleSection({
            contentId: "div-tosee-movies",
            arrowId: "arrow-tosee",
            auto: filteredMovies.length >= 1
        });

    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}

export function initResearchSeenMovies() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((query) => {
        const filteredMovies = filterByTitle(
            moviesStore.movies.seen,
            query,
            movie => movie.movies.title
        );

        renderSeenMovies(filteredMovies);
        renderPaginationSearch("pagination-list-seen", "seen", filteredMovies);

        autoToggleSection({
            contentId: "div-seen-movies",
            arrowId: "arrow-seen",
            auto: filteredMovies.length >= 1
        });

    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}