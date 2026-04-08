import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { updateCurrentShows, updateFinishedShows } from "/Elina/js/services/profilesData.service.js";
import { getSeasonData } from "/Elina/js/services/seasons.service.js";

export async function addUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .insert([{
            user_id: userId,
            show_id: showId,
            user_state: "added"
        }]).select();

    if (error) {
        console.error(error);
        return;
    }
}

export async function cancelUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .update({user_state: "canceled"})
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    await updateCurrentShows(-1);
}

export async function deleteUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .delete()
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function finishUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .update({user_state: "finished"})
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    await updateCurrentShows(-1);
    await updateFinishedShows();
}

export async function getCurrentShows() {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .select("*, shows(*)")
        .eq("user_id", userId)
        .eq("user_state", "started");

    if (error) {
        console.error(error);
        return
    };

    return data;
}

export async function getNextEpisode(showId) {
    console.log(showId);
    const userShow = await getUserShow(showId);
    if (!userShow) return null;
    console.log(userShow);
    
    const nbTotalSeasons = userShow.shows.nb_seasons;

    const currentSeason = await getSeasonData(showId, userShow.current_season);
    const lastEpCurrentSeason = userShow.last_ep ?? 0;
    
    let season;
    let episode;
    let result = null;

    if (currentSeason.nb_episodes === lastEpCurrentSeason) {
        if (nbTotalSeasons === userShow.currentSeason) {
            result = "À jour";
        } else {
            season = String(userShow.current_season + 1).padStart(2, '0');
            result = `${season} E01`;
        }
    } else {
        season = String(userShow.current_season).padStart(2, '0');
        episode = String(userShow.last_ep + 1).padStart(2, '0');
        result = `S${season} E${episode}`;
    }

    console.log("fin get next ep exécuté")

    return result;
}

export async function getUserShow(showId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .select("*, shows(*)")
        .eq("user_id", userId)
        .eq("show_id", showId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    return data;
}


export async function getUserShowStatus(showId) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .select("user_state")
        .eq("user_id", userId)
        .eq("show_id", showId)
        .maybeSingle();

    if (error) {
        console.error(error);
        return null;
    }

    return data?.seen || null;
}

export async function pauseUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .update({user_state: "paused"})
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
    
    await updateCurrentShows(-1);
}

export async function startUserShow(showId) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .update({
            user_state: "started",
            current_season: 1,
            last_ep: 1
        })
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    await updateCurrentShows();
}

export async function updateCurrentSeasonsEp(showId, season, ep) {
    const userId = await getUserId();

    const { error } = await supabase
        .from("users_shows")
        .update({
            current_season: season,
            last_ep: ep
        })
        .eq("user_id", userId)
        .eq("show_id", showId)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}