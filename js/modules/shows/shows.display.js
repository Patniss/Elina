import { getCurrentShows } from "/Elina/js/services/usersShows.service.js";

export async function displayIndexShows() {
    const currentShows = document.getElementById("current-shows");

    const allCurrentShows = await getCurrentShows();
    currentShows.textContent = allCurrentShows.length;
}