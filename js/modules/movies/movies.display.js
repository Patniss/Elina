import { renderIndexToseeMovies, renderIndexFavMovies, renderIndexLastMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSeenTimeMovie, getTotalSeenMovies, getTotalToseeMovies, getToseeMovies, getFavMovies, getLastSeenMovies } from "/Elina/js/services/usersMovies.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexMovies() {
    const moviesSeen = document.getElementById("moviesSeen");
    const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
    const moviesTosee = document.getElementById("moviesTosee");

    const totalTime = await getSeenTimeMovie();
    
    moviesSeen.textContent = await getTotalSeenMovies();
    moviesMinutesSeen.textContent = formatTotalTime(totalTime);
    moviesTosee.textContent = await getTotalToseeMovies();

    displayToseeMovies();
    const favMovies = await getFavMovies();
    await renderIndexFavMovies(favMovies);
    const lastSeen = await getLastSeenMovies;
    await renderIndexLastMovies(lastSeen);
}

export async function displayToseeMovies() {
    const toseeMovies = await getToseeMovies();
    await renderIndexToseeMovies(toseeMovies);
}