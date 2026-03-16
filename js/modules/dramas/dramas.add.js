import { genres } from "/Elina/js/data/genres.js";
import { initGenres } from "/Elina/js/ui/select.js";

export async function addDrama() {
    const titleInput = document.getElementById("drama-title");
    const nbEpisodesInput = document.getElementById("drama-nb-episodes");
    const averageTimeInput = document.getElementById("drama-average-time");
    const genresInput = document.getElementById("drama-genres");
    const tagsInput = document.getElementById("drama-tags");
    const posterInput = document.getElementById("drama-poster");

    initGenres(genresInput, genres);
}