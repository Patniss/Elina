import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";

export async function addUserShow(uuid) {
    const userId = getUserId();

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

export async function removeUserShow(uuid) {
    const userId = getUserId();

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

export async function pauseUserShow(uuid) {
    const userId = getUserId();

    const { data, error } = await supabase
        .from("uses_shows")
        .update({user_state: "paused"})
        .eq("user_id", userId)
        .eq("user_show", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}

export async function cancelUserShow(uuid) {
    const userId = getUserId();

    const { data, error } = await supabase
        .from("uses_shows")
        .update({user_state: "canceled"})
        .eq("user_id", userId)
        .eq("user_show", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }
}