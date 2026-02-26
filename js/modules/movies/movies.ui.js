import { createButtons } from "/Elina/js/ui/button.js";
import { addMovieUser, deleteMovieUser, toseeMovieUser, seenMovieUser } from "/Elina/js/modules/movies/movies.actions.js";
import { normalizeMovie } from "/Elina/js/modules/movies/movies.model.js";

const BUTTONS_BY_STATUS = {
    null: ["add", "details"],
    false: ["tosee", "delete", "details"],
    true: ["seen", "details"]
};

export function updateMovieUI(status, buttons, container) { // Met à jour l'affichage des boutons selon le statut du film
    container.innerHTML = "";
    const types = BUTTONS_BY_STATUS[status] ?? BUTTONS_BY_STATUS.null;

    types.forEach(type => {
        container.appendChild(buttons[type]);
    });
}

export async function createMovieCard(movie) {
    const { movieId, movieTitle, movieYear, moviePoster, movieSeen } = normalizeMovie(movie);

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

    const detailsButton = buttons.details;
    const addButton = buttons.add;
    const deleteButton = buttons.delete;
    const toseeButton = buttons.tosee;
    const seenButton = buttons.seen;

    updateMovieUI(movieSeen, buttons, divTags);
    
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

    const ACTIONS = {
        add: addMovieUser,
        delete: deleteMovieUser,
        tosee: toseeMovieUser,
        seen: seenMovieUser
    };

    Object.entries(ACTIONS).forEach(([type, action]) => {
        buttons[type].addEventListener("click", () => {
            action(movieId, "adding", buttons[type]);
        })
    })

  return column;
}