import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag } from "/Elina/js/ui/select.js";
import { parseFullName } from "/Elina/js/utils/format.js";

export async function completeMovie() {
    const selectPeople = document.getElementById("select-people");

    const people = await getAllPeople();

    initPeopleSelect(selectPeople, people);

    initPeopleSelect2NewTag(selectPeople, "Saisir un nom…");

    selectPeople.on("select2:select", function (e) {
        const data = e.params.data;

        if (data.newTag) {
            document.getElementById("div-add-people").classList.remove("is-hidden");
            document.getElementById("div-choose-people").classList.add("is-hidden");

            const firstnamePeople = document.getElementById("firstname-people");
            const lastnamePeople = document.getElementById("lastname-people");
            const birthdatePeople = document.getElementById("birthdate-people");
            const isDeadPeople = document.getElementById("is-dead-people");
            const deathdatePeople = document.getElementById("deathdate-people");
            const nationalitiesPeople = document.getElementById("nationalities-people");
            const cancelAdd = document.getElementById("btn-cancel-add-people");
            const btnAddPeople = document.getElementById("btn-add-people");

            firstnamePeople.required = true;
            lastnamePeople.required = true;
            birthdatePeople.required = true;
            nationalitiesPeople.required = true;

            const { firstName, lastName } = parseFullName(data.text);
            firstnamePeople.value = firstName;
            lastnamePeople.value = lastName;

            isDeadPeople.addEventListener("change", () => {
                if (isDeadPeople.checked) {
                    document.getElementById("div-deathdate-people").classList.remove("is-hidden");
                    deathdatePeople.required = true;
                } else {
                    document.getElementById("div-deathdate-people").classList.add("is-hidden");
                    deathdatePeople.required = false;
                }
            });

            cancelAdd.addEventListener("click", () => {
                document.getElementById("div-add-people").classList.add("is-hidden");
                document.getElementById("div-choose-people").classList.remove("is-hidden");

                firstnamePeople.required = false;
                lastnamePeople.required = false;
                birthdatePeople.required = false;
                nationalitiesPeople.required = false;
                deathdatePeople.required = false;
            });
        }
    })
}