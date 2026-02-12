import { supabase } from "/Elina/js/supabase.js";
import { calculateAge } from "/Elina/js/functions.js";
import { loadProfile } from "/Elina/js/dashboard.js";

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

  moviesWithStatus.forEach(data => {
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
    pTitle.textContent = data.title;

    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("title");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = data.year;

    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.classList.add("is-hoverable");
    detailsBtn.classList.add("mr-2");
    detailsBtn.textContent = "Compléter";
    detailsBtn.href = `/Elina/movies/movie.html?id=${data.id}`;

    const addMovieBtn = document.createElement("button");
    addMovieBtn.classList.add("tag");
    addMovieBtn.classList.add("button");
    addMovieBtn.classList.add("is-hoverable");
    addMovieBtn.classList.add("is-link");
    addMovieBtn.classList.add("mr-2");
    addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;

    const suppMovieBtn = document.createElement("button");
    suppMovieBtn.classList.add("tag");
    suppMovieBtn.classList.add("button");
    suppMovieBtn.classList.add("is-hoverable");
    suppMovieBtn.classList.add("is-danger");
    suppMovieBtn.classList.add("mr-2");
    suppMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;

    const viewMovieBtn = document.createElement("button");
    viewMovieBtn.classList.add("tag");
    viewMovieBtn.classList.add("button");
    viewMovieBtn.classList.add("is-hoverable");
    viewMovieBtn.classList.add("is-light");
    viewMovieBtn.classList.add("is-success");
    viewMovieBtn.classList.add("mr-2");
    viewMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

    const seenMovieBtn = document.createElement("button");
    seenMovieBtn.classList.add("tag");
    seenMovieBtn.classList.add("button");
    seenMovieBtn.classList.add("is-hoverable");
    seenMovieBtn.classList.add("is-success");
    seenMovieBtn.classList.add("mr-2");
    seenMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;

    const divTags = document.createElement("div");
    divTags.classList.add("is-flex");

    switch (data.seen) {
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

    allMovieContainer.appendChild(column);

    addMovieBtn.addEventListener("click", async () => {
      addMovieBtn.textContent = "";
      addMovieBtn.classList.remove("is-link");
      addMovieBtn.classList.add("is-success");
      addMovieBtn.classList.add("is-loading");

      try {
        const { data, error } = await supabase
          .from("movies_users")
          .insert([
            {
              user_id: userId,
              movie_id: data.id,
              seen: false,
              date_seen: new Date().toISOString()
            }
          ])
          .select();

          if (error) {
            setTimeout(() => {
              addMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            }, 500);
            return;
          }

          setTimeout(() => {
            addMovieBtn.classList.add("is-link");
            addMovieBtn.classList.remove("is-success");
            addMovieBtn.classList.remove("is-loading");
            addMovieBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
            divTags.removeChild(addMovieBtn);
            divTags.appendChild(viewMovieBtn);
            divTags.appendChild(suppMovieBtn);
          }, 500);
      } catch (err) {
        console.error("Erreur :", error);
        setTimeout(() => {
          addMovieBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        }, 500);
        return;
      }
    })
  });
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

export async function loadToseeMovies() {
  supabase();
  console.log(profile, userId)
  const toseeContainer = document.getElementById("list-tosee-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data: toseeMovies, error: errorTooseeMovies } = await supabase
    .from("users_movies")
    .select(`*, movies (*)`)
    .eq("user_id", userId)
    .eq("seen", false)
    .order("date", { ascending: false })
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
    toSeeBtn.classList.add("is-success");
    toSeeBtn.classList.add("is-light");
    toSeeBtn.classList.add("is-hoverable");
    toSeeBtn.classList.add("mr-2");
    toSeeBtn.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;

    divTags.append(toSeeBtn, detailsBtn);
    cardContent.append(pTitle, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    toseeContainer.appendChild(column);

    toSeeBtn.addEventListener("click", async () => {
      toSeeBtn.textContent = "";
      toSeeBtn.classList.add("button");
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
            }, 500);
            return;
          }

          setTimeout(() => {
            toSeeBtn.innerHTML = `<span class="icon"><i class="fas fa-check"></i></span><span>Vu</span>`;
            toSeeBtn.classList.remove("is-loading");
          }, 500);
      } catch (err) {
        console.error("Erreur :", error);
        setTimeout(() => {
          toSeeBtn.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
        }, 500);
        return;
      };
    });
  });
}

export async function loadSeenMovies() {
  const seenContainer = document.getElementById("list-seen-movies");

  const profile = await loadProfile();
  const userId = profile.id;

  const { data: seenMovies, error: errorSeenMovies } = await supabase
    .from("users_movies")
    .select(`*, movies (*)`)
    .eq("user_id", userId)
    .eq("seen", true)
    .order("date", { ascending: false })
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
    detailsBtn.textContent = "Compléter";
    detailsBtn.href = `/Elina/movies/movie.html?id=${item.movie_id}`;

    divTags.appendChild(detailsBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    seenContainer.appendChild(column);
  });
}

export async function loadCurrentShows() {
  // EN COURS
}

export async function loadCurrentDramas() {
  // EN COURS
}

export async function loadLastBooks() {
  // EN COURS
}