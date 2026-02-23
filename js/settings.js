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
  const settingButtonColor = document.getElementById("button-color");
  const settingBackgroundTheme = document.getElementById("background-theme");

  const fileInput = document.querySelector(".file-input");
  const fileNameSpan = document.getElementById("chosenFile");

  const MAX_SIZE = 2 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  let selectedImageFile = null; // ← on stocke ici l'image temporairement

  // ----------------------------
  // Initialisation
  // ----------------------------

  settingMovies.checked = session.movies;
  settingShows.checked = session.shows;
  settingDramas.checked = session.dramas;
  settingBooks.checked = session.books;

  currentPseudo.textContent = session.pseudo;
  settingColor.value = session.theme_color;
  settingButtonColor.value = session.button_text;
  settingBackgroundTheme.value = session.background;

  settingColor.addEventListener("change", () => {
    saveSettings.style.backgroundColor = settingColor.value;
  });

  settingButtonColor.addEventListener("change", () => {
    saveSettings.style.color = settingButtonColor.value;
  });

  // ----------------------------
  // Gestion du file input (preview uniquement)
  // ----------------------------

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Seuls les fichiers JPG, PNG ou WEBP sont autorisés.");
      fileInput.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("L'image ne doit pas dépasser 2MB.");
      fileInput.value = "";
      return;
    }

    selectedImageFile = file; // ← on garde en mémoire
    fileNameSpan.textContent = file.name;
    showPreview(file);
  });

  // ----------------------------
  // Submit
  // ----------------------------

  settingsForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    saveSettings.classList.add("is-loading");

    let avatarUrl = session.avatar_url;

    try {
      // -------------------------------------------------
      // 1️⃣ Si une nouvelle image a été choisie
      // -------------------------------------------------
      if (selectedImageFile) {

        const extension = selectedImageFile.name.split(".").pop();
        const filePath = `users/${session.id}.${extension}`;

        const renamedFile = new File(
          [selectedImageFile],
          `${session.id}.${extension}`,
          { type: selectedImageFile.type }
        );

        // Supprimer ancienne image si existante
        if (session.avatar_url) {
          const oldPath = session.avatar_url.split("/avatars/")[1];
          if (oldPath) {
            await supabase.storage
              .from("avatars")
              .remove([oldPath]);
          }
        }

        // Upload nouvelle image
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, renamedFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data, error } = await supabase.storage
        .from("avatars")
        .createSignedUrl(filePath, 31_536_000);
        
        avatarUrl = data.signedUrl;

      }

      // -------------------------------------------------
      // 2️⃣ Update profil
      // -------------------------------------------------

      if (settingPseudo.value.trim() === "") {
        settingPseudo.value = session.pseudo;
      }

      const { error } = await supabase
        .from("profiles")
        .update({
          pseudo: settingPseudo.value,
          movies: settingMovies.checked,
          shows: settingShows.checked,
          dramas: settingDramas.checked,
          books: settingBooks.checked,
          theme_color: settingColor.value,
          button_text: settingButtonColor.value,
          avatar_url: avatarUrl
        })
        .eq("id", session.id);

      if (error) throw error;

      setTimeout(() => {
        window.location.reload();
      }, 500);

    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue.");
    } finally {
      saveSettings.classList.remove("is-loading");
    }
  });

  // ----------------------------
  // Preview image
  // ----------------------------

  function showPreview(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      let preview = document.getElementById("previewImage");

      if (!preview) {
        preview = document.createElement("img");
        preview.id = "previewImage";
        preview.style.maxWidth = "150px";
        preview.style.marginTop = "10px";
        fileNameSpan.parentElement.appendChild(preview);
      }

      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}