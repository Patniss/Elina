import { showsStore } from "/Elina/js/data/shows.store.js";
import { renderAllShows } from "/Elina/js/modules/shows/shows.render.js";

export async function initShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;
    showsStore.subscribe(() => {
        renderAllShows();
    });

    // initResearchShow();
    // sortFilterShows();

    await refreshShows();
}

export async function refreshShows() {
    const shows = await loadAllShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
    showsStore.setShowsAndPage("all", shows, 1);
}

export async function changePage(page) {
    showsStore.setCurrentPage("all", page);
}