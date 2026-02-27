import { render } from "/Elina/js/ui/render.js";
import { createShowCard } from "/Elina/js/modules/shows/shows.ui.js";
import { showsStore } from "/Elina/js/data/shows.store.js";

export async function renderAllShows() {
    const container = document.getElementById("list-all-shows");
    const pagination = document.getElementById("pagination-list");
    render(container, showsStore, "all", "shows", pagination, createShowCard)
}