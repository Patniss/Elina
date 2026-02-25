import { debounce } from "/Elina/js/utils/debounce.js";
import { searchMovies } from "/Elina/js/services/movies.service.js";

export function initLiveSearch({
    inputElement, resultContainer, searchFunction, renderItem
}) {
    const handleSearch = debounce(async (query) => {
        if (query.length < 2) {
            resultContainer.innerHTML = "";
            resultContainer.style.display = "none";
            return;
        }

        const { data, error } = await searchFunction(query);

        if (error) {
            console.error(error);
            return;
        }

        resultContainer.innerHTML = "";

        data.forEach(item => {
            const element = renderItem(item);
            resultContainer.appendChild(element);
        });

        resultContainer.style.display = data.length === 0 ? "none" : "block";
    }, 100);

    inputElement.addEventListener("input", (e) => {
        handleSearch(e.target.value.trim());
    });
}

export function searchAllMovies(input, resultContainer) {
    let searchTimeout;

    $(input).on("input", function () {
        const query = $(this).val().trim();

        if (query.length < 2) {
            $(resultContainer).hide().empty();
            return;
        };

        searchTimeout = setTimeout(async () => {
            const { data, error } = await searchMovies(query);
            const movies = data;
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