export function toggleElements(elements, show) {
    if (!Array.isArray(elements)) elements = [elements];
    elements.forEach(el => {
        if (show) el.classList.remove("is-hidden");
        else el.classList.add("is-hidden");
    });
}

export function toggleBtnSeenStatut(statut, btnAdd, btnTosee, btnDelete, btnSeen) {
    switch (statut) {
        case null:
            toggleElements(btnAdd, true);
            toggleElements([btnTosee, btnDelete, btnSeen], false);
            break;
    
        case false:
            toggleElements([btnTosee, btnDelete], true);
            toggleElements([btnAdd, btnSeen], false);
            break;
        
        case true:
            toggleElements(btnSeen, true);
            toggleElements([btnAdd, btnTosee, btnDelete], false);
    }
}