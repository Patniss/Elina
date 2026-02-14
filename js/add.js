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
      
      searchResult.innerHTML = "";
      
      data.forEach(movie => {
        const item = document.createElement("div");
        item.textContent = `${movie.title} (${movie.year})`;
        item.classList.add("search-item");
        
        item.addEventListener("click", () => {
          titleInput.value = movie.title;
          yearInput.value = movie.year;
          searchResult.innerHTML = "";
        });
        
        searchResult.appendChild(item);
      });
      
      if (data.length === 0) {
        searchResult.style.display = "none";
      } else {
        searchResult.style.display = "block";
      }
      
    
    }, 100);
  
  });

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
  const showForm = document.getElementById("show-form");
  const showGenres = document.getElementById("show-genres");
  const titleInput = document.getElementById("show-title");
  const searchResult = document.getElementById("research-results");
  
  genres.forEach(genre => {
      showGenres.append(
          new Option(genre, genre, false, false)
      );
  });

  $(showGenres).select2({
      placeholder: "Choisir un genre…",
      allowClear: true
  });

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
        .from("shows")
        .select("id, title")
        .ilike("title", `%${query}%`)
        .order("title", { ascending: true })
        .limit(5);

      if (error) {
        console.error(error);
        return;
      }
      
      searchResult.innerHTML = "";
      
      data.forEach(show => {
        const item = document.createElement("div");
        item.textContent = show.title;
        item.classList.add("search-item");
        
        item.addEventListener("click", () => {
          titleInput.value = show.title;
          searchResult.innerHTML = "";
        });
        
        searchResult.appendChild(item);
      });
      
      if (data.length === 0) {
        searchResult.style.display = "none";
      } else {
        searchResult.style.display = "block";
      }
      
    
    }, 100);
  
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