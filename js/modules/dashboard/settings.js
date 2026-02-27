import { loadProfile, updateProfile } from "/Elina/js/services/profiles.service.js";
import { uploadAvatar } from "/Elina/js/services/storage.service.js";
import { showImagePreview } from "/Elina/js/ui/preview.js";

export async function setSettings() {
    const session = await loadProfile();
    if (!session) return;
    
    const settingsForm = document.getElementById("settings-form");
    const currentPseudo = document.getElementById("current-pseudo");
    
    const settingPseudo = document.getElementById("setting-pseudo");
    const saveSettings = document.getElementById("save-settings");
    const settingColor = document.getElementById("main-colors");
    const settingButtonColor = document.getElementById("button-color");
    const settingBackgroundTheme = document.getElementById("background-theme");
    
    const fileInput = document.querySelector(".file-input");
    const fileNameSpan = document.getElementById("chosenFile");
    
    const MAX_SIZE = 2 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    
    let selectedImageFile = null;

    const toggleField = [ "movies", "shows", "dramas", "animes", "books",
        "recipes", "cleaning", "budget", "todo", "moodboard",
        "pro", "travel", "crochet", "candles", "aromazone" ];

    toggleField.forEach(field => {
        document.getElementById(`setting-${field}`).checked = session[field];
    });
    
    currentPseudo.textContent = session.pseudo;

    settingColor.addEventListener("change", () => {
        saveSettings.style.backgroundColor = settingColor.value;
    });
    
    settingButtonColor.addEventListener("change", () => {
        saveSettings.style.color = settingButtonColor.value;
    });

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
        
        selectedImageFile = file;
        fileNameSpan.textContent = file.name;
        const previewImage = document.getElementById("previewImage");
        showImagePreview(file, previewImage);
    })

    settingsForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        saveSettings.classList.add("is-loading");
        try {
            const avatarUrl = selectedImageFile
                ? await uploadAvatar(session.id, selectedImageFile, session.avatar_url)
                : session.avatar_url;

            const pseudo = settingPseudo.value.trim() || session.pseudo;

            const dataUpdate = {
                pseudo: pseudo,
                theme_color: settingColor.value,
                button_text: settingButtonColor.value,
                background: settingBackgroundTheme.value,
                avatar_url: avatarUrl
            }

            toggleField.forEach(field => {
                document.getElementById(`setting-${field}`).checked = session[field];
            });

            await updateProfile(session.id, dataUpdate);

            window.location.reload();

        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        }
        finally {
            saveSettings.classList.remove("is-loading");
        };
        
    })

    console.log(session);
}