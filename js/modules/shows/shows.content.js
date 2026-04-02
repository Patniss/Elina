import { getSeasonsOfShow } from "/Elina/js/services/seasons.service.js";
import { getShow } from "/Elina/js/services/shows.service.js";
import { getUserShowStatus } from "/Elina/js/services/usersShows.service.js";
import { toggleBtnStateStatut } from "/Elina/js/ui/dom.js";

export async function showContent(showId) {
    const showTitle = document.getElementById("show-title");
    const btnAdd = document.getElementById("button-add-show");
    const btnNext = document.getElementById("button-current-show");
    const btnPause = document.getElementById("button-paused-show");
    const btnRetake = document.getElementById("button-retake-show");
    const btnCancel = document.getElementById("button-cancel-show");
    const btnRetry = document.getElementById("button-retry-show");
    const btnFinish = document.getElementById("button-finished-show");

    const show = await getShow(showId);
    const statut = await getUserShowStatus(showId);

    showTitle.textContent = show.title;

    toggleBtnStateStatut(statut, btnAdd, btnNext, btnCancel, btnPause, btnRetake, btnFinish, btnRetry);

    const seasons = await getSeasonsOfShow(showId);
}