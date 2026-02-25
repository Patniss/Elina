import { createButtons, appendButtons } from "/Elina/js/ui/button.js";
import { addMovieUser, deleteMovieUser, toseeMovieUser, seenMovieUser } from "/Elina/js/modules/movies/movies.actions.js";

export async function createMovieCard(movie) {
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
    
    const buttons = createButtons(["details", "add", "delete", "tosee", "seen"], movieId);
    const detailsButton = buttons.find(btn => btn.type === "details").element;
    const addButton = buttons.find(btn => btn.type === "add").element;
    const toseeButton = buttons.find(btn => btn.type === "tosee").element;
    const deleteButton = buttons.find(btn => btn.type === "delete").element;
    const seenButton = buttons.find(btn => btn.type === "seen").element;
    
    appendButtons(movieSeen, divTags, [addButton, detailsButton], [toseeButton, deleteButton, detailsButton], [seenButton, detailsButton], [addButton, detailsButton]);
    
    cardContent.append(pTitle, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);
    
    const cardFigure = document.createElement("div");
    cardFigure.classList.add("card-image");
    
    const figurePoster = document.createElement("figure");
    figurePoster.classList.add("image", "poster-wrapper", "is-2by3");
    
    const imgPoster = document.createElement("img");
    imgPoster.src = moviePoster;
    imgPoster.alt = movieTitle;
    
    figurePoster.appendChild(imgPoster);
    cardFigure.appendChild(figurePoster);
    
    card.appendChild(cardFigure);
    
    addButton.addEventListener("click", async () => {
        addMovieUser(movieId, "adding", addButton, [toseeButton, deleteButton, detailsButton]);
    });

    deleteButton.addEventListener("click", async () => {
        deleteMovieUser(movieId, "adding", deleteButton, [addButton, detailsButton]);
    });

    toseeButton.addEventListener("click", async () => {
        toseeMovieUser(movieId, "adding", toseeButton, [seenButton, deleteButton, detailsButton]);
    });

    seenButton.addEventListener("click", async () => {
        seenMovieUser(movieId, "adding", seenButton, [toseeButton, deleteButton, detailsButton]);
    });

  return column;
}


export function updateMovieUI(status, elements) { // Met à jour l'affichage des boutons selon le statut du film

}