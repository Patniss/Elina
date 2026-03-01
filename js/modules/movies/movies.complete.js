import { getMovie } from "/Elina/js/services/movies.service.js";
import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag } from "/Elina/js/ui/select.js";

export async function completeMovie(uuid) {
    const movieTitle = document.getElementById("movie-title");

    const addDirector = document.getElementById("add-director");
    const addScriptwriter = document.getElementById("add-scriptwriter");
    const addRole = document.getElementById("add-role");

    const selectDirector1 = document.getElementById("select-director-1");
    const divDirector2 = document.getElementById("div-director-2");
    const deleteDirector2 = document.getElementById("delete-director-2");
    const selectDirector2 = document.getElementById("select-director-2");
    const divDirector3 = document.getElementById("div-director-3");
    const deleteDirector3 = document.getElementById("delete-director-3");
    const selectDirector3 = document.getElementById("select-director-3");

    const selectDirectors = [selectDirector1, selectDirector2, selectDirector3];

    const selectScriptwriter1 = document.getElementById("select-scriptwriter-1");
    const divScriptwriter2 = document.getElementById("div-scriptwriter-2");
    const deleteScriptwriter2 = document.getElementById("delete-scriptwriter-2");
    const selectScriptwriter2 = document.getElementById("select-scriptwriter-2");

    const selectScriptwriters = [selectScriptwriter1, selectScriptwriter2];
    
    const divRoles = document.getElementById("div-roles");

    const submitComplete = document.getElementById("submit");

    const movie = getMovie(uuid);

    movieTitle.textContent = movie.title;

    const people = getAllPeople();
    console.log(people);
    selectDirectors.forEach(select => { initPeopleSelect(select, people) });
    selectScriptwriters.forEach(select => { initPeopleSelect(select, people) });
    selectDirectors.forEach(select => { initPeopleSelect2NewTag(select, "Réalisateur…") });
    selectScriptwriters.forEach(select => { initPeopleSelect2NewTag(select, "Scénariste…") });
}