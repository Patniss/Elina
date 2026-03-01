// movies.controller.js
import { initResearchMovie } from "/Elina/js/movies/movies.search.js";
import { moviesStore } from "/Elina/js/data/movies.store.js";
import { loadAllMovies, loadToseeMovies, loadSeenMovies } from "/Elina/js/modules/movies/movies.load.js";
import { renderAllMovies, renderMyMovies } from "/Elina/js/modules/movies/movies.render.js";
import { initToggleSection } from "/Elina/js/utils/toggles.js";

let unsubscribe;

export async function initMoviesAll() {
  // unsubscribe précédent si existant
  unsubscribe?.();
  unsubscribe = moviesStore.subscribe(list => {
    if (list === "all") renderAllMovies();
  });

  initResearchMovie();

  const movies = await loadAllMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
  moviesStore.setMoviesAndPage("all", movies, 1);
}

export async function initMoviesMy() {
  unsubscribe?.();
  unsubscribe = moviesStore.subscribe(list => {
    if (list === "tosee" || list === "seen") renderMyMovies();
  });

  initResearchMovie();

  // init toggles (une seule fois par page)
  initToggleSection({
    toggleId: "toggle-tosee",
    contentId: "div-tosee-movies",
    arrowId: "arrow-tosee"
  });
  initToggleSection({
    toggleId: "toggle-seen",
    contentId: "div-seen-movies",
    arrowId: "arrow-seen"
  });

  // fetch séparé
  const tosee = await loadToseeMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);
  const seen = await loadSeenMovies(moviesStore.sortField, moviesStore.sortAsc, moviesStore.genreFilter);

  moviesStore.setState({
    movies: { ...moviesStore.movies, tosee, seen },
    currentPage: { ...moviesStore.currentPage, tosee: 1, seen: 1 }
  });
}

// changement de page pour n'importe quelle liste
export async function changePage(list, page) {
  moviesStore.setCurrentPage(list, page);
}