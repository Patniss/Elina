import { showsStore, postersStore } from "/Elina/js/data/shows.store.js";
import { createShowCard, createCarouselCard, createShowStateEpisodes } from "/Elina/js/modules/shows/shows.ui.js";
import { render, initCarousel } from "/Elina/js/ui/render.js";

export async function renderAllShows(shows) {
    const container = document.getElementById("list-all-shows");

    const showsToRender = shows || showsStore.shows.all;
    
    render(container, showsStore, "all", "shows", createShowCard, showsToRender);

    // renderPaginationAll();
}

export async function renderCanceledShows(shows) {
    const container = document.getElementById("list-canceled-shows");

    const showsToRender = shows || showsStore.shows.canceled;

    render(container, showsStore, "canceled", "shows", createShowCard, showsToRender);

    // renderPaginationCanceled();
}

export async function renderCurrentShows(shows) {
    const container = document.getElementById("list-current-shows");

    const showsToRender = shows || showsStore.shows.current;
    
    render(container, showsStore, "current", "shows", createShowCard, showsToRender);

    // renderPaginationCurrent();
}

export async function renderFinishedShows(shows) {
    const container = document.getElementById("list-finished-shows");

    const showsToRender = shows || showsStore.shows.finished;

    render(container, showsStore, "finished", "shows", createShowCard, showsToRender);

    // renderPaginationFinished();
}

export async function renderIndexCurrentShows(shows) {
    const container = document.getElementById("current-shows");

    const showsToRender = shows || showsStore.shows.current;

    render(container, showsStore, "current", 'shows', createShowStateEpisodes, showsToRender);
}

export async function renderPausedShows(shows) {
    const container = document.getElementById("list-paused-shows");
    
    const showsToRender = shows || showsStore.shows.paused;

    render(container, showsStore, "paused", "shows", createShowCard, showsToRender);

    // renderPaginationPaused();
}

export async function renderPostersShow(seasons) {
    const container = document.getElementById("posters-show");

    const leftBtn = document.getElementById("posters-prev-btn");
    const rightBtn = document.getElementById("posters-next-btn");

    postersStore.seasons = seasons;

    let index = 1;

    for (const season of seasons) {
        container.appendChild(await createCarouselCard(season, index, "poster"));
        index++;
    }

    initCarousel("poster", leftBtn, rightBtn, 1);
}

export async function renderTostartShows(shows) {
    const container = document.getElementById("list-tostart-shows");

    const showsToRender = shows || showsStore.shows.tostart;

    render(container, showsStore, "tostart", "shows", createShowCard, showsToRender);

    // renderPaginationTostart();
}