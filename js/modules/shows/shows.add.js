import { genres } from "/Elina/js/data/genres.js";
import { searchAllShows } from "/Elina/js/modules/shows/shows.search.js";
import { addSeason } from "/Elina/js/services/seasons.service.js";
import { addingShow } from "/Elina/js/services/shows.service.js";
import { initGenres } from "/Elina/js/ui/select.js";

export async function addShow() {
  const showForm = document.getElementById("show-form");
  const genresInput = document.getElementById("show-genres");
  const titleInput = document.getElementById("show-title");
  const searchResult = document.getElementById("research-results");
  const showState = document.getElementById("show-state");
  const showNbSeasons = document.getElementById("show-nb-seasons");
  const showSubmit = document.getElementById("show-submit");
  const averageTimeInput = document.getElementById("show-time");
  const showLogo = document.getElementById("show-logo");

  const showSeasons = document.getElementById("show-seasons");

  if (!showForm) return;

  initGenres(genresInput, genres);

  searchAllShows(titleInput, searchResult);

  showNbSeasons.addEventListener("change", () => {
    if (showNbSeasons.value > 0) {
      showSeasons.innerHTML = "";

      for (let index = 1; index <= showNbSeasons.value; index++) {
        const liSeason = document.createElement("li");
        liSeason.classList.add("is-flex");
        const spanSeason = document.createElement("span");
        spanSeason.classList.add("mr-3");
        spanSeason.textContent = `Saison ${index} :`;
        const inputSeason = document.createElement("input");
        inputSeason.placeholder = "Nombre d'épisodes…";
        inputSeason.classList.add("input");
        inputSeason.type = "number";
        inputSeason.id = `season-${index}`;
        inputSeason.style.width = "200px";
        inputSeason.required = true;
        liSeason.append(spanSeason, inputSeason);
        showSeasons.appendChild(liSeason);
      }
    }
  });

  showForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const titleShow = titleInput.value;
    const averageTimeShow = averageTimeInput.value;
    const stateShow = showState.value;
    const nbSeasonsShow = showNbSeasons.value;
    const logoShow = showLogo.value;

    const selectedGenres = $(genresInput).val();
    const genresShow = selectedGenres.join(" ; ");

    try {
      const idShow = await addingShow(titleShow, genresShow, averageTimeShow, stateShow, nbSeasonsShow, logoShow);
    } catch (error) {
      console.error(error);
      return;
    }

    for (let index = 1; index <= nbSeasonsShow; index++) {
      const nbSeason = index;
      const nbEpisodes = document.getElementById(`season-${index}`).value;

      try {
        await addSeason(nbSeason, idShow.id, nbEpisodes)
      } catch (error) {
        console.error(error)
        return;
      }
    };

    showForm.reset();
    titleInput.focus();

  });
}