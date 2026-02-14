import { supabase } from "/Elina/js/supabase.js";
import { loadProfile } from "/Elina/js/dashboard.js";

export async function setSettings() {
  const session = await loadProfile();

  const currentPseudo = document.getElementById("current-pseudo");

  const settingsForm = document.getElementById("settings-form");
  const settingPseudo = document.getElementById("setting-pseudo");

  const settingMovies = document.getElementById("setting-movies");
  const settingShows = document.getElementById("setting-shows");
  const settingDramas = document.getElementById("setting-dramas");
  const settingBooks = document.getElementById("setting-books");
  
  
  const saveSettings = document.getElementById("save-settings");
  
  const settingColor = document.getElementById("main-colors");
  const settingMode = document.getElementById("setting-mode");
  const settingButtonColor = document.getElementById("button-color");

  settingMovies.checked = session.movies;
  settingShows.checked = session.shows;
  settingDramas.checked = session.dramas;
  settingBooks.checked = session.books;

  currentPseudo.textContent = session.pseudo;
  settingColor.value = session.theme_color;
  settingMode.value = session.mode;
  settingButtonColor.value = session.button_text;

  settingColor.addEventListener("change", () => {
      saveSettings.style.backgroundColor = settingColor.value;
  });

  settingButtonColor.addEventListener("change", () => {
    settingButtonColor.style.color = settingButtonColor.value;
  })

  settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (settingPseudo.value.trim() === "") {
      settingPseudo.value = session.pseudo;
    }

    settingButton.classList.add("is-loading");

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(
          { "pseudo": settingPseudo.value },
          { "movies": settingMovies.checked },
          { "shows": settingShows.checked },
          { "dramas": settingDramas.checked },
          { "books": settingBooks.checked },
          { "theme_color": settingColor.value },
          { "mode": settingMode.value },
          { "button_text": settingButtonColor.value }
        )
        .eq("id", session.id)
        .single();

        setTimeout(() => {
          window.location.reload();
        }, 500);

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