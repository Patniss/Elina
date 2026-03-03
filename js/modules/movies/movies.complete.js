import { getMovie, movieComplete } from "/Elina/js/services/movies.service.js";
import { getAllPeople, addPeople, deletePeople } from "/Elina/js/services/people.service.js";
import { initPeopleSelect, initPeopleSelect2NewTag, bindPeopleSelectEvents } from "/Elina/js/ui/select.js";
import { createRoleBlock } from "/Elina/js/modules/castings/casting.dom.js";
import { addDirectorMovieCasting, addScriptwriterMovieCasting, addActorMovieCasting, deleteMovieCasting } from "/Elina/js/services/castings.service.js";

export async function completeMovie(uuid) {
    const movieTitle = document.getElementById("movie-title");

    const addDirector = document.getElementById("add-director");
    const addScriptwriter = document.getElementById("add-scriptwriter");
    const addRole = document.getElementById("add-role");

    const selectDirector1 = document.getElementById("select-director-1");
    const divDirector2 = document.getElementById("div-director-2");
    const deleteDirector2 = document.getElementById("delete-director-2");
    const selectDirector2 = document.getElementById("select-director-2");
    const divDirector3 = document.getElementById("div-director-3");
    const deleteDirector3 = document.getElementById("delete-director-3");
    const selectDirector3 = document.getElementById("select-director-3");

    const selectDirectors = [selectDirector1, selectDirector2, selectDirector3];

    const selectScriptwriter1 = document.getElementById("select-scriptwriter-1");
    const divScriptwriter2 = document.getElementById("div-scriptwriter-2");
    const deleteScriptwriter2 = document.getElementById("delete-scriptwriter-2");
    const selectScriptwriter2 = document.getElementById("select-scriptwriter-2");

    const selectScriptwriters = [selectScriptwriter1, selectScriptwriter2];
    
    const divRoles = document.getElementById("div-roles");

    const submitComplete = document.getElementById("submit");

    const movie = await getMovie(uuid);

    movieTitle.textContent = movie.title;

    const people = await getAllPeople();
    selectDirectors.forEach(select => { initPeopleSelect(select, people) });
    selectScriptwriters.forEach(select => { initPeopleSelect(select, people) });
    selectDirectors.forEach(select => { initPeopleSelect2NewTag(select, "Réalisateur…") });
    selectScriptwriters.forEach(select => { initPeopleSelect2NewTag(select, "Scénariste…") });

    addDirector.addEventListener("click", () => {
        if (divDirector2.classList.contains("is-hidden")) {
            divDirector2.classList.remove("is-hidden");
            if (deleteDirector2.classList.contains("is-hidden")) deleteDirector2.classList.remove("is-hidden");
            selectDirector2.required = true;
        } else {
            divDirector3.classList.remove("is-hidden");
            deleteDirector2.classList.add("is-hidden");
            selectDirector3.required = true;
        }
    });

    addScriptwriter.addEventListener("click", () => {
        divScriptwriter2.classList.remove("is-hidden");
        selectScriptwriter2.required = true;
    })

    deleteDirector2.addEventListener("click", () => {
        divDirector2.classList.add("is-hidden");
        if (deleteDirector2.classList.contains("is-hidden")) deleteDirector2.classList.remove("is-hidden");
        selectDirector2.required = false;
    });

    deleteDirector3.addEventListener("click", () => {
        divDirector3.classList.add("is-hidden");
        deleteDirector2.classList.remove("is-hidden");
        selectDirector3.required = false;
    });

    deleteScriptwriter2.addEventListener("click", () => {
        divScriptwriter2.classList.add("is-hidden");
        selectScriptwriter2.required = false;
    });

    selectDirectors.forEach(select => {
        bindPeopleSelectEvents(select, {
            onCreate: async ({ firstName, lastName }) => {
                const person = await addPeople(firstName, lastName);
                select.dataset.directorId = person.id;
                const casting = await addDirectorMovieCasting(uuid, select.dataset.directorId);
                select.dataset.castingId = casting.id;
            },
            onSelect: async (id) => {
                select.dataset.directorId = id;
            },
            onClear: async () => {
                const idDirector = select.dataset.directorId;
                if (idDirector) {
                    await deletePeople(idDirector);
                    delete select.dataset.directorId;
                }
                const idCasting = select.dataset.castingId;
                if (idCasting) {
                    await deleteMovieCasting(idCasting);
                }
            }
        });
    });
    
    selectScriptwriters.forEach(select => {
        bindPeopleSelectEvents(select, {
            onCreate: async ({ firstName, lastName }) => {
                const person = await addPeople(firstName, lastName);
                select.dataset.scriptwriterId = person.id;
                const casting = await addScriptwriterMovieCasting(uuid, select.dataset.scriptwriterId);
                select.dataset.castingId = casting.id;
            },
            onSelect: async (id) => {
                select.dataset.scriptwriterId = id;
            },
            onClear: async () => {
                const idScriptwriter = select.dataset.scriptwriterId;
                if (idScriptwriter) {
                    await deletePeople(idScriptwriter);
                    delete select.dataset.scriptwriterId;
                }
                const idCasting = select.dataset.castingId;
                if (idCasting) {
                    await deleteMovieCasting(idCasting);
                }
            }
        });
    });

    let i = 0;

    addRole.addEventListener("click", async () => {
        i += 1;
        const roles = createRoleBlock(i);

        async function tryCreateCasting() {
            const idActor = roles.selectActor.dataset.actorId;
            const roleName = roles.inputRole.value;
            
            const selectedTypeRole = roles.divTypeRole
                .querySelector('input[type="radio"]:checked');
            
            const typeRole = selectedTypeRole?.value;

            if (roles.selectActor.dataset.castingId) return;
            
            if (idActor && roleName && typeRole) {
                const casting = await addActorMovieCasting(uuid, idActor, roleName, typeRole);
                
                roles.selectActor.dataset.castingId = casting.id;
            }
        }

        const previousDeleteButtons = divRoles.querySelectorAll(".delete");
        previousDeleteButtons.forEach(btn => btn.style.display = "none");

        divRoles.appendChild(roles.columns);
        initPeopleSelect(roles.selectActor, people);
        initPeopleSelect2NewTag(roles.selectActor, "Acteur…");

        bindPeopleSelectEvents(roles.selectActor, {
            onCreate: async ({ firstName, lastName }) => {
                const person = await addPeople(firstName, lastName);
                roles.selectActor.dataset.actorId = person.id;
                await tryCreateCasting();
            },
            onSelect: async (id) => {
                roles.selectActor.dataset.actorId = id;
                await tryCreateCasting();
            },
            onClear: async () => {
                const idActor = roles.selectActor.dataset.actorId;
                if (idActor) {
                    delete roles.selectActor.dataset.actorId;
                }
                const idCasting = roles.selectActor.dataset.castingId;
                if (idCasting) {
                    await deleteMovieCasting(idCasting);
                    delete roles.selectActor.dataset.castingId;
                }
            }
        });

        roles.inputRole.addEventListener("change", async () => {
            await tryCreateCasting();
        })

        roles.btnDelete.addEventListener("click", () => {
            i -= 1;
            roles.columns.remove();

            const allRoles = divRoles.querySelectorAll(".columns");
            if (allRoles.length > 0) {
                const lastRole = allRoles[allRoles.length - 1];
                const lastBtn = lastRole.querySelector(".delete");
                if (lastBtn) lastBtn.style.display = "inline-block";
            }
        });
    });

    submitComplete.addEventListener("click", async (e) => {
        e.preventDefault();

        const errors = [];

        // ===== DIRECTORS =====
        const visibleDirectors = selectDirectors.filter(select => {
            return !select.closest(".field").classList.contains("is-hidden");
        });

        visibleDirectors.forEach((select, index) => {
            if (!select.dataset.directorId) {
                errors.push(`Le réalisateur ${index + 1} n'est pas sélectionné.`);
            }
        });

        // ===== SCRIPTWRITERS =====
        const visibleScriptwriters = selectScriptwriters.filter(select => {
            return !select.closest(".field").classList.contains("is-hidden");
        });

        visibleScriptwriters.forEach((select, index) => {
            if (!select.dataset.scriptwriterId) {
                errors.push(`Le scénariste ${index + 1} n'est pas sélectionné.`);
            }
        });

        // ===== ACTORS =====
        const roleBlocks = divRoles.querySelectorAll(".columns");

        roleBlocks.forEach((block, index) => {
            const selectActor = block.querySelector("select");
            const inputRole = block.querySelector("input[type='text']");
            const selectedType = block.querySelector("input[type='radio']:checked");

            if (!selectActor?.dataset.actorId) {
                errors.push(`L'acteur du rôle ${index + 1} n'est pas sélectionné.`);
            }

            if (!inputRole?.value.trim()) {
                errors.push(`Le nom du rôle ${index + 1} est vide.`);
            }

            if (!selectedType) {
                errors.push(`Le type du rôle ${index + 1} n'est pas sélectionné.`);
            }
        });

        // ===== IF ERRORS =====
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        // ===== LOADING =====
        submitComplete.classList.add("is-loading");

        try {
            await movieComplete(uuid);
            setTimeout(() => {
                window.location.href = "/Elina/toComplete.html";
            }, 500);
        } catch (error) {
            console.error(error);
            alert("Une erreur est survenue.");
        } finally {
            submitComplete.classList.remove("is-loading");
        }
    });
}