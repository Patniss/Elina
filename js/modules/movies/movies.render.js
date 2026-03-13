import { render, initCarousel } from "/Elina/js/ui/render.js";
import { createMovieCard, createCarouselCard } from "/Elina/js/modules/movies/movies.ui.js";
import { moviesStore, indexMoviesStore } from "/Elina/js/data/movies.store.js";
import { renderPaginationAll, renderPaginationTosee, renderPaginationSeen } from "/Elina/js/modules/movies/movies.pagination.js";

export async function renderAllMovies(movies) {
    const container = document.getElementById("list-all-movies");

    const moviesToRender = movies || moviesStore.movies.all;
    
    render(container, moviesStore, "all", "movies", createMovieCard, moviesToRender);

    renderPaginationAll();
}

export async function renderIndexFavMovies(movies) {
    const container = document.getElementById("fav-movies");
    container.innerHTML = "";

    const rightBtnFav = document.getElementById("fav-next-btn");
    const leftBtnFav = document.getElementById("fav-prev-btn");

    indexMoviesStore.movies.fav = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "fav"));
        index++;
    }

    initCarousel("fav", leftBtnFav, rightBtnFav);
}

export async function renderIndexLastMovies(movies) {
    const container = document.getElementById("last-seen-movies");
    container.innerHTML = "";

    const leftBtnLast = document.getElementById("last-prev-btn");
    const rightBtnLast = document.getElementById("last-next-btn");

    indexMoviesStore.movies.last = movies;

     let index = 1;

     for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "last"));
        index++;
     }

     initCarousel("last", leftBtnLast, rightBtnLast);
}

export async function renderIndexToseeMovies(movies) {
    const container = document.getElementById("tosee-movies");
    container.innerHTML = "";

    const rightBtnTosee = document.getElementById("tosee-next-btn");
    const leftBtnTosee = document.getElementById("tosee-prev-btn");

    indexMoviesStore.movies.tosee = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "tosee"));
        index++;
    }

    initCarousel("tosee", leftBtnTosee, rightBtnTosee);
}

export async function renderSeenMovies(movies) {
    const container = document.getElementById("list-seen-movies");

    const moviesToRender = movies || moviesStore.movies.seen;
    
    render(container, moviesStore, "seen", "movies", createMovieCard, moviesToRender);

    renderPaginationSeen();
}

export async function renderToseeMovies(movies) {
    const container = document.getElementById("list-tosee-movies");

    const moviesToRender = movies || moviesStore.movies.tosee;
    
    render(container, moviesStore, "tosee", "movies", createMovieCard, moviesToRender);

    renderPaginationTosee();
}