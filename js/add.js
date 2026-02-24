// Import de l'instance Supabase configurée dans le fichier supabase.js
import { supabase } from "./core/supabase.js";

// Tableau constant contenant tous les genres disponibles
// Il sera utilisé pour remplir dynamiquement les <select>
const genres = [
    "Action", "Animation", "Arts martiaux", "Aventure",
    "Biopic",
    "Comédie", "Comédie musicale", "Crime",
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

// Fonction permettant d’ajouter un film
export async function addMovie() {

  // Récupération du formulaire
  const movieForm = document.getElementById("movie-form");

  // Récupération des champs du formulaire
  const titleInput = document.getElementById("movie-title");
  const yearInput = document.getElementById("movie-year");
  const genresInput = document.getElementById("movie-genres");
  const synopsisInput = document.getElementById("movie-synopsis");
  const hoursInput = document.getElementById("movie-hours");
  const minutesInput = document.getElementById("movie-minutes");
  const posterInput = document.getElementById("movie-poster");
  const buttonInput = document.getElementById("movie-button");

  // Remplissage dynamique du select des genres
  genres.forEach(genre => {
      genresInput.append(
          new Option(genre, genre, false, false)
      );
  });

  // Initialisation du plugin Select2 sur le select des genres
  $(genresInput).select2({
      placeholder: "Choisir un genre…",
      allowClear: true
  });

  // Zone d’affichage des résultats de recherche
  const searchResult = document.getElementById("research-results");

  // Variable utilisée pour gérer le délai (debounce) de recherche
  let searchTimeout;

  // Écouteur sur le champ titre pour déclencher une recherche automatique
  $(titleInput).on("input", function () {

    // Annule le timeout précédent pour éviter les requêtes multiples
    clearTimeout(searchTimeout);

    // Nettoyage de la valeur saisie
    const query = $(this).val().trim();

    // Si moins de 2 caractères → on cache les résultats
    if (query.length < 2) {
      $(searchResult).hide().empty();
      return;
    };

    // Délai avant exécution de la requête (debounce)
    searchTimeout = setTimeout(async () => {
      
      // Requête Supabase : recherche de films similaires
      const { data, error } = await supabase
        .from("movies")
        .select("id, title, year")
        .ilike("title", `%${query}%`)
        .order("title", { ascending: true })
        .limit(5);

      // Gestion d'erreur
      if (error) {
        console.error(error);
        return;
      }
      
      // Nettoyage des anciens résultats
      searchResult.innerHTML = "";
      
      // Création dynamique des résultats
      data.forEach(movie => {
        const item = document.createElement("div");
        item.textContent = `${movie.title} (${movie.year})`;
        item.classList.add("search-item");
        
        // Au clic : remplissage automatique des champs
        item.addEventListener("click", () => {
          titleInput.value = movie.title;
          yearInput.value = movie.year;
          searchResult.innerHTML = "";
        });
        
        searchResult.appendChild(item);
      });
      
      // Affichage ou masquage selon présence de résultats
      if (data.length === 0) {
        searchResult.style.display = "none";
      } else {
        searchResult.style.display = "block";
      }
      
    }, 100);
  
  });

  // Gestion de la soumission du formulaire
  movieForm.addEventListener("submit", async (e) => {

    e.preventDefault(); // Empêche le rechargement de la page

    // Récupération des valeurs
    const movieTitle = titleInput.value;
    const movieYear = yearInput.value;
    const hours = Number(hoursInput.value);
    const minutes = minutesInput? Number(minutesInput.value) : 0;

    // Conversion durée en minutes
    const movieTime = hours * 60 + minutes;

    const movieSynopsis = synopsisInput.value;
    const moviePoster = posterInput.value;

    // Par défaut, un film n’est pas complet
    const movieComplete = false;

    // Récupération des genres sélectionnés via Select2
    let selectedGenres = $(genresInput).val();

    // Transformation en chaîne séparée par " ; "
    let movieGenres = selectedGenres.join(" ; ");

    // Ajout du loader sur le bouton
    buttonInput.classList.add("is-loading")

    try {

      // Insertion du film dans la table movies
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

      // Animation visuelle de succès
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

      // Gestion d'erreur après insertion
      if (error) {
        buttonInput.classList.remove("is-loading", "is-primary");
        buttonInput.classList.add("is-danger");
        buttonInput.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        return;
      }

    } catch (err) {

      // Gestion erreur réseau / exception
      buttonInput.classList.remove("is-loading", "is-primary");
      buttonInput.classList.add("is-danger");
      buttonInput.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
      return;
    }
  });
}

// Fonction permettant d’ajouter une série
export async function addShow() {

  // Récupération des éléments du formulaire
  const showForm = document.getElementById("show-form");
  const showGenres = document.getElementById("show-genres");
  const titleInput = document.getElementById("show-title");
  const searchResult = document.getElementById("research-results");
  const showState = document.getElementById("show-state");
  const showNbSeasons = document.getElementById("show-nb-seasons");
  const showSubmit = document.getElementById("show-submit");
  const averageTimeInput = document.getElementById("show-time");
  const showLogo = document.getElementById("show-logo");
  
  // Remplissage dynamique des genres
  genres.forEach(genre => {
      showGenres.append(
          new Option(genre, genre, false, false)
      );
  });

  // Activation Select2
  $(showGenres).select2({
      placeholder: "Choisir un genre…",
      allowClear: true
  });

  let searchTimeout;

  // Recherche automatique sur le titre
  $(titleInput).on("input", function () {

    clearTimeout(searchTimeout);

    const query = $(this).val().trim();

    if (query.length < 2) {
      $(searchResult).hide().empty();
      return;
    };

    searchTimeout = setTimeout(async () => {
      
      // Recherche dans la table shows
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
      
      // Création des résultats
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
      
      // Affichage conditionnel
      if (data.length === 0) {
        searchResult.style.display = "none";
      } else {
        searchResult.style.display = "block";
      }
    
    }, 100);
  
  });

  // Soumission du formulaire série
  showForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const titleShow = titleInput.value;

    let selectedGenres = $(showGenres).val();
    let genresShow = selectedGenres.join(" ; ");

    const averageTimeShow = averageTimeInput.value;
    const stateShow = showState.value;
    const completeShow = false;
    const nbSeasonsShow = showNbSeasons.value;
    const logoShow = showLogo.value;

    showSubmit.classList.add("is-loading");

    setTimeout(async () => {
      try {

        // Insertion en base
        const { data, error } = await supabase
          .from("shows")
          .insert([{ 
            title: titleShow, 
            genres: genresShow, 
            average_min: averageTimeShow, 
            state: stateShow, 
            complete: completeShow, 
            nb_seasons: nbSeasonsShow,
            logo: logoShow
          }]);

        // Gestion erreur insertion
        if (error) {
          setTimeout(() => {
            showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            showSubmit.classList.remove("is-primary", "is-loading");
            showSubmit.classList.add("is-danger");
          }, 500);
        }

        // Animation succès
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

        // Gestion erreur exception
        setTimeout(() => {
          showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          showSubmit.classList.remove("is-primary", "is-loading");
          showSubmit.classList.add("is-danger");
        }, 500);
      }
    }, 500);
  });
}