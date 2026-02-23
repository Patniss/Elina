// IMPORTARTIONS NÉCESSAIRES
import { supabase } from "/Elina/js/supabase.js";
import { calculateAge } from "/Elina/js/functions.js";
import { loadProfile } from "/Elina/js/dashboard.js";
import { addMovie } from "/Elina/js/functions.js";
import { suppMovie } from "/Elina/js/functions.js";
import { toseeMovie } from "/Elina/js/functions.js";
import { seenMovie } from "/Elina/js/functions.js";

// VARIABLES BASIQUES
let currentPageAll = 1;
let currentPageTosee = 1;
let currentPageSeen = 1;
const pageSize = 20;
let order = {
  field: "year",
  direction: "desc"
};
let genreFilter = "";

// ----------
// FONCTION PLUS GÉNÉRAL 
// ----------
let allMovies = [];
let filteredMovies = [];
let filteredTosee = [];
let filteredSeen = [];
let toseeMovies = [];
let seenMovies = [];

function renderPagination({containerId, currentPage, setCurrentPage, totalItems}) {
  const pagination = document.getElementById(containerId);
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / pageSize);
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
      setCurrentPage(page);
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
      setCurrentPage(currentPage - 1);
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
      setCurrentPage(currentPage + 1);
      renderMovies();
    });
  }

  pagination.appendChild(nextBtn);
}

function renderPaginationAll(totalItems) {
  renderPagination({
    containerId: "pagination_nb",
    currentPage: currentPageAll,
    setCurrentPage: (page) => currentPageAll = page,
    totalItems
  });
}

function renderPaginationTosee(totalItems) {
  renderPagination({
    containerId: "pagination_nb_tosee",
    currentPage: currentPageTosee,
    setCurrentPage: (page) => currentPageTosee = page,
    totalItems
  });
}

function renderPaginationSeen(totalItems) {
  renderPagination({
    containerId: "pagination_nb_seen",
    currentPage: currentPageSeen,
    setCurrentPage: (page) => currentPageSeen = page,
    totalItems
  });
}

export function initResearchMovie() {
  if (document.getElementById("list-all-movies")) {
      $("#movie-search").on("input", function () {
        let search = $(this).val().toLowerCase();
        currentPageAll = 1;
        
      if (search === "") {
        filteredMovies = [...allMovies];
      } else {
        filteredMovies = allMovies.filter(
          movie => movie.title.toLowerCase().includes(search)
        );
      }
      
      $(".column.is-one-quarter")
      .each(function () {
        let title = $(this).find(".title.is-5").text().toLowerCase();
        
        if (title.includes(search)) {
          $(this).fadeIn(150);
        } else {
          $(this).fadeOut(150);
        }
      });
      
      renderMovies();
    });
  } else if (document.getElementById("div-tosee-movies") && document.getElementById("div-seen-movies")) {
    $("#movie-search").on("input", function () {
      let search = $(this).val().toLowerCase();

      currentPageTosee = 1;
      currentPageSeen = 1;

      if (search === "") {
        filteredTosee = [...toseeMovies];
        filteredSeen = [...seenMovies];
      } else {
        filteredTosee = toseeMovies.filter(
          movie => movie.movies.title.toLowerCase().includes(search)
        );
        filteredSeen = seenMovies.filter(
          movie => movie.movies.title.toLowerCase().includes(search)
        );
      }

      $(".column.is-one-quarter")
      .each(function () {
        let title = $(this).find(".title.is-5").text().toLowerCase();

        if (title.includes(search)) {
          $(this).fadeIn(150);
        } else {
          $(this).fadeOut(150);
        }
      })
    });

    if (filteredTosee.length > 0) {
      $("div-tosee-movies").removeClass("is-hidden");
      $("arrow-tosee").removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      $("div-tosee-movies").addClass("is-hidden");
      $("arrow-tosee").removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }

    if (filteredSeen.length > 0) {
      $("div-seen-movies").removeClass("is-hidden");
      $("arrow-seen").removeClass("fa-chevron-right").addClass("fa-chevron-down");
    } else {
      $("div-seen-movies").addClass("is-hidden");
      $("arrow-seen").removeClass("fa-chevron-down").addClass("fa-chevron-right");
    }
  }
}

// ----------
// FONCTION SUR LES FILMS
// ----------
async function createMovieCard(movie) {
  // ❶ Récupérer la session
  const session = await loadProfile();
  const userId = session.id;
  
  const movieTitle = movie.title ?? movie.movies.title;
  const movieYear = movie.year ?? movie.movies.year;
  const movieId = movie.title ? movie.id : movie.movies.id;
  const movieSeen = movie.seen ?? movie.users_movies.seen;
  const moviePoster = movie.own_poster ?? movie.poster ?? movie.movies.poster;

  // Création de la carte
  const column = document.createElement("div");
  column.classList.add("column", "is-one-quarter");

  const card = document.createElement("div");
  card.classList.add("card", "movie-card");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const pTitle = document.createElement("p");
  pTitle.classList.add("title", "is-5");
  pTitle.textContent = movieTitle;

  const pSubtitle = document.createElement("p");
  pSubtitle.classList.add("subtitle", "is-6");
  pSubtitle.textContent = movieYear;

  const divTags = document.createElement("div");
  divTags.classList.add("buttons", "is-flex-wrap-wrap", "mt-3");

  const detailsBtn = document.createElement("a");
  detailsBtn.classList.add("tag", "button", "is-hoverable", "mr-2");
  detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
  detailsBtn.href = `/Elina/entertainment/movies/movie.html?id=${movieId}`;

  const addMovieBtn = document.createElement("button");
  addMovieBtn.classList.add("tag", "button", "is-hoverable", "is-link", "mr-2");
  addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;

  const suppMovieBtn = document.createElement("button");
  suppMovieBtn.classList.add("tag", "button", "is-hoverable", "is-danger", "is-light", "mr-2");
  suppMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;

  const toseeMovieBtn = document.createElement("button");
  toseeMovieBtn.classList.add("tag", "button", "is-hoverable", "is-light", "is-success", "mr-2");
  toseeMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

  const seenMovieBtn = document.createElement("button");
  seenMovieBtn.classList.add("tag", "button", "is-hoverable", "is-success", "mr-2");
  seenMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;

  // Gestion des tags en fonction du statut perso du film
  switch (movieSeen) {
    case null:
      divTags.appendChild(addMovieBtn);
      break;
  
    case false:
      divTags.append(toseeMovieBtn, suppMovieBtn);
      break;

    case true:
      divTags.appendChild(seenMovieBtn);
      break;

    default:
      divTags.appendChild(addMovieBtn);
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
  imgPoster.src = moviePoster;
  imgPoster.alt = movie.title;
  
  figurePoster.appendChild(imgPoster);
  cardFigure.appendChild(figurePoster);
  
  card.appendChild(cardFigure);

  addMovieBtn.addEventListener("click", async () => {
    addMovie("adding", movie.id, addMovieBtn, divTags, toseeMovieBtn, suppMovieBtn, detailsBtn);
  })

  suppMovieBtn.addEventListener("click", async () => {
    suppMovie("adding", movie.id, suppMovieBtn, divTags, addMovieBtn, detailsBtn);
  })

  toseeMovieBtn.addEventListener("click", async () => {
    toseeMovie("adding", movie.id, toseeMovieBtn, divTags, seenMovieBtn, suppMovieBtn, detailsBtn);
  });
  
  seenMovieBtn.addEventListener("click", async () => {
    seenMovie("adding", movie.id, seenMovieBtn, divTags, toseeMovieBtn, suppMovieBtn, detailsBtn);
  });

  return column;
}

export function sortFilterMovies() {
  const btnSort = document.getElementById("button-content-sort");
  const contentSort = document.getElementById("dropdown-content-sort");
  const btnFilter = document.getElementById("button-content-filter");
  const contentFilter = document.getElementById("dropdown-content-filter");

  contentSort.classList.add("is-hidden");
  contentFilter.classList.add("is-hidden");

  const btnFilterReint = document.getElementById("filter-reint");
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

  btnFilterReint.addEventListener("click", () => {
    contentFilter.classList.add("is-hidden");
    genreFilter = "";
    displayFilter.textContent = "";
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

async function renderMovies() {
  const containerAllMovies = document.getElementById("list-all-movies");
  const containerToseeMovies = document.getElementById("list-tosee-movies");
  const containerSeenMovies = document.getElementById("list-seen-movies");

  if (containerAllMovies) {
    containerAllMovies.innerHTML = "";

    const start = (currentPageAll - 1) * pageSize;
    const end = start + pageSize;

    const pageMovies = filteredMovies.slice(start, end);

    for (const movie of pageMovies) {
      containerAllMovies.appendChild(await createMovieCard(movie));
    }

    renderPaginationAll(filteredMovies.length);
    return;
  }

  if (containerToseeMovies && containerSeenMovies) {
    containerToseeMovies.innerHTML = "";
    containerSeenMovies.innerHTML = "";

    const toSeeMovies = filteredMovies.filter(movie =>
      movie.seen === false
    );

    const seenMovies = filteredMovies.filter(movie =>
      movie.seen === true
    );

    const startTosee = (currentPageTosee - 1) * pageSize;
    const endTosee = startTosee + pageSize;

    const pageToSee = toSeeMovies.slice(startTosee, endTosee);

    const startSeen = (currentPageSeen - 1) * pageSize;
    const endSeen = startSeen + pageSize;

    const pageSeen = seenMovies.slice(startSeen, endSeen);

    for (const movie of pageToSee) {
      containerToseeMovies.appendChild(await createMovieCard(movie));
    }

    for (const movie of pageSeen) {
      containerSeenMovies.appendChild(await createMovieCard(movie));
    }

    renderPaginationTosee(toSeeMovies.length);
    renderPaginationSeen(seenMovies.length);
  }
}

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
    return;
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
  filteredMovies = moviesWithStatus;

  renderMovies();
}

export async function loadMyMovies() {
  const toseeContainer = document.getElementById("list-tosee-movies");
  const seenContainer = document.getElementById("list-seen-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  let order = {
    field: "seen",
    direction: "desc"
  };

  let query = supabase
    .from("users_movies")
    .select(`*, movies(*)`)
    .eq("user_id", userId);
  
  if (order.field === "seen") {
    query = query
      .order("seen", { ascending: order.direction === "asc" })
      .order("title", { foreignTable: "movies", ascending: true });
  } else if(order.field === "title") {
    query = query.order("title", { foreignTable: "movies", ascending: order.direction === "asc" })
  } else if(order.field === "year") {
    query = query.order("year", { foreignTable: "movies", ascending: order.direction === "asc" })
  }

  if (genreFilter !== "") {
    query = query.ilike("genres", `%${genreFilter}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    toseeContainer.textContent = "Erreur lors du chargement des films.";
    seenContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  allMovies = data;
  filteredMovies = data;

  renderMovies();
}

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
    completeBtn.href = `/Elina/entertainment/movies/complete.html?id=${movie.id}`;

    divTags.appendChild(completeBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    incompleteMoviesContainer.appendChild(column);
    
  });

}

// ------------
// FONCTIONS SUR LES SÉRIES
// ------------
let allShows = [];
let filteredShows = [];

async function createShowCard(show) {
  // ❶ Récupérer la session
  const session = await loadProfile();
  const userId = session.id;
  
  const showTitle = show.title ?? show.shows.title;
  const showId = show.title ? show.id : show.shows.id;
  const showState = show.state ?? show.users_shows.state;
  const showSeasons = show.nb_seasons ?? show.shows.nb_seasons;
  const showLogo = show.logo ?? show.shows.logo;

  // Création de la carte
  const column = document.createElement("div");
  column.classList.add("column", "is-one-quarter");

  const card = document.createElement("div");
  card.classList.add("card", "show-card");

  const cardContent = document.createElement("div");
  cardContent.classList.add("card-content");

  const pTitle = document.createElement("p");
  pTitle.classList.add("title", "is-5");
  pTitle.textContent = showTitle;

  const pSubtitle = document.createElement("p");
  pSubtitle.classList.add("subtitle", "is-6");
  pSubtitle.textContent = `${showSeasons} saisons`;

  const divTags = document.createElement("div");
  divTags.classList.add("buttons", "is-flex-wrap-wrap", "mt-3");

  const detailsBtn = document.createElement("a");
  detailsBtn.classList.add("tag", "button", "is-hoverable", "mr-2");
  detailsBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
  detailsBtn.href = `/Elina/entertainment/shows/show.html?id=${showId}`;

  divTags.appendChild(detailsBtn);

  cardContent.append(pTitle, pSubtitle, divTags);
  card.appendChild(cardContent);
  column.appendChild(card);
  
  const cardFigure = document.createElement("div");
  cardFigure.classList.add("card-image");
  
  const figureLogo = document.createElement("figure");
  figureLogo.classList.add("image", "logo-wrapper");
  
  const imgLogo = document.createElement("img");
  imgLogo.src = showLogo;
  imgLogo.alt = show.title;
  
  figurePoster.appendChild(imgLogo);
  cardFigure.appendChild(figureLogo);
  
  card.appendChild(cardFigure);

  return column;
}

async function renderShows() {
  const containerAllShows = document.getElementById("list-all-shows");

  if (containerAllShows) {
    containerAllShows.innerHTML = "";

    const start = (currentPageAll - 1) * pageSize;
    const end = start + pageSize;

    const pageShows = filteredShows.slice(start, end);

    for (const show of pageShows) {
      containerAllShows.appendChild(await createShowCard(show));
    }

    renderPaginationAll(filteredShows.length);
    return;
  }
}

export async function loadAllShows() {
  const allShowsContainer = document.getElementById("list-all-shows");

  const session = await loadProfile();
  const userId = session.id;

  let query = supabase
    .from("shows")
    .select(`*, users_shows(user_id, state)`)
    .order("title", { ascending: true });

  if (genreFilter !== "") {
    query = query.ilike("genres", `%${genreFilter}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    allShowsContainer.textContent = "Erreur lors du chargement des séries.";
    return;
  }
  
  const showsWithStatus = data.map(show => {
    const userShow = show.users_shows.find(
      us => us.user_id === userId
    );
    
    return {
      ...show,
      seen: userShow ? userShow.state : null,
    };
  });

  allShows = showsWithStatus;
  filteredShows = showsWithStatus;

  renderShows();
}

export async function loadCurrentShows() {
}

export async function loadCurrentDramas() {
}

export async function loadLastBooks() {
}