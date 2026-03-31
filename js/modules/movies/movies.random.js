import { genres } from "/Elina/js/data/genres.js";
import { getToseeMovies } from "/Elina/js/services/usersMovies.service.js";
import { initGenres, initPlaforms } from "/Elina/js/ui/select.js";

const platforms = ["Netflix", "Disney+", "Amazon Prime"];

export async function getRandomMovie(selectedGenres, selectedPlatforms) {
    const allToseeMovies = await getToseeMovies();
}

export async function displayRandomMovie() {
    const selectGenres = document.getElementById("movie-random-genres");
    const selectPlatforms = document.getElementById("movie-random-platforms");
    const buttonDice = document.getElementById("movie-random-button");

    initGenres(selectGenres, genres);
    initPlaforms(selectPlatforms, platforms);

    buttonDice.addEventListener("click", async () => {
        let selectedGenres = $(selectGenres).val() || [];

        await getRandomMovie(selectedGenres);
    })
}