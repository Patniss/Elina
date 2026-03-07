import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode } from "/Elina/js/services/seasons.service.js";
import { formatShowEpisode } from "/Elina/js/utils/format.js";

export async function addUserSeason(showId, nbSeason) {
    const userId = await getUserId();
    const seasonId = await getSeasonId(showId, nbSeason);

    const { data, error } = await supabase
        .from("users_seasons")
        .insert([{
            user_id: userId,
            season_id: seasonId,
            episodes_seen: 0
        }]).single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function getNextEpisode(uuid) {
    const currentSeason = await getCurrentSeason(uuid);
    const totalEpisodes = await getNbEpisode(uuid, currentSeason);
    if (currentSeason.episodes_seen !== totalEpisodes) {
        return formatShowEpisode(currentSeason, (currentSeason.episodes_seen+1))
    } else {
        return formatShowEpisode((currentSeason+1), 1);
    }
}

export async function getCurrentSeason(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*, seasons(*)")
        .eq("user_id", userId)
        .eq("show_id", uuid, { foreignTable: "seasons" })
        .order("season", { foreignTable: "seasons", ascending: false })
        .limit(1);

    if (error) {
        console.error(error);
        return;
    }

    if (data.length === 1) { return data; } else return null;
}