import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function addUserShow(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .insert([{
            user_id: userId,
            show_id: uuid,
            user_state: "added"
        }]).select();

    if (error) {
        console.error(error);
        return;
    }
}

export async function cancelUserShow(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .update({user_state: "canceled"})
        .eq("user_id", userId)
        .eq("show_id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function deleteUserShow(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .delete()
        .eq("user_id", userId)
        .eq("show_id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function getCurrentShows() {
    const userId = getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .select("*")
        .eq("user_id", userId)
        .eq("user_state", "started");

    if (error) {
        console.error(error);
        return
    };

    return data;
}

export async function pauseUserShow(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .update({user_state: "paused"})
        .eq("user_id", userId)
        .eq("show_id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function startUserShow(uuid) {
    const userId = await getUserId();

    const { data, error } = await supabase
        .from("users_shows")
        .update({user_state: "started"})
        .eq("user_id", userId)
        .eq("show_id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}