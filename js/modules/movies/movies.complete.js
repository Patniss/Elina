import { nationalities } from "/Elina/js/data/nationalities.js";
import { createRoleBlock } from "/Elina/js/modules/castings/casting.dom.js";
import { addDirectorMovieCasting, addScriptwriterMovieCasting, addActorMovieCasting } from "/Elina/js/services/castings.service.js";
import { getAllIncompleteMovies, getMovie, movieComplete } from "/Elina/js/services/movies.service.js";
import { getAllPeople, addPeople } from "/Elina/js/services/people.service.js";
import { handleButtonState } from "/Elina/js/ui/button.js";
import { initNationalities, initPeopleSelect, initPeopleSelect2NewTag, bindPeopleModalNewTag, addPeopleToAllSelects, activePeopleSelect, pendingTagText, clearPeopleSelectState } from "/Elina/js/ui/select.js";

export async function completeMovie(uuid) {
    const submit = document.getElementById("submit");

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
    const deleteRole = document.getElementById("delete-role");

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

    let index = 0;

    addRole.addEventListener("click", () => {
        index += 1;
        const role = createRoleBlock(index);
        deleteRole.classList.remove("is-hidden");
        divRoles.appendChild(role.columns);
        initPeopleSelect(role.selectActor, people);
        initPeopleSelect2NewTag(role.selectActor, "Acteur…");
        bindPeopleModalNewTag(role.selectActor);
    });

    deleteRole.addEventListener("click", () => {
        document.getElementById(`div-role-${index}`).remove();
        index -= 1;
        if (index === 0) {
            deleteRole.classList.add("is-hidden");
        }
    });

    const firstnameNewPeopleInput = document.getElementById("firstname");
    const lastnameNewPeopleInput = document.getElementById("lastname");
    const birthdateNewPeopleInput = document.getElementById("birthdate");
    const deathdateNewPeopleInput = document.getElementById("deathdate");
    const selectJobs = document.getElementById('jobs');

    const submitNewPeople = document.getElementById("add-people");

    submitNewPeople.addEventListener("click", async (e) => {
        e.preventDefault();

        const selectedValues = Array.from(selectJobs.selectedOptions).map(option => option.value);
        const firstnameNewPeople = firstnameNewPeopleInput.value;
        const lastnameNewPeople = lastnameNewPeopleInput.value;
        const birthdateNewPeople = birthdateNewPeopleInput.value;
        const deathdateNewPeople = isDead.checked ? deathdateNewPeopleInput.value : null;
        const selectedNationalities = Array.from(selectNationalities.selectedOptions).map(option => option.value);
        const nationalitiesNewPeople = selectedNationalities.join(' ');
        const jobsNewPeople = selectedValues.join(' ');

        handleButtonState(submitNewPeople, "loading");

        try {
            const idNewPeople = await addPeople(firstnameNewPeople, lastnameNewPeople, birthdateNewPeople, nationalitiesNewPeople, jobsNewPeople, deathdateNewPeople);

            setTimeout(() => {
                handleButtonState(submitNewPeople, "stop-loading");
            }, 500);

            const allSelects = [
            document.getElementById("select-director-1"),
            document.getElementById("select-director-2"),
            document.getElementById("select-director-3"),
            document.getElementById("select-scriptwriter-1"),
            document.getElementById("select-scriptwriter-2")];

            for (let i = 1; i <= index; i++) {
                allSelects.push(document.getElementById(`select-actor-${i}`))
            }

            const fullName = `${firstnameNewPeople} ${lastnameNewPeople}`;

            addPeopleToAllSelects(allSelects, idNewPeople, fullName);

            if (activePeopleSelect && pendingTagText) {
                $(activePeopleSelect)
                    .find(`option[value="${pendingTagText}"]`)
                    .remove();
                
                const option = new Option(fullName, idNewPeople, true, true);
                
                $(activePeopleSelect).append(option).trigger('change');
                
                clearPeopleSelectState();

                document.getElementById("people-form").reset();
                document.getElementById("add-new-people-modal").classList.remove("is-active");
            }
        } catch (error) {
            console.error(error);
            handleButtonState(submitNewPeople, "error");
        }
    });

    submit.addEventListener("click", async (e) => {
        e.preventDefault();
        handleButtonState(submit, "loading");

        const director1 = document.getElementById("select-director-1");
        const director2 = document.getElementById("select-director-2");
        const director3 = document.getElementById("select-director-3");
        const scriptwriter1 = document.getElementById("select-scriptwriter-1");
        const scriptwriter2 = document.getElementById("select-scriptwriter-2");

        if (director1.value === "") {
            alert("Vous devez choisir un réalisateur.")
            return;
        }

        try {
            addDirectorMovieCasting(uuid, director1.value);
            if (director2.value) addDirectorMovieCasting(uuid, director2.value);
            if (director3.value) addDirectorMovieCasting(uuid, director3.value);
            if (scriptwriter1.value) addScriptwriterMovieCasting(uuid, scriptwriter1.value);
            if (scriptwriter2.value) addScriptwriterMovieCasting(uuid, scriptwriter2.value);

            for (let i = 1; i <= index; i++) {
                const actor = document.getElementById(`select-actor-${i}`).value;
                const role = document.getElementById(`name-role-${i}`).value;
                const typeRole = document.querySelector(`input[name="typeRole-${i}"]:checked`)?.value;
                addActorMovieCasting(uuid, actor, role, typeRole, i);
            }

            movieComplete(uuid);

            window.location = `/Elina/entertainment/movies/movie.html?id=${uuid}`;

        } catch (error) {
            console.error(error);
        }
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