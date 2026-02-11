import { supabase } from "/Elina/js/supabase.js";

const incompleteMoviesContainer = document.getElementById("list-incomplete-movies");
const incompletePeopleContainer = document.getElementById("list-incomplete-people");
const seenContainer = document.getElementById("list-seen-movies");

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
    pTitle.textContent = p.lastname;
    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle");
    pSubtitle.classList.add("is-6");
    pSubtitle.textContent = p.birthdate;
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
      .order("date", { ascending: false })
    
    if (error) {
      console.error(error);
      incompleteContainer.textContent = "Erreur lors du chargement des films.";
      return;
    }

    data.forEach((user_m) => {
      const movie = supabase
        .form("movies")
        .select("*")
        .eq("id", user_m.movie_id)

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
      const detailsBtn = document.createElement("a");
      detailsBtn.classList.add("tag");
      detailsBtn.textContent = "Détails";
      detailsBtn.href = `/Elina/movies/movie.html?id=${movie.id}`;

      divTags.appendChild(tagSeen);
      divTags.appendChild(completeBtn);
      cardContent.appendChild(pTitle);
      cardContent.appendChild(pSubtitle);
      cardContent.appendChild(divTags);
      card.appendChild(cardContent);
      column.appendChild(card);

      seenContainer.appendChild(column);

    })

}