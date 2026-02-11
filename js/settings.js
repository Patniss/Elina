const mainColors = document.getElementById("main-colors");
const saveSettings = document.getElementById("save-settings");

mainColors.addEventListener("change", () => {
    saveSettings.style.backgroundColor = mainColors.value;
});