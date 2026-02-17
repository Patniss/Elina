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

    const { data: movie, error: errorMovie } = await supabase
        .from("movies")
        .select("*")
        .eq("id", uuid)
        .single();

    if (errorMovie) {
        console.log("Erreur sur l'extraction du film : " + errorMovie);
        return;
    }

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
    });

    movieTitle.textContent = movie.title;

    addDirector.addEventListener("click", () => {
        if (divDirector2.style.display === "none") {
            divDirector2.style.display = "block";
            deleteDirector2.style.display = "inline";

            deleteDirector2.addEventListener("click", () => {
                divDirector2.style.display = "none";
                selectDirector2.value = "";
                firstNameDirector2.value = "";
                lastNameDirector2.value = "";
                birthdateDirector2.value = "";
                isDeadDirector2.checked = false;
                deathdateDirector2.value = "";
                nationalitiesDirector2.value = "";
            })
        } else {
            divDirector3.style.display = "block";
            addDirector.style.display = "none";
            deleteDirector2.style.display = "none";

            deleteDirector3.addEventListener("click", () => {
                deleteDirector2.style.display = "inline";
                divDirector3.style.display = "none";
                selectDirector3.value = "";
                firstNameDirector3.value = "";
                lastNameDirector3.value = "";
                birthdateDirector3.value = "";
                isDeadDirector3.checked = false;
                deathdateDirector3.value = "";
                nationalitiesDirector3.value = "";
            })
        };
    });

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
            addNewDirector1.style.display = "block";

            const parts = data.text.trim().split(" ");
            const testFirstNameDirector1 = parts.lenght > 1 ? parts.slice(0, -1).join(" ") : null;
            const testLastNameDirector1 = parts.lenght > 1 ? parts.slice(-1).join("") : parts[0];

            firstNameDirector1.value = testFirstNameDirector1;
            firstNameDirector1.required = true;

            lastNameDirector1.value = testLastNameDirector1;
            lastNameDirector1.required = true;

            birthdateDirector1.required = true;
        }
    })
    .on("select2:clear", function() {
        addNewDirector1.style.display = "none";

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
            addNewDirector2.style.display = "block";

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
        addNewDirector2.style.display = "none";

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
            addNewDirector3.style.display = "block";

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
        addNewDirector3.style.display = "none";

        firstNameDirector3.value = "";
        firstNameDirector3.required = false;

        lastNameDirector3.value = "";
        lastNameDirector3.required = false;

        birthdateDirector3.required = false;
    });
}