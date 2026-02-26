export function sortMovies(query, field, asc) {
    switch (field) {
        case "year":
            query = query
                .order("year", { ascending: asc })
                .order("title", { ascending: true });
            break;

        case "title":
            query = query.order("title", { ascending: asc })
            break;

        case "date":
            query = query.order("title", { ascending: asc })
            break;

        default:
            query = query.order("title", { ascending: asc })
            break;
    }

    return query;
}

export function filterMovies(query, genre) {
    if (genre) {
        query = query.ilike("genres", `%${genre}%`);
    }

    return query;
}

export function renderPagination({containerId, currentPage, setCurrentPage, totalItems}) {
  const pagination = document.getElementById(containerId);
  pagination.innerHTML = "";

  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages <= 1) return;

  const delta = 2; // nombre de pages autour de la page active

  // --- Fonction utilitaire pour créer un bouton page
  function createPageButton(page, text = page, isCurrent = false) {
    const li = document.createElement("li");
    const btn = document.createElement("a");

    btn.href = "#";
    btn.classList.add("pagination-link");
    btn.textContent = text;

    if (isCurrent) btn.classList.add("is-current");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentPage(page);
      renderMovies();
    });

    li.appendChild(btn);
    return li;
  }

  // --- Bouton précédent
  const prevBtn = document.createElement("a");
  prevBtn.href = "#";
  prevBtn.classList.add("pagination-previous");
  prevBtn.textContent = "Précédent";

  if (currentPage === 1) {
    prevBtn.classList.add("is-disabled");
  } else {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentPage(currentPage - 1);
      renderMovies();
    });
  }

  pagination.appendChild(prevBtn);

  // --- Liste des pages
  const pageList = document.createElement("ul");
  pageList.classList.add("pagination-list");

  const start = Math.max(1, currentPage - delta);
  const end = Math.min(totalPages, currentPage + delta);

  // --- Première page + ...
  if (start > 1) {
    pageList.appendChild(createPageButton(1));

    if (start > 2) {
      const ellipsis = document.createElement("span");
      ellipsis.classList.add("pagination-ellipsis");
      ellipsis.textContent = "…";
      pageList.appendChild(ellipsis);
    }
  }

  // --- Pages autour de la page active
  for (let i = start; i <= end; i++) {
    pageList.appendChild(
      createPageButton(i, i, i === currentPage)
    );
  }

  // --- ... + dernière page
  if (end < totalPages) {
    if (end < totalPages - 1) {
      const ellipsis = document.createElement("span");
      ellipsis.classList.add("pagination-ellipsis");
      ellipsis.textContent = "…";
      pageList.appendChild(ellipsis);
    }

    pageList.appendChild(createPageButton(totalPages));
  }

  pagination.appendChild(pageList);

  // --- Bouton suivant
  const nextBtn = document.createElement("a");
  nextBtn.href = "#";
  nextBtn.classList.add("pagination-next");
  nextBtn.textContent = "Suivant";

  if (currentPage === totalPages) {
    nextBtn.classList.add("is-disabled");
  } else {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      setCurrentPage(currentPage + 1);
      renderMovies();
    });
  }

  pagination.appendChild(nextBtn);
}

export function renderPaginationAll(totalItems) {
  renderPagination({
    containerId: "pagination_nb",
    currentPage: currentPageAll,
    setCurrentPage: (page) => currentPageAll = page,
    totalItems
  });
}