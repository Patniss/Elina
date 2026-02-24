import { supabase } from "/Elina/js/core/supabase.js";

const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    errorMessage.textContent = "Email ou mot de passe incorrect";
    return;
  }

  // Connexion réussie
  window.location.href = "/Elina/dashboard.html";
});
