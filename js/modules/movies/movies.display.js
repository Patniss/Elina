import { renderIndexToseeMovies, renderIndexFavMovies, renderIndexLastMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderIndexFavSisterMovies, renderIndexToseeSharedMovies, renderIndexLastSeenSisterMovies, renderIndexOurFavMovies, renderIndexOnlyToseeSisterMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSeenTimeMovie, getTotalSeenMovies, getTotalToseeMovies, getToseeMovies, getFavMovies, getLastSeenMovies, getOnlyToseeSisterMovies } from "/Elina/js/services/usersMovies.service.js";
import { getSeenTimeMovieSister, getTotalSeenMoviesSister, getTotalToseeMoviesSister } from "/Elina/js/services/usersMovies.service.js";
import { getToseeSharedMovies, getFavSisterMovies, getLastSeenSisterMovies, getFavSharedSisterMovies } from "/Elina/js/services/usersMovies.service.js";
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
    const moviesMinutesSeenCompare = document.getElementById("movies-minutes-seen-compare");
    const moviesToseeCompare = document.getElementById("movies-tosee-compare");

    moviesSeenSister.textContent = await getTotalSeenMoviesSister();
    const compareTotalSeen = await getTotalSeenMovies() - await getTotalSeenMoviesSister();
    moviesSeenCompare.textContent = formatPlusDisplay(compareTotalSeen);
    const classMoviesSeenCompare = compareTotalSeen >= 0 ? "has-text-success" : "has-text-danger";
    moviesSeenCompare.classList.add(classMoviesSeenCompare);
    
    const totalTimeSister = await getSeenTimeMovieSister();
    moviesMinutesSeenSister.textContent = formatTotalTime(totalTimeSister);
    const compareTotalTime = await getSeenTimeMovie() - await getSeenTimeMovieSister();
    let compareTotalTimeDisplay = compareTotalTime >= 0 ? "+ " : "– ";
    compareTotalTimeDisplay = `${compareTotalTimeDisplay}${formatTotalTime(compareTotalTime)}`;
    moviesMinutesSeenCompare.innerHTML = compareTotalTimeDisplay;
    const classMoviesMinutesSeenCompare = compareTotalTime > 0 ? "has-text-success" : "has-text-danger";
    moviesMinutesSeenCompare.classList.add(classMoviesMinutesSeenCompare);
    
    moviesToseeSister.textContent = await getTotalToseeMoviesSister();
    const compareTosee = await getTotalToseeMovies() - await getTotalToseeMoviesSister();
    moviesToseeCompare.textContent = formatPlusDisplay(compareTosee);
    const classMoviesToseeCompare = compareTosee > 0 ? "has-text-danger" : "has-text-success";
    moviesToseeCompare.classList.add(classMoviesToseeCompare);

    const favSisterMovies = await getFavSisterMovies();
    renderIndexFavSisterMovies(favSisterMovies);

    const toseeSharedMovies = await getToseeSharedMovies();
    renderIndexToseeSharedMovies(toseeSharedMovies);

    const lastSeenSisterMovies = await getLastSeenSisterMovies();
    renderIndexLastSeenSisterMovies(lastSeenSisterMovies);

    const ourFavMovies = await getFavSharedSisterMovies();
    renderIndexOurFavMovies(ourFavMovies);

    const sisterToseeMovies = await getOnlyToseeSisterMovies();
    renderIndexOnlyToseeSisterMovies(sisterToseeMovies);
}

export async function displayFavMovies() {
    const favMovies = await getFavMovies();
    await renderIndexFavMovies(favMovies);
}

export async function displayToseeMovies() {
    const toseeMovies = await getToseeMovies();
    await renderIndexToseeMovies(toseeMovies);
}