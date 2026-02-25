// 1- IMPORTATIONS DES JS NÉCESSAIRES :
import { supabase } from "/Elina/js/core/supabase.js"; // Connexion à la base de données
import { debounce } from "/Elina/js/utils/debounce.js"; // Gestion du timeout
import { handleButtonState } from "/Elina/js/ui/button.js"; // Gestion de l'affichage d'un bouton au clic
import { initGenres } from "/Elina/js/ui/select.js"; // Ajouter les genres dans un select
import { initLiveSearch } from "/Elina/js/ui/search.js";
import { searchMovies } from "/Elina/js/services/movies.service.js";
import { genres } from "/Elina/js/data/genres.js";

export async function addMovie() {
    // Récupération du formulaire et des champs
    const movieForm = document.getElementById("movie-form");
    const titleInput = document.getElementById("movie-title");
    const yearInput = document.getElementById("movie-year");
    const genresInput = document.getElementById("movie-genres");
    const synopsisInput = document.getElementById("movie-synopsis");
    const hoursInput = document.getElementById("movie-hours");
    const minutesInput = document.getElementById("movie-minutes");
    const posterInput = document.getElementById("movie-poster");
    const buttonInput = document.getElementById("movie-button");
    const searchResult = document.getElementById("research-results");

    if (!movieForm) return;

    // Activation du select2 de genres
    initGenres(genresInput, genres);

    initLiveSearch({
        inputElement: titleInput,
        resultContainer: searchResult,
        searchFonction: searchMovies,
        renderItem: (movie) => {
            const item = document.getElementById("div");
            item.textContent = `${movie.title} (${movie.year})`;
            item.classList.add("search-item");

            item.addEventListener("click", () => {
                titleInput.value = movie.title;
                yearInput.value = movie.year;
                searchResult.innerHTML = "";
                searchResult.style.display = "none";
            });

            return item;
        }
    })

    movieForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupération des valeurs
        const movieTitle = titleInput.value;
        const movieYear = yearInput.value;
        const hours = Number(hoursInput.value) || 0;
        const minutes = Number(minutesInput.value) || 0;
        const movieSynopsis = synopsisInput.value;
        const moviePoster = posterInput.value;
        const movieComplete = false;

        // Conversion durée en minutes
        const movieTime = hours * 60 + minutes;

        let selectedGenres = $(genresInput).val() || [];
        let movieGenres = selectedGenres.join(" ; ");

        handleButtonState(buttonInput, "loading");

        try {
            const { data, error } = await supabase
                .from("movies")
                .insert([{
                    title: movieTitle,
                    year: movieYear, 
                    complete: movieComplete, 
                    genres: movieGenres, 
                    poster: moviePoster, 
                    time: movieTime, 
                    synopsis: movieSynopsis 
                }]);
            
            if (error) {
                console.error(error);
                handleButtonState(buttonInput, "error");
                return;
            }

            handleButtonState(buttonInput, "success");

            setTimeout(() => {
                handleButtonState(buttonInput, "default");
                movieForm.reset();
                titleInput.focus();
            }, 250);

        } catch (err) {
            console.error(err);
            handleButtonState(buttonInput, "error");
        }
    })
}