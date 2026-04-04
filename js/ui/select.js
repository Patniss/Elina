import { parseFullName } from "/Elina/js/utils/format.js";

export let activePeopleSelect = null;
export let pendingTagText = null;

export function addPeopleToAllSelects(selects, id, name) {

    selects.forEach(select => {
        const option = new Option(name, id, false, false);
        select.append(option);
    });
}

export function applyBulmaStylesToSelect2(selectElement) {
    if (!selectElement) return;

    const select2Container = $(selectElement).next('.select2-container');
    if (select2Container.length) {
        select2Container.addClass('is-fullwidth');
        select2Container.find('.select2-selection').addClass('select');
    }
}

export function bindPeopleModalNewTag(selectElement) {
    if (!selectElement) return;

    const modal = document.getElementById("add-new-people-modal");
    const inputFirstname = document.getElementById("firstname");
    const inputLastname = document.getElementById("lastname");

    $(selectElement).on("select2:select", function (e) {
        const data = e.params.data;
        
        if (data.newTag) {
            activePeopleSelect = selectElement;
            pendingTagText = data.text;

            const { firstName, lastName } = parseFullName(data.text);
            
            modal.classList.add("is-active");
            inputFirstname.value = firstName;
            inputLastname.value = lastName;
        }
    });

    applyBulmaStylesToSelect2(selectElement);
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

    applyBulmaStylesToSelect2(selectElement);
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

    applyBulmaStylesToSelect2(selectElement);
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

    applyBulmaStylesToSelect2(selectElement);
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

    applyBulmaStylesToSelect2(selectElement);
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

    applyBulmaStylesToSelect2(selectElement);
}