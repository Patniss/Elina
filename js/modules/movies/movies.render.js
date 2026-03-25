import { render, initCarousel } from "/Elina/js/ui/render.js";
import { createMovieCard, createCarouselCard } from "/Elina/js/modules/movies/movies.ui.js";
import { moviesStore, indexMoviesStore, indexSisterMoviesStore } from "/Elina/js/data/movies.store.js";
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

export async function renderIndexFavSisterMovies(movies) {
    const container = document.getElementById("fav-sister-movies-not-seen");
    container.innerHTML = "";

    const leftBtnFav = document.getElementById("fav-sister-prev-btn");
    const rightBtnFav = document.getElementById("fav-sister-next-btn");

    indexSisterMoviesStore.movies.favSister = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "favSister"));
        index++;
    }

    initCarousel("favSister", leftBtnFav, rightBtnFav);
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

export async function renderIndexLastSeenSisterMovies(movies) {
    const container = document.getElementById("last-seen-movies-sister");
    container.innerHTML = "";

    const leftBtn = document.getElementById("last-sister-prev-btn");
    const rightBtn = document.getElementById("last-sister-next-btn");

    indexSisterMoviesStore.movies.lastSeenSister = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "lastSeenSister"));
        index++;
    }

    initCarousel("lastSeenSister", leftBtn, rightBtn);
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

export async function renderIndexToseeSharedMovies(movies) {
    const container = document.getElementById("tosee-movies-shared");
    container.innerHTML = "";

    const leftBtn = document.getElementById("tosee-shared-prev-btn");
    const rightBtn = document.getElementById("tosee-shared-next-btn");

    indexSisterMoviesStore.movies.toseeShared = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "toseeShared"));
        index++;
    }

    initCarousel("toseeShared", leftBtn, rightBtn);
}

export async function renderIndexOnlyToseeSisterMovies(movies) {
    const container = document.getElementById("tosee-movies-sister");
    container.innerHTML = "";

    const leftBtn = document.getElementById("tosee-sister-prev-btn");
    const rightBtn = document.getElementById("tosee-sister-next-btn");

    indexSisterMoviesStore.movies.toseeSister = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "toseeSister"));
        index++;
    }

    initCarousel("toseeSister", leftBtn, rightBtn);
}

export async function renderIndexOurFavMovies(movies) {
    const container = document.getElementById("fav-movies-shared");
    container.innerHTML = "";

    const leftBtn = document.getElementById("fav-shared-prev-btn");
    const rightBtn = document.getElementById("fav-shared-next-btn");

    indexSisterMoviesStore.movies.ourFavMovies = movies;

    let index = 1;

    for (const movie of movies) {
        container.appendChild(await createCarouselCard(movie, index, "ourFav"));
        index++;
    }

    initCarousel("ourFav", leftBtn, rightBtn);
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