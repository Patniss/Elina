import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode, getNbSeason, getSeasonsOfShowDesc } from "/Elina/js/services/seasons.service.js";

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
    const seasonsData = await getSeasonsOfShowDesc(uuid)
    const seasons = seasonsData.map(season => season.id);

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*")
        .eq("user_id", userId)
        .in("season_id", seasons)
        .limit(1);
    
    if (error) {
        console.error(error);
        return;
    }

    return data?.[0];
}

export async function getNextEpisode(uuid) {
    const currentSeasonData = await getCurrentSeason(uuid);

    if (!currentSeasonData) return null;

    const currentSeasonId = currentSeasonData.id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const nbSeason = await getNbSeason(currentSeasonId);

    const seenEpisode = currentSeasonData.episodes_seen;

    let result = null;

    if (nbEpisodes === seenEpisode) {
        if ((nbSeason + 1) < 10) result = `S0${(nbSeason + 1)}E01`;
        else { result = `S${(nbSeason + 1)}E01` }
    } else {
        if (nbSeason < 10) {
            if ((seenEpisode + 1) < 10) result = `S0${(nbSeason)}E0${(seenEpisode + 1)}`;
            else { `S0${(nbSeason)}E${(seenEpisode + 1)}` }
        } else {
            if ((seenEpisode + 1) < 10) result = `S${(nbSeason)}E0${(seenEpisode + 1)}`;
            else { `S${(nbSeason)}E${(seenEpisode + 1)}` }
        }
    }

    return result;
}