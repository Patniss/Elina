import { getUserId } from "/Elina/js/services/profiles.service.js";
import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";
import { addUserMovie, removeUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";

export async function handleMovieAction(action, mode, button, typeButton, showButtons = [], hideButtons = [], div) {
    handleButtonState(button, "loading");

    try { await action(); } catch (error) {
        console.error(error);
        setTimeout(() => {
            handleButtonState(button, "error");
        }, 500);
        return;
    }

    if (mode === "adding") {
        setTimeout(() => {
            changeModeButton(button, typeButton);
            div.innerHTML = "";
            div.append(showButtons);
        }, 500);
    } else if (mode === "hidden") {
        setTimeout(() => {
            changeModeButton(button, typeButton);
            hideButtons.classList.add("is-hidden");
            showButtons.classList.remove("is-hidden");
        }, 500);
    }
}

export async function addMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    const userId = await getUserId();
    await handleMovieAction(() => addUserMovie(userId, uuid), mode, button, "add", showButtons, hideButtons, div);
}

export async function deleteMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    const userId = await getUserId();
    await handleMovieAction(() => removeUserMovie(userId, uuid), mode, button, "delete", showButtons, hideButtons, div);
}

export async function toseeMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    const userId = await getUserId();
    await handleMovieAction(() => updateSeenUserMovie(userId, uuid, false), mode, button, "tosee", showButtons, hideButtons, div)
}

export async function seenMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    const userId = await getUserId();
    await handleMovieAction(() => updateSeenUserMovie(userId, uuid, false), mode, button, "seen", showButtons, hideButtons, div)
}