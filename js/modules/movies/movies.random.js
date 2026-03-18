import { genres } from "/Elina/js/drama/genres.hs";
import { getToseeMovies } from "/Elina/js/services/usersMovies.service.js";
import { initGenres } from "/Elina/js/ui/select.js";

export async function getRandomMovie(selectedGenres, selectedPlatforms) {
    const selectRandomGenres = document.getElementById("movie-random-genres");
    allToseeMovies = await getToseeMovies();

    initGenres(selectRandomGenres, genres);
}