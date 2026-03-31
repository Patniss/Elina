import { normalizeMovie } from "/Elina/js/modules/movies/movies.model.js";
import { renderIndexToseeMovies, renderIndexFavMovies, renderIndexLastMovies } from "/Elina/js/modules/movies/movies.render.js";
import { renderIndexFavSisterMovies, renderIndexToseeSharedMovies, renderIndexLastSeenSisterMovies, renderIndexOurFavMovies, renderIndexOnlyToseeSisterMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSisterPseudo } from "/Elina/js/services/profiles.service.js";
import { getProfileData, getSisterData } from "/Elina/js/services/profilesData.service.js";
import { getToseeMovies, getFavMovies, getLastSeenMovies, getOnlyToseeSisterMovies } from "/Elina/js/services/usersMovies.service.js";
import { getToseeSharedMovies, getFavSisterMovies, getLastSeenSisterMovies, getFavSharedSisterMovies } from "/Elina/js/services/usersMovies.service.js";
import { formatTotalTime, formatPlusDisplay } from "/Elina/js/utils/format.js";

export async function displayIndexMovies() {
    const moviesSeen = document.getElementById("moviesSeen");
    const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
    const moviesTosee = document.getElementById("moviesTosee");
    const profileData = await getProfileData();

    moviesSeen.textContent = profileData.movies_seen;
    moviesMinutesSeen.textContent = formatTotalTime(profileData.time_movies_seen);
    moviesTosee.textContent = profileData.movies_tosee;

    displayToseeMovies();
    const lastSeenMovies = await getLastSeenMovies();
    await renderIndexLastMovies(lastSeenMovies);
    displayFavMovies();
}

export async function displayIndexMoviesSister() {
    const sisterData = await getSisterData();
    const userData = await getProfileData();
    const pseudoSister = await getSisterPseudo();
    const sisterPseudo = document.querySelectorAll(".sister-pseudo");
    sisterPseudo.forEach(element => {
        element.textContent = pseudoSister;
    });
    
    const moviesSeenSister = document.getElementById("movies-seen-sister");
    const moviesMinutesSeenSister = document.getElementById("movies-minutes-seen-sister");
    const moviesToseeSister = document.getElementById("movies-tosee-sister");
    const moviesSeenCompare = document.getElementById("movies-seen-compare");
    const moviesMinutesSeenCompare = document.getElementById("movies-minutes-seen-compare");
    const moviesToseeCompare = document.getElementById("movies-tosee-compare");

    moviesSeenSister.textContent = sisterData.movies_seen;
    const compareTotalSeen = parseInt(profileData.movies_seen) - parseInt(sisterData.movies_seen);
    moviesSeenCompare.textContent = formatPlusDisplay(compareTotalSeen);
    const classMoviesSeenCompare = compareTotalSeen >= 0 ? "has-text-success" : "has-text-danger";
    moviesSeenCompare.classList.add(classMoviesSeenCompare);
    
    const totalTimeSister = sisterData.time_movies_seen;
    moviesMinutesSeenSister.textContent = formatTotalTime(totalTimeSister);
    const compareTotalTime = parseInt(profileData.time_movies_seen) - parseInt(sisterData.time_movies_seen);
    let compareTotalTimeDisplay = compareTotalTime >= 0 ? "+ " : "– ";
    compareTotalTimeDisplay = `${compareTotalTimeDisplay}${formatTotalTime(compareTotalTime)}`;
    moviesMinutesSeenCompare.innerHTML = compareTotalTimeDisplay;
    const classMoviesMinutesSeenCompare = compareTotalTime > 0 ? "has-text-success" : "has-text-danger";
    moviesMinutesSeenCompare.classList.add(classMoviesMinutesSeenCompare);
    
    moviesToseeSister.textContent = sisterData.movies_tosee;
    moviesToseeCompare.textContent = formatPlusDisplay(compareTosee);
    const compareTosee = parseInt(userData.movies_tosee) - parseInt(sisterData.movies_tosee);
    const classMoviesToseeCompare = compareTosee > 0 ? "has-text-danger" : "has-text-success";
    moviesToseeCompare.classList.add(classMoviesToseeCompare);

    const favSisterMovies = await getFavSisterMovies();
    renderIndexFavSisterMovies(favSisterMovies);
    const divFavSisterMovies = document.getElementById("div-fav-sister-movies-not-seen");
    if (favSisterMovies.length === 0) divFavSisterMovies.classList.add("is-hidden");

    const toseeSharedMovies = await getToseeSharedMovies();
    renderIndexToseeSharedMovies(toseeSharedMovies);
    const divToseeSharedMovies = document.getElementById("div-tosee-movies-shared");
    if (toseeSharedMovies.length === 0) divToseeSharedMovies.classList.add("is-hidden");

    const lastSeenSisterMovies = await getLastSeenSisterMovies();
    renderIndexLastSeenSisterMovies(lastSeenSisterMovies);
    const divLastSeenSisterMovies = document.getElementById("div-last-seen-movies-sister");
    if (lastSeenSisterMovies.length === 0) divLastSeenSisterMovies.classList.add("is-hidden");

    const ourFavMovies = await getFavSharedSisterMovies();
    renderIndexOurFavMovies(ourFavMovies);
    const divOurFavMovies = document.getElementById("div-fav-movies-shared");
    if (ourFavMovies.length === 0) divOurFavMovies.classList.add("is-hidden");

    const sisterToseeMovies = await getOnlyToseeSisterMovies();
    renderIndexOnlyToseeSisterMovies(sisterToseeMovies);
    const divSisterToseeMovies = document.getElementById("div-tosee-movies-sister");
    if (sisterToseeMovies.length === 0) divSisterToseeMovies.classList.add("is-hidden");
}

export async function displayFavMovies() {
    const favMovies = await getFavMovies();
    await renderIndexFavMovies(favMovies);
}

export async function displayToseeMovies() {
    const toseeMovies = await getToseeMovies();
    await renderIndexToseeMovies(toseeMovies);
}