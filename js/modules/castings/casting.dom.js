export function createRoleBlock(i) {
    const columns = document.createElement("div");
    columns.classList.add("columns");
    columns.style.border = "1px solid grey";
    columns.style.borderRadius = "5px";
    columns.id = `div-role-${i}`;

    const divNbRole = document.createElement("div");
    const nbRole = document.createElement("h3");
    nbRole.classList.add("subtitle", "is-11", "column", "is-half");
    nbRole.textContent = i;
    divNbRole.appendChild(nbRole);

    const divSelectRole = document.createElement("div");
    divSelectRole.classList.add("column", "is-11");
    const labelRole = document.createElement("label");
    labelRole.classList.add("label");
    labelRole.textContent = "Rôle n° " + i;
    const inputRole = document.createElement("input");
    inputRole.type = "text";
    inputRole.placeholder = "Nom du personnage…";
    inputRole.classList.add("input");
    inputRole.id = `name-role-${i}`;
    
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
    selectActor.classList.add("select-actor");
    selectActor.id = `select-actor-${i}`;
    const optBaseAction = document.createElement("option");
    selectActor.appendChild(optBaseAction);
    divSelectActor.appendChild(selectActor);
    
    divSelectRole.append(labelRole, inputRole, divTypeRole, divSelectActor);

    columns.append(divNbRole, divSelectRole);

    return {
        columns, inputRole, selectActor, divTypeRole
    }
}