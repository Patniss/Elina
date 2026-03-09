import { indexMoviesStore } from "/Elina/js/data/movies.store.js";
import { renderIndexToseeMovies, renderIndexFavMovies } from "/Elina/js/modules/movies/movies.render.js";
import { getSeenTimeMovie, getTotalSeenMovies, getTotalToseeMovies, getToseeMovies, getFavMovies } from "/Elina/js/services/usersMovies.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexMovies() {
    const moviesSeen = document.getElementById("moviesSeen");
    const moviesMinutesSeen = document.getElementById("moviesMinutesSeen");
    const moviesTosee = document.getElementById("moviesTosee");

    const toseeMoviesDiv = document.getElementById("toseeMovies");

    const totalTime = await getSeenTimeMovie();
    
    moviesSeen.textContent = await getTotalSeenMovies();
    moviesMinutesSeen.textContent = formatTotalTime(totalTime);
    moviesTosee.textContent = await getTotalToseeMovies();

    const toseeMovies = await getToseeMovies();
    renderIndexToseeMovies(toseeMovies);
    const favMovies = await getFavMovies();
    renderIndexFavMovies(favMovies);

    const rightBtn = document.getElementById("tosee-next-btn");
    const leftBtn = document.getElementById("tosee-prev-btn");

    rightBtn.addEventListener("click", () => {
        const max = indexMoviesStore.movies.tosee.length - 1;
        
        if (indexMoviesStore.currentIndex.tosee < max) {
            indexMoviesStore.currentIndex.tosee++;
            updateCarousel(toseeMoviesDiv, indexMoviesStore, "tosee");
        }
    });
    
    leftBtn.addEventListener("click", () => {
        if (indexMoviesStore.currentIndex.tosee > 0) {
            indexMoviesStore.currentIndex.tosee--;
            updateCarousel(toseeMoviesDiv, indexMoviesStore, "tosee");
        }
    });
}