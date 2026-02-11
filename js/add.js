import { supabase } from "./supabase.js";

const genres = [
    "Action", "Animation", "Arts martiaux", "Aventure",
    "Biopic",
    "Comédie", "Comédie dramatique", "Comédie musicale", "Crime",
    "Drame",
    "Espionnage",
    "Famille", "Fantastique",
    "Guerre",
    "Historique", "Horreur",
    "Mystère",
    "Policier",
    "Romance",
    "Science-fiction", "Suspense",
    "Thriller",
    "Western"
]

const movieForm = document.getElementById("movie-form");
const showForm = document.getElementById("show-form");
const showGenres = document.getElementById("show-genres");

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("movie-title");
  const yearInput = document.getElementById("movie-year");

  const title = titleInput.value.trim();
  const year = yearInput.value ? parseInt(yearInput.value, 10) : null;
  const complete = false;

  const { error } = await supabase
    .from("movies")
    .insert([{ title, year, complete }]);

  if (error) {
    alert(error.message);
    return
  }
  alert("Film ajouté avec succès !");
  movieForm.reset();
  titleInput.focus();

});

genres.forEach(genre => {
    showGenres.append(
        new Option(genre, genre, false, false)
    );
});

$(showGenres).select2({
    placeholder: "Choisir un genre…",
    allowClear: true
});

showForm.addEventListener("submit", async (e) => {
  alert("Bouton ajouté cliqué !");
})