export function renderPagination(containerId, currentPage, totalItems, pageSize, setCurrentPage, onPageChange) {
    const container = document.getElementById(containerId);
    const delta = 2;

    container.innerHTML = "";
    console.log(container);

    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return;

    function createPageButton(page, text = page, isCurrent = false) {
        const li = document.createElement("li");
        const btn = document.createElement("a");

        btn.href = "#";
        btn.classList.add("pagination-link");
        btn.textContent = text;

        if (isCurrent) btn.classList.add("is-current");

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            setCurrentPage(list, page);
            onPageChange();
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
            onPageChange();
        });
    };
    
    container.appendChild(prevBtn);

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
            onPageChange();
        });
    }

    container.appendChild(nextBtn);

    // --- Boutons pages
    const pageList = document.createElement("ul");
    pageList.classList.add("pagination-list");
    const start = Math.max(1, currentPage - delta);
    const end =  Math.min(totalPages, currentPage + delta);

    if (start > 1) {
        pageList.appendChild(createPageButton(1));

        if (start > 2) {
            const ellipsis = document.createElement("span");
            ellipsis.classList.add("pagination-ellipsis");
            ellipsis.textContent = "…";
            pageList.appendChild(ellipsis);
        }
    }

    for (let i = start; i <= end; i++) {
        pageList.appendChild(createPageButton(i, i, i === currentPage));
    }

    if (end < totalPages) {
        if (end < totalPages - 1) {
            const ellipsis = document.createElement("span");
            ellipsis.classList.add("pagination-ellipsis");
            ellipsis.textContent = "…";
            pageList.appendChild(ellipsis);
        }

        pageList.appendChild(createPageButton(totalPages));
    }

    container.appendChild(pageList);
}