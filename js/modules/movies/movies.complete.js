import { getAllPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag } from "/Elina/js/ui/select.js";

export async function completeMovie() {
    const selectDirector = document.getElementById("select-director");
    const selectScriptwriter = document.getElementById("select-scriptwriter");
    const selectActor = document.getElementById("select-actor");

    const people = await getAllPeople();

    initPeopleSelect(selectDirector, people);
    initPeopleSelect(selectScriptwriter, people);
    initPeopleSelect(selectActor, people);

    initPeopleSelect2NewTag(selectDirector, "Choisir un réalisteur…");
    initPeopleSelect2NewTag(selectScriptwriter, "Choisir un scénariste…");
    initPeopleSelect2NewTag(selectActor, "Choisir un acteur…");
}