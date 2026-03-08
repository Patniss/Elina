import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode } from "/Elina/js/services/seasons.service.js";

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

    const { data, error } = await supabase
        .from("users_seasons")
        .select("seasons!inner(id, season)")
        .eq("user_id", userId)
        .eq("seasons.show_id", uuid)
        .order("season", { foreignTable: "seasons", ascending: false })
        .limit(1);

    if (error) {
        console.error(error);
        return;
    }

    return data?.[0]?.seasons ?? null;
}

export async function getNextEpisode(uuid) {
    // const currentSeason = await getCurrentSeason(uuid);
    // console.log("currentSeason :", currentSeason);
    // const nbEpisodes = await getNbEpisode(currentSeason.id);
    // console.log("nbEpisodes :", console.log(nbEpisodes));

    // const { data, error } = await supabase
        // .from("users_seasons")
        // .select("episodes_seen")
        // .eq("id", currentSeason.id)
        // .single();

    // if (error) {
        // console.error(error);
        // return;
    // }

    let result = null;

    // if (data.episodes_seen === nbEpisodes) {
        // if ((currentSeason.season + 1) < 10) result = `S0${currentSeason.season + 1}E01`;
    // } else {
        // if ((data.episodes_seen + 1) < 10) {
            // result = `S${currentSeason.season}E0${data.episodes_seen + 1}`;
        // } else {
            // result = `S${currentSeason.season}E${data.episodes_seen + 1}`;
        // }
    // }

    return result;
}