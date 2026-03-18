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

export async function seeNextEpisode(showId) {
    const userId = await getUserId();
    const currentSeasonData = await getCurrentSeason(showId);
    if (!currentSeasonData) return null;

    const nbTotalSeasons = await getTotalSeasons(showId);

    const currentSeasonId = currentSeasonData.season_id;
    const seenEpisode = currentSeasonData.episodes_seen;

    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    if (seenEpisode === nbEpisodes) {
        if (nbTotalSeasons === seasonNumber) {
            console.log("Pas de maj - à jour");
            return;
        } else {
            addUserSeason(showId, (seasonNumber + 1));
        }
    } else {
        console.log(currentSeasonId);
        const { error } = await supabase
            .from("users_seasons")
            .update("episodes_seen", (seenEpisode + 1))
            .eq("user_id", userId)
            .eq("season_id", currentSeasonId)
            .single();

        if (error) {
            console.error(error);
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