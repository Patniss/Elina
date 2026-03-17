import { getToseeMovies } from "/Elina/js/services/usersMovies.service.js";

export async function getRandomMovie(genres, platforms) {
    allToseeMovies = await getToseeMovies();
}