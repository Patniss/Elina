import { genres } from "/Elina/js/data/genres.js";
import { searchAllShows } from "/Elina/js/modules/shows/shows.search.js";
import { addSeason } from "/Elina/js/services/seasons.service.js";
import { addingShow } from "/Elina/js/services/shows.service.js";
import { handleButtonState } from "/Elina/js/ui/button.js";
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

        const divSeason = document.createElement("div");
        divSeason.classList.add("is-flex");

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
        const inputPoster = document.createElement("input");
        inputPoster.placeholder = `Poster de la saison ${index}`;
        inputPoster.classList.add("input");
        inputPoster.type = "text";
        inputPoster.id = `poster-${index}`;
        inputPoster.style.width = "500px";
        inputPoster.required = true;
        divSeason.append(spanSeason, inputSeason, inputPoster);

        const textSynopsis = document.createElement("textarea");
        textSynopsis.placeholder = `Synopsis de la saison ${index}`;
        textSynopsis.classList.add("textarea");
        textSynopsis.id = `synopsis-${index}`;
        textSynopsis.required = true;

        liSeason.append(divSeason, textSynopsis);
        showSeasons.appendChild(liSeason);
      }
    }
  });

  showForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    handleButtonState(showSubmit, "loading");

    const titleShow = titleInput.value;
    const averageTimeShow = averageTimeInput.value;
    const stateShow = showState.value;
    const nbSeasonsShow = showNbSeasons.value;
    const logoShow = showLogo.value;

    const selectedGenres = $(genresInput).val();
    const genresShow = selectedGenres.join(" ; ");

    let idShow;

    try {
      idShow = await addingShow(titleShow, genresShow, averageTimeShow, stateShow, nbSeasonsShow, logoShow);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        handleButtonState(showSubmit, "error");
      }, 250);
      return;
    }

    for (let index = 1; index <= nbSeasonsShow; index++) {
      const nbSeason = index;
      const nbEpisodes = document.getElementById(`season-${index}`).value;
      const poster = document.getElementById(`poster-${index}`).value;
      const synopsis = document.getElementById(`synopsis-${index}`).value;

      try {
        await addSeason(nbSeason, idShow.id, nbEpisodes, poster, synopsis)
      } catch (error) {
        setTimeout(() => {
          handleButtonState(showSubmit, "error");
        }, 250);
        console.error(error)
        return;
      }
    };

    setTimeout(() => {
      handleButtonState(showSubmit, "stop-loading");
      showForm.reset();
      titleInput.focus();
      showSeasons.innerHTML = "";
      genresInput.value = "";
    }, 500);

  });
}