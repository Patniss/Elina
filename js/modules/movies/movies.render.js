import { renderPaginationAll } from "/Elina/js/modules/movies/movies.layout.js";
import { createMovieCard } from "/Elina/js/modules/movies/movies.ui.js";
import { moviesStore } from "/Elina/js/modules/movies/movies.store.js";

export async function renderAllMovies() {
    const container = document.getElementById("list-all-movies");
    container.innerHTML = "";

    const start = (moviesStore.currentPage - 1) * moviesStore.pageSize;
    const end = start + moviesStore.pageSize;

    const pageMovies = moviesStore.movies.slice(start, end);

    for (const movie of pageMovies) {
        container.appendChild(await createMovieCard(movie));
    }

    renderPaginationAll(moviesStore.movies.length);
}

// Ton render actuel doit :
// Recevoir les films
// Recevoir currentPage
// Recevoir pageSize
// Slice
// Créer les cards
// Appeler renderPagination()
// Il ne doit :
// ❌ pas modifier le store
// ❌ pas appeler load
// ❌ pas gérer tri ou filtre
// Il est purement visuel.