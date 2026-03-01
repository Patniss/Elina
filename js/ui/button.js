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

        case "seeEp":
            button.classList.add("is-success", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-eye"></i></span><span>Épisode ?</span>`;
            break
        
        case "pause":
            button.classList.add("is-warning", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-pause"></i></span><span>Mettre en pause</span>`;
            break;

        case "takeAgain":
            button.classList.add("is-link", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-play"></i></span><span>Reprendre</span>`;
            break

        case "cancel":
            button.classList.add("is-danger", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-minus"></i></span><span>Abandonner</span>`;
            break;

        case "retry":
            button.classList.add("is-warning", "is-light");
            button.innerHTML = `<span class="icon"><i class="fa-solid fa-play"></i></span><span>Réessayer</span>`;
            break;
    }
}

export function createButton(type, link, id) {
    const button = document.createElement("a");
    button.classList.add("tag", "button", "is-hoverable", "mr-2");
    
    if (type === "details") {
        button.innerHTML = `<span class="icon"><i class="fa-solid fa-clapperboard"></i></span><span>Détails</span>`;
        button.href = `/Elina/${link}.html?id=${id}`;
    } else {
        changeModeButton(button, type);
    }

    return button;
}

export function createButtons(types = [], link, id) {
    const result = [];
    types.forEach(type => {
        result[type] = type === "details" ? createButton(type, link, id) : createButton(type);
    });

    return result;
}

export function appendButtons(statut, div, ifNull = [], ifFalse = [], ifTrue = [], preventDefault = []) {
    let buttonsToAppend;

    switch (statut) {
        case null:
            buttonsToAppend = ifNull;
            break;
            
        case false:
            buttonsToAppend = ifFalse;
            break;
            
        case true:
            buttonsToAppend = ifTrue;
            break;
            
        default:
            buttonsToAppend = preventDefault;
            break;
    }

    buttonsToAppend.forEach(btn => div.appendChild(btn));
}