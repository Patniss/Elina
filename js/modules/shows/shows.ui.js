import { normalizeShow } from "/Elina/js/modules/shows/shows.model.js";
import { createButtons } from "/Elina/js/ui/button.js";

const BUTTONS_BY_STATUS = {
    null: ["add", "details"],
    "added": ["seeEp", "delete", "details"],
    "started": ["seeEp", "pause", "details"],
    "paused": ["takeAgain", "cancel", "details"],
    "canceled": ["retry", "details"],
    "finished": [ "details"]
};

export function updateShowUI(status, buttons, container) {
    container.innerHTML = "";
    const types = BUTTONS_BY_STATUS[status] ?? BUTTONS_BY_STATUS.null;

    types.forEach(type => {
        container.appendChild(buttons[type]);
    });
}


export async function createShowCard(s) {
    const show = normalizeShow(s);

    const column = document.createElement("div");
    column.classList.add("column", "is-one-quarter");
    
    const card = document.createElement("div");
    card.classList.add("card", "show-card");
    
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    
    const figureLogo = document.createElement("figure");
    figureLogo.classList.add("image", "logo-wrapper", "py-2", "px-2");
    const imgLogo = document.createElement("img");
    imgLogo.src = show.logo;
    imgLogo.alt = show.title;
    figureLogo.appendChild(imgLogo);
    
    const pTitle = document.createElement("p");
    pTitle.classList.add("title", "is-5");
    pTitle.textContent = show.title;
    
    const pSubtitle = document.createElement("p");
    pSubtitle.classList.add("subtitle", "is-6");
    pSubtitle.textContent = `${show.seasons} saisons`;
    
    const divTags = document.createElement("div");
    divTags.classList.add("buttons", "is-flex-wrap-wrap", "mt-3");

    const buttons = createButtons(["details", "add", "seedEp", "pause", "takeAgain", "cancel", "retry"], 'entertainment/shows/show', show.id);

    const detailsButton = buttons.details;
    const addButton = buttons.add;
    const seeEpButton = buttons.seeEp;
    const pauseButton = buttons.pause;
    const takeAgainButton = buttons.takeAgain;
    const cancelButton = buttons.cancel;
    const retryButton = buttons.retry;

    updateShowUI(show.user_state, buttons, divTags);

    cardContent.append(figureLogo, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);
    
    return column;
}