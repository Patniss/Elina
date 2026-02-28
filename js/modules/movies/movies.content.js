import { getMovie } from "/Elina/js/services/movies.service.js";
import { getUserMovie, updateDateSeenMovie, updateFavMovie } from "/Elina/js/services/usersMovies.service.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { renderGenres } from "/Elina/js/ui/render.js";
import { formatMovieDuration, formatFrenchTypography, formatCompleteDate } from "/Elina/js/utils/format.js";
import { toggleBtnSeenStatut } from "/Elina/js/ui/dom.js";
import { addMovieUser, deleteMovieUser, toseeMovieUser, seenMovieUser } from "/Elina/js/modules/movies/movies.actions.js";

export async function movieContent(uuid) {
    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const moviePoster = document.getElementById("movie-poster");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");
    const modalPoster = document.getElementById("modal-poster");
    const addOwnPoster = document.getElementById("add-own-poster");
    const btnAddMovie = document.getElementById("button-add-movie");
    const btnToseeMovie = document.getElementById("button-tosee-movie");
    const btnDeleteMovie = document.getElementById("button-supp-movie");
    const btnSeenMovie = document.getElementById("button-seen-movie");

    const divSeenMovie = document.getElementById("div-seen");
    const dateSeenMovie = document.getElementById("movie-date-seen");
    const inputChangeDate = document.getElementById("input-change-date-seen");
    const btnChangeDate = document.getElementById("button-change-date-seen");
    const btnNullDate = document.getElementById("button-null-date-seen");
    const movieFav = document.getElementById("movie-fav");
    const movieUnlike = document.getElementById("movie-unlike");

    const userId = await getUserId();
    const movie = await getMovie(uuid);
    const userMovie = await getUserMovie(userId, uuid);
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

    btnAddMovie.addEventListener("click", async () => {
        addMovieUser(uuid, "hidden", btnAddMovie, [btnToseeMovie, btnDeleteMovie], [btnAddMovie, btnSeenMovie]);
    });
    btnToseeMovie.addEventListener("click", async() => {
        toseeMovieUser(uuid, "hidden", btnToseeMovie, [btnSeenMovie], [btnAddMovie, btnToseeMovie, btnDeleteMovie]);
        divSeenMovie.classList.remove("is-hidden");
    });
    btnDeleteMovie.addEventListener("click", async () => {
        deleteMovieUser(uuid, "hidden", btnDeleteMovie, [btnAddMovie], [btnDeleteMovie, btnToseeMovie, btnSeenMovie]);
    });
    btnSeenMovie.addEventListener("click", async() => {
        seenMovieUser(uuid, "hidden", btnSeenMovie, [btnToseeMovie, btnDeleteMovie], [btnAddMovie, btnSeenMovie]);
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
        dateSeenMovie.textContent = formatCompleteDate(inputChangeDate);
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    });

    btnNullDate.addEventListener("click", () => {
        updateDateSeenMovie(uuid, null);
        dateSeenMovie.textContent = "Ajouter une date";
        const modal = document.querySelector('.modal.is-active');
        if (modal) modal.classList.remove('is-active');
    })

}