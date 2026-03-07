import { parseFullName } from "/Elina/js/utils/format.js";

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

export function initPeopleSelect(selectElement, people) {
    if (!selectElement) return;

    selectElement.innerHTML = "";

    people.forEach(p => {
        const completeName = p.firstname ? p.firstname + " " + p.lastname : p.lastname;
        const option = new Option(completeName, p.id, false, false);
        selectElement.append(option);
    })
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
}

export function bindPeopleModalNewTag(selectElement) {
    if (!selectElement) return;

    const modal = document.getElementById("add-new-people-modal");
    const inputFirstname = document.getElementById("firstname");
    const inputLastname = document.getElementById("lastname");

    $(selectElement)
        .on("select2:select", function (e) {
            const data = e.params.data;

            if (data.newTag) {
                const { firstName, lastName } = parseFullName(data.text);

                modal.classList.add("is-active");
                inputFirstname.value = firstName;
                inputLastname.value = lastName;
            }
        });
}