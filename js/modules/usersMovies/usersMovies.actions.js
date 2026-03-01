import { addUserMovie, removeUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";
import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";

export async function clickAddMovieUser(button, uuid, mode, btnTosee, btnDelete, btnDetails, div) {
    button.addEventListener("click", () => {
        handleButtonState(button, "loading");
        try {
            addUserMovie(uuid);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                handleButtonState(button, "error");
                return;
            }, 500);
        }
        setTimeout(() => {
            changeModeButton(button, "add");
        }, 500);
    });

    switch (mode) {
        case "hidden":
            button.classList.add("is-hidden");
            [btnTosee, btnDelete].forEach(btn => btn.classList.remove("is-hidden"));
            break;
    
        case "adding":
            div.innerHTML = "";
            div.append(btnTosee, btnDelete);
            if (btnDetails) div.appendChild(btnDetails);
            break;
    }
}

export async function clickToseeMovieUser(button, uuid, mode, btnDelete, btnSeen, btnDetails, div) {
    button.addEventListener("click", () => {
        handleButtonState(button, "loading");
        try {
            updateSeenUserMovie(uuid, true);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                handleButtonState(button, "error");
                return;
            }, 500);
        }
        setTimeout(() => {
            changeModeButton(button, "tosee");
        }, 500);
    });

    switch (mode) {
        case "hidden":
            [button, btnDelete].forEach(btn => btn.classList.add("is-hidden"));
            btnSeen.classList.remove("is-hidden");
            break;
    
        case "adding":
            div.innerHTML = "";
            div.appendChild(btnSeen);
            if (btnDetails) div.appendChild(btnDetails);
            break;
    }
}

export async function clickDeleteMovieUser(button, uuid, mode, btnAdd, btnTosee, btnDetails, div) {
    button.addEventListener("click", () => {
        handleButtonState(button, "loading");
        try {
            removeUserMovie(uuid);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                handleButtonState(button, "error");
                return;
            }, 500);
        }
        setTimeout(() => {
            changeModeButton(button, "delete");
        }, 500);
    });

    switch (mode) {
        case "hidden":
            [button, btnTosee].forEach(btn => btn.classList.add("is-hidden"));
            btnAdd.classList.remove("is-hidden");
            break;
    
        case "adding":
            div.innerHTML = "";
            div.appendChild(btnAdd);
            if (btnDetails) div.appendChild(btnDetails);
            break;
    }
}

export async function clickSeenMovieUser(button, uuid, mode, btnTosee, btnDelete, btnDetails, div) {
    button.addEventListener("click", () => {
        handleButtonState(button, "loading");
        try {
            updateSeenUserMovie(uuid, false);
        } catch (error) {
            console.error(error);
            setTimeout(() => {
                handleButtonState(button, "error");
                return;
            }, 500);
        }
        setTimeout(() => {
            changeModeButton(button, "seen");
        }, 500);
    });

    switch (mode) {
        case "hidden":
            button.classList.add("is-hidden");
            [btnTosee, btnDelete].forEach(btn => btn.classList.remove("is-hidden"));
            break;
    
        case "adding":
            div.innerHTML = "";
            div.append(btnTosee, btnDelete);
            if (btnDetails) div.appendChild(btnDetails);
            break;
    }
}