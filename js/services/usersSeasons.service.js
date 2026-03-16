import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode, getNbSeason, getTotalSeasons } from "/Elina/js/services/seasons.service.js";

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
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*, seasons!season_id(*)")
        .order("seasons.season", { ascending: false })
        .eq("user_id", userId)
        .eq("seasons.show_id", showId);

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

    const currentSeasonId = currentSeasonData.season_id;
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
        result = `S${season} E01`;
    } else {
        season = String(seasonNumber).padStart(2,'0');
        episode = String(seenEpisode + 1).padStart(2,'0');
        result = `S${season} E${episode}`;
    }

    return result;
}

export async function seeNextEpisode(uuid) {
    const userId = await getUserId();
    const currentSeasonData = await getCurrentSeason(uuid);
    const nbTotalSeasons = await getTotalSeasons(uuid);

    if (!currentSeasonData) return null;

    const currentSeasonId = currentSeasonData.season_id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    const seenEpisode = currentSeasonData.episodes_seen ?? 0;

    if (nbEpisodes === seenEpisode) {
        if (seasonNumber === nbTotalSeasons) return;

        const nextSeasonId = await getSeasonId(uuid, (seasonNumber + 1));
        console.log(nextSeasonId);

        const { data: testNewShows, error: errorTest } = await supabase
            .from("users_seasons")
            .select("*")
            .eq("user_id", userId)
            .eq("season_id", nextSeasonId)
            .maybeSingle();

        if (errorTest) {
            console.error(errorTest);
            return;
        };

        if (!testNewShows) {
            const { data, error } = await supabase
                .from("users_seasons")
                    .insert({
                    user_id: userId,
                    season_id: nextSeasonId,
                    episodes_seen: 1
                });

            if (error) {
                console.error(error);
                return;
            }
        }

    } else {
        const { data, error } = await supabase
            .from ("users_seasons")
            .update({ episodes_seen: (seenEpisode + 1) })
            .eq("user_id", userId)
            .eq("season_id", currentSeasonId)
            .single();

        if (error) {
            console.error(error);
            return;
        }
    }
}