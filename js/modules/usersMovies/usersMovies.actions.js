import { addUserMovie, removeUserMovie, updateSeenUserMovie } from "/Elina/js/services/usersMovies.service.js";
import { changeModeButton, handleButtonState } from "/Elina/js/ui/button.js";

export async function clickAddMovieUser(button, uuid) {
    return new Promise((resolve, reject) => {
        button.addEventListener("click", async () => {
            handleButtonState(button, "loading");
            try {
                await addUserMovie(uuid);
                resolve();
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    handleButtonState(button, "error");
                    reject(error);
                }, 500);
            }
            setTimeout(() => {
                changeModeButton(button, "add");
            }, 500);
        });
    })
}

export async function clickToseeMovieUser(button, uuid) {
    return new Promise((resolve, reject) => {
        button.addEventListener("click", async () => {
            handleButtonState(button, "loading");
            try {
                await updateSeenUserMovie(uuid, true);
                resolve();
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    handleButtonState(button, "error");
                    reject(error);
                }, 500);
            }
            setTimeout(() => {
                changeModeButton(button, "tosee");
            }, 500);
        });
    })
}

export async function clickDeleteMovieUser(button, uuid) {
    return new Promise((resolve, reject) => {
        button.addEventListener("click", async () => {
            handleButtonState(button, "loading");
            try {
                await removeUserMovie(uuid);
                resolve();
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    handleButtonState(button, "error");
                    reject(error);
                }, 500);
            }
            setTimeout(() => {
                changeModeButton(button, "delete");
            }, 500);
        });
    })
}

export async function clickSeenMovieUser(button, uuid) {
    return new Promise((resolve, reject) => {
        button.addEventListener("click", async () => {
            handleButtonState(button, "loading");
            try {
                await updateSeenUserMovie(uuid, false);
                resolve();
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    handleButtonState(button, "error");
                    reject(error);
                }, 500);
            }
            setTimeout(() => {
                changeModeButton(button, "seen");
            }, 500);
        });
    })
}