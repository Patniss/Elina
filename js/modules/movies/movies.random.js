import { genres } from "/Elina/js/data/genres.js";
import { getMovie } from "/Elina/js/services/movies.service.js";
import { getGenresToseeMovie } from "/Elina/js/services/usersMovies.service.js";
import { initGenres, initPlaforms } from "/Elina/js/ui/select.js";

const platforms = ["Netflix", "Disney+", "Amazon Prime"];

export async function getRandomMovie(selectedGenres, selectedPlatforms) {
    const list = await getGenresToseeMovie(selectedGenres);

    if (list.length === 0) {
        alert("Aucun film trouvé avec les filtres donnés.");
        return;
    }

    const randomValue = list[Math.floor(Math.random() * list.length)];
    const movie = await getMovie(randomValue);
    document.getElementById("random-movie").classList.remove("is-hidden");
    const posterMovie = document.getElementById("img-random-movie");
    posterMovie.classList.remove("loaded");
    posterMovie.onload = () => {
        posterMovie.classList.add("loaded");
    };
    posterMovie.src = movie.poster;
    posterMovie.alt = movie.title;
    const linkMovie = document.getElementById("link-random-movie");
    linkMovie.href = `/Elina/entertainment/movies/movie?id=${movie.id}`;
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