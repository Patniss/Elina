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

export async function renderCarousel(containerStore, store, list, element, createFunction, filteredMovies) {
    containerStore.innerHTML = "";

    const pageArray = filteredMovies || store[element]?.[list] || [];
    const center = store.currentIndex[list];
    const half = Math.floor(store.pageSize / 2);

    let start = center - half;
    let end = center + half + 1;

    if (start < 0) {
        start = 0;
        end = store.pageSize;
    }

    if (end > pageArray.length) {
        end = pageArray.length;
        start = end - store.pageSize;
    }

    const page = pageArray.slice(start, end);

    for (let i = 0; i < page.length; i++) {

        const el = page[i];
        const card = await createFunction(el);

        const realIndex = start + i;

        if (realIndex === center) {
            card.classList.add("carousel-center");
        }

        containerStore.appendChild(card);
    }

    const cards = containerStore.querySelectorAll(".movie-card");
}

export function updateCarousel(container, store, list) {
    const cards = container.querySelectorAll(".movie-card");
    if (!cards.length) return;

    const index = store.currentIndex[list];

    const cardWidth = cards[0].offsetWidth + 12;

    container.style.transform = `translateX(-${index * cardWidth}px)`;

    cards.forEach(card => card.classList.remove("center"));

    if (cards[index]) {
        cards[index].classList.add("center");
    }
}