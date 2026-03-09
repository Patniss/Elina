import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode, getNbSeason, getSeasonsOfShowDesc, getTotalSeasons } from "/Elina/js/services/seasons.service.js";

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

export async function getCurrentSeason(uuid) {
    const userId = await getUserId();
    const seasonsData = await getSeasonsOfShowDesc(uuid);
    if (!seasonsData?.length) return null;

    const seasons = seasonsData.map(season => season.id);

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*, seasons(*)")
        .eq("user_id", userId)
        .in("season_id", seasons)
        .order("season", { foreignTable: "seasons", ascending: false })
        .limit(1);
    
    if (error) {
        console.error(error);
        return;
    }

    return data?.[0];
}

export async function getNextEpisode(uuid) {
    const currentSeasonData = await getCurrentSeason(uuid);
    const nbTotalSeasons = await getTotalSeasons(uuid);

    if (!currentSeasonData) return null;

    const currentSeasonId = currentSeasonData.id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    const seenEpisode = currentSeasonData.episodes_seen ?? 0;

    let season;
    let episode;
    let result = null;

    if (nbEpisodes === seenEpisode) {
        if (seasonNumber === nbTotalSeasons) {
            return "À jour";
        };
        season = String(seasonNumber + 1).padStart(2,'0');
        result = `S${season}E01`;
    } else {
        season = String(seasonNumber).padStart(2,'0');
        episode = String(seenEpisode + 1).padStart(2,'0');
        result = `S${season}E${episode}`;
    }

    return result;
}