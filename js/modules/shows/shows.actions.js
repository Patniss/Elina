import { getUserId } from "/Elina/js/services/profiles.service.js";
import { handleAction } from "/Elina/js/services/action.js";

export async function addShowUser(uuid, mode, button, showButtons = [], hideButtons = [], div) {
    const userId = await getUserId();
    await handleAction(() => addShowUser(userId, uuid), mode, button, "add", showButtons, hideButtons, div);
}