import { searchShows } from "/Elina/js/services/shows.service.JS";

export function searchAllShows(input, resultContainer) {
    let searchTimeout;

    $(input).on("input", function () {
        clearTimeout(searchTimeout);

        const query = $(this).val().trim();

        if (query.length < 2) {
            $(resultContainer).hide().empty();
            return;
        };

        searchTimeout = setTimeout(async () => {

            const shows = await searchShows(query);
            resultContainer.innerHTML = "";

            shows.forEach(show => {
                const item = document.createElement("div");
                item.textContent = `${show.title}`;
                item.classList.add("search-item");
                resultContainer.appendChild(item);
            });

            if (shows.length === 0) {
                resultContainer.style.display = "none";
            } else {
                resultContainer.style.display = "block";
            }
        }, 100);
    })
}