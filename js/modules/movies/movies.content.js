import { nationalities } from "/Elina/js/data/nationalities.js";
import { clickAddMovieUser, clickDeleteMovieUser, clickToseeMovieUser, clickSeenMovieUser } from "/Elina/js/modules/usersMovies/usersMovies.actions.js";
import { getDirectorsMovie, getScriptwritersMovie, getActorsMovies, addMovieCasting } from "/Elina/js/services/castings.service.js";
import { getMovie } from "/Elina/js/services/movies.service.js";
import { getPeople, getAllPeople, addPeople } from "/Elina/js/services/people.service.js";
import { getUserMovie, updateDateSeenMovie, updateFavMovie, updateOwnPoster} from "/Elina/js/services/usersMovies.service.js";
import { toggleBtnSeenStatut } from "/Elina/js/ui/dom.js";
import { renderGenres } from "/Elina/js/ui/render.js";
import { initPeopleSelect, initPeopleSelect2NewTag, initNationalities } from "/Elina/js/ui/select.js";
import { formatMovieDuration, formatFrenchTypography, formatCompleteDate, parseFullName } from "/Elina/js/utils/format.js";

let btnCastMovie = "";

export async function completeMovie(movieId) {
    const selectPeople = document.getElementById("select-people");
    const nationalitiesPeople = document.getElementById("nationalities-people");
    const btnAddCast = document.getElementById("btn-add-cast");
    let peopleId;

    const people = await getAllPeople();

    initPeopleSelect(selectPeople, people);
    initPeopleSelect2NewTag(selectPeople, "Saisir un nom…");
    initNationalities(nationalitiesPeople, nationalities);

    $(selectPeople).on("select2:select", function (e) {
        const data = e.params.data;

        if (data.newTag) {
            document.getElementById("div-add-people").classList.remove("is-hidden");
            document.getElementById("div-choose-people").classList.add("is-hidden");

            const firstnamePeople = document.getElementById("firstname-people");
            const lastnamePeople = document.getElementById("lastname-people");
            const birthdatePeople = document.getElementById("birthdate-people");
            const isDeadPeople = document.getElementById("is-dead-people");
            const deathdatePeople = document.getElementById("deathdate-people");
            const cancelAdd = document.getElementById("btn-cancel-add-people");
            const btnAddPeople = document.getElementById("btn-add-people");

            firstnamePeople.required = true;
            lastnamePeople.required = true;
            birthdatePeople.required = true;
            nationalitiesPeople.required = true;

            const { firstName, lastName } = parseFullName(data.text);
            firstnamePeople.value = firstName;
            lastnamePeople.value = lastName;

            isDeadPeople.addEventListener("change", () => {
                if (isDeadPeople.checked) {
                    document.getElementById("div-deathdate-people").classList.remove("is-hidden");
                    deathdatePeople.required = true;
                } else {
                    document.getElementById("div-deathdate-people").classList.add("is-hidden");
                    deathdatePeople.required = false;
                }
            });

            cancelAdd.addEventListener("click", () => {
                document.getElementById("div-add-people").classList.add("is-hidden");
                document.getElementById("div-choose-people").classList.remove("is-hidden");

                firstnamePeople.required = false;
                lastnamePeople.required = false;
                birthdatePeople.required = false;
                nationalitiesPeople.required = false;
                deathdatePeople.required = false;
            });

            btnAddPeople.addEventListener("click", async () => {
                const firstnameValue = firstnamePeople.value;
                const lastnameValue = lastnamePeople.value;
                const birthdateValue = birthdatePeople.value;
                const deathdateValue = isDeadPeople.checked ? deathdatePeople.value : null;

                let selectedNationalities = $(nationalitiesPeople).val();
                const nationalitiesValue = selectedNationalities.join(" ");

                if (!firstnameValue || !lastnameValue || !birthdateValue || !selectedNationalities || (isDeadPeople.checked && !deathdateValue)) {
                    alert("Veuillez remplir tous les champs nécessaires.");
                    return;
                };

                try {
                    peopleId = await addPeople(firstnameValue, lastnameValue, birthdateValue, nationalitiesValue, deathdateValue);
                    await addMovieCasting(movieId, peopleId, btnCastMovie);
                } catch (error) {
                    console.error(error);
                    return;
                }
                
                document.getElementById("div-add-people").classList.add("is-hidden");
                document.getElementById("div-choose-people").classList.remove("is-hidden");
                $(selectPeople).val(null).trigger('change');
            });
        }
    });

    btnAddCast.addEventListener("click", async () => {
        const values = $(selectPeople).val();
        peopleId = values ? values[0] : null;
        if (!peopleId) {
            alert("Veuillez sélectionner un people.");
            return;
        }

        try {
            await addMovieCasting(movieId, peopleId, btnCastMovie);
        } catch (error) {
            console.error(error);
            return;
        }

        document.getElementById("add-cast").classList.remove("is-active");
    });
}

export async function majCast(castings, container) {
    castings.forEach(async (c, index) => {
        const isLast = index === castings.length - 1;

        const cast = await getPeople(c.people_id);
        const nameCast = `${cast.firstname} ${cast.lastname}`;

        const liCast = document.createElement("li");
        liCast.classList.add("mr-3");
        const linkCast = document.createElement("a");
        linkCast.href = `/Elina/entertainment/people/people.html?id=${c.id_people}`;
        linkCast.textContent = nameCast;
        liCast.appendChild(linkCast);
        container.appendChild(liCast);

        if (!isLast) {
            const liSep = document.createElement("li");
            liSep.classList.add("mr-3");
            liSep.innerHTML = "&#x2022;";
            container.appendChild(liSep);
        }
    });
}

export async function movieContent(uuid) {
    const movie = await getMovie(uuid);
    const userMovie = await getUserMovie(uuid);
    const poster = userMovie?.own_poster ?? movie.poster;
    const statut = userMovie ? userMovie.seen : null;
    const dateSeen = userMovie?.date_seen === "1900-01-01" ? null : userMovie?.date_seen ?? null;
    let fav = userMovie?.fav ?? null;
    
    const movieTitle = document.getElementById("movie-title");
    movieTitle.textContent = movie.title;

    const movieYear = document.getElementById("movie-year");
    movieYear.textContent = movie.year;

    const moviePoster = document.getElementById("movie-poster");
    moviePoster.src = poster;

    const modalPoster = document.getElementById("modal-poster");
    modalPoster.src = poster;
    
    const movieTime = document.getElementById("movie-time");
    movieTime.textContent = formatMovieDuration(movie.time);

    const movieSynopsis = document.getElementById("movie-synopsis");
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);

    const movieGenres = document.getElementById("movie-genres");
    renderGenres(movieGenres, movie.genres);

    const btnAddMovie = document.getElementById("button-add-movie");
    const btnToseeMovie = document.getElementById("button-tosee-movie");
    const btnDeleteMovie = document.getElementById("button-supp-movie");
    const btnSeenMovie = document.getElementById("button-seen-movie");

    toggleBtnSeenStatut(statut, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);

    const divSeenMovie = document.getElementById("div-seen");
    const dateSeenMovie = document.getElementById("movie-date-seen");

    clickAddMovieUser(btnAddMovie, uuid);
    btnAddMovie.addEventListener("click", async () => {
        toggleBtnSeenStatut(false, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);
    });

    clickToseeMovieUser(btnToseeMovie, uuid);
    btnToseeMovie.addEventListener("click", async () => {
        divSeenMovie.classList.remove("is-hidden");
        toggleBtnSeenStatut(true, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);
        dateSeenMovie.textContent = "Ajouter une date";
    });

    clickDeleteMovieUser(btnDeleteMovie, uuid);
    btnDeleteMovie.addEventListener("click", async () => {
        toggleBtnSeenStatut(null, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);
    });

    clickSeenMovieUser(btnSeenMovie, uuid);
    btnSeenMovie.addEventListener("click", async () => {
        toggleBtnSeenStatut(false, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);
        divSeenMovie.classList.add("is-hidden");
    });

    const movieFav = document.getElementById("movie-fav");
    movieFav.addEventListener("click", async () => {
        if (fav !== "fav") {
            updateFavMovie(uuid, "fav");
            movieFav.classList.add("has-text-primary");
            movieUnlike.classList.add("is-hidden");
            fav = "fav";
        } else {
            updateFavMovie(uuid, null);
            movieFav.classList.remove("has-text-primary");
            movieUnlike.classList.remove("is-hidden");
            fav = null;
        }
    });

    const movieUnlike = document.getElementById("movie-unlike");
    movieUnlike.addEventListener("click", async () => {
        if (fav !== "unlike") {
            updateFavMovie(uuid, "unlike");
            movieUnlike.classList.add("has-text-primary");
            movieFav.classList.add("is-hidden");
            fav = "unlike";
        } else {
            updateFavMovie(uuid, null);
            movieUnlike.classList.remove("has-text-primary");
            movieFav.classList.remove("is-hidden");
            fav = null;
        }
    });

    if (statut === true) {
        divSeenMovie.classList.remove("is-hidden");
        dateSeenMovie.textContent = dateSeen? formatCompleteDate(dateSeen) : "Ajouter une date";
        if (fav === "fav") {
            movieUnlike.classList.add("is-hidden");
            movieFav.classList.add("has-text-primary");
        } else if (fav === "unlike") {
            movieFav.classList.add("is-hidden");
            movieUnlike.classList.add("has-text-primary");
        }
    };

    const btnChangeDate = document.getElementById("button-change-date-seen");
    const inputChangeDate = document.getElementById("input-change-date-seen");
    btnChangeDate.addEventListener("click", async() => {
        if (!inputChangeDate.value) return;
        updateDateSeenMovie(uuid, inputChangeDate.value);
        dateSeenMovie.textContent = formatCompleteDate(inputChangeDate.value);
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    const btnNullDate = document.getElementById("button-null-date-seen");
    btnNullDate.addEventListener("click", () => {
        updateDateSeenMovie(uuid, null);
        dateSeenMovie.textContent = "Ajouter une date";
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    const addOwnPoster = document.getElementById("add-own-poster");
    addOwnPoster.addEventListener("click", () => {
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
        const changeOwnPoster = document.getElementById("change-own-poster");
        changeOwnPoster.classList.add("is-active");
    });

    const btnChangeOwnPoster = document.getElementById("button-change-own-poster");
    btnChangeOwnPoster.addEventListener("click", () => {
        const inputChangeOwnPoster = document.getElementById("input-change-own-poster");
        if (inputChangeOwnPoster) {
            updateOwnPoster(uuid, inputChangeOwnPoster.value);
            moviePoster.src = inputChangeOwnPoster.value;
            modalPoster.src = inputChangeOwnPoster.value;
            const modal = document.querySelector('.modal.is-active');
            if (modal) modal.classList.remove('is-active');
        }
    });

    const btnNullOwnPoster = document.getElementById("button-null-own-poster");
    btnNullOwnPoster.addEventListener("click", () => {
        updateOwnPoster(uuid, null);
        moviePoster.src = movie.poster;
        modalPoster.src = movie.poster;
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    const divRole = document.getElementById("div-role-cast");
    
    const directors = await getDirectorsMovie(uuid);
    const movieDirectors = document.getElementById("directors");
    if (directors.length === 0) {
        const btnAddDirector = document.createElement("button");
        btnAddDirector.classList.add("button", "tag", "is-link");
        btnAddDirector.textContent = "Ajouter un réalisateur";
        movieDirectors.appendChild(btnAddDirector);

        btnAddDirector.addEventListener("click", () => {
            document.getElementById("add-cast").classList.add("is-active");
            document.getElementById("title-add-cast").innerHTML = `Ajouter un.e réalisateur.rice au film <i class="has-text-primary">${movie.title}</i>`;
            document.getElementById("label-choose-people").textContent = "Choisir un.e réalisateur.rice";
            document.getElementById("subtitle-add-people").textContent = "Ajouter un.e nouveau.elle réalisateur.rice à la base de données";
            document.getElementById("span-add-cast").textContent = "Ajouter le réalisateur";
            divRole.classList.add("is-hidden");
            document.getElementById("role-cast").required = false;
            btnCastMovie = "director";
        });
    } else {
        await majCast(directors, movieDirectors);
    };

    const scriptwriters = await getScriptwritersMovie(uuid);
    const movieScriptwriters = document.getElementById("scriptwriters");
    if (scriptwriters.length === 0) {
        const btnAddScriptwriter = document.createElement("button");
        btnAddScriptwriter.classList.add("button", "tag", "is-link");
        btnAddScriptwriter.textContent = "Ajouter un scénariste";
        movieScriptwriters.appendChild(btnAddScriptwriter);

        btnAddScriptwriter.addEventListener("click", () => {
            document.getElementById("add-cast").classList.add("is-active");
            document.getElementById("title-add-cast").innerHTML = `Ajouter un.e scénariste au film <i class="has-text-primary">${movie.title}</i>`;
            document.getElementById("label-choose-people").textContent = "Choisir un.e scénariste";
            document.getElementById("subtitle-add-people").textContent = "Ajouter un.e nouveau.elle scénariste à la base de données";
            document.getElementById("span-add-cast").textContent = "Ajouter le scénariste";
            divRole.classList.add("is-hidden");
            document.getElementById("role-cast").required = false;
            btnCastMovie = "scriptwriter";
        });
    } else {
        await majCast(scriptwriters, movieScriptwriters);
    };

    const actors = await getActorsMovies(uuid);
    const movieActorsDiv = document.getElementById("div-actors");
    if (actors.length > 0) {
        // majCastActors
    }
    if (!movie.complete) {
        const btnAddActor = document.createElement("button");
        btnAddActor.classList.add("button", "tag", "is-link");
        btnAddActor.textContent = "Ajouter un acteur";
        movieActorsDiv.appendChild(btnAddActor);

        btnAddActor.addEventListener("click", () => {
            document.getElementById("add-cast").classList.add("is-active");
            document.getElementById("title-add-cast").innerHTML = `Ajouter un.e acteur.rice au film <i class="has-text-primary">${movie.title}</i>`;
            document.getElementById("label-choose-people").textContent = "Choisir un.e acteur.rice";
            document.getElementById("subtitle-add-people").textContent = "Ajouter un.e nouveau.elle acteur.rice à la base de données";
            document.getElementById("span-add-cast").textContent = "Ajouter l'acteur.rice";
            divRole.classList.remove("is-hidden");
            document.getElementById("role-cast").required = true;
            btnCastMovie = "actor";
        });
    }
}