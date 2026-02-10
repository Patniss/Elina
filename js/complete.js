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

const directors = [];

const directorsBase = supabase
    .from("people")
    .select("id, lastname, firstname")
    .ilike("jobs", "director")
    .order("lastname", { ascending: true });

directorsBase.forEach(dir => {
    const completeName = dir.firstname + " " + dir.lastname;
    directors[dir.id] = completeName;
});


export async function completeMovie(uuid) {
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

    directors.forEach(([uuid, completeName]) => {
        directorsMovie.append(
            new Option(completeName, uuid, false, false)
        )
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