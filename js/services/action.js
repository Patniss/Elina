import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";

export async function fonction(mode, button, typeButton, showButtons = [], hideButtons = [], div) {
    handleButtonState(button, "loading");

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