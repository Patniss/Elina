import { genres } from "/Elina/js/data/genres.js";
import { getAllTags } from "/Elina/js/services/tags.service.js";
import { initGenres, initTags } from "/Elina/js/ui/select.js";

export async function addDrama() {
    const titleInput = document.getElementById("drama-title");
    const nbEpisodesInput = document.getElementById("drama-nb-episodes");
    const averageTimeInput = document.getElementById("drama-average-time");
    const exactTimeInput = document.getElementById("drama-exact-time");
    const genresInput = document.getElementById("drama-genres");
    const tagsInput = document.getElementById("drama-tags");
    const posterInput = document.getElementById("drama-poster");
    const divTimeDrama = document.getElementById("div-drama-time");

    initGenres(genresInput, genres);

    const allTags = await getAllTags();
    console.log(allTags);
    initTags(tagsInput, allTags);

    exactTimeInput.addEventListener("change", () => {
        if (exactTimeInput.checked === true) {
            if (nbEpisodesInput.value === "" || nbEpisodesInput.value <= 0) {
                alert("Vous devez d'abord ajouter le nombre d'épisodes.");
                exactTimeInput.checked = false;
                return;
            } else {
                divTimeDrama.innerHTML = "";
                const olEpisodes = document.createElement("ol");
                divTimeDrama.appendChild(olEpisodes);
                for (let index = 1; index <= nbEpisodesInput.value; index++) {
                    const liEpisode = document.createElement("li");
                    const inputExactTime = document.createElement("input");
                    inputExactTime.placeholder = `Temps épisode ${index}`;
                    inputExactTime.classList.add("input");
                    inputExactTime.type = "number";
                    inputExactTime.id = `drama-time-ep-${index}`;
                    inputExactTime.style.width = "200px";
                    inputExactTime.required = true;
                    liEpisode.appendChild(inputExactTime);
                    olEpisodes.appendChild(liEpisode);
                }
            }
        } else {
            divTimeDrama.innerHTML = "";
            const inputAverageTime = document.createElement("input");
            inputAverageTime.placeholder = "Temps moyen en minutes…";
            inputAverageTime.classList.add("input");
            inputAverageTime.type = "number";
            inputAverageTime.id = "drama-average-time";
            inputAverageTime.style.width = "200px";
            inputAverageTime.required = true;
            divTimeDrama.appendChild(inputAverageTime);
        }
    })
}