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
    const addCast = document.getElementById("add-cast");
    const addingCasts = document.getElementById("adding-casts");

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;

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
        selectDirector.classList.add("input");
        selectDirector.style.width = "100%";

        divSelectDirector.appendChild(selectDirector);

        Object.entries(directors).forEach(([idDirector, nameDirector]) => {
            selectDirector.append(
                new Option(nameDirector, idDirector)
            );
        });

        $(selectDirector).select2({
            placeholder: "Saisir un nom…",
            allowClear: true,
            tags: true,
            tokenSeparators: [',', ';'],
            createTag: function (params) {
                return {
                    id: params.term,
                    text: params.term,
                    newOption: true
                };
            }
        })

        $(selectDirector).on('select2:select', function(e) {
            const data = e.params.data;

            if (data.newOption) {
                wrapperCast.appendChild(wrapperAddDirector);
                
                fnAddDirector.value = data.text.split(" ")[0] || "";
                lnAddDirector.value = data.text.split(" ").slice(1).join(" ") || "";
            }
        });

        aClose.addEventListener("click", () => { wrapperCast.remove() });

        selectJob.addEventListener("change", () => {
            switch (selectJob.value) {
                case "director":
                    wrapperCast.appendChild(divSelectDirector);
                    const wrapperAddDirector = document.createElement("div");
                    wrapperAddDirector.classList.add("add-director-wrapper", "columns", "mt-2");

                    const fnAddDirector = document.createElement("input");
                    fnAddDirector.classList.add("input", "column", "mr-2");
                    fnAddDirector.type = "text";
                    fnAddDirector.style.height = "48px";
                    fnAddDirector.placeholder = "Prénom";

                    const lnAddDirector = document.createElement("input");
                    lnAddDirector.classList.add("input", "column", "mr-2");
                    lnAddDirector.type = "text";
                    lnAddDirector.style.height = "48px";
                    lnAddDirector.placeholder = "Nom de famille";
                    lnAddDirector.required = true;

                    const bdAddDirector = document.createElement("input");
                    bdAddDirector.classList.add("input", "column", "mr-2");
                    bdAddDirector.type = "date";
                    bdAddDirector.style.height = "48px";

                    const btnAddDirector = document.createElement("button");
                    btnAddDirector.classList.add("button", "column", "is-primary", "is-light");
                    btnAddDirector.textContent = "Ajouter";
                    btnAddDirector.type = "button";

                    btnAddDirector.addEventListener("click", async () => {
                        btnAddDirector.classList.add("is-loading");
                        const lastNameDirector = lnAddDirector.value;
                        const firstNameDirector = fnAddDirector.value;
                        const birthdateDirector = bdAddDirector;

                        const { data, error } = await supabase
                            .from("people")
                            .select("id, jobs")
                            .eq("lastname", lastNameDirector)
                            .eq("firstname", firstNameDirector);

                        if (data.length > 0) {
                            data.forEach(async item => {
                               jobsItem = item.jobs + " director";
                               try {
                                const { data: updatePeople, error } = await supabase
                                    .from("people")
                                    .update({"jobs": jobsItem})
                                    .eq("lastname", lastNameDirector)
                                    .eq("firstname", firstNameDirector);

                                setTimeout(() => {
                                    btnAddDirector.classList.remove("is-loading");
                                    btnAddDirector.classList.add("is-success");
                                    btnAddDirector.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajouté</span>`;
                                    setTimeout(() => {
                                        btnAddDirector.textContent = "Ajouter";
                                        btnAddDirector.classList.remove("is-success");
                                        btnAddDirector.classList.add("is-primary");
                                        wrapperAddDirector.remove();
                                    }, 250);
                                }, 250);

                               } catch (err) {
                                btnAddDirector.classList.remove("is-loading", "is-primary", "is-light");
                                btnAddDirector.classList.add("is-danger");
                                btnAddDirector.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
                                return;
                               }
                            });
                        } else {
                            jobAddDirector = "director";
                            statutAddDirector = false;
                            deathdateDirector = null;
                            try {
                                const { error } = await supabase
                                    .from("people")
                                    .insert([{ lastNameDirector, firstNameDirector, statutAddDirector, birthdateDirector,  deathdateDirector, jobAddDirector }]);

                                if (error) {
                                    btnAddDirector.classList.remove("is-loading", "is-primary", "is-light");
                                    btnAddDirector.classList.add("is-danger");
                                    btnAddDirector.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
                                    return;
                                }

                                setTimeout(() => {
                                    btnAddDirector.classList.remove("is-loading");
                                    btnAddDirector.classList.add("is-success");
                                    btnAddDirector.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajouté</span>`;
                                    setTimeout(() => {
                                        btnAddDirector.textContent = "Ajouter";
                                        btnAddDirector.classList.remove("is-success");
                                        btnAddDirector.classList.add("is-primary");
                                        wrapperAddDirector.remove();
                                    }, 250);
                                }, 250);

                            } catch (err) {
                                btnAddDirector.classList.remove("is-loading", "is-primary", "is-light");
                                btnAddDirector.classList.add("is-danger");
                                btnAddDirector.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
                                return;
                            }
                        }
                    })

                    wrapperAddDirector.append(fnAddDirector, lnAddDirector, bdAddDirector, btnAddDirector);

                    $(selectDirector).on("change", function () {
                        if (this.value === "0") {
                            wrapperCast.appendChild(wrapperAddDirector);
                        } else {
                            wrapperAddDirector.remove();
                        }
                    });
                    break;
            
                case "actor":
                    wrapperAddDirector.remove();
                    break;

                case "scriptwriter":
                    wrapperAddDirector.remove();
                    break;

                case "producer":
                    wrapperAddDirector.remove();
                    break;

                case "singer":
                    wrapperAddDirector.remove();
                    break;
            }
        });
    })
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