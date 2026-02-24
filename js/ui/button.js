export function handleButtonState(button, state) {
    button.classList.remove("is-loading", "is-primary", "is-success", "is-danger");

    switch (state) {
        case "loading":
            button.classList.add("is-loading");
            break;

        case "success":
            button.classList.add("is-success");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajouté</span>`;
            break;

        case "error":
            button.classList.add("is-danger");
            button.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            break;
    
        default:
            button.classList.add("is-primary");
            break;
    }
}