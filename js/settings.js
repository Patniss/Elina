import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";

export async function setSettings() {
  const session = await loadProfile();

  const settingsForm = document.getElementById("settings-form");
  const settingMovies = document.getElementById("setting-movies");
  const settingShows = document.getElementById("setting-shows");
  const settingDramas = document.getElementById("setting-dramas");
  const settingBooks = document.getElementById("setting-books");
  const settingPseudo = document.getElementById("setting-pseudo");

  const currentPseudo = document.getElementById("current-pseudo");
  const mainColors = document.getElementById("main-colors");
  const mode = document.getElementById("mode");
  const saveSettings = document.getElementById("save-settings");
  const buttonColor = document.getElementById("button-color");

  settingMovies.value = session.movies;
  settingShows.value = session.shows;
  settingDramas.value = session.dramas;
  settingBooks.value = session.books;

  currentPseudo.textContent = session.pseudo;
  mainColors.value = session.theme_color;
  mode.value = session.mode;
  buttonColor.value = session.button_text;

  mainColors.addEventListener("change", () => {
      console.log("Couleur changée");
      saveSettings.style.backgroundColor = mainColors.value;
  });

  saveSettings.addEventListener("click", async (event) => {
    if (settingPseudo.value.trim() === "") {
      settingPseudo = session.pseudo;
    }

    saveSettings.classList.add("is-loading");
    saveSettings.textContent = "";

    setTimeout(() => {
      saveSettings.classList.remove("is-loading");
      saveSettings.textContent = "Enregistrer les réglages";
      alert(settingPseudo);
    }, 2000);
  })
}