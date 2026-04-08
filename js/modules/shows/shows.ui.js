import { normalizeShow } from "/Elina/js/modules/shows/shows.model.js";
import { getSeasonData } from "/Elina/js/services/seasons.service.js";
import { addUserSeason, seeNextEpisode } from "/Elina/js/services/usersSeasons.service.js";
import { addUserShow, pauseUserShow, deleteUserShow, startUserShow, cancelUserShow, getNextEpisode, getUserShow } from "/Elina/js/services/usersShows.service.js";
import { createButtons, handleButtonState, changeModeButton } from "/Elina/js/ui/button.js";

const BUTTONS_BY_STATUS = {
    null: ["add", "details"],
    "added": ["toStart", "delete", "details"],
    "started": ["seeEp", "pause", "details"],
    "paused": ["takeAgain", "cancel", "details"],
    "canceled": ["retry", "details"],
    "finished": [ "finish", "details"]
};

export async function createCarouselCard(season, index, list) {
    const div = document.createElement("div");
    div.classList.add("card-carousel", `card-carousel-${list}`);
    div.dataset.index = index;

    const figure = document.createElement("figure");
    figure.classList.add("image", "is-2by3", "poster-wrapper");

    const img = document.createElement("img");
    img.src = season.poster;
    img.style.maxWidth = "100%";

    figure.appendChild(img);
    div.appendChild(figure);

    return div;
}

export async function createShowCard(s) {
    const show = normalizeShow(s);

    if (!show) {
        console.error("Invalid normalized show:", s);
        return document.createElement("div");
    }

    const nextEpisode = await getNextEpisode(show.id);
    console.log(nextEpisode);

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

    const buttons = createButtons(["details", "add", "delete", "toStart", "seeEp", "pause", "takeAgain", "cancel", "retry", "finish"], 'entertainment/shows/show', show.id, nextEpisode);

    const detailsButton = buttons.details;
    const addButton = buttons.add;
    const deleteButton = buttons.delete;
    const startButton = buttons.toStart;
    const seeEpButton = buttons.seeEp;
    const pauseButton = buttons.pause;
    const takeAgainButton = buttons.takeAgain;
    const cancelButton = buttons.cancel;
    const retryButton = buttons.retry;

    updateShowUI(show.userState, buttons, divTags);

    cardContent.append(figureLogo, pSubtitle, divTags);
    card.appendChild(cardContent);
    column.appendChild(card);

    addButton.addEventListener("click", async () => {
        handleButtonState(addButton, "loading");
        try {
            await addUserShow(show.id);
        } catch (error) {
            handleButtonState(addButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI("added", buttons, divTags);
            handleButtonState(addButton, "stop-loading");
        }, 100);
    });

    deleteButton.addEventListener("click", async () => {
        handleButtonState(deleteButton, "loading");
        try {
            await deleteUserShow(show.id);
        } catch (error) {
            handleButtonState(deleteButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI(null, buttons, divTags);
            handleButtonState(deleteButton, "stop-loading");
        }, 100);
    });

    startButton.addEventListener("click", async () => {
        handleButtonState(startButton, "loading");
        try {
            await startUserShow(show.id);
            await addUserSeason(show.id, 1);
        } catch (error) {
            handleButtonState(startButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            changeModeButton(seeEpButton, "seeEp", "S01 E01");
            handleButtonState(startButton, "stop-loading");
        }, 100);
    });

    seeEpButton.addEventListener("click", async () => {
        handleButtonState(seeEpButton, "loading");
        try {
            await seeNextEpisode(show.id);
        } catch (error) {
            handleButtonState(seeEpButton, "error");
            console.error(error);
        };

        setTimeout(async () => {
            const nextNextEpisode = await getNextEpisode(show.id);
            if (nextNextEpisode === "Terminée") {
                updateShowUI(null, buttons, divTags);
            } else {
                changeModeButton(seeEpButton, "seeEp", nextNextEpisode);
            }
            handleButtonState(seeEpButton, "stop-loading");
        }, 100);
    });

    pauseButton.addEventListener("click", async () => {
        handleButtonState(pauseButton, "loading");
        try {
            await pauseUserShow(show.id);
        } catch (error) {
            handleButtonState(pauseButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI("paused", buttons, divTags);
            handleButtonState(pauseButton, "stop-loading");
        }, 100);
    });

    takeAgainButton.addEventListener("click", async () => {
        handleButtonState(takeAgainButton, "loading");
        try {
            await startUserShow(show.id);
        } catch (error) {
            handleButtonState(takeAgainButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI("started", buttons, divTags);
            handleButtonState(takeAgainButton, "stop-loading");
        }, 100);
    });

    cancelButton.addEventListener("click", async () => {
        handleButtonState(cancelButton, "loading");
        try {
            await cancelUserShow(show.id);
        } catch (error) {
            handleButtonState(cancelButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI("canceled", buttons, divTags);
            handleButtonState(cancelButton, "stop-loading");
        }, 100);
    });

    retryButton.addEventListener("click", async () => {
        handleButtonState(retryButton, "loading");
        try {
            await startUserShow(show.id)
        } catch (error) {
            handleButtonState(retryButton, "error");
            console.error(error);
        };
        setTimeout(() => {
            updateShowUI("started", buttons, divTags);
            handleButtonState(retryButton, "stop-loading");
        }, 100);
    })
    
    return column;
}

export async function createShowStateEpisodes(s) {
    const show = normalizeShow(s);

    if (!show) {
        console.error("Invalid normalized show:", s);
        return document.createElement("div");
    }

    const userShow = await getUserShow(show.id);

    const card = document.createElement("div");
    card.classList.add("card");

    const content = document.createElement("div");
    content.classList.add("card-content", "columns")

    const figureLogo = document.createElement("figure");
    figureLogo.classList.add("column", "is-one-fifth", "image", "logo-wrapper", "py-2", "px-2");
    const imgLogo = document.createElement("img");
    imgLogo.src = show.logo;
    imgLogo.alt = show.title;
    figureLogo.appendChild(imgLogo);

    const divSeasons = document.createElement("div");
    divSeasons.classList.add("column");

    const divAllSeason = document.createElement("div");
    divAllSeason.classList.add("tags");

    const currentSeason = userShow.current_season;
    const nbEpisodesSeenCurrentSeason = userShow.last_ep;
    const seasonData = await getSeasonData(show.id, currentSeason);

    for (let season = 1; season <= show.seasons; season++) {
        const spanSeason = document.createElement("button");
        spanSeason.classList.add("tag", "is-primary");
        const displaySpanSeason = currentSeason ? `Season ${season}` : season < 10 ? `S0${season}` : `S${season}`;
        spanSeason.textContent = displaySpanSeason;
        divAllSeason.appendChild(spanSeason);

        spanSeason.addEventListener("click", () => {
            console.log("clic sur saison:", season);
        });

        if (season === currentSeason) {
            const divEpisodes = document.createElement("div");
            divEpisodes.classList.add("tags");
            for (let ep = 1; ep <= seasonData.nb_episodes; ep++) {
                const span = document.createElement("button");
                span.classList.add("tag");
                span.textContent = ep;
                if (nbEpisodesSeenCurrentSeason < ep) {
                    span.classList.add("is-success", "is-light");
                } else {
                    span.classList.add("is-success");
                };
                span.addEventListener("click", () => {
                    console.log("clic sur épisode:", ep);
                });
                divEpisodes.appendChild(span);
            }
            divAllSeason.appendChild(divEpisodes);
        } else if (season > currentSeason) {
            spanSeason.classList.add("is-light");
        }
    }

    divSeasons.appendChild(divAllSeason);

    content.append(figureLogo, divSeasons);
    card.appendChild(content);

    return card;
}

export function updateShowUI(status, buttons, container) {
    container.innerHTML = "";
    const types = BUTTONS_BY_STATUS[status] ?? BUTTONS_BY_STATUS.null;

    types.forEach(type => {
        const btn = buttons[type];
        container.appendChild(btn);
    });
}