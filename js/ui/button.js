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

export function changeModeButton(button, mode) {
    button.classList.remove("is-loading", "is-primary", "is-success", "is-danger", "is-link", "is-light");

    switch (mode) {
        case "add":
            button.classList.add("is-link");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-plus"></i></span><span>Ajouter</span>`;
            break;
    
        case "delete":
            button.classList.add("is-danger", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Supprimer</span>`;
            break;

        case "tosee":
            button.classList.add("is-success", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>J'ai vu</span>`;
            break;

        case "seen":
            button.classList.add("is-success");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Vu</span>`;
            break;
    }
}