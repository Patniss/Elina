import { supabase } from "/Elina/js/core/supabase.js";
import { sortShows, filterShows } from "/Elina/js/modules/shows/shows.layout.js";
import { querySupabase } from "/Elina/js/services/service.js";
import { mapShowsWithStatus } from "/Elina/js/modules/usersShows/usersShows.status.js";

export async function loadAllShows(field, asc, filter) {
    let query = supabase.from("shows").select("*, users_shows(*)");
    query = sortShows(query, field, asc);
    query = filterShows(query, filter);

    const shows = await querySupabase(query);
    const showsWithStatus = await mapShowsWithStatus(shows);

    return showsWithStatus;
}