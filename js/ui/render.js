export function renderGenres(container, genresString) { // Création des tags pour les genres
    const genres = genresString.trim().split(" ; ");
    genres.forEach(genre => {
        const spanGenre = document.createElement("span");
        spanGenre.classList.add("tag", "is-medium", genre.trim().toLowerCase(), "mr-2");
        spanGenre.textContent = genre;
        container.appendChild(spanGenre);
    })
}