import { nationalities } from "/Elina/js/data/nationalities.js";
import { getAllIncompleteMovies, getMovie } from "/Elina/js/services/movies.service.js";
import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initNationalities, initPeopleSelect, initPeopleSelect2NewTag, bindPeopleModalNewTag } from "/Elina/js/ui/select.js";

export async function displayAllIncompleteMovies() {
    const container = document.getElementById("list-incomplete-movies");
    const movies = await getAllIncompleteMovies();

    movies.forEach(async (movie) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/Elina/entertainment/movies/complete.html?id=${movie.id}`;
        link.textContent = movie.title;
        li.appendChild(link);
        container.appendChild(li);
    });
}

export async function completeMovie(uuid) {
    const movie = await getMovie(uuid);
    const people = await getAllPeople();

    const movieTitle = document.getElementById("movie-title")
    movieTitle.textContent = movie.title;

    const selectDirectors = [document.getElementById("select-director-1"), document.getElementById("select-director-2"), document.getElementById("select-director-2")];
    selectDirectors.forEach(select => {
        initPeopleSelect(select, people);
        initPeopleSelect2NewTag(select, "Réalisateur…");
        bindPeopleModalNewTag(select);
    });

    const selectScriptwriters = [document.getElementById("select-scriptwriter-1"), document.getElementById("select-scriptwriter-2")];
    selectScriptwriters.forEach(select => {
        initPeopleSelect(select, people);
        initPeopleSelect2NewTag(select, "Scénariste…");
        bindPeopleModalNewTag(bindPeopleModalNewTag);
    });

    const selectNationalities = document.getElementById("nationalities");
    initNationalities(selectNationalities, nationalities);

    const isDead = document.getElementById("isDead");
    const divDeathdate = document.getElementById("div-deathdate");
    isDead.addEventListener("change", () => {
        if (isDead.checked) {
            divDeathdate.classList.remove("is-hidden");
        } else {
            divDeathdate.classList.add("is-hidden");
        }
    });

    const jobs = document.getElementById("jobs");
    $(jobs).select2({
        placeholder: "Métiers…",
        allowClear: true
    });
}