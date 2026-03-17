import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode, getNbSeason, getTotalSeasons, getSeasonsOfShow } from "/Elina/js/services/seasons.service.js";

export async function addUserSeason(showId, nbSeason) {
    const userId = await getUserId();
    const seasonId = await getSeasonId(showId, nbSeason);

    const { data, error } = await supabase
        .from("users_seasons")
        .insert([{
            user_id: userId,
            season_id: seasonId,
            episodes_seen: 1
        }]).single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function getCurrentSeason(showId) {
    const allListSeasons = await getUsersSeasons(showId);

    if (!allListSeasons || allListSeasons.length === 0) {
        return null
    }

    const currentSeason = allListSeasons.sort((a, b) => b.seasons.season = a.seasons.seasons)[0];

    return currentSeason;
}

export async function getNextEpisode(showId) {
    const currentSeasonData = await getCurrentSeason(showId);
    if (!currentSeasonData) return null;
    
    const nbTotalSeasons = await getTotalSeasons(showId);

    const currentSeasonId = currentSeasonData.season_id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    const seenEpisode = currentSeasonData.episodes_seen ?? 0;

    let season;
    let episode;
    let result = null;

    console.log("total episodes:", nbEpisodes);
    console.log("episodes vus:", seenEpisode);

    if (parseInt(nbEpisodes) === parseInt(seenEpisode)) {
        if (parseInt(seasonNumber) === parseInt(nbTotalSeasons)) {
            return "À jour";
        };
        season = String(seasonNumber + 1).padStart(2,'0');
        result = `S${season} E01`;
    } else {
        season = String(seasonNumber).padStart(2,'0');
        episode = String(seenEpisode + 1).padStart(2,'0');
        result = `S${season} E${episode}`;
    }

    return result;
}

export async function seeNextEpisode(uuid) {
    const currentSeasonData = await getCurrentSeason(uuid);
    const nbTotalSeasons = await getTotalSeasons(uuid);

    if (!currentSeasonData) return null;
    const currentSeasonId = currentSeasonData.season_id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);

    const currentEpisode = currentSeasonData.episodes_seen;

    console.log("épisode en cours", currentEpisode);
    console.log("total episodes", nbEpisodes);
    
    if (currentEpisode === nbEpisodes) {
        console.log("Ajouter une saison");
    } else {
        const { error } = await supabase
            .from("users_seasons")
            .update("episode_seen", (currentEpisode + 1))
            .eq("season_id", currentSeasonId)
            .single();

        if (error) {
            console.error(error);
            return;
        }
    }
}

export async function getUsersSeasons(showId) {
    const userId = await getUserId();
    const allSeasonsId = await getSeasonsOfShow(showId);

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*, seasons(*)")
        .eq("user_id", userId)
        .in("season_id", allSeasonsId);

    if (error) {
        console.error(error);
    }

    return data || [];
}