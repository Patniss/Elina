const genres = [
    "Action", "Animation", "Arts martiaux", "Aventure",
    "Biopic",
    "Comédie", "Comédie dramatique", "Comédie musicale",
    "Drame",
    "Espionnage",
    "Famille", "Fantastique",
    "Guerre",
    "Historique", "Horreur",
    "Policier",
    "Romance",
    "Science-fiction",
    "Thriller",
    "Western"
]

import { supabase } from "/Elina/js/supabase.js";

const directors = {};

async function loadDirectors() {
    const { data, error } = await supabase
        .from("people")
        .select("id, firstname, lastname")
        .ilike("jobs", "%director%")
        .order("lastname", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(dir => {
        directors[dir.id] = `${dir.firstname} ${dir.lastname}`;
    });
}


export async function completeMovie(uuid) {
    await loadDirectors();

    const { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    const movieTitle = document.getElementById("movie-title");
    const yearMovie = document.getElementById("movie-year");
    const directorsMovie = document.getElementById("directors")
    const genresMovie = document.getElementById("movie-genres");

    movieTitle.textContent = movie.title;
    yearMovie.textContent = movie.year;

    Object.entries(directors).forEach(([uuid, completeName]) => {
        directorsMovie.append(
            new Option(completeName, uuid, false, false)
        );
    });

    $(directorsMovie).select2({
        placeholder: "Choisir un réalisateur…",
        allowClear: true
    })

    genres.forEach(genre => {
        genresMovie.append(
            new Option(genre, genre, false, false)
        );
    });

    $(genresMovie).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });
}