import { renderIndexToseeMovies, renderIndexFavMovies, renderIndexLastMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderIndexToseeSharedMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSeenTimeMovie, getTotalSeenMovies, getTotalToseeMovies, getToseeMovies, getFavMovies, getLastSeenMovies } from "/Elina/js/services/usersMovies.service.js";
import { getSeenTimeMovieSister, getTotalSeenMoviesSister, getTotalToseeMoviesSister, getToseeSharedMovies } from "/Elina/js/services/usersMovies.service.js";
import { formatTotalTime, formatPlusDisplay } from "/Elina/js/utils/format.js";

export async function displayIndexMovies() {
    const moviesSeen = document.getElementById("moviesSeen");
    const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
    const moviesTosee = document.getElementById("moviesTosee");

    const totalTime = await getSeenTimeMovie();

    moviesSeen.textContent = await getTotalSeenMovies();
    moviesMinutesSeen.textContent = formatTotalTime(totalTime);
    moviesTosee.textContent = await getTotalToseeMovies();

    displayToseeMovies();
    const lastSeen = await getLastSeenMovies();
    await renderIndexLastMovies(lastSeen);
    displayFavMovies();
}

export async function displayIndexMoviesSister() {
    const moviesSeenSister = document.getElementById("movies-seen-sister");
    const moviesMinutesSeenSister = document.getElementById("movies-minutes-seen-sister");
    const moviesToseeSister = document.getElementById("movies-tosee-sister");
    const moviesSeenCompare = document.getElementById("movies-seen-compare");
    const moviesMinutesSeenCompare = document.getElementById("es-minutes-seen-compare");
    const moviesToseeCompare = document.getElementById("movies-tosee-compare");

    const totalTimeSister = await getSeenTimeMovieSister();
    
    moviesSeenSister.textContent = await getTotalSeenMoviesSister();
    const comparisonMoviesSeen = await getTotalSeenMovies() - await getTotalSeenMoviesSister();
    moviesSeenCompare.textContent = formatPlusDisplay(comparisonMoviesSeen);
    if (comparisonMoviesSeen > 0) moviesSeenCompare.classList.add("has-text-success"); else moviesSeenCompare.classList.add("has-text-danger");

    moviesMinutesSeenSister.textContent = formatTotalTime(totalTimeSister);
    const comparisonMoviesMinutesSeen = await getSeenTimeMovie() - totalTimeSister;
    moviesMinutesSeenCompare.textContent =
        (comparisonMoviesMinutesSeen > 0 ? "+ " : "— ") + formatTotalTime(comparisonMoviesMinutesSeen);
    if (comparisonMoviesMinutesSeen > 0) comparisonMoviesMinutesSeen.classList.add("has-text-success"); else comparisonMoviesMinutesSeen.classList.add("has-text-danger");

    moviesToseeSister.textContent = await getTotalToseeMoviesSister();
    const comparisonMoviesTosee = await getTotalToseeMoviesSister() - await getTotalToseeMovies();
    moviesToseeCompare.textContent = formatPlusDisplay(comparisonMoviesTosee);
    if (comparisonMoviesTosee > 0) moviesToseeCompare.classList.add("has-text-danger"); else moviesToseeCompare.classList.add("has-text-success");
    
    const toseeSharedMovies = await getToseeSharedMovies();
    await renderIndexToseeSharedMovies(toseeSharedMovies);
}

export async function displayFavMovies() {
    const favMovies = await getFavMovies();
    await renderIndexFavMovies(favMovies);
}

export async function displayToseeMovies() {
    const toseeMovies = await getToseeMovies();
    await renderIndexToseeMovies(toseeMovies);
}