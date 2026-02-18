import { supabase } from "/Elina/js/supabase.js";

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
    const { data:movie, error } = await supabase
    .from("movies")
    .select(`*, users_movies(user_id, seen, own-poster)`)
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    console.log(movie);

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
    moviePoster.src = movie.poster;
    movieTime.textContent = hoursTime + "h " + displayMinutesTime;
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);

    const casting = await supabase
        .from("movies_casting")
        .select("*")
        .eq("movie_id", uuid)

}