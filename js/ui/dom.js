export function toggleElements(elements, show) {
    if (!Array.isArray(elements)) elements = [elements];
    elements.forEach(el => {
        if (show) el.classList.remove("is-hidden");
        else el.classList.add("is-hidden");
    });
}

export function toggleBtnSeenStatut(statut, btnAdd, btnTosee, btnDelete, btnSeen, btnDetails) {
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

export function toggleBtnStateStatut(statut, btnAdd, btnNext, btnCancel, btnPause, btnRetake, btnFinish, btnRetry) {
    switch (statut) {
        case null:
            toggleElements(btnAdd, true);
            toggleElements([btnNext, btnCancel, btnPause, btnRetake, btnFinish, btnRetry], false);
            break;
    
        case "current":
            toggleElements([btnNext, btnPause], true);
            toggleElements([btnAdd, btnCancel, btnRetake, btnFinish, btnRetry], false);
            break;
        
        case "paused":
            toggleElements(btnRetake, btnCancel, true);
            toggleElements([btnAdd, btnNext, btnPause, btnFinish, btnRetry], false);
        
        case "canceled":
            toggleElements(btnRetry, true);
            toggleElements([btnAdd, btnNext, btnCancel, btnPause, btnRetake, btnFinish], false);
        
        case "finished":
            toggleElements(btnFinish, true);
            toggleElements([btnAdd, btnNext, btnCancel, btnPause, btnRetake, btnRetry], false);
    }
}