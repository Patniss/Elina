import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag } from "/Elina/js/ui/select.js";
import { parseFullName } from "/Elina/js/utils/format.js";

export async function completeMovie() {
    const selectPeople = document.getElementById("select-people");

    const people = await getAllPeople();

    initPeopleSelect(selectPeople, people);

    initPeopleSelect2NewTag(selectPeople, "Saisir un nom…");
}