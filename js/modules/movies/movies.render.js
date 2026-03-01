import { render } from "/Elina/js/ui/render.js";
import { createMovieCard } from "/Elina/js/modules/movies/movies.ui.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { renderPaginationAll } from "/Elina/js/modules/movies/movies.pagination.js";

export async function renderAllMovies() {
    console.log("movies render appelé");
    const container = document.getElementById("list-all-movies");
    render(container, moviesStore, "all", "movies", createMovieCard);

    renderPaginationAll();
}