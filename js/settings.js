import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";

session = await loadProfile();

const settingMovies = document.getElementById("setting-movies");
const settingShows = document.getElementById("setting-shows");
const settingDramas = document.getElementById("setting-dramas");
const settingBooks = document.getElementById("setting-books");
const settingPseudo = document.getElementById("setting-pseudo");

const currentPseudo = document.getElementById("current-pseudo");
const mainColors = document.getElementById("main-colors");
const mode = document.getElementById("mode");
const saveSettings = document.getElementById("save-settings");

settingMovies.value = session.movies;
settingShows.value = session.shows;
settingDramas.value = session.dramas;
settingBooks.value = session.books;

currentPseudo.textContent = session.pseudo;
mainColors.value = session.theme_color;
mode.value = session.mode;

mainColors.addEventListener("change", () => {
    console.log("Couleur changée");
    saveSettings.style.backgroundColor = mainColors.value;
});

saveSettings.addEventListener("click", () => {
  if (settingPseudo) {
    async function updatePseudo() {
      const { data, error } = await supabase
          .from("profiles")
          .update({ pseudo: settingPseudo })
          .eq("user_id", userId)
        if (error) {
          console.error('Erreur lors de la mise à jour :', error)
        } else {
          console.log('Profil mis à jour :', data)
        }
    }
    updatePseudo();
  }
})