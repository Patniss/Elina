import { debounce } from "/Elina/js/utils/debounce.js";

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