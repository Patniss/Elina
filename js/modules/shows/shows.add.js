export async function addShow() {

  // Récupération des éléments du formulaire
  const showForm = document.getElementById("show-form");
  const showGenres = document.getElementById("show-genres");
  const titleInput = document.getElementById("show-title");
  const searchResult = document.getElementById("research-results");
  const showState = document.getElementById("show-state");
  const showNbSeasons = document.getElementById("show-nb-seasons");
  const showSubmit = document.getElementById("show-submit");
  const averageTimeInput = document.getElementById("show-time");
  const showLogo = document.getElementById("show-logo");
  
  // Remplissage dynamique des genres
  genres.forEach(genre => {
      showGenres.append(
          new Option(genre, genre, false, false)
      );
  });

  // Activation Select2
  $(showGenres).select2({
      placeholder: "Choisir un genre…",
      allowClear: true
  });

  let searchTimeout;

  // Recherche automatique sur le titre
  $(titleInput).on("input", function () {

    clearTimeout(searchTimeout);

    const query = $(this).val().trim();

    if (query.length < 2) {
      $(searchResult).hide().empty();
      return;
    };

    searchTimeout = setTimeout(async () => {
      
      // Recherche dans la table shows
      const { data, error } = await supabase
        .from("shows")
        .select("id, title")
        .ilike("title", `%${query}%`)
        .order("title", { ascending: true })
        .limit(5);

      if (error) {
        console.error(error);
        return;
      }
      
      searchResult.innerHTML = "";
      
      // Création des résultats
      data.forEach(show => {
        const item = document.createElement("div");
        item.textContent = show.title;
        item.classList.add("search-item");
        
        item.addEventListener("click", () => {
          titleInput.value = show.title;
          searchResult.innerHTML = "";
        });
        
        searchResult.appendChild(item);
      });
      
      // Affichage conditionnel
      if (data.length === 0) {
        searchResult.style.display = "none";
      } else {
        searchResult.style.display = "block";
      }
    
    }, 100);
  
  });

  // Soumission du formulaire série
  showForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const titleShow = titleInput.value;

    let selectedGenres = $(showGenres).val();
    let genresShow = selectedGenres.join(" ; ");

    const averageTimeShow = averageTimeInput.value;
    const stateShow = showState.value;
    const completeShow = false;
    const nbSeasonsShow = showNbSeasons.value;
    const logoShow = showLogo.value;

    showSubmit.classList.add("is-loading");

    setTimeout(async () => {
      try {

        // Insertion en base
        const { data, error } = await supabase
          .from("shows")
          .insert([{ 
            title: titleShow, 
            genres: genresShow, 
            average_min: averageTimeShow, 
            state: stateShow, 
            complete: completeShow, 
            nb_seasons: nbSeasonsShow,
            logo: logoShow
          }]);

        // Gestion erreur insertion
        if (error) {
          setTimeout(() => {
            showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
            showSubmit.classList.remove("is-primary", "is-loading");
            showSubmit.classList.add("is-danger");
          }, 500);
        }

        // Animation succès
        showSubmit.classList.remove("is-loading");
        showSubmit.innerHTML = `<span class="icon"><i class="fa-solid fa-check"></i></span><span>Ajoutée</span>`;

        setTimeout(() => {
          setTimeout(() => {
            showSubmit.textContent = "Ajouter la série";
            showSubmit.classList.add("is-loading");
          }, 200);
          
          showSubmit.classList.remove("is-loading");
          showForm.reset();
          titleInput.focus();
        }, 200);

      } catch (err) {

        // Gestion erreur exception
        setTimeout(() => {
          showSubmit.innerHTML = `<span class="icon"><i class="fas fa-xmark"></i></span><span>Erreur</span>`;
          showSubmit.classList.remove("is-primary", "is-loading");
          showSubmit.classList.add("is-danger");
        }, 500);
      }
    }, 500);
  });
}