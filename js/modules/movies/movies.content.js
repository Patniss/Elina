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
                const deathdateValue = isDeadPeople.checked ? deathdateValue.value : null;

                let selectedNationalities = $(nationalitiesPeople).val() || null;
                const nationalitiesPeople = selectedNationalities.join(" ");

                if (!firstnameValue || !lastnameValue || !birthdateValue || !selectedNationalities || (isDeadPeople.checked && !deathdateValue)) {
                    alert("Veuillez remplir tous les champs nécessaires.");
                    return;
                };

                try {
                    peopleId = await addPeople(firstnameValue, lastnameValue, birthdateValue, nationalitiesPeople, deathdateValue);
                    await addMovieCasting(movieId, peopleId, btnCastMovie);
                } catch (error) {
                    console.error(error);
                    return;
                }
                
                document.getElementById("div-add-people").classList.add("is-hidden");
                document.getElementById("div-choose-people").classList.remove("is-hidden");
                $(selectPeople).val(null).trigger('change');
            });
        };
    });

    btnAddCast.addEventListener("click", async () => {
        peopleId = $(selectPeople).val();
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
    });
}

export async function movieContent(uuid) {
    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const moviePoster = document.getElementById("movie-poster");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");
    const modalPoster = document.getElementById("modal-poster");
    const btnAddMovie = document.getElementById("button-add-movie");
    const btnToseeMovie = document.getElementById("button-tosee-movie");
    const btnDeleteMovie = document.getElementById("button-supp-movie");
    const btnSeenMovie = document.getElementById("button-seen-movie");

    const addOwnPoster = document.getElementById("add-own-poster");
    const btnChangeOwnPoster = document.getElementById("button-change-own-poster");
    const btnNullOwnPoster = document.getElementById("button-null-own-poster");

    const divSeenMovie = document.getElementById("div-seen");
    const dateSeenMovie = document.getElementById("movie-date-seen");
    const inputChangeDate = document.getElementById("input-change-date-seen");
    const btnChangeDate = document.getElementById("button-change-date-seen");
    const btnNullDate = document.getElementById("button-null-date-seen");
    const movieFav = document.getElementById("movie-fav");
    const movieUnlike = document.getElementById("movie-unlike");

    const movieDirectors = document.getElementById("directors");
    const movieScriptwriters = document.getElementById("scriptwriters");

    const movie = await getMovie(uuid);
    const userMovie = await getUserMovie(uuid);
    const poster = userMovie?.own_poster ?? movie.poster;
    const statut = userMovie ? userMovie.seen : null;
    const dateSeen = userMovie?.date_seen === "1900-01-01" ? null : userMovie?.date_seen ?? null;
    let fav = userMovie?.fav ?? null;

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    moviePoster.src = poster;
    modalPoster.src = poster;
    movieTime.textContent = formatMovieDuration(movie.time);
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);
    renderGenres(movieGenres, movie.genres);
    
    toggleBtnSeenStatut(statut, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);

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
    })

    clickSeenMovieUser(btnSeenMovie, uuid);
    btnSeenMovie.addEventListener("click", async () => {
        toggleBtnSeenStatut(false, btnAddMovie, btnToseeMovie, btnDeleteMovie, btnSeenMovie);
        divSeenMovie.classList.add("is-hidden");
    });

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
    })

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
    })

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
    }

    btnChangeDate.addEventListener("click", async() => {
        if (!inputChangeDate.value) return;
        updateDateSeenMovie(uuid, inputChangeDate.value);
        dateSeenMovie.textContent = formatCompleteDate(inputChangeDate.value);
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    btnNullDate.addEventListener("click", () => {
        updateDateSeenMovie(uuid, null);
        dateSeenMovie.textContent = "Ajouter une date";
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    addOwnPoster.addEventListener("click", () => {
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
        const changeOwnPoster = document.getElementById("change-own-poster");
        changeOwnPoster.classList.add("is-active");
    });

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

    btnNullOwnPoster.addEventListener("click", () => {
        updateOwnPoster(uuid, null);
        moviePoster.src = movie.poster;
        modalPoster.src = movie.poster;
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });
    
    const directors = await getDirectorsMovie(uuid);
    const scriptwriters = await getScriptwritersMovie(uuid);
    const actors = await getActorsMovies(uuid);

    if (directors.length === 0) {
        const btnAddDirector = document.createElement("button");
        btnAddDirector.classList.add("button", "tag", "is-link");
        btnAddDirector.textContent = "Ajouter un réalisateur";
        movieDirectors.appendChild(btnAddDirector);

        btnAddDirector.addEventListener("click", () => {
            document.getElementById("add-cast").classList.add("is-active");
            document.getElementById("title-add-cast").textContent = `Ajouter un.e réalisateur.rice au film ${movie.title}`;
            document.getElementById("label-choose-people").textContent = "Choisir un.e réalisateur.rice";
            document.getElementById("subtitle-add-people").textContent = "Ajouter un.e nouveau.elle réalisateur.rice à la base de données";
            document.getElementById("span-add-cast").textContent = "Ajouter le réalisateur";
            btnCastMovie = "director";
        });
    } else {
        directors.forEach(d, index => {
            const isLast = index === directors.length - 1;

            const director = getPeople(d.id);
            const nameDirector = `${director.firstname} ${director.lastname}`;

            const liDirector = document.createElement("li");
            liDirector.classList.add("mr-3");
            const linkDirector = document.createElement("a");
            linkDirector.href = `/Elina/entertainment/people/people.html?id=${uuid}`;
            linkDirector.textContent = nameDirector;
            liDirector.appendChild(linkDirector);
            movieDirectors.appendChild(liDirector);

            if (!isLast) {
                const liSep = document.createElement("li");
                liSep.classList.add("mr-3");
                liSep.innerHTML = "&#x2022;";
                movieDirectors.appendChild(liSep);
            }
        });
    }

    if (scriptwriters.length === 0) {
        const btnAddScriptwriter = document.createElement("button");
        btnAddScriptwriter.classList.add("button", "tag", "is-link");
        btnAddScriptwriter.textContent = "Ajouter un scénariste";
        movieScriptwriters.appendChild(btnAddScriptwriter);

        btnAddScriptwriter.addEventListener("click", () => {
            document.getElementById("add-cast").classList.add("is-active");
            document.getElementById("title-add-cast").textContent = `Ajouter un.e scénariste au film ${movie.title}`;
            document.getElementById("label-choose-people").textContent = "Choisir un.e scénariste";
            document.getElementById("subtitle-add-people").textContent = "Ajouter un.e nouveau.elle scénariste à la base de données";
            document.getElementById("span-add-cast").textContent = "Ajouter le scénariste";
            btnCastMovie = "scriptwriter";
        });
    } else {
        scriptwriters.forEach(s, index => {
            const isLast = index === directors.length - 1;

            const scriptwriter = getPeople(s.id);
            const nameScriptwriter = `${scriptwriter.firstname} ${scriptwriter.lastname}`;

            const liScriptwriter = document.createElement("li");
            liScriptwriter.classList.add("mr-3");
            const linkScriptwriter = document.createElement("a");
            linkScriptwriter.href = `/Elina/entertainment/people/people.html?id=${uuid}`;
            linkScriptwriter.textContent = nameScriptwriter;
            liScriptwriter.appendChild(linkScriptwriter);
            movieScriptwriters.appendChild(liScriptwriter);

            if (!isLast) {
                const liSep = document.createElement("li");
                liSep.classList.add("mr-3");
                liSep.innerHTML = "&#x2022;";
                movieScriptwriters.appendChild(liSep);
            }
        });
    }
}