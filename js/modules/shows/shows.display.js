import { renderIndexCurrentShows } from "/Elina/js/modules/shows/shows.render.js";
import { getProfileData } from "/Elina/js/services/profilesData.service.js";
import { getCurrentShows } from "/Elina/js/services/usersShows.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexShows() {
    const profileData = await getProfileData();

    const showsFinished = document.getElementById("shows-finished");
    showsFinished.textContent = profileData.finished_shows;

    const showsCurrent = document.getElementById("shows-current");
    showsCurrent.textContent = profileData.current_shows;

    const episodesSeen = document.getElementById("episodes-seen");
    episodesSeen.textContent = profileData.episodes_seen;

    const totalTimeSeen = document.getElementById("total-time-seen");
    totalTimeSeen.textContent = formatTotalTime(profileData.time_shows_seen);

    const currentToseeEpisodes = document.getElementById("tosee-current");
    currentToseeEpisodes.textContent = profileData.episodes_tosee;

    const currentShows = await getCurrentShows();
    renderIndexCurrentShows(currentShows);
}