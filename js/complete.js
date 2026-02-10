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
    const directorsMovie = document.getElementById("movie-directors");
    const addDirector = document.getElementById("add-directors");
    const addingDirector = document.getElementById("adding-directors");
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
    });

    addDirector.addEventListener("click", () => {
        const inputFirstnameDirector = document.createElement("input");
        inputFirstnameDirector.type = "text";
        inputFirstnameDirector.placeholder = "Prénom";
        inputFirstnameDirector.id = "firstNameDirector";

        const inputLastnameDirector = document.createElement("input");
        inputLastnameDirector.type = "text";
        inputLastnameDirector.placeholder = "Nom de famille";
        inputLastnameDirector.id = "lastNameDirector";

        const inputBirthDirector = document.createElement("input");
        inputBirthDirector.type = "date";
        inputBirthDirector.placeholder = "Date de naissance";
        inputBirthDirector.id = "birthdateDirector";

        const btnAddDirector = document.createElement("button");
        btnAddDirector.textContent = "Ajouter";
        btnAddDirector.id = "btnAddDirector";

        addingDirector.appendChild(inputFirstnameDirector);
        addingDirector.appendChild(inputLastnameDirector);
        addingDirector.appendChild(btnAddDirector);
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