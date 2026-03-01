import { supabase } from "/Elina/js/core/supabase.js";

export async function getAllPeople() {
    const { data, error } = await supabase
        .from("people")
        .select("*")
        .order("lastname", { ascending: true });
    
    if (error) {
        console.log("Erreur sur l'extraction des people : " + error);
        return;
    }

    return data;
}