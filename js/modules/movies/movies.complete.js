import { btnCastMovie } from "/Elina/js/data/movies.store.js";
import { nationalities } from "/Elina/js/data/nationalities.js";
import { addMovieCasting } from "/Elina/js/services/castings.service.js";
import { getAllPeople, addPeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag, initNationalities } from "/Elina/js/ui/select.js";
import { parseFullName } from "/Elina/js/utils/format.js";

export async function completeMovie(movieId) {
    const selectPeople = document.getElementById("select-people");
    const nationalitiesPeople = document.getElementById("nationalities-people");
    const btnAddCast = document.getElementById("btn-add-cast");
    let peopleId;

    const people = await getAllPeople();

    initPeopleSelect(selectPeople, people);
    initPeopleSelect2NewTag(selectPeople, "Saisir un nom…");
    initNationalities(nationalitiesPeople, nationalities);

    $(selectPeople).on("select2:select", function (e) {
        const data = e.params.data;

        if (data.newTag) {
            document.getElementById("div-add-people").classList.remove("is-hidden");
            document.getElementById("div-choose-people").classList.add("is-hidden");

            const firstnamePeople = document.getElementById("firstname-people");
            const lastnamePeople = document.getElementById("lastname-people");
            const birthdatePeople = document.getElementById("birthdate-people");
            const isDeadPeople = document.getElementById("is-dead-people");
            const deathdatePeople = document.getElementById("deathdate-people");
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

            btnAddPeople.addEventListener("click", async () => {
                const firstnameValue = firstnamePeople.value;
                const lastnameValue = lastnamePeople.value;
                const birthdateValue = birthdatePeople.value;
                const deathdateValue = isDeadPeople.checked ? deathdateValue.value : null;

                let selectedNationalities = $(nationalitiesPeople).val() || null;
                const nationalitiesPeople = selectedNationalities.join(" ");

                if (!firstnameValue || !lastnameValue || !birthdateValue || !selectedNationalities || (isDeadPeople.checked && !deathdateValue)) {
                    alert("Veuillez remplir tous les champs nécessaires.");
                    return;
                };

                try {
                    peopleId = await addPeople(firstnameValue, lastnameValue, birthdateValue, nationalitiesPeople, deathdateValue);
                    await addMovieCasting(movieId, peopleId, btnCastMovie);
                } catch (error) {
                    console.error(error);
                    return;
                }
                
                document.getElementById("div-add-people").classList.add("is-hidden");
                document.getElementById("div-choose-people").classList.remove("is-hidden");
                $(selectPeople).val(null).trigger('change');
            });
        };
    });

    btnAddCast.addEventListener("click", async () => {
        peopleId = $(selectPeople).val();
        if (!peopleId) {
            alert("Veuillez sélectionner un people.");
            return;
        }

        try {
            await addMovieCasting(movieId, peopleId, btnCastMovie);
        } catch (error) {
            console.error(error);
            return;
        }
    });
}