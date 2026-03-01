import { createButtons } from "/Elina/js/ui/button.js";
import { normalizeMovie } from "/Elina/js/modules/movies/movies.model.js";
import { clickAddMovieUser, clickDeleteMovieUser, clickToseeMovieUser, clickSeenMovieUser } from "/Elina/js/modules/usersMovies/usersMovies.actions.js";

const BUTTONS_BY_STATUS = {
    null: ["add", "details"],
    false: ["tosee", "delete", "details"],
    true: ["seen", "details"]
};

export function updateMovieUI(status, buttons, container) {
    container.innerHTML = "";
    const types = BUTTONS_BY_STATUS[status] ?? BUTTONS_BY_STATUS.null;

    types.forEach(type => {
        container.appendChild(buttons[type]);
    });
}

export async function createMovieCard(m) {
    const movie = normalizeMovie(m);

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
    
    const buttons = createButtons(["details", "add", "delete", "tosee", "seen"], 'entertainment/movies/movie', movieId);

    const detailsButton = buttons.details;
    const addButton = buttons.add;
    const deleteButton = buttons.delete;
    const toseeButton = buttons.tosee;
    const seenButton = buttons.seen;

    updateMovieUI(movie.seen, buttons, divTags);
    
    cardContent.append(pTitle, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);
    
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

    clickAddMovieUser(addButton, movie.id, "adding", toseeButton, deleteButton, detailsButton, divTags);
    clickToseeMovieUser(toseeButton, movie.id, "adding", deleteButton, seenButton, detailsButton, divTags);
    clickDeleteMovieUser(deleteButton, movie.id, "adding", addButton, toseeButton, detailsButton, divTags);
    clickSeenMovieUser(seenButton, movie.id, "adding", toseeButton, deleteButton, detailsButton, divTags);

  return column;
}