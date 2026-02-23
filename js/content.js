import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";
import { addMovie } from "/Elina/js/functions.js";
import { suppMovie } from "/Elina/js/functions.js";
import { toseeMovie } from "/Elina/js/functions.js";

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
    const userId = session.id;
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

    let statut;

    if (movieUser) {
        poster = movieUser.own_poster ?? movie.poster;
        statut = movieUser.seen;
    } else { 
        poster = movie.poster;
        statut = null;
    }

    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const moviePoster = document.getElementById("movie-poster");
    const movieTime = document.getElementById("movie-time");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const movieGenres = document.getElementById("movie-genres");
    const modalPoster = document.getElementById("modal-poster");
    const addOwnPoster = document.getElementById("add-own-poster");
    const btnAddMovie = document.getElementById("button-add-movie");
    const btnToseeMovie = document.getElementById("button-tosee-movie");
    const btnSuppMovie = document.getElementById("button-supp-movie");
    const btnSeenMovie = document.getElementById("button-seen-movie");

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

    switch (statut) {
        case null:
            btnAddMovie.classList.remove("is-hidden");
            break;
    
        case false:
            btnToseeMovie.classList.remove("is-hidden");
            btnSuppMovie.classList.remove("is-hidden");
            break;

        case true:
            btnSeenMovie.classList.remove("is-hidden");
            break;
    }

    btnAddMovie.addEventListener("click", async () => {
        addMovie("hidden", uuid, btnAddMovie, false, btnToseeMovie, btnSuppMovie);
    });

    btnSuppMovie.addEventListener("click", async () => {
        suppMovie("hidden", uuid, btnSuppMovie, false, btnAddMovie);
    });

    btnToseeMovie.addEventListener("click", async () => {
        toseeMovie("hidden", uuid, btnToseeMovie, false, btnSeenMovie, btnSuppMovie);
    })

    addOwnPoster.addEventListener("click", () => {
        const divAddOwnPoster = document.getElementById("div-add-own-poster");
        const srcAddOwnPoster = document.getElementById("src-add-own-poster");
        const btnAddOwnPoster = document.getElementById("btn-add-own-poster");

        if (divAddOwnPoster.classList.contains("is-hidden")) {
            divAddOwnPoster.classList.remove("is-hidden");
        } else {
            divAddOwnPoster.classList.add("is-hidden");
        };

        btnAddOwnPoster.addEventListener("click", async () => {
            const { data, error } = await supabase
                .from("users_movies")
                .update({"own_poster": srcAddOwnPoster.value})
                .eq("movie_id", uuid)
                .eq("user_id", userId)
                .single();
            
            if (error) {
                alert("Une erreur est survenue. Vérifie que ce film est dans votre liste.");
                console.log(error);
                return;
            };

            moviePoster.src = srcAddOwnPoster.value;
            modalPoster.src = srcAddOwnPoster.value;
        })
    })
}