import { supabase } from "/Elina/js/core/supabase.js";

export async function loadProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = "/index.html";
    return;
  }

  const userId = session.user.id;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Erreur profil :", error.message);
    return;
  }

  return data;
}

export async function getUserId() {
  const session = await loadProfile();
  const userId = session.id;
  
  return userId;
}

export async function updateProfile(id, profileData) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}