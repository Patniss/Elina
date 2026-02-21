import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";

function formatFrenchTypography(text) {
  const nbsp = "\u202F";
  
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\s*([;:!?»])/g, "$1")
    .replace(/«\s*/g, "«")
    .replace(/([;:!?»])/g, nbsp + "$1")
    .replace(/«/g, "«" + nbsp)
    .replace(/ {2,}/g, " ")
    .trim();
}

export async function movieContent(uuid) {
    const session = await loadProfile();
    let poster;

    const { data:movie, error: errorMovie } = await supabase
        .from("movies")
        .select("*")
        .eq("id", uuid)
        .single();

    if (errorMovie) {
        console.log(errorMovie);
        return;
    }

    const { data: movieUser, error: errorUser } = await supabase
        .from("users_movies")
        .select("*")
        .eq("movie_id", uuid)
        .eq("user_id", session.id)
        .maybeSingle();
    
    if (errorUser) {
        console.log(errorUser);
        return;
    }

    if (movieUser) {
        poster = movieUser.own_poster ?? movie.poster;
    } else poster = movie.poster;

    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const moviePoster = document.getElementById("movie-poster");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");
    const modalPoster = document.getElementById("modal-poster");
    const addOwnPoster = document.getElementById("add-own-poster");

    const genres = movie.genres.trim().split(" ; ");
    genres.forEach(genre => {
        const spanGenre = document.createElement("span");
        spanGenre.classList.add("tag", "is-medium", genre.trim().toLowerCase(), "mr-2");
        spanGenre.textContent = genre;
        movieGenres.appendChild(spanGenre);
    });

    const hoursTime = Math.floor(movie.time / 60);
    const minutesTime = movie.time - hoursTime * 60;
    const displayMinutesTime = minutesTime < 10 ? "0" + minutesTime : minutesTime;

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    moviePoster.src = poster;
    modalPoster.src = poster;
    movieTime.textContent = hoursTime + "h" + displayMinutesTime;
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);

    const casting = await supabase
        .from("movies_casting")
        .select("*")
        .eq("movie_id", uuid)

    addOwnPoster.addEventListener("click", () => {
        console.log("bouton cliqué");
    })

}