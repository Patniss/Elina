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

export async function addPeople(firstname, lastname) {
    const { data, error } = await supabase
        .from("people")
        .insert([{
            firstname: firstname,
            lastname: lastname
        }]).select("id").single();

    if (error) {
        console.log("Erreur sur l'ajout d'un people : " + error);
        return;
    }

    return data;
}

export async function deletePeople(id) {
    const { data, error } = await supabase
        .from("people")
        .delete()
        .eq("id", id)
        .single();

    if (error) {
        console.log("Erreur lors de la suppression du people : " + error);
        return;
    }
}

export async function getPeople(uuid) {
    const { data, error } = await supabase
        .from("people")
        .select("firstname, lastname")
        .eq("id", uuid)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    return data
}