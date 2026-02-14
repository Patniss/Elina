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

const showForm = document.getElementById("show-form");
const showGenres = document.getElementById("show-genres");

export async function addMovie() {
  const movieForm = document.getElementById("movie-form");
  const titleInput = document.getElementById("movie-title");
  const yearInput = document.getElementById("movie-year");
  const searchResult = document.getElementById("research-results");

  let searchTimeout;

  $(titleInput).on("input", function () {
    clearTimeout(searchTimeout);

    const query = $(this).val().trim();

    if (query.length < 2) {
      $(searchResult).hide().empty();
      return;
    };

    searchTimeout = setTimeout(async () => {

        const { data, error } = await supabase
            .from("movies")
            .select("id, title, year")
            .ilike("title", `%${query}%`)
            .order("title", { ascending: true })
            .limit(5);

        if (error) {
            console.error(error);
            return;
        }

        searchResult.appendChild(data);

    }, 100);
  })

  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
}

export async function addShow() {
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
    e.preventDefault();

    const titleInput = document.getElementById("show-title");
    const genresInput = document.getElementById("show-genres");
    const averageTimeInput = document.getElementById("show-time");
    const complete = false;

    console.log(genresInput);
  });
}