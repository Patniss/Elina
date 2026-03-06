import { normalizeMovie } from "/Elina/js/modules/movies/movies.model.js";
import { createButtons, handleButtonState } from "/Elina/js/ui/button.js";
import { addUserMovie, deleteUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";

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
    
    const buttons = createButtons(["details", "add", "delete", "tosee", "seen"], 'entertainment/movies/movie', movie.id);

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

    addButton.addEventListener("click", async () => {
        handleButtonState(addButton, "loading");
        try {
            await addUserMovie(movie.id);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(false, buttons, divTags);
            handleButtonState(addButton, "stop-loading");
        }, 500);
    });

    toseeButton.addEventListener("click", async () => {
        handleButtonState(toseeButton, "loading");
        try {
            await updateSeenUserMovie(movie.id, true);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(true, buttons, divTags);
            handleButtonState(toseeButton, "stop-loading");
        }, 500);
    });

    deleteButton.addEventListener("click", async () => {
        handleButtonState(deleteButton, "loading");
        try {
            await deleteUserMovie(movie.id);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(null, buttons, divTags);
            handleButtonState(deleteButton, "stop-loading");
        }, 500);
    });
    
    seenButton.addEventListener("click", async () => {
        handleButtonState(seenButton, "loading");
        try {
            await updateSeenUserMovie(movie.id, false);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(true, buttons, divTags);
            handleButtonState(seenButton, "stop-loading");
        }, 500);
    });

  return column;
}

export async function createCarouselCard(m) {
    const movie = normalizeMovie(m);

    const testP = document.createElement("p");
    testP.textContent = "Test";

    return testP;
}