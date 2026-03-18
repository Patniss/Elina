import { getCurrentShows } from "/Elina/js/services/usersShows.service.js";
import { countEpisodesSeen } from "/Elina/js/services/usersSeasons.service.js";

export async function displayIndexShows() {
    const showsCurrent = document.getElementById("shows-current");
    const episodesSeen = document.getElementById("episodes-seen");

    const allCurrentShows = await getCurrentShows();
    showsCurrent.textContent = allCurrentShows.length;

    const sumEpisodesSeen = await countEpisodesSeen();
    episodesSeen.textContent = sumEpisodesSeen;
}