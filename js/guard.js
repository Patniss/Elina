// js/guard.js
import { supabase } from "./supabase.js";

// Vérifie si une session existe
const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  // Pas connecté → retour login
  window.location.href = "index.html";
}

// Déconnexion
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "index.html";
  });
}
