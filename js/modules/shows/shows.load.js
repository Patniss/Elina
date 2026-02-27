import { supabase } from "/Elina/js/core/supabase.js";
import { getUserId } from "/Elina/js/services/profiles.service.js";
import { sortShows, filterShows } from "/Elina/js/modules/shows/shows.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapShowsWithStatus } from "/Elina/js/modules/usersShows/usersShows.status.js";

export async function loadAllShows(field, asc, filter) {
    const userId = await getUserId();

    let query = supabase.from("shows").select("*, users_shows(*)");
    query = sortShows(query, field, asc);
    query = filterShows(query, filter);

    const shows = await querySupabase(query);
    const showsWithStatus = mapShowsWithStatus(shows, userId);

    return showsWithStatus;
}