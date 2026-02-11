import { supabase } from "Elina/js/supabase.js";

const {
data: { session },
} = await supabase.auth.getSession();

if (!session) {
window.location.href = "/index.html";
return;
}

const userId = session.user.id;
const pseudo = session.pseudo;
const colorTheme = session.theme_color;
const modeUser = session.mode;
const userMovies = session.movies;
const userShows = session.shows;
const userDramas = session.dramas;
const userBooks = session.books;

const settingMovies = getElementById("setting-movies");
const settingShows = getElementById("setting-shows");
const settingDramas = getElementById("setting-dramas");
const settingBooks = getElementById("setting-books");

const currentPseudo = document.getElementById("current-pseudo");
const mainColors = document.getElementById("main-colors");
const mode = document.getElementById("mode");
const saveSettings = document.getElementById("save-settings");

settingMovies.value = userMovies;
settingShows.value = userShows;
settingDramas.value = userDramas;
settingBooks.value = userBooks;

currentPseudo.textContent = pseudo;
mainColors.value = colorTheme;
mode.value = modeUser;

mainColors.addEventListener("change", () => {
    console.log("Couleur changée");
    saveSettings.style.backgroundColor = mainColors.value;
});