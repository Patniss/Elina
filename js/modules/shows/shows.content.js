import { getShow } from "/Elina/js/services/shows.service.js";

export async function showContent(showId) {
    const showTitle = document.getElementById("show-title");

    const show = await getShow(showId);

    showTitle.textContent = show.title;
}