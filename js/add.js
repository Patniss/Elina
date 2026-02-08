import { supabase } from "./supabase.js";

/* =====================
   AJOUT FILM
===================== */

const movieForm = document.getElementById("movie-form");

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("movie-title");
  const yearInput = document.getElementById("movie-year");

  const title = titleInput.value.trim();
  const year = yearInput.value ? parseInt(yearInput.value, 10) : null;
  const complete = false;

  const { error } = await supabase
    .from("movies")
    .insert([{ title, year, complete }]);

  if (error) {
    alert(error.message);
    return
  }
  alert("Film ajouté avec succès !");
  form.reset();

});