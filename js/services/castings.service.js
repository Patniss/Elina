import { supabase } from "/Elina/js/core/supabase.js";

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

export async function addMovieCasting(movieId, peopleId, cast) {
    const { data, error } = await supabase
        .from("movies_casting")
        .insert([{
            movie_id: movieId,
            people_id: peopleId,
            job: cast
        }]).select().single();

    if (error) {
        console.log("Erreur sur l'ajout du casting: " + error);
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

export async function deleteMovieCasting(id) {
    const { data, error } = await supabase
        .from("movies_casting")
        .delete()
        .eq("id", id)
        .single();

    if (error) {
        console.log("Erreur sur de la suppression du casting : ", error);
    }
}

export async function getActorsMovies(uuid) {
    const { data, error } = await supabase
        .from("movies_casting")
        .select("*")
        .eq("movie_id", uuid)
        .eq("job", "actor");

    if (error) {
        console.error("Erreur lors de l'extraction des réalisateurs : ", error)
    }

    return data
}

export async function getDirectorsMovie(uuid) {
    const { data, error } = await supabase
        .from("movies_casting")
        .select("people_id")
        .eq("movie_id", uuid)
        .eq("job", "director");

    if (error) {
        console.error("Erreur lors de l'extraction des réalisateurs : ", error)
    }

    return data
}

export async function getScriptwritersMovie(uuid) {
    const { data, error } = await supabase
        .from("movies_casting")
        .select("people_id")
        .eq("movie_id", uuid)
        .eq("job", "scriptwriter");

    if (error) {
        console.error("Erreur lors de l'extraction des scénaristes : ", error)
    }

    return data
}