import { handleAction } from "/Elina/js/services/action.js";
import { addUserMovie, removeUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";

export async function addMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleAction(() => addUserMovie(uuid), mode, button, "add", showButtons = [], hideButtons = [], div);
}

export async function deleteMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleAction(() => removeUserMovie(uuid), mode, button, "delete", showButtons = [], hideButtons = [], div);
}

export async function toseeMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleAction(() => updateSeenUserMovie(uuid, true), mode, button, "tosee", showButtons = [], hideButtons = [], div)
}

export async function seenMovieUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    await handleAction(() => updateSeenUserMovie(uuid, false), mode, button, "seen", showButtons = [], hideButtons = [], div)
}