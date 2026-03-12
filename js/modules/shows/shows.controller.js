import { showsStore } from "/Elina/js/data/shows.store.js";
import { loadAllShows, loadCurrentShows } from "/Elina/js/modules/shows/shows.load.js";
import { renderAllShows, renderCurrentShows } from "/Elina/js/modules/shows/shows.render.js";
import { initToggleSection } from "/Elina/js/ui/toggles.js";

export async function changePage(page) {
    showsStore.setCurrentPage("all", page);
}

export async function initMyShows() {
    showsStore.genreFilter = "";
    showsStore.sortField = "title";
    showsStore.sortAsc = true;

    initToggleSection({
        toggleId: "toggle-current",
        contentId: "div-current-shows",
        arrowId: "arrow-current",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    initToggleSection({
        toggleId: "toggle-paused",
        contentId: "div-paused-shows",
        arrowId: "arrow-paused",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    initToggleSection({
        toggleId: "toggle-tostart",
        contentId: "div-tostart-shows",
        arrowId: "arrow-tostart",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    initToggleSection({
        toggleId: "toggle-finished",
        contentId: "div-finished-shows",
        arrowId: "arrow-finished",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    initToggleSection({
        toggleId: "toggle-canceled",
        contentId: "div-canceled-shows",
        arrowId: "arrow-canceled",
        hiddenClass: "is-hidden",
        iconOpen: "fa-chevron-down",
        iconClosed:"fa-chevron-right"
    });

    showsStore.subscribe(() => {
        renderCurrentShows();
    });

    // initResearchCurrentShows();
    // sortFilterShows();

    await refreshCurrentShows();
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