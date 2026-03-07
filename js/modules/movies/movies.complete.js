import { getAllIncompleteMovies } from "/Elina/js/services/movies.service.js";

export async function displayAllIncompleteMovies() {
    const container = document.getElementById("list-incomplete-movies");
    const movies = await getAllIncompleteMovies();

    movies.forEach(async (movie) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/Elina/entertainment/movies/complete.html?id=${movie.id}`;
        link.textContent = movie.title;
        li.appendChild(link);
        container.appendChild(li);
    });
}

export async function completeMovie(params) {
    
}