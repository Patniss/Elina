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
  const showState = document.getElementById("show-state");
  const showNbSeasons = document.getElementById("show-nb-seasons");
  const showSubmit = document.getElementById("show-submit");
  const averageTimeInput = document.getElementById("show-average-time");
  
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
    const title = titleInput.value;

    console.log(showGenres);

    const averageTime = averageTimeInput.value;
    const state = showState.value;
    const complete = true;
    const nbSeasons = showNbSeasons.value;

    showSubmit.classList.add("is-loading");

    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("shows")
          .insert([ title, genres, averageTime, state, complete, nbSeasons ]);

        if (error) {
          setTimeout(() => {
            showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            showSubmit.classList.remove("is-primary", "is-loading");
            showSubmit.classList.add("is-danger");
          }, 500);
        }

        showSubmit.classList.remove("is-loading");
        showSubmit.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajoutée</span>`;

        setTimeout(() => {
          setTimeout(() => {
            showSubmit.textContent = "Ajouter la série";
            showSubmit.classList.add("is-loading");
          }, 200);
          
          showSubmit.classList.remove("is-loading");
          showForm.reset();
          titleInput.focus();
        }, 200);

      } catch (err) {
        setTimeout(() => {
          showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          showSubmit.classList.remove("is-primary", "is-loading");
          showSubmit.classList.add("is-danger");
        }, 500);
      }
    }, 500);
  });
}