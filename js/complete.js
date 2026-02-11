const genres = [
    "Action", "Animation", "Arts martiaux", "Aventure",
    "Biopic",
    "Comédie", "Comédie dramatique", "Comédie musicale",
    "Drame",
    "Espionnage",
    "Famille", "Fantastique",
    "Guerre",
    "Historique", "Horreur",
    "Policier",
    "Romance",
    "Science-fiction",
    "Thriller",
    "Western"
]

const jobs = {
    actor: "Acteur",
    singer: "Interprète",
    producer: "Producteur",
    scriptwriter: "Scénariste",
    director: "Réalisateur",
}

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

function calculateAge(startDate, endDate = new Date()) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let age = end.getFullYear() - start.getFullYear();
    const m = end.getMonth() - start.getMonth();

    if (m < 0 || (m === 0 && end.getDate() < start.getDate())) {
        age--;
    }

    return age;
}

import { supabase } from "/Elina/js/supabase.js";

const directors = {};

async function loadDirectors() {
    const { data, error } = await supabase
        .from("people")
        .select("id, firstname, lastname")
        .ilike("jobs", "%director%")
        .order("lastname", { ascending: true });

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(dir => {
        directors[dir.id] = `${dir.firstname} ${dir.lastname}`;
    });
}

export async function completeMovie(uuid) {
    await loadDirectors();

    const { data: movie, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", uuid)
    .single();

    if (error) {
        console.error(error);
        return;
    }

    const movieTitle = document.getElementById("movie-title");
    const movieYear = document.getElementById("movie-year");
    const movieDirectors = document.getElementById("movie-directors");
    const addDirector = document.getElementById("add-director");
    const addingDirector = document.getElementById("adding-directors");
    const movieGenres = document.getElementById("movie-genres");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const addCasting = document.getElementById("add-casting-member");
    const addingCasting = document.getElementById("adding-casting");

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;

    Object.entries(directors).forEach(([uuid, completeName]) => {
        movieDirectors.append(
            new Option(completeName, uuid, false, false)
        );
    });

    $(movieDirectors).select2({
        placeholder: "Choisir un réalisateur…",
        allowClear: true
    });
    
    addDirector.addEventListener("click", () => {
        addDirector.style.display = "none";
        movieDirectors.style.display = "none";
        const wrapper = document.createElement("div");
        wrapper.classList.add("director-wrapper");

        const inputFirstname = document.createElement("input");
        inputFirstname.type = "text";
        inputFirstname.classList.add("input");
        inputFirstname.placeholder = "Prénom";
        inputFirstname.required = true;

        const inputLastname = document.createElement("input");
        inputLastname.type = "text";
        inputLastname.classList.add("input");
        inputLastname.placeholder = "Nom de famille";

        const inputBirth = document.createElement("input");
        inputBirth.type = "date";
        inputBirth.classList.add("input");

        const btnAdd = document.createElement("button");
        btnAdd.classList.add("button");
        btnAdd.textContent = "Ajouter";
        btnAdd.addEventListener("click", () => {
            addDirector.style.display = "block";
            movieDirectors.style.display = "block";
            wrapper.remove();
            alert("Réalisateur ajouté avec succès.");
        });

        const btnCancel = document.createElement("button");
        btnCancel.textContent = "Annuler";
        btnCancel.classList.add("button");
        btnCancel.addEventListener("click", () => {
            addDirector.style.display = "block";
            movieDirectors.style.display = "block";
            wrapper.remove();
        });

        wrapper.append(inputFirstname, inputLastname, inputBirth, btnAdd, btnCancel);
        addingDirector.appendChild(wrapper);
    });

    genres.forEach(genre => {
        movieGenres.append(
            new Option(genre, genre, false, false)
        );
    });

    $(movieGenres).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });

    addCasting.addEventListener("click", () => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("actor-wrapper");

        const inputCharacter = document.createElement("input");
        inputCharacter.type = "text";
        inputCharacter.classList.add("input");
        inputCharacter.placeholder = "Nom du personnage";
        inputCharacter.required = true;

        // INSÉRER ICI SELECT POUR PEOPLE = ACTOR

        const btnAdd = document.createElement("button");
        btnAdd.classList.add("button");
        btnAdd.textContent = "Ajouter un acteur";
        btnAdd.addEventListener("click", () => {
        });

        wrapper.append(inputCharacter, btnAdd, btnCancel);
        addingCasting.appendChild(wrapper);
    });
}

export async function completePeople(uuid) {
    const { data: p, error } = await supabase
        .from("people")
        .select("*")
        .eq("id", uuid)
        .single();
    
    if (error) {
        console.error(error);
        return;
    }

    const peopleName = document.getElementById("people-name");
    const peopleAge = document.getElementById("people-age");
    const peopleNationalities = document.getElementById("people-nationalities");
    const peopleJobs = document.getElementById("people-jobs");

    const completeName = `${p.firstname} ${p.lastname}`;
    const agePeople = p.deathdate === null ? calculateAge(p.birthdate) : "✝ " + calculateAge(p.birthdate, p.deathdate);

    peopleName.textContent = completeName;
    peopleAge.textContent = agePeople + " ans";

    for (const [code, name] of Object.entries(nationalities)) {
        peopleNationalities.append(new Option(name, code));
    }

    $(peopleNationalities).select2({
        placeholder: "Choisir une nationalité…",
        allowClear: true
    });

    for (const [code, name] of Object.entries(jobs)) {
        peopleJobs.append(new Option(name, code));
    }

    $(peopleJobs).select2({
        placeholder: "Choisir un métier…",
        allowClear: true
    });
}