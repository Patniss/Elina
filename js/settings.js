import { supabase } from "./supabase.js";

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

const currentPseudo = document.getElementById("current-pseudo");
const mainColors = document.getElementById("main-colors");
const saveSettings = document.getElementById("save-settings");

currentPseudo.textContent = pseudo;
mainColors.value = colorTheme;

mainColors.addEventListener("change", () => {
    console.log("Couleur changée");
    saveSettings.style.backgroundColor = mainColors.value;
});