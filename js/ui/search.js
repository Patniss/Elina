import { debounce } from "/Elina/js/utils/debounce.js";
import { normalizeString } from "/Elina/js/utils/format.js";

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

export function filterByTitle(list, query, getTitle) {
    if (!query) return [...list];

    const lowerQuery = normalizeString(query);

    const filtered = list.filter(item => normalizeString(getTitle(item)).includes(lowerQuery));

    filtered.sort((a, b) => {
        const titleA = getTitle(a).toLowerCase();
        const titleB = getTitle(b).toLowerCase();

        const aStarts = titleA.startsWith(lowerQuery) ? 1 : 0;
        const bStarts = titleB.startsWith(lowerQuery) ? 1 : 0;

        if (aStarts !== bStarts) return bStarts - aStarts;

        const aIndex = titleA.indexOf(lowerQuery);
        const bIndex = titleB.indexOf(lowerQuery);

        return aIndex - bIndex;
    });

    return filtered;
}