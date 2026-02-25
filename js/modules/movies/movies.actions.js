import { getUserId } from "/Elina/js/services/profiles.service.js";
import { handleButtonState, changeModeButton } from "/Elina/js/ui/button.js";
import { debounce } from "/Elina/js/utils/debounce.js";
import { addUserMovie, removeUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";

export async function handleMovieAction(action, uuid, mode, button, typeButton, showButtons = [], hideButtons = [], div, seen) {
    const userId = getUserId();

    handleButtonState(button, "loading");

    try {
        const actionMovie = await action(userId, uuid, seen);

        if (actionMovie.error) {
            debounce(() => handleButtonState(button, "error"), 500)();
            return;
        }
    } catch (error) {
        debounce(() => handleButtonState(button, "error"), 500)();
        return;
    }

    if (mode === "adding") {
        debounce(() => changeModeButton(button, typeButton), 500)();
        div.innerHTML = "";
        div.append(showButtons);
    } else if (mode === "hidden") {
        debounce(() => changeModeButton(button, typeButton), 500)();
        hideButtons.classList.add("is-hidden");
        showButtons.classList.remove("is-hidden");
    }
}

export async function addMovie(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleMovieAction(addUserMovie, uuid, mode, button, "add", showButtons, hideButtons, div);
}

export async function deleteMovie(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleMovieAction(removeUserMovie, uuid, mode, button, "delete", showButtons, hideButtons, div);
}

export async function toseeMovie(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleMovieAction(updateSeenUserMovie, uuid, mode, button, "tosee", showButtons, hideButtons, div, false)
}

export async function seenMovie(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleMovieAction(updateSeenUserMovie, uuid, mode, button, "seen", showButtons, hideButtons, div, true)
}