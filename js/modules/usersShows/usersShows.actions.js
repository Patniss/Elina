import { addUserShow, seeEpisodeShow, removeUserShow, pauseUserShow, cancelUserShow } from "/Elina/js/services/usersShows.service.js";
import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";

export async function clickAddShowUser(button, uuid, mode, btnSeeEp, btnDelete, btnPause, btnCancel, btnDetails, div) {
    button.addEventListener("click", () => {
        handleButtonState(button, "loading");
        try {
            addUserShow(uuid);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                handleButtonState(button, "error");
            }, 500);
        }
        setTimeout(() => {
            changeModeButton(button, "add");
        }, 500);
    });

    switch (mode) {
        case "hidden":
            button.classList.add("is-hidden");
            [btnSeeEp, btnDelete].forEach(btn => btn.classList.remove("is-hidden"));
            break;
    
        case "adding":
            div.innerHTML = "";
            div.append(btnSeeEp, btnDelete);
            if (btnDetails) div.appendChild(btnDetails);
            break;
    }
};