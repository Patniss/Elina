import { handleButtonTransition } from "/Elina/js/ui/button.js";
import { addUserMovie, deleteUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";

export async function addMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    try {
        await addUserMovie(uuid);
    } catch (error) { throw error; }
    await handleButtonTransition(mode, button, "add", showButtons = [], hideButtons = [], div);
}

export async function deleteMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    try {
        await deleteUserMovie(uuid);
    } catch (error) { throw error; }
    await handleButtonTransition(mode, button, "delete", showButtons = [], hideButtons = [], div);
}

export async function seenMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    try {
        await updateSeenUserMovie(uuid, false)
    } catch (error) { throw error; }
    await handleButtonTransition(mode, button, "seen", showButtons = [], hideButtons = [], div)
}

export async function toseeMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    try {
        await updateSeenUserMovie(uuid, true);
    } catch (error) { throw error; }
    await handleButtonTransition(mode, button, "tosee", showButtons = [], hideButtons = [], div)
}