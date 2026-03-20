import { genres } from "/Elina/js/data/genres.js";
import { addDrama } from "/Elina/js/services/dramas.service.js";
import { addDramaEpisode } from "/Elina/js/services/dramasEpisodes.service.js";
import { addDramaTag } from "/Elina/js/services/dramasTags.service.js";
import { getAllTags } from "/Elina/js/services/tags.service.js";
import { initGenres, initTags } from "/Elina/js/ui/select.js";

export async function addingDrama() {
    const titleInput = document.getElementById("drama-title");
    const nbEpisodesInput = document.getElementById("drama-nb-episodes");
    const averageTimeInput = document.getElementById("drama-average-time");
    const exactTimeInput = document.getElementById("drama-exact-time");
    const genresInput = document.getElementById("drama-genres");
    const tagsInput = document.getElementById("drama-tags");
    const synopsisInput = document.getElementById("drama-synopsis");
    const posterInput = document.getElementById("drama-poster");
    const divTimeDrama = document.getElementById("div-drama-time");
    const hiddenDramaTime = document.getElementById("drama-time-hidden");

    const submitDrama = document.getElementById("drama-submit");

    initGenres(genresInput, genres);

    const allTags = await getAllTags();
    const dataTags = allTags.map(obj => [obj.id, obj.tag, obj.color_tag, obj.trad, obj.categorie]);
    initTags(tagsInput, dataTags);

    function episodesTimesInput() {
        if (exactTimeInput.checked === true) {
            if (nbEpisodesInput.value === "" || nbEpisodesInput.value <= 0) {
                alert("Vous devez d'abord ajouter le nombre d'épisodes.");
                exactTimeInput.checked = false;
                return;
            } else {
                hiddenDramaTime.classList.remove("is-hidden");
                divTimeDrama.innerHTML = "";
                const olEpisodes = document.createElement("ol");
                olEpisodes.classList.add("grid");
                divTimeDrama.appendChild(olEpisodes);
                for (let index = 1; index <= nbEpisodesInput.value; index++) {
                    const liEpisode = document.createElement("li");
                    liEpisode.classList.add("cell");
                    const inputExactTime = document.createElement("input");
                    inputExactTime.placeholder = `Temps épisode ${index}`;
                    inputExactTime.classList.add("input");
                    inputExactTime.type = "number";
                    inputExactTime.id = `drama-time-ep-${index}`;
                    inputExactTime.style.width = "200px";
                    inputExactTime.required = true;
                    inputExactTime.value = averageTimeInput.value;
                    liEpisode.appendChild(inputExactTime);
                    olEpisodes.appendChild(liEpisode);
                }
            }
        } else {
            divTimeDrama.innerHTML = "";
            hiddenDramaTime.classList.add("is-hidden");
        }
    };

    exactTimeInput.addEventListener("change", () => {
        episodesTimesInput();
    });

    nbEpisodesInput.addEventListener("change", () => {
        if (exactTimeInput.checked === true) {
            episodesTimesInput();
        } else return;
    });

    submitDrama.addEventListener("click", async () => {
       const titleDrama = titleInput.value;
       const nbEpisodesDrama = nbEpisodesInput.value;
       const posterDrama = posterInput.value;
       const synopsisDrama = synopsisInput.value;

       let selectedGenres = $(genresInput).val() || [];
       let dramasGenres = selectedGenres.join(" ; ");

       let selectedTags = $(tagsInput).val() || [];

       const completeDrama = exactTimeInput.checked === true ? true : false;

       try {
        idDrama = await addDrama(titleDrama, dramasGenres, nbEpisodesDrama, synopsisDrama, posterDrama, completeDrama);
        selectedTags.forEach(async (tag) => {
            await addDramaTag(idDrama, tag);
        });
        if (exactTimeInput.checked) {
            for (let ep = 1; ep <= nbEpisodesDrama; ep++) {
                const timeInput = document.getElementById(`drama-time-ep-${ep}`);
                const time = timeInput.value;
                await addDramaEpisode(ep, idDrama, time);
            }
        }
       } catch (error) {
        console.error(error);
        return;
       }
    });
}