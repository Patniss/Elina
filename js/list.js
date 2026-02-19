// IMPORTARTIONS NÉCESSAIRES
import { supabase } from "/Elina/js/supabase.js";
import { calculateAge } from "/Elina/js/functions.js";
import { loadProfile } from "/Elina/js/dashboard.js";

// VARIABLES BASIQUES
let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const pageSize = 20;
let order = {
  field: "year",
  direction: "desc"
};
let genreFilter = "";

// ----------
// FONCTION POUR CRÉER UNE CARTE FILM (GÉNÉRAL)
// ----------
async function createMovieCard(movie) {
  // ❶ Récupérer la session
  const session = await loadProfile();
  const userId = session.id;

  // Création de la carte
  const column = document.createElement("div");
  column.classList.add("column", "is-one-quarter");

  const card = document.createElement("div");
  card.classList.add("card", "movie-card");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const pTitle = document.createElement("p");
  pTitle.classList.add("title", "is-5");
  pTitle.textContent = movie.title;

  const pSubtitle = document.createElement("p");
  pSubtitle.classList.add("subtitle", "is-6");
  pSubtitle.textContent = movie.year;

  const divTags = document.createElement("div");
  divTags.classList.add("buttons", "is-flex-wrap-wrap", "mt-3");

  const detailsBtn = document.createElement("a");
  detailsBtn.classList.add("tag", "is-hoverable", "mr-2");
  detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
  detailsBtn.href = `/Elina/movies/movie.html?id=${movie.id}`;

  const addMovieBtn = document.createElement("button");
  addMovieBtn.classList.add("tag", "button", "is-hoverable", "is-link", "mr-2");
  addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;

  const suppMovieBtn = document.createElement("button");
  suppMovieBtn.classList.add("tag", "button", "is-hoverable", "is-danger", "is-light", "mr-2");
  suppMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;

  const viewMovieBtn = document.createElement("button");
  viewMovieBtn.classList.add("tag", "button", "is-hoverable", "is-light", "is-success", "mr-2");
  viewMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

  const seenMovieBtn = document.createElement("button");
  seenMovieBtn.classList.add("tag", "button", "is-hoverable", "is-success", "mr-2");
  seenMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;

  // Gestion des tags en fonction du statut perso du film
  switch (movie.seen) {
    case null:
      divTags.appendChild(addMovieBtn);
      break;
  
    case false:
      divTags.append(viewMovieBtn, suppMovieBtn);
      break;

    case true:
      divTags.appendChild(seenMovieBtn);
      break;
  }

  divTags.appendChild(detailsBtn);
  cardContent.append(pTitle, pSubtitle, divTags);
  card.appendChild(cardContent);
  column.appendChild(card);

  const cardFigure = document.createElement("div");
  cardFigure.classList.add("card-image");
  
  const figurePoster = document.createElement("figure");
  figurePoster.classList.add("image", "poster-wrapper", "is-2by3");
  
  const imgPoster = document.createElement("img");
  imgPoster.src = movie.ownPoster || movie.poster;
  imgPoster.alt = movie.title;
  
  figurePoster.appendChild(imgPoster);
  cardFigure.appendChild(figurePoster);
  
  card.appendChild(cardFigure);

  // Gestion de l'action "Ajouter le film"
  addMovieBtn.addEventListener("click", async () => {
    addMovieBtn.textContent = "";
    addMovieBtn.classList.remove("is-link");
    addMovieBtn.classList.add("is-success");
    addMovieBtn.classList.add("is-loading");
    console.log("userId : " + userId);
    console.log("movie.id : " + movie.id);

    try {
      const { data, error } = await supabase
        .from("users_movies")
        .insert([
          {
            user_id: userId,
            movie_id: movie.id,
            seen: false,
            date_seen: new Date().toISOString()
          }
        ])
        .select();

        if (error) {
          setTimeout(() => {
            addMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            addMovieBtn.classList.remove("is-loading", "is-link");
            addMovieBtn.classList.add("is-danger");
            console.log(error);
          }, 500);
          return;
        }

    } catch (err) {
      console.error("Erreur :", err);
      setTimeout(() => {
        addMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        addMovieBtn.classList.remove("is-link", "is-loading");
        addMovieBtn.classList.add("is-danger");
        console.log(err);
      }, 500);
      return;
    }

    setTimeout(() => {
      addMovieBtn.classList.add("is-link");
      addMovieBtn.classList.remove("is-success", "is-loading");
      addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
      
      divTags.innerHTML = "";
      divTags.append(viewMovieBtn, suppMovieBtn, detailsBtn);
    }, 500);
    
  })

  // Gestion de l'action "Supprimer le film"
  suppMovieBtn.addEventListener("click", async () => {
    suppMovieBtn.textContent = "";
    suppMovieBtn.classList.add("is-loading");
    suppMovieBtn.classList.remove("is-light");

    try {
      const { data, error } = await supabase
        .from("users_movies")
        .delete()
        .eq("user_id", userId)
        .eq("movie_id", movie.id)
        .single();

        if (error) {
          setTimeout(() => {
            suppMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            suppMovieBtn.classList.remove("is-loading");
            console.log(error)
          }, 500);
          return;
        }

    } catch (err) {
      setTimeout(() => {
            suppMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            suppMovieBtn.classList.remove("is-loading");
            console.log(err);
          }, 500);
          return;
    }

    setTimeout(() => {
      suppMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;
      suppMovieBtn.classList.remove("is-loading");

      divTags.innerHTML = "";
      divTags.append(addMovieBtn, detailsBtn);
    }, 500);
  })

  // Gestion de l'action "J'ai vu"
  viewMovieBtn.addEventListener("click", async () => {
  viewMovieBtn.textContent = "";
  viewMovieBtn.classList.add("is-loading");
  viewMovieBtn.classList.remove("is-light");

  try {
    const { data, error } = await supabase
      .from("users_movies")
      .update({seen: true})
      .eq("user_id", userId)
      .eq("movie_id", movie.id)
      .single();

      if (error) {
        setTimeout(() => {
          viewMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          viewMovieBtn.classList.add("is-danger");
          viewMovieBtn.classList.remove("is-loading");
          console.log(error);
        }, 500);
        return;
      }
    
    } catch (err) {
      setTimeout(() => {
        viewMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        viewMovieBtn.classList.add("is-danger");
        viewMovieBtn.classList.remove("is-loading");
        console.log(err);
      }, 500);
      return;
    }

    setTimeout(() => {
      viewMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
      viewMovieBtn.classList.remove("is-loading");
      viewMovieBtn.classList.add("is-light");

      divTags.innerHTML = "";
      divTags.append(seenMovieBtn, detailsBtn);
    }, 500);
  
  });
  
  // Gestion de l'action "Vu" (retirer le tag Vu pour décocher) ----> Évolution prochaine : vu plusieurs fois ou non vu ?
  seenMovieBtn.addEventListener("click", async () => {
    seenMovieBtn.textContent = "";
    seenMovieBtn.classList.add("is-loading");
    
    try {
      const { data, error } = await supabase
        .from("users_movies")
        .update({seen: false})
        .eq("user_id", userId)
        .eq("movie_id", movie.id)
        .single();
        
      if (error) {
        setTimeout(() => {
          seenMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          viewMovieBtn.classList.add("is-danger");
          viewMovieBtn.classList.remove("is-loading", "is-success");
          console.log(error);
          return;
        }, 500);
      }
    
    } catch (err) {
      setTimeout(() => {
        seenMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        viewMovieBtn.classList.add("is-danger");
        viewMovieBtn.classList.remove("is-loading", "is-success");
        console.log(err);
      }, 500);
      return;
    }

    setTimeout(() => {
      seenMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;
      seenMovieBtn.classList.remove("is-loading");
      
      divTags.innerHTML = "";
      divTags.append(viewMovieBtn, suppMovieBtn, detailsBtn);
    }, 500);

  });

  return column;
}

// ----------
// FONCTION DE PAGINATION GÉNÉRALE
// ----------
function renderPagination() {
  const pagination = document.getElementById("pagination_nb");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(filteredMovies.length / pageSize);
  if (totalPages <= 1) return;

  const delta = 2; // nombre de pages autour de la page active

  // --- Fonction utilitaire pour créer un bouton page
  function createPageButton(page, text = page, isCurrent = false) {
    const li = document.createElement("li");
    const btn = document.createElement("a");

    btn.href = "#";
    btn.classList.add("pagination-link");
    btn.textContent = text;

    if (isCurrent) btn.classList.add("is-current");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = page;
      renderMovies();
    });

    li.appendChild(btn);
    return li;
  }

  // --- Bouton précédent
  const prevBtn = document.createElement("a");
  prevBtn.href = "#";
  prevBtn.classList.add("pagination-previous");
  prevBtn.textContent = "Précédent";

  if (currentPage === 1) {
    prevBtn.classList.add("is-disabled");
  } else {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage--;
      renderMovies();
    });
  }

  pagination.appendChild(prevBtn);

  // --- Liste des pages
  const pageList = document.createElement("ul");
  pageList.classList.add("pagination-list");

  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);

  // --- Première page + ...
  if (start > 1) {
    pageList.appendChild(createPageButton(1));

    if (start > 2) {
      const ellipsis = document.createElement("span");
      ellipsis.classList.add("pagination-ellipsis");
      ellipsis.textContent = "…";
      pageList.appendChild(ellipsis);
    }
  }

  // --- Pages autour de la page active
  for (let i = start; i <= end; i++) {
    pageList.appendChild(
      createPageButton(i, i, i === currentPage)
    );
  }

  // --- ... + dernière page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      const ellipsis = document.createElement("span");
      ellipsis.classList.add("pagination-ellipsis");
      ellipsis.textContent = "…";
      pageList.appendChild(ellipsis);
    }

    pageList.appendChild(createPageButton(totalPages));
  }

  pagination.appendChild(pageList);

  // --- Bouton suivant
  const nextBtn = document.createElement("a");
  nextBtn.href = "#";
  nextBtn.classList.add("pagination-next");
  nextBtn.textContent = "Suivant";

  if (currentPage === totalPages) {
    nextBtn.classList.add("is-disabled");
  } else {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage++;
      renderMovies();
    });
  }

  pagination.appendChild(nextBtn);
}

// ----------
// FONCTION DE TRI DES FILMS
// ----------
function sortMovies(movies) {
  return [...movies].sort((a, b) => {
    const field = order.field;

    let valueA = a[field];
    let valueB = b[field];

    if (valueA === null) return 1;
    if (valueB === null) return -1;

    if (typeof valueA === "string") {
      return order.direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order.direction === "asc"
      ? valueA - valueB
      : valueB - valueA;
  });
}

// ----------
// FONCTION CLIQUE DES BOUTONS DE TRI / FILTRE
// ----------
export function sortFilterMovies() {
  const btnSort = document.getElementById("button-content-sort");
  const contentSort = document.getElementById("dropdown-content-sort");
  const btnFilter = document.getElementById("button-content-filter");
  const contentFilter = document.getElementById("dropdown-content-filter");

  contentSort.classList.add("is-hidden");
  contentFilter.classList.add("is-hidden");

  const btnFilterAction = document.getElementById("filter-action");
  const btnFilterAnimation = document.getElementById("filter-animation");
  const btnFilterArtMartiaux = document.getElementById("filter-artsmartiaux");
  const btnFilterAventure = document.getElementById("filter-aventure");
  const btnFilterBiopic = document.getElementById("filter-biopic");
  const btnFilterComedie = document.getElementById("filter-comedie");
  const btnFilterComMusical = document.getElementById("filter-commusicale");
  const btnFilterCrime = document.getElementById("filter-crime");
  const btnFilterDrame = document.getElementById("filter-drame");
  const btnFilterEspionnage = document.getElementById("filter-espionnage");
  const btnFilterFamille = document.getElementById("filter-famille");
  const btnFilterFantastique = document.getElementById("filter-fantastique");
  const btnFilterGuerre = document.getElementById("filter-guerre");
  const btnFilterHistorique = document.getElementById("filter-historique");
  const btnFilterHorreur = document.getElementById("filter-horreur");
  const btnFilterMusique = document.getElementById("filter-musique");
  const btnFilterMystere = document.getElementById("filter-mystere");
  const btnFilterPolicier = document.getElementById("filter-policier");
  const btnFilterRomance = document.getElementById("filter-romance");
  const btnFilterSF = document.getElementById("filter-sf");
  const btnFilterSuspense = document.getElementById("filter-suspense");
  const btnFilterThriller = document.getElementById("filter-thriller");
  const btnFilterWestern = document.getElementById("filter-western");

  const displayFilter = document.getElementById("filter-display");

  btnSort.addEventListener("click", () => {
    if (contentSort.classList.contains("is-hidden")) {
      contentSort.classList.remove("is-hidden");
    } else contentSort.classList.add("is-hidden");
    if (!contentFilter.classList.contains("is-hidden")) {
      contentFilter.classList.add("is-hidden");
    }
  });

  btnFilter.addEventListener("click", () => {
    if (contentFilter.classList.contains("is-hidden")) {
      contentFilter.classList.remove("is-hidden");
    } else contentFilter.classList.add("is-hidden");
    if (!contentSort.classList.contains("is-hidden")) {
      contentSort.classList.add("is-hidden");
    }
  })

  const sortAZ = document.getElementById("sort-az");
  const sortZA = document.getElementById("sort-za");
  const sort19 = document.getElementById("sort-19");
  const sort91 = document.getElementById("sort-91");

  sortAZ.addEventListener("click", () =>{
    sortAZ.style.display = "none";
    sortZA.style.display = "inline";
    sort19.style.display = "inline";
    sort91.style.display = "inline";

    order = { field: "title", direction: "asc" };
    loadAllMovies();
  });

  sortZA.addEventListener("click", () => {
    sortAZ.style.display = "inline";
    sortZA.style.display = "none";
    sort19.style.display = "inline";
    sort91.style.display = "inline";

    order = { field: "title", direction: "desc" };
    loadAllMovies();
  });

  sort19.addEventListener("click", () => {
    sortAZ.style.display = "inline";
    sortZA.style.display = "inline";
    sort19.style.display = "none";
    sort91.style.display = "inline";

    order = { field: "year", direction: "asc" };
    loadAllMovies();
  });

  sort91.addEventListener("click", () => {
    sortAZ.style.display = "inline";
    sortZA.style.display = "inline";
    sort19.style.display = "inline";
    sort91.style.display = "none";

    order = { field: "year", direction: "desc" };
    loadAllMovies();
  });

  btnFilterAction.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Action";
    displayFilter.textContent = "Films d'action";
    loadAllMovies();
  });

  btnFilterAnimation.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Animation";
    displayFilter.textContent = "Films d'animation";
    loadAllMovies();
  });

  btnFilterArtMartiaux.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Arts martiaux";
    displayFilter.textContent = "Films d'arts martiaux";
    loadAllMovies();
  });

  btnFilterAventure.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Aventure";
    displayFilter.textContent = "Films d'aventure";
    loadAllMovies();
  });

  btnFilterBiopic.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Biopic";
    displayFilter.textContent = "Biopics";
    loadAllMovies();
  });

  btnFilterComedie.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Comédie";
    displayFilter.textContent = "Comédies";
    loadAllMovies();
  });

  btnFilterComMusical.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Comédie musicale";
    displayFilter.textContent = "Comédies musicales";
    loadAllMovies();
  });

  btnFilterCrime.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Crime";
    displayFilter.textContent = "Films de crime";
    loadAllMovies();
  });

  btnFilterDrame.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Drame";
    displayFilter.textContent = "Films dramatiques";
    loadAllMovies();
  });

  btnFilterEspionnage.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Espionnage";
    displayFilter.textContent = "Films d'espionnage";
    loadAllMovies();
  });

  btnFilterFantastique.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Fantastique";
    displayFilter.textContent = "Films fantastiques";
    loadAllMovies();
  });

  btnFilterFamille.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Famille";
    displayFilter.textContent = "Films familials";
    loadAllMovies();
  });

  btnFilterGuerre.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Guerre";
    displayFilter.textContent = "Films de guerre";
    loadAllMovies();
  });

  btnFilterHistorique.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Historique";
    displayFilter.textContent = "Films historiques";
    loadAllMovies();
  });

  btnFilterHorreur.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Horreur";
    displayFilter.textContent = "Films d'horreur";
    loadAllMovies();
  });

  btnFilterMusique.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Musique";
    displayFilter.textContent = "Films musicaux";
    loadAllMovies();
  });

  btnFilterMystere.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Mystère";
    displayFilter.textContent = "Films de mystères";
    loadAllMovies();
  });

  btnFilterPolicier.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Policier";
    displayFilter.textContent = "Films policiers";
    loadAllMovies();
  });

  btnFilterRomance.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Romance";
    displayFilter.textContent = "Films romantiques";
    loadAllMovies();
  });

  btnFilterSF.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Science-Fiction";
    displayFilter.textContent = "Films de science-fiction";
    loadAllMovies();
  });

  btnFilterSuspense.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Suspense";
    displayFilter.textContent = "Films à suspense";
    loadAllMovies();
  });

  btnFilterThriller.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Thriller";
    displayFilter.textContent = "Thrillers";
    loadAllMovies();
  });

  btnFilterWestern.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "Western";
    displayFilter.textContent = "Films westerns";
    loadAllMovies();
  });
}

// ----------
// FONCTION D'AFFICHAGE DES FILMS CHARGÉS
// ----------
async function renderMovies() {
  const container = document.getElementById("list-all-movies");
  container.innerHTML = "";

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const pageMovies = filteredMovies.slice(start, end);

  pageMovies.forEach(async movie => {
    container.appendChild(await createMovieCard(movie));
  });

  renderPagination();
}

// ----------
// FONCTION DE RECHERCHE DANS LA BASE DE DONNÉES DES FILMS (VOIR SI POSSIBILITÉ DE GÉNÉRALISER ?)
// ----------
export function initResearch() {
  $("#movie-search").on("input", function () {
    
    let search = $(this).val().toLowerCase();
    
    currentPage = 1;
    if (search === "") {
      filteredMovies = [...allMovies];
    } else {
      filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(search)
      );
    }

    $(".column.is-one-quarter").each(function () {

      let title = $(this).find(".title.is-5").text().toLowerCase();

      if (title.includes(search)) {
        $(this).fadeIn(150);
      } else {
        $(this).fadeOut(150);
      }

    });
    
    renderMovies();
  });
}

// -----------
// FONCTION POUR CHARGER L'ENSEMBLE DES FILMS
// ----------
export async function loadAllMovies() {
  const allMovieContainer = document.getElementById("list-all-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  let query = supabase
    .from("movies")
    .select(`*, users_movies(seen, user_id)`);
  
  if (order.field === "year") {
    query = query
      .order("year", { ascending: order.direction === "asc" })
      .order("title", { ascending: true });
  } else if(order.field === "title") {
    query = query.order("title", { ascending: order.direction === "asc" })
  }

  if (genreFilter !== "") {
    query = query.ilike("genres", `%${genreFilter}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    allMovieContainer.textContent = "Erreur lors du chargement des films.";
  }
  
  const moviesWithStatus = data.map(movie => {
    const userMovie = movie.users_movies.find(
      um => um.user_id === userId
    );
    
    return {
      ...movie,
      seen: userMovie ? userMovie.seen : null,
      ownPoster: userMovie ? userMovie.own_poster : null
    };
  });

  allMovies = moviesWithStatus;
  filteredMovies = sortMovies(moviesWithStatus);

  renderMovies();
}

// ----------
// FONCTION POUR CHARGER L'ENSEMBLE DES FILMS À VOIR -----> FONCTION À RETRAVAILLER ET REGROUPER AVEC LA FONCTION LOADSEENMOVIE
// ----------
export async function loadToseeMovies() {
  const toseeContainer = document.getElementById("list-tosee-movies");
  const seenContainer = document.getElementById("list-seen-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data: toseeMovies, error: errorTooseeMovies } = await supabase
    .from("users_movies")
    .select(`*, movies (*)`)
    .eq("user_id", userId)
    .eq("seen", false)
    .order("date_seen", { ascending: false })
    .order("title", { foreignTable: "movies", ascending: true })
    
  if (errorTooseeMovies) {
    console.error(errorTooseeMovies);
    toseeContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  toseeMovies.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("column");
    column.classList.add("is-one-quarter");

    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const pTitle = document.createElement("p");
    pTitle.classList.add("title");
    pTitle.classList.add("is-5");
    pTitle.textContent = item.movies.title;

    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = item.movies.year;

    const divTags = document.createElement("div");
    divTags.classList.add("is-flex");

    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.classList.add("is-hoverable");
    detailsBtn.classList.add("mr-2");
    detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
    detailsBtn.href = `/Elina/movies/movie.html?id=${item.movie_id}`;

    const toSeeBtn = document.createElement("button");
    toSeeBtn.classList.add("tag");
    toSeeBtn.classList.add("button");
    toSeeBtn.classList.add("is-success");
    toSeeBtn.classList.add("is-light");
    toSeeBtn.classList.add("is-hoverable");
    toSeeBtn.classList.add("mr-2");
    toSeeBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

    const toSuppBtn = document.createElement("button");
    toSuppBtn.classList.add("tag");
    toSuppBtn.classList.add("button");
    toSuppBtn.classList.add("is-hoverable");
    toSuppBtn.classList.add("is-danger");
    toSuppBtn.classList.add("is-light");
    toSuppBtn.classList.add("mr-2");
    toSuppBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;

    const seenBtn = document.createElement("button");
    seenBtn.classList.add("tag");
    seenBtn.classList.add("button");
    seenBtn.classList.add("is-hoverable");
    seenBtn.classList.add("is-success");
    seenBtn.classList.add("mr-2");
    seenBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;

    divTags.append(toSeeBtn, toSuppBtn, detailsBtn);
    cardContent.append(pTitle, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    if (item.movies.poster !== null) {
      const cardFigure = document.createElement("div");
      cardFigure.classList.add("card-content", "column", "is-4");
      
      const figurePoster = document.createElement("figure");
      figurePoster.classList.add("image", "poster-wrapper", "is-2by3", "media-right");
      
      const imgPoster = document.createElement("img");
      imgPoster.src = item.movies.poster;
      
      figurePoster.appendChild(imgPoster);
      cardFigure.appendChild(figurePoster);

      cardContent.classList.add("column", "is-8");
      
      card.classList.add("columns", "is-mobile", "is-align-items-center");
      
      card.appendChild(cardFigure);
    }

    toseeContainer.appendChild(column);

    toSeeBtn.addEventListener("click", async () => {
      toSeeBtn.textContent = "";
      toSeeBtn.classList.remove("is-light");
      toSeeBtn.classList.add("is-loading");

      try {
        const { data, error } = await supabase
          .from("users_movies")
          .update({ seen: true })
          .eq("user_id", userId)
          .eq("movie_id", item.movie_id)
          .single();

          if (error) {
            setTimeout(() => {
              toSeeBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
              toSeeBtn.classList.remove("is-success");
              toSeeBtn.classList.remove("is-light");
              toSeeBtn.classList.remove("is-loading");
              toSeeBtn.classList.add("is-danger");
            }, 500);
            return;
          }

          setTimeout(() => {
            toSeeBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
            toSeeBtn.classList.add("is-light");
            toSeeBtn.classList.remove("is-loading");

            divTags.innerHTML = "";
            divTags.append(seenBtn, detailsBtn);

            setTimeout(() => {
              toseeContainer.removeChild(column);
              seenContainer.appendChild(column);
            }, 500);
          }, 500);

      } catch (err) {
        console.error("Erreur :", error);
        setTimeout(() => {
          toSeeBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          toSeeBtn.classList.remove("is-success");
          toSeeBtn.classList.remove("is-light");
          toSeeBtn.classList.remove("is-loading");
          toSeeBtn.classList.add("is-danger");
        }, 500);
        return;
      };
    });

    toSuppBtn.addEventListener("click", async () => {
      toSuppBtn.textContent = "";
      toSuppBtn.classList.add("is-loading");
      toSuppBtn.classList.remove("is-danger");
      toSuppBtn.classList.add("is-success");

      try {
        const { data, error } = await supabase
          .from("users_movies")
          .delete()
          .eq("movie_id", item.movie_id)
          .eq("user_id", userId)
          .single();

        if (error) {
          setTimeout(() => {
            toSuppBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            toSuppBtn.classList.add("is-danger");
            toSuppBtn.classList.remove("is-success");
          }, 500);
          return;
        }

        toseeContainer.removeChild(column);

        setTimeout(() => {
          toSuppBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Supprimer</span>`;
          toSuppBtn.classList.remove("is-loading");
          toSuppBtn.classList.add("is-danger");
          toSuppBtn.classList.remove("is-success");
        }, 500);
      } catch (err) {
        setTimeout(() => {
          toSuppBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          toSuppBtn.classList.add("is-danger");
          toSuppBtn.classList.remove("is-success");
        }, 500);
        return;
      }
    });
  });
}

// ----------
// FONCTION POUR CHARGER L'ENSEMBLE DES FILMS VUS -----> FONCTION À RETRAVAILLER ET REGROUPER AVEC LA FONCTION LOADTOSEEMOVIES
// ----------
export async function loadSeenMovies() {
  const seenContainer = document.getElementById("list-seen-movies");
  const toseeContainer = document.getElementById("list-tosee-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data: seenMovies, error: errorSeenMovies } = await supabase
    .from("users_movies")
    .select(`*, movies (*)`)
    .eq("user_id", userId)
    .eq("seen", true)
    .order("date_seen", { ascending: false })
    .order("title", { foreignTable: "movies", ascending: true })

  if (errorSeenMovies) {
    console.error(errorSeenMovies);
    seenContainer.textContent = "Erreur lors du chargement des fims.";
    return;
  }

  seenMovies.forEach(item => {
    const column = document.createElement("div");
    column.classList.add("column");
    column.classList.add("is-one-quarter");

    const card = document.createElement("div");
    card.classList.add("card");
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const pTitle = document.createElement("p");
    pTitle.classList.add("title");
    pTitle.classList.add("is-5");
    pTitle.textContent = item.movies.title;

    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = item.movies.year;

    const divTags = document.createElement("div");
    divTags.classList.add("is-flex-direction-row");

    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
    detailsBtn.href = `/Elina/movies/movie.html?id=${item.movie_id}`;

    const seenBtn = document.createElement("button");
    seenBtn.classList.add("tag");
    seenBtn.classList.add("button");
    seenBtn.classList.add("is-hoverable");
    seenBtn.classList.add("is-success");
    seenBtn.classList.add("mr-2");
    seenBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;

    const suppBtn = document.createElement("button");
    suppBtn.classList.add("tag");
    suppBtn.classList.add("button");
    suppBtn.classList.add("is-hoverable");
    suppBtn.classList.add("is-danger");
    suppBtn.classList.add("is-light");
    suppBtn.classList.add("mr-2");
    suppBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;

    const viewBtn = document.createElement("button");
    viewBtn.classList.add("tag");
    viewBtn.classList.add("button");
    viewBtn.classList.add("is-hoverable");
    viewBtn.classList.add("is-light");
    viewBtn.classList.add("is-success");
    viewBtn.classList.add("mr-2");
    viewBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

    divTags.append(seenBtn, detailsBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    if (item.movies.poster !== null) {
      const cardFigure = document.createElement("div");
      cardFigure.classList.add("card-content", "column", "is-4");
      
      const figurePoster = document.createElement("figure");
      figurePoster.classList.add("image", "poster-wrapper", "is-2by3", "media-right");
      
      const imgPoster = document.createElement("img");
      imgPoster.src = item.movies.poster;
      
      figurePoster.appendChild(imgPoster);
      cardFigure.appendChild(figurePoster);

      cardContent.classList.add("column", "is-8");
      
      card.classList.add("columns", "is-mobile", "is-align-items-center");
      
      card.appendChild(cardFigure);
    }

    seenContainer.appendChild(column);

    seenBtn.addEventListener("click", async () => {
      seenBtn.textContent = "";
      seenBtn.classList.add("is-loading");
      
      try {
        const { data, error } = await supabase
          .from("users_movies")
          .update("seen", false)
          .eq("user_id", userId)
          .eq("movie_id", movie.id)
          .single();

          if (error) {
            setTimeout(() => {
              seenBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
              viewBtn.classList.add("is-danger");
              return;
            }, 500);
          }

          setTimeout(() => {
            divTags.innerHTML = "";
            divTags.append(viewBtn, supabase, detailsBtn);
          }, 500);

          setTimeout(() => {
            seenContainer.removeChild(column);
            toseeContainer.appendChild(column);
          }, 500);

      } catch (err) {
        setTimeout(() => {
          seenBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          viewBtn.classList.add("is-danger");
        }, 500);
        return;
      }
    })
  });
}

// ----------
// FONCTION POUR CHARGER L'ENSEMBLE DES FILMS À COMPLÉTER
// ----------
export async function loadIncompleteMovies() {
  const incompleteMoviesContainer = document.getElementById("list-incomplete-movies");
  if (!incompleteMoviesContainer) return;

  const { data, error } = await supabase
    .from("movies")
    .select("id, title, year")
    .eq("complete", false)
    .order("year", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    console.error(error);
    incompleteMoviesContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  if (data.length === 0) {
    incompleteMoviesContainer.textContent = "Aucun film à compléter ! Tout est à jour.";
    return;
  }

  data.forEach((movie) => {
    const column = document.createElement("div");
    column.classList.add("column");
    column.classList.add("is-one-quarter");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const pTitle = document.createElement("p");
    pTitle.classList.add("title");
    pTitle.classList.add("is-5");
    pTitle.textContent = movie.title;

    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = movie.year;

    const divTags = document.createElement("div");
    divTags.classList.add("is-flex-direction-row");

    const completeBtn = document.createElement("a");
    completeBtn.classList.add("tag");
    completeBtn.textContent = "Compléter";
    completeBtn.href = `/Elina/movies/complete.html?id=${movie.id}`;

    divTags.appendChild(completeBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    incompleteMoviesContainer.appendChild(column);
    
  });

}

// FONCTIONS SUR LES SÉRIES ----> À COMPLÉTER (VIDE)
export async function loadAllShows() {
  const allShowsContainer = document.getElementById("list-all-shows");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data, error } = await supabase
    .from("shows")
    .select(`*, users_shows(state, user_id)`)
    .order("title", { ascending: true });

  if (error) {
    console.error(error);
    allShowsContainer.textContent = "Erreur lors du chargement des séries.";
  }

  const showsWithStatus = data.map(show => {
    const userShow = show.users_shows.find(
      us => us.user_id === userId
    );
    
    return {
      ...show,
      seen: userShow ? userShow.state : null
    };
  });

  showsWithStatus.forEach(show => {
    const column = document.createElement("div");
    column.classList.add("column");
    column.classList.add("is-one-quarter");

    const card = document.createElement("div");
    card.classList.add("card");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const pTitle = document.createElement("p");
    pTitle.classList.add("title");
    pTitle.classList.add("is-5");
    pTitle.textContent = show.title;

    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("title");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = 'test';

    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.classList.add("is-hoverable");
    detailsBtn.classList.add("mr-2");
    detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
    detailsBtn.href = `/Elina/shows/movie.html?id=${show.id}`;

    const divTags = document.createElement("div");
    divTags.classList.add("is-flex");
    divTags.appendChild(detailsBtn);
    cardContent.append(pTitle, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);
    
  });
}

export async function loadCurrentShows() {
}

export async function loadCurrentDramas() {
}

export async function loadLastBooks() {
}