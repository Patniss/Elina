import { showsStore } from "/Elina/js/data/shows.store.js";

export async function initShows() {
    showsStore.subscribe(() => {
        renderAllShows();
        renderAllPagination();
    })
}