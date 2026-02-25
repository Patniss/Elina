import { getMovie } from "/Elina/js/services/movies.service.js";
import { getUserMovie } from "/Elina/js/services/usersMovies.service.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { renderGenres } from "/Elina/js/ui/render.js";
import { formatMovieDuration, formatFrenchTypography } from "/Elina/js/utils/format.js";
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

    const dateSeenMovie = document.getElementById("movie-date-seen");
    const changeSeenMovie = document.getElementById("change-date-seen");
    const movieFav = document.getElementById("movie-fav");
    const movieUnlike = document.getElementById("movie-unlike");

    const userId = await getUserId();
    const movie = await getMovie(uuid);
    const userMovie = await getUserMovie(userId, uuid);
    const poster = userMovie?.own_poster ?? movie.poster;
    const statut = userMovie ? userMovie.seen : null;

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
    });
    btnDeleteMovie.addEventListener("click", async () => {
        deleteMovieUser(uuid, "hidden", btnDeleteMovie, [btnAddMovie], [btnDeleteMovie, btnToseeMovie, btnSeenMovie]);
    });
    btnSeenMovie.addEventListener("click", async() => {
        seenMovieUser(uuid, "hidden", btnSeenMovie, [btnToseeMovie, btnDeleteMovie], [btnAddMovie, btnSeenMovie]);
    })
}