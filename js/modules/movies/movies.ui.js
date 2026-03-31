import { normalizeMovie } from "/Elina/js/modules/movies/movies.model.js";
import { createButtons, handleButtonState } from "/Elina/js/ui/button.js";
import { getMovie } from "/Elina/js/services/movies.service.js";
import { addUserMovie, deleteUserMovie, updateSeenUserMovie, getStatusMovie, getDateSeen, getFavUnklikeMovie } from "/Elina/js/services/usersMovies.service.js";
import { renderGenres } from "/Elina/js/ui/render.js";
import { formatMovieDuration, formatFrenchTypography, formatCompleteDate } from "/Elina/js/utils/format.js";

const BUTTONS_BY_STATUS = {
    null: ["add", "details"],
    false: ["tosee", "delete", "details"],
    true: ["seen", "details"]
};

export async function createCarouselCard(m, index, list) {
    const movie = normalizeMovie(m);

    const div = document.createElement("div");
    div.classList.add("card-carousel", `card-carousel-${list}`);
    div.dataset.index = index;

    const figure = document.createElement("figure");
    figure.classList.add("image", "is-2by3", "poster-wrapper");

    const img = document.createElement("img");
    img.src = movie.poster;
    img.alt = movie.title;
    img.classList.add("js-modal-trigger");
    img.style.maxWidth = "100%";

    img.addEventListener("click", async () => {
        console.log(movie);
        const divModal = await createModalMovie(movie.id);
        const section = document.getElementById("section");
        section.appendChild(divModal);
    })

    figure.appendChild(img);
    div.appendChild(figure);

    return div;
}

export async function createModalMovie(uuid) {
    const movie = await getMovie(uuid);

    const divModal = document.createElement("div");
    divModal.classList.add("modal", "is-active");
    divModal.id = uuid;

    const modalBack = document.createElement("div");
    modalBack.classList.add("modal-background");

    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.style.width = "80%";
    modalContent.style.height = "auto";

    const divContent = document.createElement("div");
    divContent.classList.add("box");

    const movieTitle = document.createElement("h1");
    movieTitle.classList.add("title");
    movieTitle.textContent = movie.title;

    const movieYear = document.createElement("h3");
    movieYear.classList.add("subtitle");
    movieYear.textContent = movie.year;

    const divAllInfos = document.createElement("div");
    divAllInfos.classList.add("columns", "is-four-fifths");

    const divPoster = document.createElement("div");
    divPoster.classList.add("column", "is-one-quarter");
    const imgPoster = document.createElement("img");
    imgPoster.src = movie.poster;
    imgPoster.classList.add("image");
    imgPoster.style.borderRadius = "5px";
    divPoster.appendChild(imgPoster);

    const divInfos = document.createElement("div");
    divInfos.classList.add("block", "column", "is-three-quarters");

    const divButtons = document.createElement("div");
    divButtons.classList.add("buttons", "mb-2");
    const buttons = createButtons(["details", "add", "delete", "tosee", "seen"], 'entertainment/movies/movie', movie.id);

    const detailsButton = buttons.details;
    const addButton = buttons.add;
    const deleteButton = buttons.delete;
    const toseeButton = buttons.tosee;
    const seenButton = buttons.seen;

    const seen = await getStatusMovie(uuid);
    updateMovieUI(seen, buttons, divButtons);
    divInfos.appendChild(divButtons);

    const pGenres = document.createElement("p");
    const spanTime = document.createElement("span");
    spanTime.classList.add("subtitle", "is-4", "mb-6", "mr-3");
    spanTime.textContent = formatMovieDuration(movie.time);
    const spanSep = document.createElement("span");
    spanSep.classList.add("mr-3");
    spanSep.innerHTML = `&#x2022;`;
    pGenres.append(spanTime, spanSep);
    renderGenres(pGenres, movie.genres);
    divInfos.appendChild(pGenres);

    const h3Synopsis = document.createElement("h3");
    h3Synopsis.classList.add("subtitle", "is-4", "mt-6", "mb-2");
    h3Synopsis.textContent = "Synopsis";
    const pSynopsis = document.createElement("p");
    pSynopsis.classList.add("content");
    pSynopsis.textContent = formatFrenchTypography(movie.synopsis);
    divInfos.append(h3Synopsis, pSynopsis);
    
    divAllInfos.append(divPoster, divInfos);
    divContent.append(movieTitle, movieYear, divAllInfos);
    modalContent.appendChild(divContent);

    const btnClose = document.createElement("button");
    btnClose.classList.add("modal-close", "is-large");
    btnClose.ariaLabel = "close";

    divModal.append(modalBack, modalContent, btnClose);

    [modalBack, btnClose].forEach(el => {
        el.addEventListener("click", () => {
            divModal.remove();
        });
    });

    return divModal;
}

export async function createMovieCard(m, complete) {
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
        }, 150);
    });

    toseeButton.addEventListener("click", async () => {
        handleButtonState(toseeButton, "loading");
        try {
            await updateSeenUserMovie(movie.id, true);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(true, buttons, divTags);
            handleButtonState(toseeButton, "stop-loading");
        }, 150);
    });

    deleteButton.addEventListener("click", async () => {
        handleButtonState(deleteButton, "loading");
        try {
            await deleteUserMovie(movie.id);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(null, buttons, divTags);
            handleButtonState(deleteButton, "stop-loading");
        }, 150);
    });
    
    seenButton.addEventListener("click", async () => {
        handleButtonState(seenButton, "loading");
        try {
            await updateSeenUserMovie(movie.id, false);
        } catch (error) { throw error; }
        setTimeout(() => {
            updateMovieUI(true, buttons, divTags);
            handleButtonState(seenButton, "stop-loading");
        }, 150);
    });

  return column;
}

export function updateMovieUI(status, buttons, container) {
    container.innerHTML = "";
    const types = BUTTONS_BY_STATUS[status] ?? BUTTONS_BY_STATUS.null;

    types.forEach(type => {
        container.appendChild(buttons[type]);
    });
}