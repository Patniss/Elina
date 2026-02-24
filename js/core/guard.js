// js/guard.js
import { supabase } from "/Elina/js/core/supabase.js";

const {
  data: { session },
} = await supabase.auth.getSession();

// Si on est sur la page login, on ne fait pas de guard
const isLoginPage = window.location.pathname.endsWith("/Elina/index.html") || window.location.pathname === "/";

if (!session && !isLoginPage) {
  window.location.href = "/Elina/index.html";
}

// Déconnexion
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "/Elina/index.html";
  });
}
