import { nationalities } from "/Elina/js/data/nationalities.js";
import { createRoleBlock } from "/Elina/js/modules/castings/casting.dom.js";
import { getAllIncompleteMovies, getMovie } from "/Elina/js/services/movies.service.js";
import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initNationalities, initPeopleSelect, initPeopleSelect2NewTag, bindPeopleModalNewTag } from "/Elina/js/ui/select.js";

export async function completeMovie(uuid) {
    const movie = await getMovie(uuid);
    const people = await getAllPeople();

    const movieTitle = document.getElementById("movie-title")
    movieTitle.textContent = movie.title;

    const selectDirectors = [document.getElementById("select-director-1"), document.getElementById("select-director-2"), document.getElementById("select-director-3")];
    selectDirectors.forEach(select => {
        initPeopleSelect(select, people);
        initPeopleSelect2NewTag(select, "Réalisateur…");
        bindPeopleModalNewTag(select);
    });

    const selectScriptwriters = [document.getElementById("select-scriptwriter-1"), document.getElementById("select-scriptwriter-2")];
    selectScriptwriters.forEach(select => {
        initPeopleSelect(select, people);
        initPeopleSelect2NewTag(select, "Scénariste…");
        bindPeopleModalNewTag(select);
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

    const addDirector = document.getElementById("add-director");
    const divDirector2 = document.getElementById("div-director-2");
    const deleteDirector2 = document.getElementById("delete-director-2");
    const divDirector3 = document.getElementById("div-director-3");
    const deleteDirector3 = document.getElementById("delete-director-3");

    const addScriptwriter = document.getElementById("add-scriptwriter");
    const divScriptwriter2 = document.getElementById("div-scriptwriter-2");
    const deleteScriptwriter2 = document.getElementById("delete-scriptwriter-2");

    const addRole = document.getElementById("add-role");
    const divRoles = document.getElementById("div-roles");

    addDirector.addEventListener("click", () => {
        if (divDirector2.classList.contains("is-hidden")) {
            divDirector2.classList.remove("is-hidden")
        } else {
            divDirector3.classList.remove("is-hidden");
            deleteDirector2.classList.add("is-hidden");
            addDirector.disabled = true;
        }
    });

    deleteDirector2.addEventListener("click", () => {
        divDirector2.classList.add("is-hidden");
    });

    deleteDirector3.addEventListener("click", () => {
        divDirector3.classList.remove("is-hidden");
        deleteDirector2.classList.remove("is-hidden");
        addDirector.disabled = false;
    });

    addScriptwriter.addEventListener("click", () => {
        divScriptwriter2.classList.remove("is-hidden");
        addScriptwriter.disabled = true;
    });

    deleteScriptwriter2.addEventListener("click", () => {
        divScriptwriter2.classList.add("is-hidden");
        addScriptwriter.disabled = false;
    });

    addRole.addEventListener("click", () => {
        const role = createRoleBlock();
        divRoles.appendChild(role.columns);
        initPeopleSelect(role.selectActor, people);
        initPeopleSelect2NewTag(role.selectActor, "Acteur…");
        bindPeopleModalNewTag(role.selectActor);
    });
}

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