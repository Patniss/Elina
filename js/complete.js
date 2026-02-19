import { supabase } from "/Elina/js/supabase.js";

const nationalities = {
  AFG: "Afghanistan",
  ZAF: "Afrique du Sud",
  ALB: "Albanie",
  DZA: "Algérie",
  DEU: "Allemagne",
  AND: "Andorre",
  AGO: "Angola",
  ATG: "Antigua-et-Barbuda",
  SAU: "Arabie saoudite",
  ARG: "Argentine",
  ARM: "Arménie",
  AUS: "Australie",
  AUT: "Autriche",
  AZE: "Azerbaïdjan",

  BHS: "Bahamas",
  BHR: "Bahreïn",
  BGD: "Bangladesh",
  BRB: "Barbade",
  BEL: "Belgique",
  BLZ: "Belize",
  BEN: "Bénin",
  BTN: "Bhoutan",
  BLR: "Biélorussie",
  BOL: "Bolivie",
  BIH: "Bosnie-Herzégovine",
  BWA: "Botswana",
  BRA: "Brésil",
  BRN: "Brunei",
  BGR: "Bulgarie",
  BFA: "Burkina Faso",
  BDI: "Burundi",

  KHM: "Cambodge",
  CMR: "Cameroun",
  CAN: "Canada",
  CPV: "Cap-Vert",
  CAF: "République centrafricaine",
  CHL: "Chili",
  CHN: "Chine",
  CYP: "Chypre",
  COL: "Colombie",
  COM: "Comores",
  COG: "Congo",
  COD: "Congo (RDC)",
  CRI: "Costa Rica",
  CIV: "Côte d’Ivoire",
  HRV: "Croatie",
  CUB: "Cuba",

  DNK: "Danemark",
  DJI: "Djibouti",
  DMA: "Dominique",
  DOM: "République dominicaine",

  EGY: "Égypte",
  ARE: "Émirats arabes unis",
  ECU: "Équateur",
  ERI: "Érythrée",
  ESP: "Espagne",
  EST: "Estonie",
  SWZ: "Eswatini",
  USA: "États-Unis",
  ETH: "Éthiopie",

  FJI: "Fidji",
  FIN: "Finlande",
  FRA: "France",

  GAB: "Gabon",
  GMB: "Gambie",
  GEO: "Géorgie",
  GHA: "Ghana",
  GRC: "Grèce",
  GRD: "Grenade",
  GTM: "Guatemala",
  GIN: "Guinée",
  GNB: "Guinée-Bissau",
  GNQ: "Guinée équatoriale",
  GUY: "Guyana",

  HTI: "Haïti",
  HND: "Honduras",
  HUN: "Hongrie",

  ISL: "Islande",
  IND: "Inde",
  IDN: "Indonésie",
  IRN: "Iran",
  IRQ: "Irak",
  IRL: "Irlande",
  ISR: "Israël",
  ITA: "Italie",

  JAM: "Jamaïque",
  JPN: "Japon",
  JOR: "Jordanie",

  KAZ: "Kazakhstan",
  KEN: "Kenya",
  KGZ: "Kirghizistan",
  KIR: "Kiribati",
  KWT: "Koweït",

  LAO: "Laos",
  LSO: "Lesotho",
  LVA: "Lettonie",
  LBN: "Liban",
  LBR: "Libéria",
  LBY: "Libye",
  LIE: "Liechtenstein",
  LTU: "Lituanie",
  LUX: "Luxembourg",

  MDG: "Madagascar",
  MWI: "Malawi",
  MYS: "Malaisie",
  MDV: "Maldives",
  MLI: "Mali",
  MLT: "Malte",
  MAR: "Maroc",
  MUS: "Maurice",
  MRT: "Mauritanie",
  MEX: "Mexique",
  FSM: "Micronésie",
  MDA: "Moldavie",
  MCO: "Monaco",
  MNG: "Mongolie",
  MNE: "Monténégro",
  MOZ: "Mozambique",
  MMR: "Myanmar",

  NAM: "Namibie",
  NRU: "Nauru",
  NPL: "Népal",
  NIC: "Nicaragua",
  NER: "Niger",
  NGA: "Nigéria",
  NOR: "Norvège",
  NZL: "Nouvelle-Zélande",

  OMN: "Oman",
  UGA: "Ouganda",
  UZB: "Ouzbékistan",

  PAK: "Pakistan",
  PAN: "Panama",
  PNG: "Papouasie-Nouvelle-Guinée",
  PRY: "Paraguay",
  NLD: "Pays-Bas",
  PER: "Pérou",
  PHL: "Philippines",
  POL: "Pologne",
  PRT: "Portugal",

  QAT: "Qatar",

  ROU: "Roumanie",
  GBR: "Royaume-Uni",
  RUS: "Russie",
  RWA: "Rwanda",

  LCA: "Sainte-Lucie",
  KNA: "Saint-Kitts-et-Nevis",
  SMR: "Saint-Marin",
  VCT: "Saint-Vincent-et-les-Grenadines",
  SLB: "Salomon",
  SLV: "Salvador",
  WSM: "Samoa",
  STP: "Sao Tomé-et-Principe",
  SEN: "Sénégal",
  SRB: "Serbie",
  SYC: "Seychelles",
  SLE: "Sierra Leone",
  SGP: "Singapour",
  SVK: "Slovaquie",
  SVN: "Slovénie",
  SOM: "Somalie",
  SDN: "Soudan",
  SSD: "Soudan du Sud",
  LKA: "Sri Lanka",
  SWE: "Suède",
  CHE: "Suisse",
  SUR: "Suriname",
  SYR: "Syrie",

  TJK: "Tadjikistan",
  TZA: "Tanzanie",
  TCD: "Tchad",
  CZE: "Tchéquie",
  THA: "Thaïlande",
  TLS: "Timor oriental",
  TGO: "Togo",
  TON: "Tonga",
  TTO: "Trinité-et-Tobago",
  TUN: "Tunisie",
  TKM: "Turkménistan",
  TUR: "Turquie",
  TUV: "Tuvalu",

  UKR: "Ukraine",
  URY: "Uruguay",

  VUT: "Vanuatu",
  VAT: "Vatican",
  VEN: "Venezuela",
  VNM: "Viêt Nam",

  YEM: "Yémen",
  ZMB: "Zambie",
  ZWE: "Zimbabwe"
};

export async function completeMovie(uuid) {
    const movieTitle = document.getElementById("movie-title");

    const addDirector = document.getElementById("add-director");
    const addScriptwriter = document.getElementById("add-scriptwriter")
    
    const divDirector1 = document.getElementById("div-director-1");
    const selectDirector1 = document.getElementById("select-director-1");
    const addNewDirector1 = document.getElementById("add-new-director-1");
    const firstNameDirector1 = document.getElementById("first-name-director-1");
    const lastNameDirector1 = document.getElementById("last-name-director-1");
    const birthdateDirector1 = document.getElementById("birthdate-director-1");
    const isDeadDirector1 = document.getElementById("is-dead-director-1");
    const deathdateDirector1 = document.getElementById("deathdate-director-1");
    const nationalitiesDirector1 = document.getElementById("nationalities-director-1");

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

    const divDirector3 = document.getElementById("div-director-3");
    const deleteDirector3 = document.getElementById("delete-director-3");
    const selectDirector3 = document.getElementById("select-director-3");""
    const addNewDirector3 = document.getElementById("add-new-director-3");
    const firstNameDirector3 = document.getElementById("first-name-director-3");
    const lastNameDirector3 = document.getElementById("last-name-director-3");
    const birthdateDirector3 = document.getElementById("birthdate-director-3");
    const isDeadDirector3 = document.getElementById("is-dead-director-3");
    const deathdateDirector3 = document.getElementById("deathdate-director-3");
    const nationalitiesDirector3 = document.getElementById("nationalities-director-3");

    const divScriptwriter1 = document.getElementById("div-scriptwriter-1");
    const selectScriptwriter1 = document.getElementById("select-scriptwriter-1");
    const addNewScriptwriter1 = document.getElementById("add-new-scriptwriter-1");
    const firstNameScriptwriter1 = document.getElementById("first-name-scriptwriter-1");
    const lastNameScriptwriter1 = document.getElementById("last-name-scriptwriter-1");
    const birthdateScriptwriter1 = document.getElementById("birthdate-scriptwriter-1");
    const isDeadScriptwriter1 = document.getElementById("is-dead-scriptwriter-1");
    const deathdateScriptwriter1 = document.getElementById("deathdate-scriptwriter-1");
    const nationalitiesScriptwriter1 = document.getElementById("nationalities-scriptwriter-1");

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
            const testFirstNameDirector2 = parts.lenght > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector2 = parts.lenght > 1 ? parts.slice(-1).join("") : parts[0];

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
            const testFirstNameDirector3 = parts.lenght > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector3 = parts.lenght > 1 ? parts.slice(-1).join("") : parts[0];

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
}