import { getCurrentShows } from "/Elina/js/services/usersShows.service.js";
import { countEpisodesSeen, getSeenTimeSeenEpisodes } from "/Elina/js/services/usersSeasons.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexShows() {
    const showsCurrent = document.getElementById("shows-current");
    const episodesSeen = document.getElementById("episodes-seen");
    const totalTimeSeen = document.getElementById("total-time-seen");

    const allCurrentShows = await getCurrentShows();
    showsCurrent.textContent = allCurrentShows.length;

    const sumEpisodesSeen = await countEpisodesSeen();
    episodesSeen.textContent = sumEpisodesSeen;

    const totalMinutesSeen = await getSeenTimeSeenEpisodes();
    totalTimeSeen.textContent = formatTotalTime(totalMinutesSeen);
}