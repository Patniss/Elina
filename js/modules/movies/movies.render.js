async function renderAllMovies(movies, currentPage, pageSize) {
    const container = document.getElementById("list-all-movies");
    container.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageMovies = movies.slice(start, end);

    for (const movie of pageMovies) {
        container.appendChild(await createMovieCard(movie));
    }
}