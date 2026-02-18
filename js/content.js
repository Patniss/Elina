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
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");

    const hoursTime = Math.floor(movie.time / 60);
    const minutesTime = movieTime - hoursTime * 60;
    const displayMinutesTime = minutesTime > 9 ? "0" + minutesTime : minutesTime;

    const genres = movieGenres.trim().split(" ");
    genres.forEach(genre => {
        const spanGenre = document.createElement("span");
        spanGenre.classList.add("tag");
        movieGenres.appendChild(spanGenre);
    });

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    movieTime.textContent = hoursTime + "h " + displayMinutesTime;
    movieSynopsis.textContent = formatFrenchTypography(movie.synopsis);

    const casting = await supabase
        .from("movies_casting")
        .select("*")
        .eq("movie_id", uuid)

}