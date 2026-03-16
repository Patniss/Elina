import { supabase } from "/Elina/js/core/supabase.js";

export async function addTag(tag, color) {
    if (!color) color = null;

    const { error } = await supabase
        .from("tags")
        .insert([{
            tag: tag,
            color: color
        }]);

    if (error) {
        console.error;
    }
}

export async function getAllTags() {
    const { data, error } = await supabase
        .from("tags")
        .select("*")
        .order("tag", { ascending: true });
    
    if (error) {
        console.error(error);
        return;
    }

    return data;
}