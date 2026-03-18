import { genres } from "/Elina/js/data/genres.hs";
import { getToseeMovies } from "/Elina/js/services/usersMovies.service.js";
import { initGenres, initPlaforms } from "/Elina/js/ui/select.js";

const platforms = ["Netflix", "Disney+", "Amazon Prime"];

export async function getRandomMovie(selectedGenres, selectedPlatforms) {
    const selectGenres = document.getElementById("movie-random-genres");
    const selectPlatforms = document.getElementById("movie-random-platforms");

    allToseeMovies = await getToseeMovies();

    initGenres(selectGenres, genres);
    initPlaforms(selectPlatforms, platforms);
}