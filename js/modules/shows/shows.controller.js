import { showsStore } from "/Elina/js/data/shows.store.js";
import { renderAllShows } from "/Elina/js/modules/shows/shows.render.js";
import { loadAllShows } from "/Elina/js/modules/shows/shows.load.js";

export async function initShows() {
    showsStore.subscribe(() => {
        renderAllShows();
    })
}

export async function refreshShows() {
    const shows = await loadAllShows(showsStore.sortField, showsStore.sortAsc, showsStore.genreFilter);
    shows.setState({
        shows,
        currentPage: 1
    });
}

