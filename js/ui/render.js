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

export async function render(containerStore, store, list, element, createFunction, filteredMovies) {
    containerStore.innerHTML = "";

    const start = (store.currentPage[list] - 1) * store.pageSize;
    const end = start + store.pageSize;

    const pageArray = filteredMovies || store[element]?.[list] || [];
    const page = pageArray.slice(start, end);

    for (const el of page) {
        containerStore.appendChild(await createFunction(el));
    }

    const cards = containerStore.querySelectorAll(".movie-card");
    cards.forEach((card, index) => {
        card.classList.remove("fade-in-up");
        card.style.animationDelay = `${index * 70}ms`;
        card.classList.add("fade-in-up");
    });
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