import { supabase } from "/Elina/js/core/supabase.js";


export async function completeMovie(uuid) {
    const movieTitle = document.getElementById("movie-title");

    const addDirector = document.getElementById("add-director");
    const addScriptwriter = document.getElementById("add-scriptwriter");
    const addRole = document.getElementById("add-role");
    
    const divDirector1 = document.getElementById("div-director-1");
    const selectDirector1 = document.getElementById("select-director-1");
    const addNewDirector1 = document.getElementById("add-new-director-1");
    const firstNameDirector1 = document.getElementById("first-name-director-1");
    const lastNameDirector1 = document.getElementById("last-name-director-1");
    const birthdateDirector1 = document.getElementById("birthdate-director-1");
    const isDeadDirector1 = document.getElementById("is-dead-director-1");
    const deathdateDirector1 = document.getElementById("deathdate-director-1");
    const nationalitiesDirector1 = document.getElementById("nationalities-director-1");
    const jobDirectorDirector1 = document.getElementById("job-director-1-director");
    const jobProducerDirector1 = document.getElementById("job-director-1-producer");
    const jobScriptwriterDirector1 = document.getElementById("job-director-1-scriptwriter");
    const jobActorDirector1 = document.getElementById("job-director-1-actor");

    const divDirector2 = document.getElementById("div-director-2");
    const deleteDirector2 = document.getElementById("delete-director-2");
    const addNewDirector2 = document.getElementById("add-new-director-2");
    const selectDirector2 = document.getElementById("select-director-2");
    const firstNameDirector2 = document.getElementById("first-name-director-2");
    const lastNameDirector2 = document.getElementById("last-name-director-2");
    const birthdateDirector2 = document.getElementById("birthdate-director-2");
    const isDeadDirector2 = document.getElementById("is-dead-director-2");
    const deathdateDirector2 = document.getElementById("deathdate-director-2");
    const nationalitiesDirector2 = document.getElementById("nationalities-director-2");
    const jobDirectorDirector2 = document.getElementById("job-director-2-director");
    const jobProducerDirector2 = document.getElementById("job-director-2-producer");
    const jobScriptwriterDirector2 = document.getElementById("job-director-2-scriptwriter");
    const jobActorDirector2 = document.getElementById("job-director-2-actor");

    const divDirector3 = document.getElementById("div-director-3");
    const deleteDirector3 = document.getElementById("delete-director-3");
    const selectDirector3 = document.getElementById("select-director-3");
    const addNewDirector3 = document.getElementById("add-new-director-3");
    const firstNameDirector3 = document.getElementById("first-name-director-3");
    const lastNameDirector3 = document.getElementById("last-name-director-3");
    const birthdateDirector3 = document.getElementById("birthdate-director-3");
    const isDeadDirector3 = document.getElementById("is-dead-director-3");
    const deathdateDirector3 = document.getElementById("deathdate-director-3");
    const nationalitiesDirector3 = document.getElementById("nationalities-director-3");
    const jobDirectorDirector3 = document.getElementById("job-director-3-director");
    const jobProducerDirector3 = document.getElementById("job-director-3-producer");
    const jobScriptwriterDirector3 = document.getElementById("job-director-3-scriptwriter");
    const jobActorDirector3 = document.getElementById("job-director-3-actor");

    const divScriptwriter1 = document.getElementById("div-scriptwriter-1");
    const selectScriptwriter1 = document.getElementById("select-scriptwriter-1");
    const addNewScriptwriter1 = document.getElementById("add-new-scriptwriter-1");
    const firstNameScriptwriter1 = document.getElementById("first-name-scriptwriter-1");
    const lastNameScriptwriter1 = document.getElementById("last-name-scriptwriter-1");
    const birthdateScriptwriter1 = document.getElementById("birthdate-scriptwriter-1");
    const isDeadScriptwriter1 = document.getElementById("is-dead-scriptwriter-1");
    const deathdateScriptwriter1 = document.getElementById("deathdate-scriptwriter-1");
    const nationalitiesScriptwriter1 = document.getElementById("nationalities-scriptwriter-1");
    const jobDirectorScriptwriter1 = document.getElementById("job-scriptwriter-1-director");
    const jobProducerScriptwriter1 = document.getElementById("job-scriptwriter-1-producer");
    const jobScriptwriterScriptwriter1 = document.getElementById("job-scriptwriter-1-scriptwriter");
    const jobActorScriptwriter1 = document.getElementById("job-scriptwriter-1-actor");

    const divScriptwriter2 = document.getElementById("div-scriptwriter-2");
    const deleteScriptwriter2 = document.getElementById("delete-scriptwriter-2");
    const selectScriptwriter2 = document.getElementById("select-scriptwriter-2");
    const addNewScriptwriter2 = document.getElementById("add-new-scriptwriter-2");
    const firstNameScriptwriter2 = document.getElementById("first-name-scriptwriter-2");
    const lastNameScriptwriter2 = document.getElementById("last-name-scriptwriter-2");
    const birthdateScriptwriter2 = document.getElementById("birthdate-scriptwriter-2");
    const isDeadScriptwriter2 = document.getElementById("is-dead-scriptwriter-2");
    const deathdateScriptwriter2 = document.getElementById("deathdate-scriptwriter-2");
    const nationalitiesScriptwriter2 = document.getElementById("nationalities-scriptwriter-2");
    const jobDirectorScriptwriter2 = document.getElementById("job-scriptwriter-2-director");
    const jobProducerScriptwriter2 = document.getElementById("job-scriptwriter-2-producer");
    const jobScriptwriterScriptwriter2 = document.getElementById("job-scriptwriter-2-scriptwriter");
    const jobActorScriptwriter2 = document.getElementById("job-scriptwriter-2-actor");

    const submitComplete = document.getElementById("submit");

    const divRoles = document.getElementById("div-roles");

    const { data: movie, error: errorMovie } = await supabase
        .from("movies")
        .select("*")
        .eq("id", uuid)
        .single();

    if (errorMovie) {
        console.log("Erreur sur l'extraction du film : " + errorMovie);
        return;
    }

    movieTitle.textContent = movie.title;

    const { data: people, error: errorPeople } = await supabase
        .from("people")
        .select("*")
        .order("lastname", { ascending: true });
    
    if (errorPeople) {
        console.log("Erreur sur l'extraction des people : " + errorPeople);
        return;
    }

    people.forEach(p => {
        const completeName = p.firstname ? p.firstname + " " + p.lastname : p.lastname;
        selectDirector1.append(
            new Option(completeName, p.id, false, false)
        );
        selectDirector2.append(
            new Option(completeName, p.id, false, false)
        );
        selectDirector3.append(
            new Option(completeName, p.id, false, false)
        );
        selectScriptwriter1.append(
            new Option(completeName, p.id, false, false)
        ),
        selectScriptwriter2.append(
            new Option(completeName, p.id, false, false)
        )
    });

    Object.entries(nationalities).forEach(([iso, country]) => {
        nationalitiesDirector1.append(
            new Option(country, iso, false, false)
        );
        nationalitiesDirector2.append(
            new Option(country, iso, false, false)
        );
        nationalitiesDirector3.append(
            new Option(country, iso, false, false)
        );
        nationalitiesScriptwriter1.append(
            new Option(country, iso, false, false)
        );
        nationalitiesScriptwriter2.append(
            new Option(country, iso, false, false)
        )
    });

    $(nationalitiesDirector1).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    });

    $(nationalitiesDirector2).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    });

    $(nationalitiesDirector3).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    });

    $(nationalitiesScriptwriter1).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    });

    $(nationalitiesScriptwriter2).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    });

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
        firstNameDirector2.value = "";
        lastNameDirector2.value = "";
        birthdateDirector2.value = "";
        isDeadDirector2.checked = false;
        deathdateDirector2.value = "";
        nationalitiesDirector2.value = "";
    });

    deleteDirector3.addEventListener("click", () => {
        divDirector3.classList.add("is-hidden");
        deleteDirector2.classList.remove("is-hidden");
        selectDirector3.required = false;
        firstNameDirector3.value = "";
        lastNameDirector3.value = "";
        birthdateDirector3.value = "";
        isDeadDirector3.checked = false;
        deathdateDirector3.value = "";
        nationalitiesDirector3.value = "";
    });

    deleteScriptwriter2.addEventListener("click", () => {
        divScriptwriter2.classList.add("is-hidden");
        selectScriptwriter2.required = false;
        firstNameScriptwriter2.value = "";
        lastNameScriptwriter2.value = "";
        birthdateScriptwriter2.value = "";
        isDeadScriptwriter2.checked = false;
        deathdateScriptwriter2.value = "";
        nationalitiesScriptwriter2.value = "";
    })

    $(selectDirector1).select2({
        placeholder: "Réalisateur…",
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

    $(selectDirector1).on("select2:select", function(e) {
        const data = e.params.data;
        if (data.newTag) {
            addNewDirector1.classList.remove("is-hidden");

            const parts = data.text.trim().split(/\s+/);
            const testFirstNameDirector1 = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector1 = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameDirector1.value = testFirstNameDirector1;
            firstNameDirector1.required = true;

            lastNameDirector1.value = testLastNameDirector1;
            lastNameDirector1.required = true;

            birthdateDirector1.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewDirector1.classList.add("is-hidden");

        firstNameDirector1.value = "";
        firstNameDirector1.required = false;

        lastNameDirector1.value = "";
        lastNameDirector1.required = false;

        birthdateDirector1.required = false;
    });

    $(selectDirector2).select2({
        placeholder: "Réalisateur…",
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

    $(selectDirector2).on("select2:select", function(e) {
        const data = e.params.data;
        if (data.newTag) {
            addNewDirector2.classList.remove("is-hidden");

            const parts = data.text.trim().split(" ");
            const testFirstNameDirector2 = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector2 = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameDirector2.value = testFirstNameDirector2;
            firstNameDirector2.required = true;

            lastNameDirector2.value = testLastNameDirector2;
            lastNameDirector2.required = true;

            birthdateDirector2.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewDirector2.classList.add("is-hidden");

        firstNameDirector2.value = "";
        firstNameDirector2.required = false;

        lastNameDirector2.value = "";
        lastNameDirector2.required = false;

        birthdateDirector2.required = false;
    });

    $(selectDirector3).select2({
        placeholder: "Réalisateur…",
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

    $(selectDirector3).on("select2:select", function(e) {
        const data = e.params.data;
        if (data.newTag) {
            addNewDirector3.classList.remove("is-hidden");

            const parts = data.text.trim().split(" ");
            const testFirstNameDirector3 = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector3 = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameDirector3.value = testFirstNameDirector3;
            firstNameDirector3.required = true;

            lastNameDirector3.value = testLastNameDirector3;
            lastNameDirector3.required = true;

            birthdateDirector3.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewDirector3.classList.add("is-hidden");

        firstNameDirector3.value = "";
        firstNameDirector3.required = false;

        lastNameDirector3.value = "";
        lastNameDirector3.required = false;

        birthdateDirector3.required = false;
    });

    $(selectScriptwriter1).select2({
        placeholder: "Réalisateur…",
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

    $(selectScriptwriter1).on("select2:select", function(e) {
        const data = e.params.data;
        if (data.newTag) {
            addNewScriptwriter1.classList.remove("is-hidden");

            const parts = data.text.trim().split(/\s+/);
            const testFirstNameScriptwriter1 = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameScriptwriter1 = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameScriptwriter1.value = testFirstNameScriptwriter1;
            firstNameScriptwriter1.required = true;

            lastNameScriptwriter1.value = testLastNameScriptwriter1;
            lastNameScriptwriter1.required = true;

            birthdateScriptwriter1.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewScriptwriter1.classList.add("is-hidden");

        firstNameScriptwriter1.value = "";
        firstNameScriptwriter1.required = false;

        lastNameScriptwriter1.value = "";
        lastNameScriptwriter1.required = false;

        birthdateScriptwriter1.required = false;
    });

    $(selectScriptwriter2).select2({
        placeholder: "Réalisateur…",
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

    $(selectScriptwriter2).on("select2:select", function(e) {
        const data = e.params.data;
        if (data.newTag) {
            addNewScriptwriter2.classList.remove("is-hidden");

            const parts = data.text.trim().split(/\s+/);
            const testFirstNameScriptwriter2 = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameScriptwriter2 = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameScriptwriter2.value = testFirstNameScriptwriter2;
            firstNameScriptwriter2.required = true;

            lastNameScriptwriter2.value = testLastNameScriptwriter2;
            lastNameScriptwriter2.required = true;

            birthdateScriptwriter2.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewScriptwriter2.classList.add("is-hidden");

        firstNameScriptwriter2.value = "";
        firstNameScriptwriter2.required = false;

        lastNameScriptwriter2.value = "";
        lastNameScriptwriter2.required = false;

        birthdateScriptwriter2.required = false;
    });

    isDeadDirector1.addEventListener("change", () => {
        if (isDeadDirector1.checked === true) {
            deathdateDirector1.classList.remove("is-hidden");
        } else {
            deathdateDirector1.classList.add("is-hidden");
        }
    });

    isDeadDirector2.addEventListener("change", () => {
        if (isDeadDirector2.checked === true) {
            deathdateDirector2.classList.remove("is-hidden");
        } else {
            deathdateDirector2.classList.add("is-hidden");
        }
    });

    isDeadDirector3.addEventListener("change", () => {
        if (isDeadDirector3.checked === true) {
            deathdateDirector3.classList.remove("is-hidden");
        } else {
            deathdateDirector3.classList.add("is-hidden");
        }
    });

    isDeadScriptwriter1.addEventListener("change", () => {
        if (isDeadScriptwriter1.checked === true) {
            deathdateScriptwriter1.classList.remove("is-hidden");
        } else {
            deathdateScriptwriter1.classList.add("is-hidden");
        }
    });

    isDeadScriptwriter2.addEventListener("change", () => {
        if (isDeadScriptwriter2.checked === true) {
            deathdateScriptwriter2.classList.remove("is-hidden");
        } else {
            deathdateScriptwriter2.classList.add("is-hidden");
        }
    });

    let i = 0;

    addRole.addEventListener("click", async () => {
        i+=1;
        let castingActorId = null;
        let newActorId = null;

        const columns = document.createElement("div");
        columns.classList.add("columns");
        columns.style.border = "1px solid grey";
        columns.style.borderRadius = "5px";

        const divDelete = document.createElement("div");
        divDelete.classList.add("column", "is-1", "columns");
        const nbRole = document.createElement("h3");
        nbRole.classList.add("subtitle", "is-3", "column", "is-half");
        nbRole.textContent = i;
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("button", "delete", "is-large", "column", "is-half", "my-3", "ml-4", "mr-2");
        divDelete.append(btnDelete, nbRole);

        const divSelectRole = document.createElement("div");
        divSelectRole.classList.add("column", "is-3");
        const labelRole = document.createElement("label");
        labelRole.classList.add("label");
        labelRole.textContent = "Rôle n° " + i;
        const inputRole = document.createElement("input");
        inputRole.type = "text";
        inputRole.placeholder = "Nom du personnage…";
        inputRole.classList.add("input");
        
        const divTypeRole = document.createElement("div");
        divTypeRole.classList.add("radios", "my-2");
        const labelMainRole = document.createElement("label");
        labelMainRole.classList.add("radio");
        const radioMainRole = document.createElement("input");
        radioMainRole.type = "radio";
        radioMainRole.name = `typeRole-${i}`;
        radioMainRole.value = "main";
        const radioTextMainRole = " Principal";
        labelMainRole.append(radioMainRole, radioTextMainRole);
        const labelSecondRole = document.createElement("label");
        labelSecondRole.classList.add("radio");
        const radioSecondRole = document.createElement("input");
        radioSecondRole.type = "radio";
        radioSecondRole.name = `typeRole-${i}`;
        radioSecondRole.value = "second";
        const radioTextSecondRole = " Secondaire";
        labelSecondRole.append(radioSecondRole, radioTextSecondRole);
        const labelExtraRole = document.createElement("label");
        labelExtraRole.classList.add("radio");
        const radioExtraRole = document.createElement("input");
        radioExtraRole.type = "radio";
        radioExtraRole.name = `typeRole-${i}`;
        radioExtraRole.value = "extra";
        const radioTextExtraRole = " Figurant";
        labelExtraRole.append(radioExtraRole, radioTextExtraRole);
        divTypeRole.append(labelMainRole, labelSecondRole, labelExtraRole);

        const divSelectActor = document.createElement("div");
        divSelectActor.classList.add("select", "is-multiple");
        const selectActor = document.createElement("select");
        selectActor.multiple = true;
        selectActor.style.width = "100%";
        const optBaseAction = document.createElement("option");
        selectActor.appendChild(optBaseAction);
        divSelectActor.appendChild(selectActor);
        
        divSelectRole.append(labelRole, inputRole, divTypeRole, divSelectActor);

        columns.append(divDelete, divSelectRole);

        divRoles.appendChild(columns);

        btnDelete.addEventListener("click", async () => {
            columns.remove();
            i -= 1;
        });

        people.forEach(p => {
            const completeName = p.firstname ? p.firstname + " " + p.lastname : p.lastname;
            selectActor.append(
                new Option(completeName, p.id, false, false)
            );
        });

        $(selectActor).select2({
            placeholder: "Acteur…",
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

        let divBlockNewActor = null;

        $(selectActor).on("select2:select", async function(e) {
            const data = e.params.data;
            let idActor;
            if (data.newTag) {
                const { data: newActor, error: errorNewActor } = await supabase
                    .from("people")
                    .insert([{ 
                        firstname: " ", 
                        lastname: " ",
                        complete: false
                    }])
                    .select("id")
                    .single();
                
                if (errorNewActor) {
                    console.log(errorNewActor);
                    return;
                }

                if (newActor) {
                    newActorId = newActor.id;
                    idActor = newActor.id;
                }
                
                divBlockNewActor = document.createElement("div");
                divBlockNewActor.classList.add("block", "column", "is-8");
                const h4NewActor = document.createElement("h4");
                h4NewActor.classList.add("subtitle", "is-5");
                h4NewActor.textContent = "Nouvel acteur :";

                const divGenre = document.createElement("div");
                divGenre.classList.add("field");
                const divRadiosGenre = document.createElement("div");
                divRadiosGenre.classList.add("radios");
                const labelGenreF = document.createElement("label");
                labelGenreF.classList.add("radio");
                const inputGenreF = document.createElement("input");
                inputGenreF.classList.add("radio");
                inputGenreF.type = "radio";
                inputGenreF.name = "genre";
                inputGenreF.value = "f";
                labelGenreF.append(inputGenreF, " Féminin");
                const labelGenreM = document.createElement("label");
                labelGenreM.classList.add("radio");
                const inputGenreM = document.createElement("input");
                inputGenreM.classList.add("radio");
                inputGenreM.type = "radio";
                inputGenreM.name = "genre";
                inputGenreM.value = "m";
                labelGenreM.append(inputGenreM, " Masculin");
                const labelGenreA = document.createElement("label");
                labelGenreA.classList.add("radio");
                const inputGenreA = document.createElement("input");
                inputGenreA.classList.add("radio");
                inputGenreA.type = "radio";
                inputGenreA.name = "genre";
                inputGenreA.value = "a";
                labelGenreA.append(inputGenreA, " Non binaire / Autre");
                divRadiosGenre.append(labelGenreF, labelGenreM, labelGenreA);
                divGenre.appendChild(divRadiosGenre);

                const divFirstName = document.createElement("div");
                divFirstName.classList.add("field");
                const inputFirstName = document.createElement("input");
                inputFirstName.type = "text";
                inputFirstName.classList.add("input");
                inputFirstName.placeholder = "Prénom…";
                divFirstName.appendChild(inputFirstName);

                const divLastName = document.createElement("div");
                divLastName.classList.add("field");
                const inputLastName = document.createElement("input");
                inputLastName.type = "text";
                inputLastName.classList.add("input");
                inputLastName.placeholder = "Nom…";
                divLastName.appendChild(inputLastName);

                const parts = data.text.trim().split(/\s+/);
                const testFirstname = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
                const testLastname = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

                inputFirstName.value = testFirstname;
                inputLastName.value = testLastname;

                const divBirthdate = document.createElement("div");
                divBirthdate.classList.add("field");
                const inputBirthdate = document.createElement("input");
                inputBirthdate.type = "date";
                inputBirthdate.classList.add("input");
                inputBirthdate.placeholder = "Date de naissance…";
                divBirthdate.appendChild(inputBirthdate);

                const divDeathdate = document.createElement("div");
                divDeathdate.classList.add("field");
                const labelIsDead = document.createElement("label");
                labelIsDead.classList.add("checkbox");
                const inputIsDead = document.createElement("input");
                inputIsDead.type = "checkbox";
                labelIsDead.append(inputIsDead, " Mort");
                const inputDeathdate = document.createElement("input");
                inputDeathdate.type = "date";
                inputDeathdate.classList.add("input", "is-hidden");
                inputDeathdate.placeholder = "Date de mort…";
                divDeathdate.append(labelIsDead, inputDeathdate);

                inputIsDead.addEventListener("change", () => {
                    if (inputIsDead.checked === true) {
                        inputDeathdate.classList.remove("is-hidden");
                    } else {
                        inputDeathdate.classList.add("is-hidden");
                    }
                });

                const divJobs = document.createElement("div");
                divJobs.classList.add("field", "is-flex");
                const labelJobs = document.createElement("label");
                labelJobs.classList.add("label");
                labelJobs.textContent = "Casquettes :";

                const labelJobDirector = document.createElement("label");
                labelJobDirector.classList.add("checkbox");
                const inputJobDirector = document.createElement("input");
                inputJobDirector.value = "director";
                inputJobDirector.type = "checkbox";
                inputJobDirector.classList.add("checkbox");
                const spanJobDirector = document.createElement("span");
                spanJobDirector.classList.add("label", "ml-3");
                spanJobDirector.textContent = " Réalisateur";
                labelJobDirector.append(inputJobDirector, spanJobDirector);

                const labelJobProducer = document.createElement("label");
                labelJobProducer.classList.add("checkbox");
                const inputJobProducer = document.createElement("input");
                inputJobProducer.value = "producer";
                inputJobProducer.type = "checkbox";
                inputJobProducer.classList.add("checkbox");
                const spanJobProducer = document.createElement("span");
                spanJobProducer.classList.add("label", "ml-3");
                spanJobProducer.textContent = " Producteur";
                labelJobProducer.append(inputJobProducer, spanJobProducer);

                const labelJobSwcriptwriter = document.createElement("label");
                labelJobSwcriptwriter.classList.add("checkbox");
                const inputJobScriptwriter = document.createElement("input");
                inputJobScriptwriter.value = "scriptwriter";
                inputJobScriptwriter.type = "checkbox";
                inputJobScriptwriter.classList.add("checkbox");
                const spanJobScriptwriter = document.createElement("span");
                spanJobScriptwriter.classList.add("label", "ml-3");
                spanJobScriptwriter.textContent = " Scénariste";
                labelJobSwcriptwriter.append(inputJobScriptwriter, spanJobScriptwriter);
                
                const labelJobActor = document.createElement("label");
                labelJobActor.classList.add("checkbox");
                const inputJobActor = document.createElement("input");
                inputJobActor.value = "actor";
                inputJobActor.type = "checkbox";
                inputJobActor.checked = true;
                inputJobActor.classList.add("checkbox");
                const spanJobActor = document.createElement("span");
                spanJobActor.classList.add("label", "ml-3");
                spanJobActor.textContent = " Acteur";
                labelJobActor.append(inputJobActor, spanJobActor);

                divJobs.append(labelJobDirector, labelJobProducer, labelJobSwcriptwriter, labelJobActor);

                const divNationalities = document.createElement("div");
                divNationalities.classList.add("field");
                const divSelectNationalities = document.createElement("div");
                divSelectNationalities.classList.add("select", "is-multiple");
                const labelNationalities = document.createElement("label");
                labelNationalities.classList.add("label");
                const selectNationalities = document.createElement("select");
                selectNationalities.multiple = true;
                selectNationalities.style.width = "100%";
                const optBaseNationalities = document.createElement("option");
                selectNationalities.appendChild(optBaseNationalities);
                divSelectNationalities.append(labelNationalities, selectNationalities);
                divNationalities.appendChild(divSelectNationalities);
                
                Object.entries(nationalities).forEach(([iso, country]) => {
                    selectNationalities.append(
                        new Option(country, iso, false, false)
                    );
                });
                
                $(selectNationalities).select2({
                    placeholder: "Nationalité(s)",
                    allowClear: true
                });

                divBlockNewActor.append(divGenre, divFirstName, divLastName, divBirthdate, divDeathdate, divJobs, divNationalities);
                columns.appendChild(divBlockNewActor);

                let jobsNewActor = [];

                [inputFirstName, inputLastName, inputBirthdate, inputIsDead, inputDeathdate, selectNationalities, inputJobActor, inputJobDirector, inputJobProducer, inputJobScriptwriter].forEach(input => {
                    input.addEventListener("change", async () => {
                        let selectedNationalities = $(selectNationalities).val() || [];
                        let nationalitiesNewActor = selectedNationalities.join(" ");
                        if (inputJobDirector.checked) {
                            if (!jobsNewActor.includes("director")) {
                                jobsNewActor.push("director");
                            }
                        } else {
                            const index = jobsNewActor.indexOf("director");
                            if (index > -1) { jobsNewActor.splice(index, 1); }
                        };

                        if (inputJobProducer.checked) {
                            if (!jobsNewActor.includes("producer")) {
                                jobsNewActor.push("producer");
                            }
                        } else {
                            const index = jobsNewActor.indexOf("producer");
                            if (index > -1) { jobsNewActor.splice(index, 1); }
                        };

                        if (inputJobScriptwriter.checked) {
                            if (!jobsNewActor.includes("scriptwriter")) {
                                jobsNewActor.push("scriptwriter");
                            }
                        } else {
                            const index = jobsNewActor.indexOf("scriptwriter");
                            if (index > -1) { jobsNewActor.splice(index, 1); }
                        };
                        
                        if (inputJobActor.checked) {
                            if (!jobsNewActor.includes("actor")) {
                                jobsNewActor.push("actor");
                            }
                        } else {
                            const index = jobsNewActor.indexOf("actor");
                            if (index > -1) { jobsNewActor.splice(index, 1); }
                        }

                        let deathdateNewActor;

                        if (inputIsDead.checked === false) {
                            deathdateNewActor = null;
                        } else {
                            deathdateNewActor = inputDeathdate.value;
                        }

                        const stringJobsNewActor = jobsNewActor.join(" ");

                        const { data: queryActor, error: errorQueryActor} = await supabase
                            .from("people")
                            .update([{ 
                                firstname: inputFirstName.value, 
                                lastname: inputLastName.value, 
                                birthdate: inputBirthdate.value, 
                                nationalities: nationalitiesNewActor, 
                                jobs: stringJobsNewActor,
                                complete: false,
                                deathdate: deathdateNewActor
                            }])
                            .eq("id", newActorId);

                        if (errorQueryActor) {
                            console.log(errorQueryActor);
                            return;
                        }
                    })
                })
            } else idActor = selectActor.value;

            const { data: newRole, error: errorNewRole } = await supabase
                .from("movies_casting")
                .insert({
                    movie_id: uuid,
                    people_id: idActor,
                    role: "",
                    type_role: "",
                    credit: 0,
                    job: "actor"
                }).select("id");

            if (errorNewRole) {
                console.log(errorNewRole);
                return;
            }

            if (newRole) {
                castingActorId = newRole[0].id;
            }

            if (castingActorId !== null) {
                const { data: suppRole, error: errorSuppRole } = await supabase
                    .from("movies_casting")
                    .delete()
                    .eq("id", castingActorId);

                if (errorSuppRole) {
                    console.log(errorSuppRole);
                    return;
                }
            }
        })
        .on("select2:clear", async function() {
            if (divBlockNewActor) {
                divBlockNewActor.remove()
                divBlockNewActor = null;
                const { data: deleteNewActor, error: errorDeleteNewActor } = await supabase
                    .from("people")
                    .delete()
                    .eq("id", newActorId);

                if (errorDeleteNewActor) {
                    console.log(errorDeleteNewActor);
                    return;
                }
            }
        });

        if (castingActorId !== null) {
            const selectedRadio = document.querySelector(`input[name="typeRole-${i}"]:checked`)
            const finalTypeRole = selectedRadio ? selectedRadio.value : null;
            const { data: role, error: errorRole } = await supabase
                .from("movies_casting")
                .update({
                    role: inputRole.value,
                    type_role: finalTypeRole,
                    credit: i
                })
                .eq("id", castingActorId)
                .single();
        }
    });

    submitComplete.addEventListener("click", async () => {
        let selectedNationalities;
        let idDirector;

        if (addNewDirector1.classList.contains("is-hidden")) {
            idDirector = selectDirector1.value;
        } else {
            selectedNationalities = Array.from(nationalitiesDirector1.selectedOptions).map(option => option.value);
            const jobsDirector1 = [
                jobDirectorDirector1.checked && "director",
                jobProducerDirector1.checked && "producer",
                jobScriptwriterDirector1.checked && "scriptwriter",
                jobActorDirector1.checked && "actor"
            ].filter(Boolean).join(" ");
            const { data: addDirector1, error: errorAddDirector1 } = await supabase
                .from("people")
                .insert([{
                    firstname: firstNameDirector1.value,
                    lastname: lastNameDirector1.value,
                    birthdate: birthdateDirector1.value,
                    nationalities: selectedNationalities.join(" "),
                    jobs: jobsDirector1,
                    complete: false,
                    deathdate: isDeadDirector1.checked ? deathdateDirector1.value : null
                }])
                .select("id");

            if (errorAddDirector1) {
                console.log(errorAddDirector1);
                return;
            }
            if (addDirector1 && addDirector1.length > 0) idDirector = addDirector1[0].id;
        }

        const { data: castingDirector1, error: errorCastingDirector1 } = await supabase
            .from("movies_casting")
            .insert([{
                movie_id: uuid,
                people_id: idDirector,
                job: "director"
            }]);

        if (errorCastingDirector1) {
            console.log(errorCastingDirector1);
            return;
        }

        if (!divDirector2.classList.contains("is-hidden")) {
            if (addNewDirector2.classList.contains("is-hidden")) {
                idDirector = selectDirector2.value;
            } else {
                selectedNationalities = Array.from(nationalitiesDirector2.selectedOptions).map(option => option.value);
                const jobsDirector2 = [
                    jobDirectorDirector2.checked && "director",
                    jobProducerDirector2.checked && "producer",
                    jobScriptwriterDirector2.checked && "scriptwriter",
                    jobActorDirector2.checked && "actor"
                ].filter(Boolean).join(" ");
                const { data: addDirector2, error: errorAddDirector2 } = await supabase
                    .from("people")
                    .insert([{
                        firstname: firstNameDirector2.value,
                        lastname: lastNameDirector2.value,
                        birthdate: birthdateDirector2.value,
                        nationalities: selectedNationalities.join(" "),
                        jobs: jobsDirector2,
                        complete: false,
                        deathdate: isDeadDirector2.checked ? deathdateDirector2.value : null
                    }])
                    .select("id");

                if (errorAddDirector2) {
                    console.log(errorAddDirector2);
                    return;
                }
                if (addDirector2 && addDirector2.length > 0) idDirector = addDirector2[0].id;
            }

            const { data: castingDirector2, error: errorCastingDirector2 } = await supabase
                .from(movies_casting)
                .insert([{
                    movie_id: uuid,
                    people_id: idDirector,
                    job: "director"
                }]);

            if (errorCastingDirector2) {
                console.log(errorCastingDirector2);
                return;
            }
        };

        if (!divDirector3.classList.contains("is-hidden")) {
            if (addNewDirector3.classList.contains("is-hidden")) {
                idDirector = selectDirector3.value;
            } else {
                selectedNationalities = Array.from(nationalitiesDirector3.selectedOptions).map(option => option.value);
                const jobsDirector3 = [
                    jobDirectorDirector3.checked && "director",
                    jobProducerDirector3.checked && "producer",
                    jobScriptwriterDirector3.checked && "scriptwriter",
                    jobActorDirector3.checked && "actor"
                ].filter(Boolean).join(" ");
                const { data: addDirector3, error: errorAddDirector3 } = await supabase
                    .from("people")
                    .insert([{
                        firstname: firstNameDirector3.value,
                        lastname: lastNameDirector3.value,
                        birthdate: birthdateDirector3.value,
                        nationalities: selectedNationalities.join(" "),
                        jobs: jobsDirector3,
                        complete: false,
                        deathdate: isDeadDirector3.checked ? deathdateDirector3.value : null
                    }])
                    .select("id");

                if (errorAddDirector3) {
                    console.log(errorAddDirector3);
                    return;
                }
                if (addDirector3 && addDirector3.length > 0) idDirector = addDirector3[0].id;
            }

            const { data: castingDirector3, error: errorCastingDirector3 } = await supabase
                .from(movies_casting)
                .insert([{
                    movie_id: uuid,
                    people_id: idDirector,
                    job: "director"
                }]);

            if (errorCastingDirector3) {
                console.log(errorCastingDirector3);
                return;
            }
        };

        let idScriptwriter;

        if (addNewScriptwriter1.classList.contains("is-hidden")) {
            idScriptwriter = selectScriptwriter1.value;
        } else {
            selectedNationalities = Array.from(nationalitiesScriptwriter1.selectedOptions).map(option => option.value);
            const jobsScriptwriter1 = [
                jobDirectorScriptwriter1.checked && "director",
                jobProducerScriptwriter1.checked && "producer",
                jobScriptwriterScriptwriter1.checked && "scriptwriter",
                jobActorScriptwriter1.checked && "actor"
            ].filter(Boolean).join(" ");
            const { data: addScriptwriter1, error: errorAddScriptwriter1 } = await supabase
                .from("people")
                .insert([{
                    firstname: firstNameScriptwriter1.value,
                    lastname: lastNameScriptwriter1.value,
                    birthdate: birthdateScriptwriter1.value,
                    nationalities: selectedNationalities.join(" "),
                    jobs: jobsScriptwriter1,
                    complete: false,
                    deathdate: isDeadScriptwriter1.checked ? deathdateScriptwriter1.value : null
                }])
                .select("id");

            if (errorAddScriptwriter1) {
                console.log(errorAddScriptwriter1);
                return;
            }
            if (addScriptwriter1 && addScriptwriter1.length > 0) idScriptwriter = addScriptwriter1[0].id;
        }

        const { data: castingScriptwriter1, error: errorCastingScriptwriter1 } = await supabase
            .from(movies_casting)
            .insert([{
                movie_id: uuid,
                people_id: idScriptwriter,
                job: "scriptwriter"
            }]);

        if (errorCastingScriptwriter1) {
            console.log(errorCastingScriptwriter1);
            return;
        }

        if (!divScriptwriter2.classList.contains("is-hidden")) {
            if (addNewScriptwriter2.classList.contains("is-hidden")) {
                idScriptwriter = selectScriptwriter2.value;
            } else {
                selectedNationalities = Array.from(nationalitiesScriptwriter2.selectedOptions).map(option => option.value);
                const jobsScriptwriter2 = [
                    jobDirectorScriptwriter2.checked && "director",
                    jobProducerScriptwriter2.checked && "producer",
                    jobScriptwriterScriptwriter2.checked && "scriptwriter",
                    jobActorScriptwriter2.checked && "actor"
                ].filter(Boolean).join(" ");
                const { data: addScriptwriter2, error: errorAddScriptwriter2 } = await supabase
                    .from("people")
                    .insert([{
                        firstname: firstNameScriptwriter2.value,
                        lastname: lastNameScriptwriter2.value,
                        birthdate: birthdateScriptwriter2.value,
                        nationalities: selectedNationalities.join(" "),
                        jobs: jobsScriptwriter2,
                        complete: false,
                        deathdate: isDeadScriptwriter2.checked ? deathdateScriptwriter2.value : null
                    }])
                    .select("id");

                if (errorAddScriptwriter2) {
                    console.log(errorAddScriptwriter2);
                    return;
                }
                if (addScriptwriter2 && addScriptwriter2.length > 0) idScriptwriter = addScriptwriter2[0].id;
            }

            const { data: castingScriptwriter2, error: errorCastingScriptwriter2 } = await supabase
                .from(movies_casting)
                .insert([{
                    movie_id: uuid,
                    people_id: idScriptwriter,
                    job: "scriptwriter"
                }]);

            if (errorCastingScriptwriter2) {
                console.log(errorCastingScriptwriter2);
                return;
            }
        };

        const { data: finishCompleteMovie, error: errorFinishCompleteMovie } = await supabase
            .from("movies")
            .update({
                complete: true
            })
            .eq("id", uuid)
            .single();
        
        if (errorFinishCompleteMovie ) {
            console.log(errorFinishCompleteMovie);
            return;
        }
    })
}