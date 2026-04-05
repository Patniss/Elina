import { showsStore } from "/Elina/js/data/shows.store.js";
import { loadAllShows, loadCurrentShows, loadPausedShows, loadFinishedShows, loadCanceledShows } from "/Elina/js/modules/shows/shows.load.js";
import { renderAllShows, renderCurrentShows, renderPausedShows, renderTostartShows, renderFinishedShows, renderCanceledShows } from "/Elina/js/modules/shows/shows.render.js";

export async function changePage(page) {
    showsStore.setCurrentPage("all", page);
}

export async function initCanceledShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    showsStore.subscribe(() => {
        renderCanceledShows();

        // initResearchShow();
        // sortFilterShows();
    });

    await refreshCanceledShows();
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

export async function initFinishedShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    showsStore.subscribe(() => {
        renderFinishedShows();

        // initResearchShow();
        // sortFilterShows();
    });

    await refreshFinishedShows();
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

    await refreshPausedShows();
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

export async function initTostartShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    showsStore.subscribe(() => {
        renderTostartShows();

        // initResearchShow();
        // sortFilterShows();
    });
}

export async function refreshCanceledShows() {
    try {
        const shows = await loadCanceledShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
        showsStore.setShowsAndPage("canceled", shows, 1);
    } catch (error) {
        console.error("Erreur refresh:", error);
        return;
    }
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

export async function refreshFinishedShows() {
    try {
        const shows = await loadFinishedShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
        showsStore.setShowsAndPage("finished", shows, 1);
    } catch (error) {
        console.error("Erreur refresh:", error);
        return;
    }
}

export async function refreshPausedShows() {
    try {
        const shows = await loadPausedShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
        showsStore.setShowsAndPage("paused", shows, 1);
    } catch (error) {
        console.error("Erreur refresh:", error);
        return;
    }
}

export async function refreshShows() {
    const shows = await loadAllShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
    showsStore.setShowsAndPage("all", shows, 1);
}