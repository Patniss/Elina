import { showsStore } from "/Elina/js/data/shows.store.js";
import { loadAllShows, loadCurrentShows } from "/Elina/js/modules/shows/shows.load.js";
import { renderAllShows, renderCurrentShows, renderPausedShows } from "/Elina/js/modules/shows/shows.render.js";

export async function changePage(page) {
    showsStore.setCurrentPage("all", page);
}

export async function initCurrentShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    showsStore.subscribe(() => {
        renderCurrentShows();

        // initResearchShow();
        // sortFilterShows();
    });

    await refreshCurrentShows();
}

export async function initPausedShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    showsStore.subscribe(() => {
        renderPausedShows();

        // initResearchShow();
        // sortFilterShows();
    });
}

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

export async function refreshCurrentShows() {
    try {
        const shows = await loadCurrentShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
        showsStore.setShowsAndPage("current", shows, 1);
    } catch (error) {
        console.error("Erreur refresh:", error);
        return;
    }
}

export async function refreshShows() {
    const shows = await loadAllShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
    showsStore.setShowsAndPage("all", shows, 1);
}