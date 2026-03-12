import { showsStore } from "/Elina/js/data/shows.store.js";
import { createShowCard } from "/Elina/js/modules/shows/shows.ui.js";
import { render } from "/Elina/js/ui/render.js";

export async function renderAllShows(shows) {
    const container = document.getElementById("list-all-shows");

    const showsToRender = shows || showsStore.shows.all;
    
    render(container, showsStore, "all", "shows", createShowCard, showsToRender);

    // renderPaginationAll();
}

export async function renderCanceledShows(shows) {
    const container = document.getElementById("list-cancele-shows");
    const box = document.getElementById("box-canceled-shows");

    const showsToRender = shows || showsStore.shows.canceled;

    if (showsToRender.length === 0) {
        box.classList.add("is-hidden");
    } else {
        box.classList.remove("is-hidden");
    }

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
    const box = document.getElementById("box-finished-shows");

    const showsToRender = shows || showsStore.shows.finished;

    if (showsToRender.length === 0) {
        box.classList.add("is-hidden");
    } else {
        box.classList.remove("is-hidden");
    }

    render(container, showsStore, "finished", "shows", createShowCard, showsToRender);

    // renderPaginationFinished();
}

export async function renderPausedShows(shows) {
    const container = document.getElementById("list-paused-shows");
    const box = document.getElementById("box-paused-shows");
    
    const showsToRender = shows || showsStore.shows.paused;

    if (showsToRender.length === 0) {
        box.classList.add("is-hidden");
    } else {
        box.classList.remove("is-hidden");
    }

    render(container, showsStore, "paused", "shows", createShowCard, showsToRender);

    // renderPaginationPaused();
}

export async function renderTostartShows(shows) {
    const container = document.getElementById("list-tostart-shows");
    const box = document.getElementById("box-tostart-shows");

    const showsToRender = shows || showsStore.shows.tostart;

    if (showsToRender.length === 0) {
        box.classList.add("is-hidden");
    } else {
        box.classList.remove("is-hidden");
    }

    render(container, showsStore, "tostart", "shows", createShowCard, showsToRender);

    // renderPaginationTostart();
}