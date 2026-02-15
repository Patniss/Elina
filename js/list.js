// IMPORTARTIONS NÉCESSAIRES
import { supabase } from "/Elina/js/supabase.js";
import { calculateAge } from "/Elina/js/functions.js";
import { loadProfile } from "/Elina/js/dashboard.js";

// VARIABLES BASIQUES
let allMovies = [];
let filteredMovies = [];
let currentPage = 1;
const pageSize = 20;

// FONCTIONS LISTES & CARDS
function createMovieCard(movie) {
  const allMovieContainer = document.getElementById("list-all-movies");
  
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

  switch (movie.seen) {
    case null:
      divTags.appendChild(addMovieBtn);
      break;
  
    case false:
      divTags.appendChild(viewMovieBtn);
      divTags.appendChild(suppMovieBtn);
      break;

    case true:
      divTags.appendChild(seenMovieBtn);
      break;
  }

  divTags.appendChild(detailsBtn);
  cardContent.append(pTitle, pSubtitle, divTags);
  card.appendChild(cardContent);
  column.appendChild(card);

  if (movie.poster !== null) {
    const cardFigure = document.createElement("div");
    cardFigure.classList.add("card-image");
    
    const figurePoster = document.createElement("figure");
    figurePoster.classList.add("image", "poster-wrapper", "is-2by3");
    
    const imgPoster = document.createElement("img");
    imgPoster.src = movie.poster;
    imgPoster.alt = movie.title;
    
    figurePoster.appendChild(imgPoster);
    cardFigure.appendChild(figurePoster);
    
    card.appendChild(cardFigure);
  }

  allMovieContainer.appendChild(column);

  addMovieBtn.addEventListener("click", async () => {
    addMovieBtn.textContent = "";
    addMovieBtn.classList.remove("is-link");
    addMovieBtn.classList.add("is-success");
    addMovieBtn.classList.add("is-loading");

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
            addMovieBtn.classList.remove("is-link");
            addMovieBtn.classList.add("is-danger");
          }, 500);
          return;
        }

        setTimeout(() => {
          addMovieBtn.classList.add("is-link");
          addMovieBtn.classList.remove("is-success");
          addMovieBtn.classList.remove("is-loading");
          addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
          
          divTags.removeChild(addMovieBtn);
          divTags.removeChild(detailsBtn);
          divTags.appendChild(viewMovieBtn);
          divTags.appendChild(suppMovieBtn);
          divTags.appendChild(detailsBtn);
        }, 500);

    } catch (err) {
      console.error("Erreur :", err);
      setTimeout(() => {
        addMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        addMovieBtn.classList.remove("is-link");
        addMovieBtn.classList.add("is-danger");
      }, 500);
      return;
    }
  })

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
          }, 500);
          return;
        }

        setTimeout(() => {
          suppMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;
          suppMovieBtn.classList.remove("is-loading");

          divTags.removeChild(suppMovieBtn);
          divTags.removeChild(viewMovieBtn);
          divTags.removeChild(detailsBtn);
          divTags.appendChild(addMovieBtn);
          divTags.appendChild(detailsBtn);
        }, 500);

    } catch (err) {
      setTimeout(() => {
            suppMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          }, 500);
          return;
    }
  })

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
        }, 500);
        return;
      }

      setTimeout(() => {
        viewMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
        viewMovieBtn.classList.remove("is-loading");
        viewMovieBtn.classList.add("is-light");

        divTags.removeChild(viewMovieBtn);
        divTags.removeChild(suppMovieBtn);
        divTags.removeChild(detailsBtn);
        divTags.appendChild(seenMovieBtn);
        divTags.appendChild(detailsBtn);
      }, 500);
    
    } catch (err) {
      setTimeout(() => {
        viewMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        viewMovieBtn.classList.add("is-danger");
        viewMovieBtn.classList.remove("is-loading");
      }, 500);
      return;
    }
  
  });
  
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
          return;
        }, 500);
      }
      
      setTimeout(() => {
        seenMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;
        seenMovieBtn.classList.remove("is-loading");
        
        divTags.removeChild(seenMovieBtn);
        divTags.removeChild(detailsBtn);
        divTags.appendChild(viewMovieBtn);
        divTags.appendChild(suppMovieBtn);
        divTags.appendChild(detailsBtn);
      }, 500);
    
    } catch (err) {
      setTimeout(() => {
        seenMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        viewMovieBtn.classList.add("is-danger");
      }, 500);
      return;
    }
  });
}

// FONCTIONS SUR LES FILMS
export async function loadAllMovies() {
  const allMovieContainer = document.getElementById("list-all-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data, error } = await supabase
    .from("movies")
    .select(`*, users_movies(seen, user_id)`)
    .order("year", { ascending: false })
    .order("title", { ascending: true });

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
      seen: userMovie ? userMovie.seen : null
    };
  });

  moviesWithStatus.forEach(movie => {
    createMovieCard(movie);
  });
}

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

            divTags.removeChild(toSeeBtn);
            divTags.removeChild(detailsBtn);
            divTags.removeChild(toSuppBtn);
            divTags.appendChild(seenBtn);
            divTags.appendChild(detailsBtn);

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
            divTags.removeChild(detailsBtn);
            divTags.removeChild(seenBtn);
            divTags.appendChild(viewBtn);
            divTags.appendChild(suppBtn);
            divTags.appendChild(detailsBtn);
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


// FONCTION INCOMPLETE

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

export async function loadIncompletePeople() {
  if (!incompletePeopleContainer) return;

  const { data, error } = await supabase
    .from("people")
    .select("*")
    .eq("complete", false)
    .order("lastname", { ascending: true })

  if (error) {
    console.error(error);
    incompletePeopleContainer.textContent = "Erreur lors du chargement des personnalités.";
    return;
  }

  if (data.length === 0) {
    incompletePeopleContainer.textContent = "Aucune personnalité à compléter ! Tout est à jour.";
    return;
  }

  data.forEach((p) => {
    const agePeople = p.deathdate === null ? calculateAge(p.birthdate) : "✝ " + calculateAge(p.birthdate, p.deathdate);
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
    pTitle.textContent = p.firstname !== null ? `${p.firstname} ${p.lastname}` : p.lastname;
    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = agePeople + " ans";
    const divTags = document.createElement("div");
    divTags.classList.add("is-flex-direction-row");
    const completeBtn = document.createElement("a");
    completeBtn.classList.add("tag");
    completeBtn.textContent = "Compléter";
    completeBtn.href = `/Elina/movies/people/complete.html?id=${p.id}`;

    divTags.appendChild(completeBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    incompletePeopleContainer.appendChild(column);
    
  });
}

// FONCTIONS SUR LES SÉRIES 
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