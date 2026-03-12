import { supabase } from "/Elina/js/core/supabase.js";
import { sortShows, filterShows, sortUsersShows } from "/Elina/js/modules/shows/shows.layout.js";
import { mapShowsWithStatus } from "/Elina/js/modules/usersShows/usersShows.status.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { querySupabase } from "/Elina/js/services/service.js";

export async function loadAllShows(field, asc, filter) {
    let query = supabase.from("shows").select("*, users_shows(*)");
    query = sortShows(query, field, asc);
    query = filterShows(query, filter);

    const shows = await querySupabase(query);
    const showsWithStatus = await mapShowsWithStatus(shows);

    return showsWithStatus;
}

export async function loadCurrentShows(field, asc, filter) {
    const userId = await getUserId();

    let query = supabase
        .from("users_shows")
        .select("*, shows(*)")
        .eq("user_id", userId)
        .eq("user_state", "started");

    query = sortUsersShows(query, field, asc);
    query = filterShows(query, filter);

    const shows = await querySupabase(query);

    return shows;
}

export async function loadPausedShows(field, asc, filter) {
    const userId = await getUserId();

    let query = supabase
        .from("users_shows")
        .select("*, shows(*)")
        .eq("user_id", userId)
        .eq("user_state", "paused");

    query = sortUsersShows(query, field, asc);
    query = filter(query, filter);

    const shows = await querySupabase(query);

    return shows;
}