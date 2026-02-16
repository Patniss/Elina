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
    
    const btnAddDirector = document.getElementById("addDirector");

    const selectDirector1 = document.getElementById("director_1");
    const selectDirector2 = document.getElementById("director_2");
    const selectDirector3 = document.getElementById("director_3");

    const addDirector1 = document.getElementById("add_director_1");

    const divDirector1 = document.getElementById("divDirector_1");
    const divDirector2 = document.getElementById("divDirector_2");
    const divDirector3 = document.getElementById("divDirector_3");

    const selectNationalities1 = document.getElementById("nationalitiesDirector_1");
    const selectNationalities2 = document.getElementById("nationalitiesDirector_2");
    const selectNationalities3 = document.getElementById("nationalitiesDirector_3");

    const { data: movie, error: movieError } = await supabase
        .from("movies")
        .select("*")
        .eq("id", uuid)
        .single();
    
    if (movieError) {
        console.log("Erreur sur l'extraction Movie");
        return;
    }

    movieTitle.textContent = movie.title;

    const { data: people, error: peopleError } = await supabase
        .from("people")
        .select("*")
        .order("lastname", { ascending: true });

    if (peopleError) {
        console.log("Erreur sur l'extraction People");
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
    
    $(selectDirector1).select2({
        placeholder: "Réalisateur…",
        allowClear: true,
        tags: true,
        createTag: function (params) {
            const term = $.trim(params.term);
            if (term === "") {
                return null;
            }
            
            return {
                id: term,
                text: term,
                newTag: true
            };
        }
    });

    Object.entries(nationalities).forEach(([iso, country]) => {
        selectNationalities1.append(
            new Option(country, iso, false, false)
        );
        selectNationalities2.append(
            new Option(country, iso, false, false)
        );
        selectNationalities3.append(
            new Option(country, iso, false, false)
        );
    });

    $(selectNationalities1).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    })

    $(selectNationalities2).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    })

    $(selectNationalities3).select2({
        placeholder: "Nationalité(s)",
        allowClear: true
    })
    
    $(selectDirector1).on("select2:select", async function (e) {
        const data = e.params.data;
        const parts = data.text.trim().split(" ");
        const firstname = parts.length > 1 ? parts.slice(0, -1).join(" ") : null;
        const lastname = parts.length > 1 ? parts.slice(-1).join("") : parts[0];

        const inputFirstNameDirector1 = document.getElementById("firstNameDirector_1");
        const inputLastNameDirector1 = document.getElementById("lastNameDirector_1");
        const birthdateDirector1 = document.getElementById("birthdateDirector_1");
        const checkDeathDirector1 = document.getElementById("isDeadDirector_1");
        const deathdateDirector1 = document.getElementById("deathdateDirector_1");
        
        inputFirstNameDirector1.value = firstname;
        inputFirstNameDirector1.required = true;

        inputLastNameDirector1.value = lastname;
        inputLastNameDirector1.required = true;

        birthdateDirector1.required = true;

        checkDeathDirector1.addEventListener("change", () => {
            if (checkDeathDirector1.checked) {
                deathdateDirector1.style.display = "block";
                deathdateDirector1.required = true;
            } else {
                deathdateDirector1.style.display = "none";
                deathdateDirector1.required = false;
            }
        })

        if (data.newTag) {
            addDirector1.style.display = "block";
        } else {
            addDirector1.style.display = "none";
        }
    });

    btnAddDirector.addEventListener("click", () => {
        if (divDirector2.style.display === "none") {
            const divDirector2 = document.getElementById("divDirector_2");
            const deleteDirector2 = document.getElementById("delete_director_2");

            divDirector2.style.display = "block";

            deleteDirector2.addEventListener("click", () => {
                divDirector2.style.display = "none";
            });
        } else {
            const divDirector3 = document.getElementById("divDirector_3");
            const deleteDirector3 = document.getElementById("delete_director_3");
            const deleteDirector2 = document.getElementById("delete_director_2");
            
            divDirector3.style.display === "block";
            btnAddDirector.style.display = "none";
            deleteDirector2.style.display = "none";

            deleteDirector3.addEventListener("click", () => {
                divDirector3.style.display = "none";
                btnAddDirector.style.display = "block";
                deleteDirector2.style.display = "block";
            });
        }
    })
}