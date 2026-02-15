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
    "Musique", "Mystère",
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
  const genresInput = document.getElementById("movie-genres");
  const synopsisInput = document.getElementById("movie-synopsis");
  const hoursInput = document.getElementById("movie-hours");
  const minutesInput = document.getElementById("movie-minutes");
  const posterInput = document.getElementById("movie-poster");
  const buttonInput = document.getElementById("movie-button");

  genres.forEach(genre => {
      genresInput.append(
          new Option(genre, genre, false, false)
      );
  });

  $(genresInput).select2({
      placeholder: "Choisir un genre…",
      allowClear: true
  });

  $(genresInput).on("input", function () {
    let selectedGenres = $(genresInput).val();
    console.log(selectedGenres);
    let movieGenres = selectedGenres.join(" ; ");
    console.log(movieGenres);
  })

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

  let selectedGenres = $(genresInput).val();
  console.log(selectedGenres);
  let movieGenres = selectedGenres.join(" ; ");

  movieForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const movieTitle = titleInput.value;
    const movieYear = yearInput.value;
    const hours = Number(hoursInput.value);
    const minutes = minutesInput? Number(minutesInput.value) : 0;
    const movieTime = hours * 60 + minutes;
    const movieSynopsis = synopsisInput.value;
    const moviePoster = posterInput.value;
    const movieComplete = false;

    buttonInput.classList.add("is-loading")

    try {
      const { data, error } = await supabase
        .from("movies")
        .insert([{ 
          title: movieTitle,
          year: movieYear, 
          complete: movieComplete, 
          genres: movieGenres, 
          poster: moviePoster, 
          time: movieTime, 
          synopsis: movieSynopsis }]);

      setTimeout(() => {
        buttonInput.classList.remove("is-loading", "is-primary");
        buttonInput.classList.add("id-success");
        buttonInput.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajouté</span>`;

        setTimeout(() => {
          buttonInput.classList.remove("is-success");
          buttonInput.classList.add("is-primary");
          buttonInput.innerHTML = `<span class="icon"><i class="fas fa-plus"></i></span><span>Ajouter le film</span>`;
          movieForm.reset();
          titleInput.focus();
        }, 250);
      }, 250);

      if (error) {
        buttonInput.classList.remove("is-loading", "is-primary");
        buttonInput.classList.add("is-danger");
        buttonInput.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        return;
      }
    } catch (err) {
      buttonInput.classList.remove("is-loading", "is-primary");
      buttonInput.classList.add("is-danger");
      buttonInput.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
      return;
    }
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
  const averageTimeInput = document.getElementById("show-time");
  
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
    const titleShow = titleInput.value;

    let selectedGenres = $(showGenres).val();
    let genresShow = selectedGenres.join(" ; ");

    const averageTimeShow = averageTimeInput.value;
    const stateShow = showState.value;
    const completeShow = false;
    const nbSeasonsShow = showNbSeasons.value;

    showSubmit.classList.add("is-loading");

    setTimeout(async () => {
      try {
        const { data, error } = await supabase
          .from("shows")
          .insert([{ 
            title: titleShow, 
            genres: genresShow, 
            average_min: averageTimeShow, 
            state: stateShow, 
            complete: completeShow, 
            nb_seasons: nbSeasonsShow }]);

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