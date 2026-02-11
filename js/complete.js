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

function calculateAge(startDate, endDate = new Date()) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let age = end.getFullYear() - start.getFullYear();
    const m = end.getMonth() - start.getMonth();

    if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
        age--;
    }

    return age;
}

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

console.log(directors);


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
    const addDirector = document.getElementById("add-director");
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
        addDirector.style.display = "none";
        const wrapper = document.createElement("div");
        wrapper.classList.add("director-wrapper");

        const inputFirstname = document.createElement("input");
        inputFirstname.type = "text";
        inputFirstname.classList.add("input");
        inputFirstname.placeholder = "Prénom";
        inputFirstname.required = true;

        const inputLastname = document.createElement("input");
        inputLastname.type = "text";
        inputLastname.classList.add("input");
        inputLastname.placeholder = "Nom de famille";

        const inputBirth = document.createElement("input");
        inputBirth.type = "date";
        inputBirth.classList.add("input");

        const btnAdd = document.createElement("button");
        btnAdd.classList.add("button");
        btnAdd.textContent = "Ajouter";
        btnAdd.addEventListener("click", () => {
            addDirector.style.display = "block";
            wrapper.remove();
            alert("Réalisateur ajouté avec succès.");
        });

        const btnCancel = document.createElement("button");
        btnCancel.textContent = "Annuler";
        btnCancel.classList.add("button");
        btnCancel.addEventListener("click", () => {
            addDirector.style.display = "block";
            wrapper.remove();
        });

        wrapper.append(inputFirstname, inputLastname, inputBirth, btnAdd, btnCancel);
        addingDirector.appendChild(wrapper);
    });

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

export async function completePeople(uuid) {
    const { data: p, error } = await supabase
        .from("people")
        .select("*")
        .eq("id", uuid)
        .single();
    
    if (error) {
        console.error(error);
        return;
    }

    const peopleName = document.getElementById("people-name");
    const peopleAge = document.getElementById("people-age");

    const completeName = `${p.firstname} ${p.lastname}`;
    const agePeople = p.deathdate === null ? calculateAge(p.birthdate) : "✝ " + calculateAge(p.birthdate, p.deathdate);

    peopleName.textContent = completeName;
    peopleAge.textContent = agePeople + " ans";
}