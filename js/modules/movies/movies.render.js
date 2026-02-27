import { render } from "/Elina/js/ui/render.js";
import { createMovieCard } from "/Elina/js/modules/movies/movies.ui.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";

export async function renderAllMovies() {
    const container = document.getElementById("list-all-movies");
    const pagination = document.getElementById("pagination-list");
    render(container, moviesStore, "all", "movies", pagination, createMovieCard)

    console.log("moviesStore.movies.all:", store.movies.all);
    console.log("pageArray:", pageArray);
    console.log("page:", page);
}