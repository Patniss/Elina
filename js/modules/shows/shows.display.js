import { getProfileData } from "/Elina/js/services/profilesData.service.js";
import { getCurrentShows } from "/Elina/js/services/usersShows.service.js";
import { formatTotalTime } from "/Elina/js/utils/format.js";

export async function displayIndexShows() {
    const showsCurrent = document.getElementById("shows-current");
    const episodesSeen = document.getElementById("episodes-seen");
    const totalTimeSeen = document.getElementById("total-time-seen");
    const currentToseeEpisodes = document.getElementById("tosee-current");

    const profileData = await getProfileData();
    console.log(profileData);

    showsCurrent.textContent = profileData.current_shows;
    episodesSeen.textContent = profileData.episodes_seen;
    totalTimeSeen.textContent = formatTotalTime(profileData.time_shows_seen);
    currentToseeEpisodes.textContent = profileData.epsiodes_tosee;

    const currentShowsDisplay = document.getElementById("current-shows");

    const currentShows = await getCurrentShows;
    console.log(currentShows);
}