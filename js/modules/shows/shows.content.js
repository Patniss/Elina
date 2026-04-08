import { renderPostersShow } from "/Elina/js/modules/shows/shows.render.js";
import { getDataSeasonsOfShow } from "/Elina/js/services/seasons.service.js";
import { getShow } from "/Elina/js/services/shows.service.js";
import { getUserShowStatus } from "/Elina/js/services/usersShows.service.js";
import { toggleBtnStateStatut } from "/Elina/js/ui/dom.js";
import { renderGenres } from "/Elina/js/ui/render.js";

export async function showContent(showId) {
    const show = await getShow(showId);
    const statut = await getUserShowStatus(showId);
    const seasons = await getDataSeasonsOfShow(showId);

    await renderPostersShow(seasons);

    const showTitle = document.getElementById("show-title");
    showTitle.textContent = show.title;

    const showNbSeasons = document.getElementById("show-nb-seasons");
    showNbSeasons.textContent = `${seasons.length} saisons`;

    const btnAdd = document.getElementById("button-add-show");
    const btnNext = document.getElementById("button-current-show");
    const btnPause = document.getElementById("button-paused-show");
    const btnRetake = document.getElementById("button-retake-show");
    const btnCancel = document.getElementById("button-cancel-show");
    const btnRetry = document.getElementById("button-retry-show");
    const btnFinish = document.getElementById("button-finished-show");
    toggleBtnStateStatut(statut, btnAdd, btnNext, btnCancel, btnPause, btnRetake, btnFinish, btnRetry);

    const showGenres = document.getElementById("show-genres");
    renderGenres(showGenres, show.genres);

    const showSynopsis = document.getElementById("show-synopsis");
    const showSeasons = document.getElementById("show-seasons");
    
    seasons.forEach(season => {
        if (season.season === 1) {
            showSynopsis.textContent = season.synopsis;
        }

        const divSeason = document.createElement("div");
        divSeason.classList.add("tags");

        const spanSeason = document.createElement("button");
        spanSeason.classList.add("button", "tag", "is-primary");
        spanSeason.textContent = `Saison ${season.season}`;
    });
}