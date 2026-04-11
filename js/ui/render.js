export function initCarousel(list, leftArrow, rightArrow, visibleCount = 5) {
    if (visibleCount % 2 === 0) {
        visibleCount += 1;
    }
    if (visibleCount > 7) {
        visibleCount = 7;
    }
    if (visibleCount < 0) {
        visibleCount = 1
    }

    const half = Math.floor(visibleCount / 2);

    const cards = document.querySelectorAll(`.card-carousel-${list}`);

    let currentIndex = 0;
    let isAnimating = false;
    
    function updateCarousel(newIndex) {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (newIndex + cards.length) % cards.length;
        
        cards.forEach((card, i) => {
            const offset = (i - currentIndex + cards.length) % cards.length;

            card.classList.remove(
                "center",
                "left-1",
                "left-2",
                "left-3",
                "right-1",
                "right-2",
                "right-3",
                "hidden"
            );

            if (offset === 0) {
                card.classList.add("center");
            } else if (offset <= half) {
                card.classList.add(`right-${offset}`);
            } else if (offset >= cards.length - half) {
                const pos = cards.length - offset;
                card.classList.add(`left-${pos}`);
            } else {
                card.classList.add("hidden");
            }
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }
    
    leftArrow.addEventListener("click", () => {
        updateCarousel(currentIndex - 1);
    });
    
    rightArrow.addEventListener("click", () => {
        updateCarousel(currentIndex + 1);
    });
    
    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            updateCarousel(i);
        });
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            updateCarousel(currentIndex - 1);
        } else if (e.key === "ArrowRight") {
            updateCarousel(currentIndex + 1);
        }
    });
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                updateCarousel(currentIndex + 1);
            } else {
                updateCarousel(currentIndex - 1);
            }
        }
    }
    
    updateCarousel(0);
}

export async function render(containerStore, store, list, element, createFunction, filteredMovies) {
    containerStore.innerHTML = "";

    const start = (store.currentPage[list] - 1) * store.pageSize;
    const end = start + store.pageSize;

    const pageArray = filteredMovies || store[element]?.[list] || [];
    const page = pageArray.slice(start, end);

    for (const el of page) {
        containerStore.appendChild(await createFunction(el));
    }

    const cards = containerStore.querySelectorAll(".movie-card");
    cards.forEach((card, index) => {
        card.classList.remove("fade-in-up");
        card.style.animationDelay = `${index * 70}ms`;
        card.classList.add("fade-in-up");
    });
}

export function renderGenres(container, genresString) {
    container.innerHTML = '';
    const genres = genresString.trim().split(" ; ");
    genres.forEach(g => {
        console.log(g);
        const genre = g.replace(["é", "è"], ["e", "e"]);
        console.log(genre);
        const spanGenre = document.createElement("span");
        spanGenre.classList.add("tag", "is-medium", genre.trim().toLowerCase(), "mr-2");
        spanGenre.textContent = genre;
        container.appendChild(spanGenre);
    })
}