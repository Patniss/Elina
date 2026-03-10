import { showsStore } from "/Elina/js/data/shows.store.js";
import { createShowCard } from "/Elina/js/modules/shows/shows.ui.js";
import { render } from "/Elina/js/ui/render.js";

export async function renderAllShows(shows) {
    const container = document.getElementById("list-all-shows");

    const showsToRender = shows || showsStore.shows.all;
    
    render(container, showsStore, "all", "shows", createShowCard, showsToRender);

    // renderPaginationAll();
}

export async function renderCurrentShows(shows) {
    const container = document.getElementById("list-current-shows");

    const showsToRender = shows || showsStore.shows.current;
    
    render(container, showsStore, "current", "shows", createShowCard, showsToRender);

    // renderPaginationCurrent();
}