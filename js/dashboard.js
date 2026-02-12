import { supabase } from "./supabase.js";

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

  if (document.getElementById("welcome")) {
    const pseudo = data?.pseudo || "Utilisateur";
    document.getElementById("welcome").textContent = pseudo;
  }

  return data;
}

export async function loadSession() {
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
    .select("pseudo")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Erreur profil :", error.message);
    return;
  }

  return session;
}