import { supabase } from "/Elina/js/supabase.js";

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

export async function customDashboard() {
  const session = await loadProfile();

  const homeMovies = document.getElementById("homeMovies");
  const homeShows = document.getElementById("homeShows");
  const homeDramas = document.getElementById("homeDramas");
  const homeBooks = document.getElementById("homeBooks");

  if (!session.movies) homeMovies.style.display = "none";
  if (!session.shows) homeShows.style.display = "none";
  if (!session.dramas) homeDramas.style.display = "none";
  if (!session.books) homeBooks.style.display = "none";
}