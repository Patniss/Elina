import { filterByTitle } from "/Elina/js/ui/search.js";
import { debounce } from "/Elina/js/utils/debounce.js";
import { searchMovies } from "/Elina/js/services/movies.service.js";

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

export function initResearchMovie() {
    const input = document.getElementById("movie-search");
    if (!input) return;

    const handleSearch = debounce((search) => {
        const query = search.toLowerCase().trim();

        if (document.getElementById("list-all-movies")) {
            currentPageAll = 1;

            filteredMovies = filterByTitle(
                allMovies,
                query,
                movie => movie.title
            );
        }

        renderMovies();
    }, 150);

    input.addEventListener("input", (e) => handleSearch(e.target.value));
}