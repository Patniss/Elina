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

  settingMovies.checked = session.movies;
  settingShows.checked = session.shows;
  settingDramas.checked = session.dramas;
  settingBooks.checked = session.books;

  currentPseudo.textContent = session.pseudo;
  mainColors.value = session.theme_color;
  mode.value = session.mode;
  buttonColor.value = session.button_text;

  mainColors.addEventListener("change", () => {
      console.log("Couleur changée");
      saveSettings.style.backgroundColor = mainColors.value;
  });

  settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (settingPseudo.value.trim() === "") {
      settingPseudo.value = session.pseudo;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ "pseudo": settingPseudo.value })
        .eq("id", session.id)
        .single();

        if (error) {
          alert("Une erreur est survenue.");
          return;
        }
    } catch (err) {
      alert("Une erreur est survenue.");
      return;
    }
  })
}