import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";

export async function handleAction(action, mode, button, typeButton, showButtons = [], hideButtons = [], div) {
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