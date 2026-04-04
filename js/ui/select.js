import { parseFullName } from "/Elina/js/utils/format.js";

export let activePeopleSelect = null;
export let pendingTagText = null;

export function addPeopleToAllSelects(selects, id, name) {

    selects.forEach(select => {
        const option = new Option(name, id, false, false);
        select.append(option);
    });
}

export function clearPeopleSelectState() {
    activePeopleSelect = null;
    pendingTagText = null;
}

export function initGenres(selectElement, genres) {
    genres.forEach(genre => {
        selectElement.append(
            new Option(genre, genre, false, false)
        );
    });

    $(selectElement).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });
}

export function initNationalities(selectElement, nationalities) {
    Object.entries(nationalities).forEach(([key, name]) => {
        selectElement.append(
            new Option(name, key, false, false)
        );
    });

    $(selectElement).select2({
        placeholder: "Nationalités…",
        allowClear: true
    });
}

export function initPeopleSelect(selectElement, people) {
    if (!selectElement) return;

    selectElement.innerHTML = "";

    people.forEach(p => {
        const completeName = p.firstname ? p.firstname + " " + p.lastname : p.lastname;
        const option = new Option(completeName, p.id, false, false);
        selectElement.append(option);
    });
}

export function initPeopleSelect2NewTag(selectElement, placeholder) {
    if (!selectElement) return;

    $(selectElement).select2({ 
        placeholder,
        allowClear: true,
        tags: true,
        maximumSelectionLength: 1,
        createTag: function(params) {
            const term = $.trim(params.term);
            if (term === "") return null;

            return {
                id: term,
                text: term,
                newTag: true
            };
        }
    });
}

export function initPlaforms(selectElement, platforms) {
    platforms.forEach(platform => {
        selectElement.append(
            new Option(platform, platform, false, false)
        );
    });

    $(selectElement).select2({
        placeholder: "Choisir une plateforme…",
        allowClear: true
    });
}

export function initTags(selectElement, tags) {
    if (!selectElement) return;

    tags.forEach(([id, tag, color_tag, trad, categorie]) => {
        const option = new Option(tag, tag, false, false);
        selectElement.appendChild(option);
    });

    $(selectElement).select2({
        placeholder: "Choisir un tag…",
        allowClear: true,
        tags: true,
        createTag: function(params) {
            const term = $.trim(params.term);
            if (term === "") return null;

            return {
                id: term,
                text: term,
                newTag: true
            }
        }
    });
}