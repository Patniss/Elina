import { filterByTitle } from "/Elina/js/ui/search.js";
import { debounce } from "/Elina/js/utils/debounce.js";
import { searchMovies } from "/Elina/js/services/movies.service.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderAllMovies, renderToseeMovies, renderSeenMovies } from "/Elina/js/modules/movies/movies.render.js";

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
    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}

export function initResearchToseeMovies() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((query) => {
        const filteredMovies = filterByTitle(
            moviesStore.movie.tosee,
            query,
            movie => movie.movies.title
        );

        renderToseeMovies(filteredMovies);
    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}

export function initResearchSeenMovies() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((query) => {
        const filteredMovies = filterByTitle(
            moviesStore.movie.seen,
            query,
            movie => movie.movies.title
        );

        renderSeenMovies(filteredMovies);
    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value.trim()));
}