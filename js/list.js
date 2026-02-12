import { supabase } from "/Elina/js/supabase.js";

const incompleteMoviesContainer = document.getElementById("list-incomplete-movies");
const incompletePeopleContainer = document.getElementById("list-incomplete-people");
const seenContainer = document.getElementById("list-seen-movies");
const currentContainer = document.getElementById("list-current-shows");
const allMoviesContainer = document.getElementById("list-all-movies");

async function loadSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("pseudo")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Erreur profil :", error.message);
    return;
  }

  return session;
}

async function loadData(table, filtre, donnee) {
  const { data, error } = await supabase
    .from(table).select("*")
    .select("*")
    .eq(filtre, donnee)
    .single();
    
  if (error) {
    console.error(error);
    return;
  }

  return data;
}

function calculateAge(startDate, endDate = new Date()) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let age = end.getFullYear() - start.getFullYear();
    const m = end.getMonth() - start.getMonth();

    if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
        age--;
    }

    return age;
}

export async function loadAllMovies() {
  const session = loadSession();
  console.log(session);
  
  if (!allMoviesContainer) return;

  const { data, error } = await supabase
    .from("movies")
    .select("id, title, year")
    .order("year", { ascending: false })
    .order("title", { ascending: true });

  if (error) {
    console.error(error);
    allMoviesContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  if (data.length === 0) {
    allMoviesContainer.textContent = "Aucun film affichage…";
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
    const userTag = document.createElement("a");
    userTag.classList.add("tag");

    divTags.appendChild(userTag);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    allMoviesContainer.appendChild(column);
    
  });

}

export async function loadIncompleteMovies() {
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
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("users_movies")
    .select("*")
    .eq("user_id", userId)
    .eq("seen", false)
    .order("date", { ascending: false })
    
  if (error) {
    console.error(error);
    seenContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  data.forEach((user_m) => {
    loadData("movies", "id", user_m.movie_id)
      .then(movie => {
        const titleMovie = movie.title;
        const yearMovie = movie.year;
      }).catch(err => console.error(err)
    );

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
    pTitle.textContent = titleMovie;
    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = yearMovie;
    const divTags = document.createElement("div");
    divTags.classList.add("is-flex-direction-row");
    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.textContent = "Détails";
    detailsBtn.href = `/Elina/movies/movie.html?id=${movie.id}`;

    divTags.appendChild(detailsBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    seenContainer.appendChild(column);

  })

}

export async function loadSeenMovies() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("users_movies")
    .select("*")
    .eq("user_id", userId)
    .eq("seen", true)
    .order("date", { ascending: false })
    
  if (error) {
    console.error(error);
    seenContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  data.forEach((user_m) => {
    loadData("movies", "id", user_m.movie_id)
      .then(movie => {
        const titleMovie = movie.title;
        const yearMovie = movie.year;

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
        pTitle.textContent = titleMovie;
        const pSubtitle = document.createElement("p");
        pSubtitle.classList.add("subtitle");
        pSubtitle.classList.add("is-6");
        pSubtitle.textContent = yearMovie;
        const divTags = document.createElement("div");
        divTags.classList.add("is-flex-direction-row");
        const detailsBtn = document.createElement("a");
        detailsBtn.classList.add("tag");
        detailsBtn.textContent = "Détails";
        detailsBtn.href = `/Elina/movies/movie.html?id=${movie.id}`;

        divTags.appendChild(detailsBtn);
        cardContent.appendChild(pTitle);
        cardContent.appendChild(pSubtitle);
        cardContent.appendChild(divTags);
        card.appendChild(cardContent);
        column.appendChild(card);

        seenContainer.appendChild(column);

      }).catch(err => console.error(err)
    );

  })

}

export async function loadCurrentShows() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("users_shows")
    .select("*")
    .eq("user_id", userId)

  if (error) {
    console.error(error);
    incompleteContainer.textContent = "Erreur lors du chargement des séries.";
    return;
  }

  data.forEach((user_s) => {
    const show = supabase
      .from("shows")
      .select("*")
      .eq("id", user_s.show_id)
      .single();

    console.log(show);

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
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = "test";
    const divTags = document.createElement("div");
    divTags.classList.add("is-flex-direction-row");
    const detailsBtn = document.createElement("a");
    detailsBtn.classList.add("tag");
    detailsBtn.textContent = "Détails";
    detailsBtn.href = `/Elina/shows/show.html?id=${show.id}`;

    divTags.appendChild(detailsBtn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    currentContainer.appendChild(column);
  })
}

export async function loadCurrentDramas() {
  // EN COURS
}

export async function loadLastBooks() {
  // EN COURS
}