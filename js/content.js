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
    const session = loadProfile();
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
    
    if (errorUser) {
        console.log(errorUser);
        return;
    }

    if (movieUser) {
        poster = movieUser.own_poster ? movieUser.own_poster : movie.poster;
    } else poster = movie.poster;

    console.log(movie.genres);

    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const moviePoster = document.getElementById("movie-poster");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");

    const hoursTime = Math.floor(movie.time / 60);
    const minutesTime = Number(movieTime) - Number(hoursTime) * 60;
    const displayMinutesTime = minutesTime > 9 ? "0" + String(minutesTime) : String(minutesTime);

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    moviePoster.src = poster;
    movieTime.textContent = hoursTime + "h " + displayMinutesTime;
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);

    const casting = await supabase
        .from("movies_casting")
        .select("*")
        .eq("movie_id", uuid)

}