import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { getSeasonId, getNbEpisode, getNbSeason, getTotalSeasons, getSeasonsOfShow } from "/Elina/js/services/seasons.service.js";
import { getShow, getShowId } from "/Elina/js/services/shows.service.js";
import { getCurrentShows, finishUserShow } from "/Elina/js/services/usersShows.service.js";

export async function addUserSeason(showId, nbSeason) {
    const userId = await getUserId();
    const seasonId = await getSeasonId(showId, nbSeason);

    const { error } = await supabase
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

export async function countEpisodesSeen() {
    const userId = await getUserId();

    const { count, error } = await supabase
        .from("users_seasons")
        .select("episodes_seen", { count: "exact", head: true })
        .eq("user_id", userId);
    
    if (error) {
        console.error(error);
        return 0;
    }

    return count;
}

export async function getAllUsersSeasons() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_seasons")
        .select("*, seasons(*)")
        .eq("user_id", userId);

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}

export async function getCurrentSeason(showId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_seasons")
        .select(`id, episodes_seen, season:season_id (id, season, nb_episodes, show: show_id (id))`)
        .eq("user_id", userId)
        .order("season(season)", { ascending: false });

    if (error) {
        console.error(error);
        return null;
    }

    const currentSeason = data.find(us => us.season.show.id === showId && us.episodes_seen > 0);

    return currentSeason || null;
}

export async function getNextEpisode(showId) {
    const show = await getShow(showId);
    const currentSeasonData = await getCurrentSeason(showId);
    if (!currentSeasonData) return null;
    
    const nbTotalSeasons = await getTotalSeasons(showId);

    const currentSeasonId = currentSeasonData.season.id;
    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    const seenEpisode = currentSeasonData.episodes_seen ?? 0;

    let season;
    let episode;
    let result = null;

    if (parseInt(nbEpisodes) === parseInt(seenEpisode)) {
        if (parseInt(seasonNumber) === parseInt(nbTotalSeasons)) {
            if (show.state === "finish") {
                return "Terminée";
            } else {
                return "À jour";
            }
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

export async function getSeenEpSeason(seasonId) {
    const userId = await getUserId();
    
    const { data, error } = await supabase
        .from("users_seasons")
        .select("episodes_seen")
        .eq("user_id", userId)
        .eq("season_id", seasonId)
        .single();

    if (error) {
        console.error(error);
        return 0;
    }

    return data.episodes_seen;
}

export async function getTotalTimeSeenEpisodes() {
    const allSeasons = await getAllUsersSeasons();
    let totalTime = 0;

    for (const season of allSeasons) {
        const showId = await getShowId(season.season_id);
        const show = await getShow(showId);

        totalTime += (season.episodes_seen) * (show.average_min);
    }

    return totalTime;
}

export async function getTotalToseeEpisodes() {
    const currentShows = await getCurrentShows();

    let episodesTosee = 0;

    for (const show of currentShows) {
        const seasonsShow = await getSeasonsOfShow(show.show_id);
        console.log(seasonsShow);

        for (const season of seasonsShow) {
            console.log(season);
            const seenEpisode = await getSeenEpSeason(season);
            console.log(seenEpisode);
            const nbEpisodes = await getNbEpisode(season);
            console.log(nbEpisodes);
            episodesTosee += nbEpisodes - seenEpisode;
            console.log(episodesTosee);
        }
    }

    return episodesTosee;
}

export async function getUserSeasonId(seasonId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_seasons")
        .select("id")
        .eq("user_id", userId)
        .eq("season_id", seasonId)
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    return data.id;
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

export async function seeNextEpisode(showId) {
    const currentSeasonData = await getCurrentSeason(showId);
    if (!currentSeasonData) return null;

    const nbTotalSeasons = await getTotalSeasons(showId);

    const currentSeasonId = currentSeasonData.season.id;
    const seenEpisode = currentSeasonData.episodes_seen;

    const nbEpisodes = await getNbEpisode(currentSeasonId);
    const seasonNumber = await getNbSeason(currentSeasonId);

    if (seenEpisode === nbEpisodes) {
        if (nbTotalSeasons === seasonNumber) {
            console.log("Pas de maj - à jour");
            return;
        } else {
            addUserSeason(showId, (parseInt(seasonNumber) + 1));
        }
    } else {
        const nextEpisode = parseInt(seenEpisode) + 1;
        const userSeasonId = await getUserSeasonId(currentSeasonId);
        await updateSeeEp(userSeasonId, nextEpisode);
        const lastSeasonId = getSeasonId(showId, nbTotalSeasons);
        console.log(lastSeasonId);
        const lastEpisode = getNbEpisode(lastSeasonId);
        console.log(lastEpisode);
        if ((nbTotalSeasons === seasonNumber) && (nextEpisode === lastEpisode)) {
            await finishUserShow(showId);
        }
    }
}

export async function updateSeeEp(uuid, episode) {
    const { error } = await supabase
        .from("users_seasons")
        .update({ "episodes_seen": episode })
        .eq("id", uuid)
        .single();
    
    if (error) {
        console.error(error);
        return;
    };
}