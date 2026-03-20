import { supabase } from "/Elina/js/core/supabase.js";

export async function addDramaTag(idDrama, tag) {
    const { data, error } = await supabase
        .from("dramas_tags")
        .insert([{
            drama_id: idDrama,
            tag: tag
        }]).single().select("id");

    if (error) {
        console.error(error);
        return null;
    }

    return data.id;
}