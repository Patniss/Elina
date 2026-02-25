import { loadProfile } from "/Elina/js/modules/dashboard/dashboard.js";
import { handleButtonState } from "/Elina/js/ui/button.js";
import { changeModeButton } from "/Elina/js/ui/button.js";
import { debounce } from "/Elina/js/utils/debounce.js";

export async function handleMovieAction(action, uuid, mode, button, typeButton, buttons, div) {
    const session = await loadProfile();
    const userId = session.id;

    handleButtonState(button, "loading");

    try {
        const actionMovie = await action(userId, uuid);

        if (actionMovie.error) {
            debounce(() => handleButtonState(button, "error"), 500);
            return;
        }
    } catch (error) {
        debounce(() => handleButtonState(button, "error"), 500);
        return;
    }

    if (mode === "adding") {
        debounce(changeModeButton(button, typeButton), 500);
        div.innerHTML = "";
        div.append(buttons);
    } else if (mode === "hidden") {
        debounce(() => changeModeButton(button, typeButton), 500);
        button.classList.add("is-hidden");
        buttons.classList.remove("is-hidden");
    }
}