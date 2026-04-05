import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { updateCurrentShows, updateFinishedShows } from "/Elina/js/services/profilesData.service.js";

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