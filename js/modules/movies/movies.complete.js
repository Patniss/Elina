import { getMovie } from "/Elina/js/services/movies.service.js";
import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag, bindPeopleSelectEvents } from "/Elina/js/ui/select.js";

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

    const people = await getAllPeople();
    selectDirectors.forEach(select => { initPeopleSelect(select, people) });
    selectScriptwriters.forEach(select => { initPeopleSelect(select, people) });
    selectDirectors.forEach(select => { initPeopleSelect2NewTag(select, "Réalisateur…") });
    selectScriptwriters.forEach(select => { initPeopleSelect2NewTag(select, "Scénariste…") });

    addDirector.addEventListener("click", () => {
        if (divDirector2.classList.contains("is-hidden")) {
            divDirector2.classList.remove("is-hidden");
            if (deleteDirector2.classList.contains("is-hidden")) deleteDirector2.classList.remove("is-hidden");
            selectDirector2.required = true;
        } else {
            divDirector3.classList.remove("is-hidden");
            deleteDirector2.classList.add("is-hidden");
            selectDirector3.required = true;
        }
    });

    addScriptwriter.addEventListener("click", () => {
        divScriptwriter2.classList.remove("is-hidden");
        selectScriptwriter2.required = true;
    })

    deleteDirector2.addEventListener("click", () => {
        divDirector2.classList.add("is-hidden");
        if (deleteDirector2.classList.contains("is-hidden")) deleteDirector2.classList.remove("is-hidden");
        selectDirector2.required = false;
    });

    deleteDirector3.addEventListener("click", () => {
        divDirector3.classList.add("is-hidden");
        deleteDirector2.classList.remove("is-hidden");
        selectDirector3.required = false;
    });

    deleteScriptwriter2.addEventListener("click", () => {
        divScriptwriter2.classList.add("is-hidden");
        selectScriptwriter2.required = false;
    });

    selectDirectors.forEach(select => {
        bindPeopleSelectEvents(select, {
            onCreate: ({ firstName, lastName }) => {
                console.log("Ajout director :", firstName, lastName);
            },
            onClear: () => {
                console.log("Director supprimé");
            }
        });
    });
    
    selectScriptwriters.forEach(select => {
        bindPeopleSelectEvents(select, {
            onCreate: ({ firstName, lastName }) => {
                console.log("Ajout scriptwriter :", firstName, lastName);
            },
            onClear: () => {
                console.log("Scénariste supprimé");
            }
        });
    });
}