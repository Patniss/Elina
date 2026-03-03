import { supabase } from "/Elina/js/core/supabase.js";

export async function addDirectorMovieCasting(movieId, peopleId) {
    const { data, error } = await supabase
        .from("movies_casting")
        .insert([{
            movie_id: movieId,
            people_id: peopleId,
            job: "director"
        }]).select().single();

    if (error) {
        console.log("Erreur sur l'ajout du réalisateur : " + error);
        return;
    }

    return data;
}

export async function addScriptwriterMovieCasting(movieId, peopleId) {
    const { data, error } = await supabase
        .from("movies_casting")
        .insert([{
            movie_id: movieId,
            people_id: peopleId,
            job: "scriptwriter"
        }]).select().single();

    if (error) {
        console.log("Erreur sur l'ajout du réalisateur : " + error);
        return;
    }

    return data;
}

export async function addActorMovieCasting(movieId, peopleId, role, typeRole, credit) {
    const { data, error } = await supabase
        .from("movies_casting")
        .insert([{
            movie_id: movieId,
            people_id: peopleId,
            role: role,
            type_role: typeRole,
            credit: credit,
            job: "director"
        }]).select().single();

    if (error) {
        console.log("Erreur sur l'ajout de l'acteur : " + error);
        return;
    }

    return data;
}

export async function deleteMovieCasting(id) {
    const { data, error } = await supabase
        .from("movies_casting")
        .delete()
        .eq("id", id)
        .single();

    if (error) {
        console.log("Erreur sur de la suppression du casting : " + error);
    }
}