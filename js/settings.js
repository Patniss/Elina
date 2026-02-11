const mainColors = document.getElementById("main-colors");
const saveSettings = document.getElementById("save-settings");

mainColors.addEventListener("change", () => {
    console.log("Couleur changée");
    saveSettings.style.backgroundColor = mainColors.value;
});