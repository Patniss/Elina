import { renderPagination } from "/Elina/js/ui/pagination.js";

export function renderGenres(container, genresString) { // Création des tags pour les genres
    container.innerHTML = '';
    const genres = genresString.trim().split(" ; ");
    genres.forEach(genre => {
        const spanGenre = document.createElement("span");
        spanGenre.classList.add("tag", "is-medium", genre.trim().toLowerCase(), "mr-2");
        spanGenre.textContent = genre;
        container.appendChild(spanGenre);
    })
}

export async function render(containerStore, store, list, element, containerPagination, createFunction) {
    containerStore.innerHTML = "";

    const start = (store.currentPage[list] - 1) * store.pageSize;
    const end = start + store.pageSize;

    const pageArray = store[element]?.[list] || [];
    const page = pageArray.slice(start, end);

    for (const el of page) {
        containerStore.appendChild(await createFunction(el));
    }

    const setPageWrapper = (page) => store.setCurrentPage(list, page);

    renderPagination(
        containerPagination,
        store.currentPage[list],
        pageArray.length,
        store.pageSize,
        setPageWrapper, () => render(containerStore, store, list, element, containerPagination, createFunction));
    
    console.log("pageArray length:", pageArray.length);
}