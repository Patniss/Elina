import { renderIndexToseeMovies, renderIndexFavMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSeenTimeMovie, getTotalSeenMovies, getTotalToseeMovies, getToseeMovies, getFavMovies } from "/Elina/js/services/usersMovies.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexMovies() {
    const moviesSeen = document.getElementById("moviesSeen");
    const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
    const moviesTosee = document.getElementById("moviesTosee");

    const totalTime = await getSeenTimeMovie();
    
    moviesSeen.textContent = await getTotalSeenMovies();
    moviesMinutesSeen.textContent = formatTotalTime(totalTime);
    moviesTosee.textContent = await getTotalToseeMovies();

    const toseeMovies = await getToseeMovies();
    await renderIndexToseeMovies(toseeMovies);
    const favMovies = await getFavMovies();
    await renderIndexFavMovies(favMovies);
}