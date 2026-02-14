import { supabase } from "/Elina/js/supabase.js";

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

async function loadDirectors() {
    const directors = {};
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
        directors[dir.id] = dir.firstname? `${dir.firstname} ${dir.lastname}`: dir.lastname;
    });

    return directors;
}

export async function completeMovie(uuid) {
    const directors = await loadDirectors();
    Object.values(directors);
    
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
    const movieGenres = document.getElementById("movie-genres");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const addCast = document.getElementById("add-cast");
    const addingCasts = document.getElementById("adding-casts");

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;

    genres.forEach(genre => {
        movieGenres.append(
            new Option(genre, genre, false, false)
        );
    });

    $(movieGenres).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });

    addCast.addEventListener("click", () => {
        const wrapperCast = document.createElement("div");
        wrapperCast.classList.add("cast-wrapper");
        wrapperCast.classList.add("mb-4");

        const aClose = document.createElement("a");
        aClose.classList.add("tag");
        aClose.classList.add("is-delete");
        aClose.classList.add("mr-2");

        const divSelectJob = document.createElement("div");
        divSelectJob.classList.add("select");
        divSelectJob.classList.add("mr-2");

        const selectJob = document.createElement("select");

        const optBase = document.createElement("option");
        optBase.textContent = "Choisir un métier…";
        optBase.disabled = true;
        optBase.selected = true;

        const optDirector = document.createElement("option");
        optDirector.textContent = "Réalisateur";
        optDirector.value = "director";

        const optActor = document.createElement("option");
        optActor.textContent = "Acteur";
        optActor.value = "actor";

        const optScriptwriter = document.createElement("option");
        optScriptwriter.textContent = "Scénariste";
        optScriptwriter.value = "scriptwriter";

        const optProducer = document.createElement("option");
        optProducer.textContent = "Producteur";
        optProducer.value = "producer";

        const optSinger = document.createElement("option");
        optSinger.textContent = "Interprète";
        optSinger.value = "singer";

        selectJob.append(optBase, optDirector, optActor, optScriptwriter, optProducer, optSinger);
        divSelectJob.appendChild(selectJob);
        wrapperCast.append(aClose, divSelectJob);
        addingCasts.appendChild(wrapperCast);

        const divSelectDirector = document.createElement("div");
        divSelectDirector.classList.add("select");
        divSelectDirector.classList.add("mr-2");

        const selectDirector = document.createElement("select");

        const optAddDirector = document.createElement("option");
        optAddDirector.value = "0";
        optAddDirector.textContent = "Ajouter…";

        divSelectDirector.appendChild(selectDirector);

        Object.entries(directors).forEach(([idDirector, nameDirector]) => {
            selectDirector.append(
                new Option(nameDirector, idDirector)
            );
        });

        selectDirector.appendChild(optAddDirector);

        $(selectDirector).select2({
            placeholder: "Saisir un nom…",
            allowClear: true
        })

        aClose.addEventListener("click", () => { wrapperCast.remove() });
        selectJob.addEventListener("change", () => {
            switch (selectJob.value) {
                case "director":
                    wrapperCast.appendChild(divSelectDirector);
                    const wrapperAddDirector = document.createElement("div");
                    wrapperAddDirector.classList.add("add-director-wrapper");
                    wrapperAddDirector.classList.add("columns");
                    wrapperAddDirector.classList.add("is-2");

                    const fnAddDirector = document.createElement("input");
                    fnAddDirector.classList.add("input");
                    fnAddDirector.classList.add("column");
                    fnAddDirector.type = "text";
                    fnAddDirector.placeholder = "Prénom";

                    const lnAddDirector = document.createElement("input");
                    lnAddDirector.classList.add("input");
                    lnAddDirector.classList.add("column");
                    lnAddDirector.type = "text";
                    lnAddDirector.placeholder = "Nom de famille";

                    const btnAddDirector = document.createElement("button");
                    btnAddDirector.classList.add("button");
                    btnAddDirector.classList.add("column");
                    btnAddDirector.textContent = "Ajouter";

                    wrapperAddDirector.append(fnAddDirector, lnAddDirector, btnAddDirector);

                    selectDirector.addEventListener("change", () => {
                        if (selectDirector.value === "0") {
                            wrapperCast.appendChild(wrapperAddDirector);
                        } else {
                            wrapperCast.removeChild(wrapperAddDirector);
                        }
                    })
                    break;
            
                case "actor":
                    console.log("change is actor")
                    break;

                case "scriptwriter":
                    console.log("change is swriptwriter")
                    break;

                case "producer":
                    console.log("change is producer")
                    break;

                case "singer":
                    console.log("change is singer")
                    break;
            }
        });
    })
}

export async function completeMovieBase(uuid) {
    const directors = await loadDirectors();

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
    const movieGenres = document.getElementById("movie-genres");
    const movieSynopsis = document.getElementById("movie-synopsis");
    const addCast = document.getElementById("add-cast");
    const addingCasts = document.getElementById("adding-casts");

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;

    genres.forEach(genre => {
        movieGenres.append(
            new Option(genre, genre, false, false)
        );
    });

    $(movieGenres).select2({
        placeholder: "Choisir un genre…",
        allowClear: true
    });

    addCast.addEventListener("click", () => {
        const wrapper = document.createElement("div");
        wrapper.classList.add("casting-wrapper");

        const cancelJob = document.createElement("button");
        cancelJob.classList.add("modal-close");

        const labelJob = document.createElement("label");
        labelJob.classList.add("label");
        labelJob.textContent = "Choisir le métier :";

        const divJob = document.createElement("div");
        divJob.classList.add("select");

        const selectJob = document.createElement("select");

        const optBase = document.createElement("option");
        optBase.textContent = "Choisir un métier…";
        
        const optDirector = document.createElement("option");
        optDirector.value = "director";
        optDirector.textContent = "Réalisateur";

        const optActor = document.createElement("option");
        optActor.value = "actor";
        optActor.textContent = "Acteur";

        const optScriptwriter = document.createElement("option");
        optScriptwriter.value = "scriptwriter";
        optScriptwriter.textContent = "Scénariste";

        const optProducer = document.createElement("option");
        optProducer.value = "producer";
        optProducer.textContent = "Producteur";

        const optSinger = document.createElement("option");
        optSinger.value = "singer";
        optSinger.textContent = "Interpète";

        selectJob.append(optBase, optDirector, optActor, optScriptwriter, optProducer, optSinger);
        divJob.append(labelJob, selectJob);
        wrapper.appendChild(divJob);
        addingCasts.appendChild(wrapper);

        cancelJob.addEventListener("click", () => {
            wrapper.remove();
        })

        selectJob.addEventListener("change", () => {
            switch (selectJob.value) {
                case "director":
                    const wrapperDirector = document.createElement("div");
                    wrapperDirector.classList.add("casting-director-wrapper");
                    wrapperDirector.classList.add("field");
                    
                    const divDirector = document.createElement("div");
                    
                    const labelDirector = document.createElement("label");
                    labelDirector.classList.add("label");
                    labelDirector.textContent = "Choisir un réalisateur";

                    const divSelectDirectors = document.createElement("div");
                    divSelectDirectors.classList.add("select");
                    divSelectDirectors.classList.add("is-multiple");
                    
                    const selectDirectors = document.createElement("select")

                    directors.forEach(director => {
                        const optSelectDirector = document.createElement("option");
                        optSelectDirector.value = director.value;
                        optSelectDirector.textContent = director;
                        
                        selectDirectors.appendChild(optSelectDirector);
                    });

                    divSelectDirectors.appendChild(selectDirectors);
                    divDirector.append(labelDirector, divSelectDirectors);
                    wrapperDirector.appendChild(divDirector);
                    break;
            
                default:
                    break;
            }
        })

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