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
    divTags.classList.add("is-justify-content-space-around");
    const tagSeen = document.createElement("a");
    tagSeen.classList.add("tag");
    tagSeen.textContent = "Non vu";
    const btn = document.createElement("a");
    btn.classList.add("tag");
    btn.textContent = "Compléter";

    divTags.appendChild(tagSeen);
    divTags.appendChild(btn);
    cardContent.appendChild(pTitle);
    cardContent.appendChild(pSubtitle);
    cardContent.appendChild(divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    incompleteContainer.appendChild(column);
    
  });

}

export async function loadSeenMovies() {
  
}