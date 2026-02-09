import { supabase } from "/Elina/js/supabase.js";

const incompleteContainer = document.getElementById("list-incomplete-movies");

export async function loadIncompleteMovies() {
  if (!incompleteContainer) return;

  const { data, error } = await supabase
    .from("movies")
    .select("id, title, year")
    .eq("complete", false);

  if (error) {
    console.error(error);
    incompleteContainer.textContent = "Erreur lors du chargement des films.";
    return;
  }

  if (data.length === 0) {
    incompleteContainer.textContent = "Aucun film à afficher.";
    return;
  }

  data.forEach((movie) => {
    const column = document.createElement("div");
    column.classList.add = "column";
    column.classList.add = "is-one-quarter";
    const card = document.createElement("div");
    card.classList.add = "card";
    const cardContent = document.createElement("div");
    cardContent.classList.add = "card-content";
    const pTitle = document.createElement("p");
    pTitle.classList.add = "title";
    pTitle.classList.add = "is-5";
    pTitle.textContent = movie.title;
    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add = "subtitle";
    pSubtitle.classList.add = "is-6";
    pSubtitle.textContent = movie.year;
    const spanTag = document.createElement("span");
    spanTag.classList.add = "tag";
    spanTag.textContent = "Non vu";

    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(spanTag);
    card.appendChild(cardContent);
    column.appendChild(card);

    incompleteContainer.appendChild(column);
    
  });

}

